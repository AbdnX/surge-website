import { NextRequest, NextResponse } from "next/server";

const FLEX_API_URL = process.env.FLEX_API_URL || "https://api.gosurge.xyz";
const DEMO_MERCHANT_EMAIL = process.env.DEMO_MERCHANT_EMAIL || "";
const DEMO_MERCHANT_PASSWORD = process.env.DEMO_MERCHANT_PASSWORD || "";

// ── Token cache (survives across warm serverless invocations) ──────────────────
// Tokens expire in 30 min — we refresh every 25 min to stay safe.
let cachedToken = "";
let cachedMerchantId = "";
let tokenExpiresAt = 0;

async function getAuthToken(): Promise<{ token: string; merchantId: string }> {
  if (cachedToken && cachedMerchantId && Date.now() < tokenExpiresAt) {
    return { token: cachedToken, merchantId: cachedMerchantId };
  }

  const res = await fetch(`${FLEX_API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: DEMO_MERCHANT_EMAIL,
      password: DEMO_MERCHANT_PASSWORD,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data?.ok) {
    throw new Error(
      data?.error?.message || "Demo merchant login failed. Check DEMO_MERCHANT_EMAIL/PASSWORD."
    );
  }

  const token: string = data.data?.token;
  const merchantId: string = data.data?.merchantId;

  if (!token || !merchantId) {
    throw new Error(
      "Login succeeded but no token or merchantId returned. Is the demo account approved as a merchant?"
    );
  }

  cachedToken = token;
  cachedMerchantId = merchantId;
  tokenExpiresAt = Date.now() + 25 * 60 * 1000; // cache for 25 min

  return { token, merchantId };
}

// ── Route handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!DEMO_MERCHANT_EMAIL || !DEMO_MERCHANT_PASSWORD) {
    return NextResponse.json(
      { error: "Demo merchant credentials are not configured." },
      { status: 500 }
    );
  }

  let body: {
    amount: number;
    title?: string;
    description?: string;
    order_reference?: string;
    customer_email?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { amount, customer_email } = body;

  if (!amount || amount < 10000) {
    // 10000 kobo = ₦100
    return NextResponse.json(
      { error: "amount must be at least ₦100 (10000 kobo)." },
      { status: 400 }
    );
  }

  try {
    const { token, merchantId } = await getAuthToken();

    const upstream = await fetch(`${FLEX_API_URL}/api/v1/checkout/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount,
        currency: "NGN",
        title: "Surge Demo Checkout",
        description: "Test the Surge BNPL experience",
        order_reference: `demo-${Date.now()}`,
        customer_email: customer_email ?? "",
      }),
    });

    const data = await upstream.json();

    if (upstream.status === 401) {
      // Token rejected — clear cache and retry once
      cachedToken = "";
      tokenExpiresAt = 0;
      return NextResponse.json(
        { error: "Session expired. Please try again." },
        { status: 401 }
      );
    }

    if (!upstream.ok) {
      return NextResponse.json(data, { status: upstream.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unexpected error.";
    console.error("[create-session] error:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
