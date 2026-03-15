import { NextRequest, NextResponse } from "next/server";

const FLEX_API_URL = process.env.FLEX_API_URL || "https://api.gosurge.xyz";
const DEMO_MERCHANT_ID = process.env.DEMO_MERCHANT_ID || "";
const DEMO_MERCHANT_SECRET_KEY = process.env.DEMO_MERCHANT_SECRET_KEY || "";

export async function POST(req: NextRequest) {
  if (!DEMO_MERCHANT_ID || !DEMO_MERCHANT_SECRET_KEY) {
    return NextResponse.json(
      { error: "Demo merchant credentials are not configured." },
      { status: 500 }
    );
  }

  let body: {
    amount: number;
    title: string;
    description?: string;
    order_reference?: string;
    customer_email?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { amount, title, description, order_reference, customer_email } = body;

  if (!amount || !title) {
    return NextResponse.json(
      { error: "amount and title are required." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`${FLEX_API_URL}/api/v1/checkout/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The demo merchant's JWT token authenticates this server-to-server call.
        // The secret key NEVER leaves the server — it is not accessible to browser clients.
        Authorization: `Bearer ${DEMO_MERCHANT_SECRET_KEY}`,
      },
      body: JSON.stringify({
        merchant_id: DEMO_MERCHANT_ID,
        amount,
        currency: "NGN",
        title,
        description: description ?? "",
        order_reference: order_reference ?? `demo-${Date.now()}`,
        customer_email: customer_email ?? "",
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json(data, { status: upstream.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("[create-session] upstream error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 502 }
    );
  }
}
