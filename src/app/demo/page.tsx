"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── SDK types ─────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    FlexConnect: {
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

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatNaira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const flexRef = useRef<ReturnType<typeof window.FlexConnect.init> | null>(null);
  const [sdkReady, setSdkReady] = useState(false);

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(""); // naira, whole units

  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [planId, setPlanId] = useState("");

  // Load FlexConnect SDK
  useEffect(() => {
    if (document.getElementById("surge-sdk")) {
      if (window.FlexConnect) initSdk();
      return;
    }
    const script = document.createElement("script");
    script.id = "surge-sdk";
    script.src = "https://consumer.gosurge.xyz/flex.js";
    script.onload = initSdk;
    document.head.appendChild(script);
  }, []);

  function initSdk() {
    if (!window.FlexConnect) return;
    flexRef.current = window.FlexConnect.init({ widgetUrl: "https://consumer.gosurge.xyz" });
    setSdkReady(true);
  }

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flexRef.current) return;

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
          amount: Math.round(naira * 100), // convert to kobo
          customer_email: email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create session.");

      const sessionToken = data.data?.session_token ?? data.session_token;
      if (!sessionToken) throw new Error("No session token in response.");

      setState("idle");

      flexRef.current.openCheckout({
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

  // ── Success ───────────────────────────────────────────────────────────────

  if (state === "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">It works!</h1>
          <p className="text-slate-500 mb-6">
            A payment plan was created successfully. This is exactly what your customers
            will experience on your store.
          </p>
          {planId && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-left mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Payment Plan ID
              </p>
              <p className="font-mono text-sm text-slate-700 break-all">{planId}</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setState("idle"); setPlanId(""); setAmount(""); }}
              className="w-full bg-[#0A7CFF] hover:bg-[#0061D1] text-white font-bold py-3 rounded-xl transition-colors"
            >
              Try another amount
            </button>
            <a
              href="https://merchant.gosurge.xyz/register"
              className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Add Surge to my store →
            </a>
            <Link
              href="/"
              className="text-slate-400 hover:text-slate-700 text-sm py-2 transition-colors"
            >
              ← Back to Surge.xyz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main demo form ────────────────────────────────────────────────────────

  const nairaValue = parseFloat(amount) || 0;

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center p-6">
      {/* Back link */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1"
        >
          ← Back to gosurge.xyz
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A7CFF] to-[#0050CC] px-8 py-7 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⚡</span>
            <span className="font-black text-lg">Surge</span>
            <span className="text-blue-200 text-sm ml-1">· Test Mode</span>
          </div>
          <h1 className="text-2xl font-black leading-tight mb-1">
            Try the Surge checkout
          </h1>
          <p className="text-blue-100 text-sm">
            Enter any amount and see exactly how your customers pay in installments.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLaunch} className="px-8 py-7 flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Your email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A7CFF] focus:border-transparent transition"
            />
            <p className="text-xs text-slate-400 mt-1">
              Used to log you into the Surge consumer wallet during checkout.
            </p>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Amount (NGN)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₦
              </span>
              <input
                type="number"
                required
                min={100}
                step={1}
                placeholder="50,000"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setState("idle"); setErrorMsg(""); }}
                className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A7CFF] focus:border-transparent transition"
              />
            </div>
            {nairaValue >= 100 && (
              <p className="text-xs text-slate-400 mt-1">
                ≈ from{" "}
                <strong className="text-slate-600">
                  {formatNaira(Math.ceil(nairaValue / 3))}
                </strong>{" "}
                /month over 3–12 months
              </p>
            )}
            {(!amount || nairaValue < 100) && (
              <p className="text-xs text-slate-400 mt-1">Minimum ₦100</p>
            )}
          </div>

          {/* Error */}
          {state === "error" && errorMsg && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!sdkReady || state === "loading" || !email || nairaValue < 100}
            className="w-full bg-[#0A7CFF] hover:bg-[#0061D1] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {state === "loading" ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Creating session…
              </>
            ) : (
              <>
                <span className="text-xl">⚡</span>
                Launch Surge Checkout
              </>
            )}
          </button>

          {/* Trust bar */}
          <div className="flex items-center justify-center gap-5 text-xs text-slate-400 border-t border-slate-100 pt-4">
            <span>🔒 SSL encrypted</span>
            <span>🧪 Test mode</span>
            <span>⚡ Surge BNPL</span>
          </div>
        </form>
      </div>

      {/* Below-card note */}
      <p className="text-slate-500 text-xs mt-6 text-center max-w-sm">
        This demo uses a real Surge environment. No actual money is charged.
        Want to add this to your store?{" "}
        <a href="https://merchant.gosurge.xyz/register" className="text-blue-400 hover:text-blue-300 underline">
          Create a merchant account →
        </a>
      </p>
    </div>
  );
}
