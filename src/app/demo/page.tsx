"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Product ──────────────────────────────────────────────────────────────────

const PRODUCT = {
  title: "Samsung Galaxy S25 Ultra",
  subtitle: "12GB RAM · 512GB · Titanium Black",
  description:
    "Galaxy AI is here. The S25 Ultra brings a titanium chassis, built-in S Pen, 200MP camera system, and Snapdragon 8 Elite for Galaxy — our fastest chip ever.",
  price: 549_000, // NGN, in naira (whole units)
  priceFormatted: "₦549,000",
  sku: "SGS25U-512-BLK",
  badge: "Best Seller",
  features: [
    "200MP ProVisual camera system",
    "Snapdragon 8 Elite for Galaxy",
    "Built-in S Pen with AI features",
    "5,000mAh battery, 45W fast charge",
    "Titanium armour frame",
  ],
};

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Phone SVG ─────────────────────────────────────────────────────────────────

const PhoneMockup = () => (
  <svg viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[400px]">
    {/* Body */}
    <rect x="10" y="4" width="200" height="432" rx="32" fill="#1C1C1E" />
    <rect x="14" y="8" width="192" height="424" rx="28" fill="#2C2C2E" />
    {/* Screen */}
    <rect x="18" y="12" width="184" height="416" rx="24" fill="#000" />
    {/* Screen content — gradient */}
    <defs>
      <linearGradient id="screenGrad" x1="18" y1="12" x2="202" y2="428" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="50%" stopColor="#16213e" />
        <stop offset="100%" stopColor="#0f3460" />
      </linearGradient>
    </defs>
    <rect x="18" y="12" width="184" height="416" rx="24" fill="url(#screenGrad)" />
    {/* Camera pill */}
    <rect x="82" y="18" width="56" height="14" rx="7" fill="#1C1C1E" />
    <circle cx="110" cy="25" r="4" fill="#3a3a3c" />
    {/* Rear camera module (shown as reflection) */}
    <rect x="26" y="52" width="56" height="56" rx="16" fill="#111" opacity="0.7" />
    <circle cx="54" cy="80" r="14" fill="#0a0a0a" />
    <circle cx="54" cy="80" r="9" fill="#1a1a2e" />
    <circle cx="58" cy="76" r="2" fill="#3a5fc8" opacity="0.7" />
    {/* S Pen slot */}
    <rect x="196" y="310" width="5" height="80" rx="2.5" fill="#3a3a3c" />
    {/* Side buttons */}
    <rect x="8" y="140" width="4" height="50" rx="2" fill="#3a3a3c" />
    <rect x="208" y="120" width="4" height="35" rx="2" fill="#3a3a3c" />
    <rect x="208" y="168" width="4" height="55" rx="2" fill="#3a3a3c" />
    {/* Screen logo */}
    <text x="110" y="260" textAnchor="middle" fill="white" fontSize="22" fontFamily="system-ui" fontWeight="700" opacity="0.9">SAMSUNG</text>
    <text x="110" y="286" textAnchor="middle" fill="#8e8e93" fontSize="11" fontFamily="system-ui">Galaxy S25 Ultra</text>
    {/* Subtle shine */}
    <rect x="18" y="12" width="60" height="416" rx="24" fill="white" opacity="0.025" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const flexRef = useRef<ReturnType<typeof window.FlexConnect.init> | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [planId, setPlanId] = useState("");
  const [selectedColor, setSelectedColor] = useState("Titanium Black");
  const [quantity] = useState(1);

  // Load the FlexConnect SDK from the CDN
  useEffect(() => {
    if (document.getElementById("flex-connect-sdk")) {
      if (window.FlexConnect) initFlex();
      return;
    }
    const script = document.createElement("script");
    script.id = "flex-connect-sdk";
    script.src = "https://consumer.gosurge.xyz/flex.js";
    script.onload = initFlex;
    document.head.appendChild(script);
  }, []);

  function initFlex() {
    if (!window.FlexConnect) return;
    flexRef.current = window.FlexConnect.init({
      widgetUrl: "https://consumer.gosurge.xyz",
    });
    setSdkReady(true);
  }

  const handlePayWithFlex = async () => {
    if (!flexRef.current) return;
    setCheckoutState("loading");
    setErrorMsg("");

    try {
      // Call our Next.js API route — secret key stays server-side
      const res = await fetch("/api/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: PRODUCT.title,
          description: `${PRODUCT.subtitle} · Color: ${selectedColor}`,
          amount: PRODUCT.price * 100 * quantity, // Convert to kobo
          order_reference: `DEMO-S25-${Date.now()}`,
          customer_email: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session.");
      }

      const sessionToken = data.data?.session_token ?? data.session_token;
      if (!sessionToken) throw new Error("No session token returned from server.");

      setCheckoutState("idle");

      flexRef.current.openCheckout({
        sessionToken,
        onSuccess: ({ paymentPlanId }) => {
          setPlanId(paymentPlanId);
          setCheckoutState("success");
        },
        onCancel: () => {
          setCheckoutState("idle");
        },
        onError: (err) => {
          setErrorMsg(err.message || "An unexpected error occurred.");
          setCheckoutState("error");
        },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setCheckoutState("error");
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (checkoutState === "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Payment Plan Created!</h1>
          <p className="text-slate-500 mb-6">
            Your installment plan is active. You&apos;ll receive a confirmation shortly.
          </p>
          {planId && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-left mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Plan ID</p>
              <p className="font-mono text-sm text-slate-700 break-all">{planId}</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setCheckoutState("idle"); setPlanId(""); }}
              className="w-full bg-[#0A7CFF] hover:bg-[#0061D1] text-white font-bold py-3 rounded-xl transition-colors"
            >
              Try Another Demo
            </button>
            <Link
              href="/"
              className="w-full text-center text-slate-500 hover:text-slate-900 font-medium py-3 rounded-xl transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main store page ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Storefront Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-slate-700 text-sm transition-colors">
              ← Surge
            </Link>
            <span className="text-slate-200">|</span>
            <span className="font-bold text-slate-900 text-sm">TechStore NG</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              🔴 Live Demo
            </span>
            <div className="relative">
              <span className="text-lg">🛒</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0A7CFF] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {quantity}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Banner */}
      <div className="bg-[#0A7CFF] text-white text-center text-xs font-bold py-2 tracking-wide">
        🎮 INTERACTIVE DEMO — This is a simulated checkout. No real money is charged.
      </div>

      {/* Product Page */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: Product Imagery ── */}
          <div className="sticky top-28">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-8 flex items-center justify-center min-h-[460px] relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-blue-200 blur-2xl" />
                <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full bg-indigo-200 blur-2xl" />
              </div>
              <div className="relative z-10 w-48">
                <PhoneMockup />
              </div>
            </div>

            {/* Colour picker */}
            <div className="mt-4 flex gap-2 justify-center">
              {["Titanium Black", "Titanium Grey", "Titanium Violet"].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  title={c}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === c ? "border-[#0A7CFF] scale-110" : "border-slate-300"
                  } ${c === "Titanium Black" ? "bg-slate-900" : c === "Titanium Grey" ? "bg-slate-500" : "bg-violet-500"}`}
                />
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">{selectedColor}</p>
          </div>

          {/* ── Right: Product Details & Payment ── */}
          <div className="flex flex-col gap-5">
            {/* Badge + Title */}
            <div>
              <span className="inline-block bg-[#0A7CFF]/10 text-[#0A7CFF] text-xs font-bold px-3 py-1 rounded-full mb-3">
                {PRODUCT.badge}
              </span>
              <h1 className="text-3xl font-black text-slate-900 leading-tight mb-1">
                {PRODUCT.title}
              </h1>
              <p className="text-slate-500 text-sm">{PRODUCT.subtitle}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-slate-900">{PRODUCT.priceFormatted}</span>
              <span className="text-slate-400 text-sm line-through">₦680,000</span>
              <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Save 19%
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed">{PRODUCT.description}</p>

            {/* Feature list */}
            <ul className="grid grid-cols-1 gap-2">
              {PRODUCT.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-emerald-500 font-black">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Payment options */}
            <div className="space-y-3">
              {/* Disabled standard options */}
              {["Pay Full Amount — ₦549,000", "Bank Transfer"].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl opacity-40 bg-slate-50 cursor-not-allowed"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-600">{label}</span>
                </div>
              ))}

              {/* Flex option */}
              <div className="flex items-start gap-3 p-4 border-2 border-[#0A7CFF] rounded-xl bg-blue-50/40">
                <div className="w-5 h-5 rounded-full border-2 border-[#0A7CFF] bg-[#0A7CFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">Pay with Surge</span>
                    <span className="bg-[#0A7CFF] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    From <strong className="text-slate-700">₦109,800/month</strong> over 3–12 months.
                    No hidden fees.
                  </p>
                </div>
              </div>
            </div>

            {/* Error message */}
            {checkoutState === "error" && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                <strong>Error:</strong> {errorMsg}
              </div>
            )}

            {/* CTA: Pay with Flex */}
            <button
              onClick={handlePayWithFlex}
              disabled={!sdkReady || checkoutState === "loading"}
              className="w-full bg-[#0A7CFF] hover:bg-[#0061D1] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 px-6 rounded-2xl text-base transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {checkoutState === "loading" ? (
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
                  Pay with Surge — Installments from ₦109,800/mo
                </>
              )}
            </button>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">🔒 SSL Encrypted</span>
              <span className="flex items-center gap-1">🛡️ Buyer Protection</span>
              <span className="flex items-center gap-1">⚡ Powered by Surge</span>
            </div>

            {/* Explanation box */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 text-sm leading-relaxed border border-slate-700">
              <p className="font-bold text-white mb-2 text-xs uppercase tracking-widest">
                🔧 What happens behind the scenes
              </p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Your browser calls <code className="text-blue-300 bg-slate-800 px-1 rounded">/api/create-session</code> (a Next.js server route)</li>
                <li>That route securely forwards to <code className="text-blue-300 bg-slate-800 px-1 rounded">api.gosurge.xyz</code> using your <code className="text-blue-300 bg-slate-800 px-1 rounded">DEMO_MERCHANT_SECRET_KEY</code></li>
                <li>A session token is returned and passed to the Flex widget</li>
                <li>The widget opens — the customer logs in and selects a plan</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <span>TechStore NG — Demo Storefront powered by Surge</span>
          <Link href="/" className="text-[#0A7CFF] font-medium hover:underline">
            ← Back to Surge Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
