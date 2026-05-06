"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─── Inline icons ────────────────────────────────────────────── */
const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d66f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);


/* ─── Fake app UI card ────────────────────────────────────────── */
function AppCard() {
  return (
    <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 lg:ml-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-[#00d66f]/20 blur-[80px] rounded-full scale-75" />
      {/* Card */}
      <div className="relative bg-[#0D1520] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-[10px] text-white/40 font-bold">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 bg-white/40 rounded-sm" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#00d66f] rounded-full" />
          </div>
        </div>

        {/* Header */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-white/40">Hello,</p>
            <p className="text-sm font-black text-white">Amaka 👋</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#00d66f]/15 border border-[#00d66f]/20 flex items-center justify-center">
            <span className="text-base">A</span>
          </div>
        </div>

        {/* Score card */}
        <div className="mx-4 mb-4 bg-gradient-to-br from-[#00d66f]/15 to-[#00d66f]/5 border border-[#00d66f]/20 rounded-2xl p-4">
          <p className="text-[10px] font-bold text-[#00d66f]/60 uppercase tracking-widest mb-1">Surge Score</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-black text-white leading-none">724</p>
              <p className="text-[10px] text-[#00d66f] font-bold mt-0.5">Surge Silver →</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/30 mb-1">76% to Gold</p>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#00d66f] rounded-full" style={{ width: "76%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Active plan */}
        <div className="px-4 mb-4">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Active Plan</p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E293B] flex items-center justify-center text-lg shrink-0">👟</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Nike Air Max 270</p>
              <p className="text-[10px] text-white/40">3 of 6 paid</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-black text-[#00d66f]">₦12,500</p>
              <p className="text-[10px] text-white/30">next due</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-4 pb-5 grid grid-cols-3 gap-2">
          {["Shop", "Pay", "History"].map((action, i) => (
            <div key={action} className="bg-white/5 border border-white/10 rounded-xl py-3 text-center">
              <p className="text-[11px] font-bold text-white/60">{action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Merchant app UI card ────────────────────────────────────── */
function MerchantCard() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
      <div className="absolute inset-0 bg-[#00d66f]/15 blur-[80px] rounded-full scale-75" />
      <div className="relative bg-[#0D1520] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest">Dashboard</p>
            <p className="text-lg font-black text-white mt-0.5">Store Overview</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#00d66f]/10 border border-[#00d66f]/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 bg-[#00d66f] rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-[#00d66f]">Live</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Revenue", value: "₦2.4M", delta: "+18%" },
            { label: "Orders", value: "143", delta: "+34%" },
            { label: "Avg Order", value: "₦16.8k", delta: "+12%" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-[9px] text-white/30 font-bold uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-sm font-black text-white leading-none">{s.value}</p>
              <p className="text-[10px] text-[#00d66f] font-bold mt-1">{s.delta}</p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Recent Orders</p>
        <div className="flex flex-col gap-2">
          {[
            { name: "Chidi O.", amount: "₦45,000", status: "Paid", plan: "3mo" },
            { name: "Fatima A.", amount: "₦28,500", status: "Active", plan: "6mo" },
            { name: "Emeka B.", amount: "₦72,000", status: "Paid", plan: "12mo" },
          ].map((o) => (
            <div key={o.name} className="flex items-center justify-between bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#1E293B] flex items-center justify-center text-xs font-black text-[#00d66f]">{o.name[0]}</div>
                <div>
                  <p className="text-[11px] font-bold text-white">{o.name}</p>
                  <p className="text-[9px] text-white/30">{o.plan} plan</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black text-white">{o.amount}</p>
                <p className={`text-[9px] font-bold ${o.status === "Paid" ? "text-[#00d66f]" : "text-yellow-400"}`}>{o.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Feature section (alternating) ──────────────────────────── */
function FeatureSection({
  eyebrow, title, body, checks, visual, flip = false,
}: {
  eyebrow: string; title: string; body: string; checks: string[]; visual: React.ReactNode; flip?: boolean;
}) {
  return (
    <div className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-center py-20 lg:py-28 max-w-6xl mx-auto px-6`}>
      <div className="flex-1">
        <span className="text-[11px] font-black text-[#00d66f] uppercase tracking-[0.15em] mb-4 block">{eyebrow}</span>
        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-5">{title}</h2>
        <p className="text-[#94A3B8] leading-relaxed mb-8 text-base">{body}</p>
        <div className="flex flex-col gap-3">
          {checks.map((c) => (
            <div key={c} className="flex items-center gap-3">
              <CheckCircleIcon />
              <span className="text-sm text-[#94A3B8] font-medium">{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full">{visual}</div>
    </div>
  );
}

/* ─── Code block ──────────────────────────────────────────────── */
function CodeBlock() {
  return (
    <div className="bg-[#0D1117] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-[#00d66f]/70" />
        <span className="text-xs text-white/30 ml-2 font-mono">checkout.js</span>
      </div>
      <div className="p-6 font-mono text-sm leading-7 overflow-x-auto">
        <div className="text-white/30">{"// 1. Add the SDK"}</div>
        <div>
          <span className="text-purple-400">{"<script "}</span>
          <span className="text-green-400">src</span>
          <span className="text-white/60">{"="}</span>
          <span className="text-yellow-300">{'"https://consumer.gosurge.xyz/surge.js"'}</span>
          <span className="text-purple-400">{" />"}</span>
        </div>
        <div className="mt-3 text-white/30">{"// 2. Initialise"}</div>
        <div>
          <span className="text-blue-400">const </span>
          <span className="text-white">surge </span>
          <span className="text-white/60">= </span>
          <span className="text-white">SurgeConnect</span>
          <span className="text-yellow-300">.init</span>
          <span className="text-white/60">{"();"}</span>
        </div>
        <div className="mt-3 text-white/30">{"// 3. Open on button click"}</div>
        <div><span className="text-white">surge</span><span className="text-yellow-300">.openCheckout</span><span className="text-white/60">{"({"}</span></div>
        <div><span className="text-white/40">{"  "}</span><span className="text-green-400">sessionToken</span><span className="text-white/60">{": token,"}</span></div>
        <div><span className="text-white/40">{"  "}</span><span className="text-green-400">onSuccess</span><span className="text-white/60">{": (e) => handleSuccess(e),"}</span></div>
        <div><span className="text-white/40">{"  "}</span><span className="text-green-400">onCancel</span><span className="text-white/60">{": () => handleCancel(),"}</span></div>
        <div><span className="text-white/60">{"});"}</span></div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  const [tab, setTab] = useState<"merchants" | "consumers">("merchants");

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14]">

      {/* ── Nav ───────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl">
        {/* Top bar — tab switcher */}
        <div className="bg-white/[0.04] border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 h-9 flex items-center justify-between">
            <div className="flex">
              {(["merchants", "consumers"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 h-9 text-[12px] font-bold transition-all border-b-2 ${
                    tab === t
                      ? "text-white border-white"
                      : "text-white/40 border-transparent hover:text-white/70"
                  }`}
                >
                  {t === "merchants" ? "For Merchants" : "For Shoppers"}
                </button>
              ))}
            </div>
            <a href="https://api.gosurge.xyz/docs" target="_blank" rel="noopener noreferrer"
              className="text-[12px] text-white/40 hover:text-white/70 font-medium transition-colors">
              API Docs
            </a>
          </div>
        </div>

        {/* Main bar — logo + links + CTA */}
        <div className="bg-[#070B14]/90 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-[#00d66f] flex items-center justify-center">
                <span className="text-[#0F172A] text-base font-black leading-none">›</span>
              </div>
              <span className="font-black text-lg text-white tracking-tight">Surge</span>
            </div>

            {/* Centre links */}
            <div className="hidden md:flex items-center gap-6 text-[13px] text-white/50">
              <Link href="/demo" className="hover:text-white transition-colors font-medium">Demo</Link>
              <a href="https://merchant.gosurge.xyz" className="hover:text-white transition-colors font-medium">Merchants</a>
              <a href="https://consumer.gosurge.xyz" className="hover:text-white transition-colors font-medium">Shoppers</a>
            </div>

            {/* Right: login + CTA */}
            <div className="flex items-center gap-4 shrink-0">
              <a
                href={tab === "merchants" ? "https://merchant.gosurge.xyz/login" : "https://consumer.gosurge.xyz/login"}
                className="hidden sm:block text-[13px] text-white/50 hover:text-white font-medium transition-colors"
              >
                {tab === "merchants" ? "Merchant login" : "Shopper login"}
              </a>
              <a
                href={tab === "merchants" ? "https://merchant.gosurge.xyz/register" : "https://consumer.gosurge.xyz/register"}
                className="bg-white hover:bg-white/90 text-[#0F172A] text-[13px] font-black px-5 py-2 rounded-full transition-all whitespace-nowrap"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-8">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00d66f]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left">
              {tab === "merchants" ? (
                <>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-6 text-white">
                    Let customers{" "}
                    <span className="text-[#00d66f]">pay<br />small-small.</span>
                  </h1>
                  <p className="text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-lg">
                    Embed BNPL into any Nigerian store in 30 minutes. No redirects, zero merchant risk, and more completed sales — guaranteed.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-6 text-white">
                    Shop now.{" "}
                    <span className="text-[#00d66f]">Pay<br />flexibly.</span>
                  </h1>
                  <p className="text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-lg">
                    Split any purchase into easy weekly or monthly payments. No credit card, no interest, and instant approval.
                  </p>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14">
                {tab === "merchants" ? (
                  <>
                    <a href="https://merchant.gosurge.xyz/register"
                      className="inline-flex items-center justify-center gap-2 bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-black px-8 py-4 rounded-2xl text-base transition-all shadow-lg shadow-[#00d66f]/20 active:scale-[0.98]">
                      Start Accepting Installments <ArrowRight />
                    </a>
                    <Link href="/demo"
                      className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/12 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all">
                      ▶ Live Demo
                    </Link>
                  </>
                ) : (
                  <>
                    <a href="https://consumer.gosurge.xyz/register"
                      className="inline-flex items-center justify-center gap-2 bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-black px-8 py-4 rounded-2xl text-base transition-all shadow-lg shadow-[#00d66f]/20 active:scale-[0.98]">
                      Create Free Account <ArrowRight />
                    </a>
                    <a href="https://consumer.gosurge.xyz/login"
                      className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/12 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all">
                      Sign In
                    </a>
                  </>
                )}
              </div>

            </div>

            {/* Right: visual */}
            <div className="flex-1 w-full flex items-center justify-center lg:justify-end">
              {tab === "merchants" ? <MerchantCard /> : <AppCard />}
            </div>
          </div>
        </div>
      </section>

      {/* ── "Built for African commerce" center section ───────── */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d66f]/3 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            BNPL infrastructure,<br />
            <span className="text-[#00d66f]">assembled for Nigeria.</span>
          </h2>
          <p className="text-lg text-[#64748B] leading-relaxed">
            From merchant dashboards to consumer wallets, Surge connects every piece of the installment payment journey — simple, local, and built to scale.
          </p>
        </div>
      </section>

      {/* ── Feature sections ──────────────────────────────────── */}
      <div className="border-t border-white/5">
        {/* Section 1 */}
        <div className="border-b border-white/5">
          <FeatureSection
            eyebrow="For Merchants"
            title="Get paid upfront, every time."
            body="When a customer checks out with Surge, you receive the full payment immediately. We take on the credit risk. If a customer misses a payment, that's our problem — not yours."
            checks={[
              "Full merchant payout on checkout",
              "Surge absorbs all default risk",
              "No chargebacks or disputes",
            ]}
            visual={
              <div className="bg-[#0D1520] border border-white/10 rounded-2xl p-6 space-y-3">
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">Settlement</p>
                {[
                  { merchant: "Konga Fashion", amount: "₦180,000", time: "Just now", status: "Settled" },
                  { merchant: "TechHub Lagos", amount: "₦450,000", time: "2 mins ago", status: "Settled" },
                  { merchant: "Zara Nigeria", amount: "₦92,500", time: "5 mins ago", status: "Settled" },
                  { merchant: "BookStack", amount: "₦37,000", time: "12 mins ago", status: "Settled" },
                ].map((r) => (
                  <div key={r.merchant} className="flex items-center justify-between bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-white">{r.merchant}</p>
                      <p className="text-[10px] text-white/30">{r.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-[#00d66f]">{r.amount}</p>
                      <p className="text-[10px] font-bold text-[#00d66f]/60">{r.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </div>

        {/* Section 2 */}
        <div className="border-b border-white/5">
          <FeatureSection
            flip
            eyebrow="For Shoppers"
            title="Buy today. Pay small-small."
            body="Customers choose how to spread payments — weekly or monthly, 3 to 12 instalments. No credit card, no interest, and instant in-app approval so they never have to leave your checkout."
            checks={[
              "3 to 12 flexible instalments",
              "No interest, ever",
              "Instant approval in under 2 minutes",
            ]}
            visual={<AppCard />}
          />
        </div>

        {/* Section 3 */}
        <div className="border-b border-white/5">
          <FeatureSection
            eyebrow="Merchant Control"
            title="Set your own risk rules."
            body="Every Surge merchant can define the minimum trust tier required to shop at their store. High-value goods? Require Gold-tier customers. Everyday items? Open to everyone. You're always in control."
            checks={[
              "Minimum Surge Score tier per store",
              "Block delinquent customers automatically",
              "Adjust limits without code changes",
            ]}
            visual={
              <div className="bg-[#0D1520] border border-white/10 rounded-2xl p-6">
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-4">Risk Settings</p>
                <div className="space-y-3">
                  {[
                    { label: "Min. Accepted Tier", value: "Surge Silver", color: "text-slate-300" },
                    { label: "Max Plan Duration", value: "6 months", color: "text-white" },
                    { label: "Deposit Requirement", value: "20%", color: "text-white" },
                    { label: "Allowed Frequencies", value: "Monthly, Weekly", color: "text-white" },
                    { label: "Risk Bearer", value: "Surge", color: "text-[#00d66f]" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
                      <p className="text-[11px] text-white/40 font-medium">{s.label}</p>
                      <p className={`text-[11px] font-black ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-[#00d66f]/10 border border-[#00d66f]/20 text-[#00d66f] text-[12px] font-black py-2.5 rounded-xl hover:bg-[#00d66f]/15 transition-colors">
                  Save Settings
                </button>
              </div>
            }
          />
        </div>

        {/* Section 4 */}
        <div className="border-b border-white/5">
          <FeatureSection
            flip
            eyebrow="Surge Score"
            title="Pay on time. Unlock more."
            body="Every on-time payment builds a shopper's Surge Score — our trust metric that unlocks higher spending limits, lower deposits, and access to more partner merchants across the Surge network."
            checks={[
              "Score rises with on-time payments",
              "Unlocks higher limits and better plans",
              "Access to exclusive Surge partner stores",
            ]}
            visual={
              <div className="bg-[#0D1520] border border-white/10 rounded-2xl p-6">
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-5">Score Tiers</p>
                <div className="space-y-3">
                  {[
                    { tier: "Surge Bronze", range: "300–499", limit: "₦50,000", color: "text-amber-600", bg: "bg-amber-600/10 border-amber-600/20" },
                    { tier: "Surge Silver", range: "500–699", limit: "₦150,000", color: "text-slate-300", bg: "bg-slate-300/10 border-slate-300/20" },
                    { tier: "Surge Gold", range: "700–849", limit: "₦500,000", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
                    { tier: "Surge Platinum", range: "850–1000", limit: "Unlimited", color: "text-[#00d66f]", bg: "bg-[#00d66f]/10 border-[#00d66f]/20" },
                  ].map((t) => (
                    <div key={t.tier} className={`flex items-center justify-between border rounded-xl px-4 py-3 ${t.bg}`}>
                      <div>
                        <p className={`text-[11px] font-black ${t.color}`}>{t.tier}</p>
                        <p className="text-[10px] text-white/30">{t.range}</p>
                      </div>
                      <p className="text-xs font-black text-white">{t.limit}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </div>

      {/* ── Integration section ───────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d66f]/3 to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-[11px] font-black text-[#00d66f] uppercase tracking-[0.15em] mb-4 block">Integration</span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
                Live in under<br />30 minutes.
              </h2>
              <p className="text-[#94A3B8] leading-relaxed mb-10 text-base">
                One script tag, three lines of JavaScript. Drop in the Surge SDK and you&apos;re done. No backend changes, no redirects, no lost sessions.
              </p>
              <div className="flex flex-col gap-5 mb-10">
                {[
                  { n: "1", t: "Add the SDK", b: 'One <script> tag in your <head>.' },
                  { n: "2", t: "Create a session", b: "Your backend calls our API with the cart amount and merchant ID." },
                  { n: "3", t: "Open the widget", b: "Call surge.openCheckout() — Surge handles the rest." },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#00d66f]/10 border border-[#00d66f]/20 text-[#00d66f] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">{step.n}</div>
                    <div>
                      <p className="font-bold text-white text-sm mb-0.5">{step.t}</p>
                      <p className="text-sm text-[#64748B]">{step.b}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://api.gosurge.xyz/docs" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00d66f] hover:underline">
                Read the full API docs <ArrowRight />
              </a>
            </div>
            <div className="lg:w-1/2 w-full">
              <CodeBlock />
            </div>
          </div>
        </div>
      </section>

      {/* ── "Surge. Built for this." tagline band ─────────────── */}
      <section className="border-y border-white/5 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d66f]/5 via-transparent to-[#00d66f]/5 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 justify-between">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-xl">
            BNPL that<br />
            <span className="text-[#00d66f]">actually works</span><br />
            in Nigeria.
          </h2>
          <div className="max-w-sm">
            <p className="text-[#64748B] leading-relaxed mb-8 text-base">
              Whether you&apos;re a merchant selling electronics or a shopper buying shoes, Surge keeps money moving with plans that fit real Nigerian budgets.
            </p>
            <a href="https://merchant.gosurge.xyz/register"
              className="inline-flex items-center gap-2 bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-black px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-[#00d66f]/20">
              Start for free <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00d66f]/5 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-[#00d66f]/6 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#00d66f] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#00d66f]/30">
            <span className="text-[#0F172A] text-2xl font-black">›</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Control is the<br />ultimate advantage.
          </h2>
          <p className="text-[#64748B] mb-12 text-lg leading-relaxed">
            Join merchants across Nigeria giving customers the flexibility to buy today and pay over time — while you get paid upfront, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://merchant.gosurge.xyz/register"
              className="inline-flex items-center justify-center gap-2 bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-black px-10 py-4 rounded-2xl text-base transition-all shadow-xl shadow-[#00d66f]/20 active:scale-[0.98]">
              Create Merchant Account <ArrowRight />
            </a>
            <Link href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/10 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all">
              ▶ Try the Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 text-[#475569]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 text-white mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#00d66f] flex items-center justify-center">
                  <span className="text-[#0F172A] text-base font-black leading-none">›</span>
                </div>
                <span className="font-black text-lg tracking-tight">Surge</span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed">
                Nigeria&apos;s embedded BNPL infrastructure. Helping merchants sell more and customers pay smarter.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
              <div>
                <p className="text-white font-bold mb-4">Merchants</p>
                <ul className="space-y-2.5">
                  <li><a href="https://merchant.gosurge.xyz/register" className="hover:text-white transition-colors">Sign Up</a></li>
                  <li><a href="https://merchant.gosurge.xyz/login" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="https://api.gosurge.xyz/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">API Docs</a></li>
                </ul>
              </div>
              <div>
                <p className="text-white font-bold mb-4">Shoppers</p>
                <ul className="space-y-2.5">
                  <li><a href="https://consumer.gosurge.xyz/register" className="hover:text-white transition-colors">Sign Up</a></li>
                  <li><a href="https://consumer.gosurge.xyz/login" className="hover:text-white transition-colors">Sign In</a></li>
                  <li><a href="https://consumer.gosurge.xyz" className="hover:text-white transition-colors">Wallet</a></li>
                </ul>
              </div>
              <div>
                <p className="text-white font-bold mb-4">Company</p>
                <ul className="space-y-2.5">
                  <li><Link href="/demo" className="hover:text-white transition-colors">Live Demo</Link></li>
                  <li><a href="mailto:support@gosurge.xyz" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="https://admin.gosurge.xyz" className="hover:text-white transition-colors">Admin</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p>© 2026 Surge. All rights reserved.</p>
            <p>Built by <span className="text-white font-medium">Surge Technologies</span> · Nigeria&apos;s embedded BNPL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
