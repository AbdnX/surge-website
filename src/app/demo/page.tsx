"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    SurgeConnect: {
      init: (opts?: { widgetUrl?: string }) => {
        openCheckout: (opts: {
          sessionToken: string;
          onSuccess: (data: { paymentPlanId: string }) => void;
          onCancel: () => void;
          onError: (err: { code: string; message: string }) => void;
        }) => void;
        closeCheckout: () => void;
      };
    };
  }
}

function formatNaira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function DemoPage() {
  const surgeRef = useRef<ReturnType<typeof window.SurgeConnect.init> | null>(null);
  const [sdkReady, setSdkReady] = useState(false);

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [planId, setPlanId] = useState("");

  useEffect(() => {
    if (document.getElementById("surge-sdk")) {
      if (window.SurgeConnect) initSdk();
      return;
    }
    const script = document.createElement("script");
    script.id = "surge-sdk";
    script.src = "https://consumer.gosurge.xyz/surge.js";
    script.onload = initSdk;
    document.head.appendChild(script);
  }, []);

  function initSdk() {
    if (!window.SurgeConnect) return;
    surgeRef.current = window.SurgeConnect.init({ widgetUrl: "https://consumer.gosurge.xyz" });
    setSdkReady(true);
  }

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!surgeRef.current) return;

    const naira = parseFloat(amount);
    if (!naira || naira < 100) {
      setErrorMsg("Minimum amount is ₦100.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(naira * 100),
          customer_email: email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create session.");

      const sessionToken = data.data?.session_token ?? data.session_token;
      if (!sessionToken) throw new Error("No session token in response.");

      setState("idle");

      surgeRef.current.openCheckout({
        sessionToken,
        onSuccess: ({ paymentPlanId }) => {
          setPlanId(paymentPlanId);
          setState("success");
        },
        onCancel: () => setState("idle"),
        onError: (err) => {
          setErrorMsg(err.message || "Checkout error.");
          setState("error");
        },
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-[#E8ECF0]">
          <div className="w-16 h-16 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d66f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-[#0F172A] mb-2">It works!</h1>
          <p className="text-[#64748B] mb-6">
            A payment plan was created successfully. This is exactly what your customers
            will experience on your store.
          </p>
          {planId && (
            <div className="bg-[#F7F8FA] border border-[#E8ECF0] rounded-xl px-4 py-3 text-left mb-6">
              <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">
                Payment Plan ID
              </p>
              <p className="font-mono text-sm text-[#0F172A] break-all">{planId}</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setState("idle"); setPlanId(""); setAmount(""); }}
              className="w-full bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-bold py-3 rounded-xl transition-colors"
            >
              Try another amount
            </button>
            <a
              href="https://merchant.gosurge.xyz/register"
              className="w-full text-center bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Add Surge to my store →
            </a>
            <Link href="/" className="text-[#94A3B8] hover:text-[#64748B] text-sm py-2 transition-colors">
              Back to gosurge.xyz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nairaValue = parseFloat(amount) || 0;

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mb-6">
        <Link href="/" className="text-[#64748B] hover:text-white text-sm transition-colors">
          ← Back to gosurge.xyz
        </Link>
      </div>

      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden border border-[#E8ECF0]">
        {/* Header */}
        <div className="bg-[#0F172A] px-8 py-7 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-[#00d66f] flex items-center justify-center">
              <span className="text-[#0F172A] font-black text-base">›</span>
            </div>
            <span className="font-black text-lg">Surge</span>
            <span className="text-[#94A3B8] text-sm ml-1">· Test Mode</span>
          </div>
          <h1 className="text-2xl font-black leading-tight mb-1">Try the Surge checkout</h1>
          <p className="text-[#94A3B8] text-sm">
            Enter any amount and see exactly how your customers pay in installments.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLaunch} className="px-8 py-7 flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
              Your email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#E8ECF0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#00d66f] focus:border-transparent transition"
            />
            <p className="text-xs text-[#94A3B8] mt-1">
              Used to log you into the Surge consumer wallet during checkout.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
              Amount (NGN)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] font-bold text-sm">₦</span>
              <input
                type="number"
                required
                min={100}
                step={1}
                placeholder="50,000"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setState("idle"); setErrorMsg(""); }}
                className="w-full border border-[#E8ECF0] rounded-xl pl-8 pr-4 py-3 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#00d66f] focus:border-transparent transition"
              />
            </div>
            {nairaValue >= 100 ? (
              <p className="text-xs text-[#94A3B8] mt-1">
                ≈ from{" "}
                <strong className="text-[#64748B]">{formatNaira(Math.ceil(nairaValue / 3))}</strong>
                {" "}/month over 3–12 months
              </p>
            ) : (
              <p className="text-xs text-[#94A3B8] mt-1">Minimum ₦100</p>
            )}
          </div>

          {state === "error" && errorMsg && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={!sdkReady || state === "loading" || !email || nairaValue < 100}
            className="w-full bg-[#00d66f] hover:bg-[#00bf63] disabled:opacity-50 disabled:cursor-not-allowed text-[#0F172A] font-black py-4 rounded-2xl text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {state === "loading" ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(15,23,42,0.2)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Creating session…
              </>
            ) : (
              "Launch Surge Checkout →"
            )}
          </button>

          <div className="flex items-center justify-center gap-5 text-xs text-[#94A3B8] border-t border-[#E8ECF0] pt-4">
            <span>SSL encrypted</span>
            <span>·</span>
            <span>Test mode</span>
            <span>·</span>
            <span>Surge BNPL</span>
          </div>
        </form>
      </div>

      <p className="text-[#64748B] text-xs mt-6 text-center max-w-sm">
        This demo uses a real Surge environment. No actual money is charged.
        Want to add this to your store?{" "}
        <a href="https://merchant.gosurge.xyz/register" className="text-[#00d66f] hover:underline">
          Create a merchant account →
        </a>
      </p>
    </div>
  );
}
