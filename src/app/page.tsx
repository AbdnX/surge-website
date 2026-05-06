"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Inline SVG icons ─────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const TrendingUpIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const CreditCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00d66f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const ShoppingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CodeLine = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-sm leading-7">{children}</div>
);

/* ── Page ─────────────────────────────────────────────────────── */
export default function HomePage() {
  const [tab, setTab] = useState<"merchants" | "consumers">("merchants");

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E8ECF0]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00d66f] flex items-center justify-center">
              <span className="text-[#0F172A] text-base font-black">›</span>
            </div>
            <span className="font-bold text-lg text-[#0F172A]">Surge</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/demo" className="hidden sm:block text-sm text-[#64748B] hover:text-[#0F172A] font-medium transition-colors">
              Live Demo
            </Link>
            <a href="https://api.gosurge.xyz/docs" target="_blank" rel="noopener noreferrer"
              className="hidden sm:block text-sm text-[#64748B] hover:text-[#0F172A] font-medium transition-colors">
              API Docs
            </a>
            <a href="https://merchant.gosurge.xyz/login"
              className="hidden sm:block text-sm text-[#64748B] hover:text-[#0F172A] font-medium transition-colors">
              Merchant Sign In
            </a>
            <a href="https://merchant.gosurge.xyz/register"
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero + Tab switcher ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0F172A] text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#00d66f]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#00d66f]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-xs font-bold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest text-[#00d66f]">
            <span className="w-1.5 h-1.5 bg-[#00d66f] rounded-full animate-pulse" />
            Now live across Nigeria
          </div>

          {tab === "merchants" ? (
            <>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                Let your customers{" "}
                <span className="text-[#00d66f]">pay-small-small.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10">
                Surge embeds a full BNPL checkout into any store in minutes. No redirects. No friction. Just more completed sales.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                Shop now.{" "}
                <span className="text-[#00d66f]">Pay smart.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10">
                Split any purchase into flexible weekly or monthly payments — no credit card, no interest, and instant approval.
              </p>
            </>
          )}

          {/* Tab switcher */}
          <div className="inline-flex items-center bg-white/10 border border-white/10 rounded-2xl p-1 mb-10">
            <button
              onClick={() => setTab("merchants")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === "merchants"
                  ? "bg-[#00d66f] text-[#0F172A] shadow-lg shadow-[#00d66f]/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              🏪 For Merchants
            </button>
            <button
              onClick={() => setTab("consumers")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === "consumers"
                  ? "bg-[#00d66f] text-[#0F172A] shadow-lg shadow-[#00d66f]/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              👤 For Shoppers
            </button>
          </div>

          {/* CTAs */}
          {tab === "merchants" ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://merchant.gosurge.xyz/register"
                className="inline-flex items-center justify-center gap-2 bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-black px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-[#00d66f]/20 active:scale-[0.98]">
                Start Accepting Installments →
              </a>
              <Link href="/demo"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-8 py-4 rounded-xl text-base transition-all">
                ▶&nbsp; See a Live Demo
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://consumer.gosurge.xyz/register"
                className="inline-flex items-center justify-center gap-2 bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-black px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-[#00d66f]/20 active:scale-[0.98]">
                Create free account →
              </a>
              <a href="https://consumer.gosurge.xyz/login"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-8 py-4 rounded-xl text-base transition-all">
                Sign in
              </a>
            </div>
          )}

          {/* Stats */}
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {tab === "merchants"
              ? [
                  { label: "Avg. order lift", value: "+34%" },
                  { label: "Integration time", value: "< 30 min" },
                  { label: "Merchant risk", value: "₦0" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full">
                    <span className="text-xl font-black text-[#00d66f]">{s.value}</span>
                    <span className="text-sm text-[#94A3B8]">{s.label}</span>
                  </div>
                ))
              : [
                  { value: "₦0", label: "Interest charged" },
                  { value: "2 min", label: "To get approved" },
                  { value: "12×", label: "Max installments" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full">
                    <span className="text-xl font-black text-[#00d66f]">{value}</span>
                    <span className="text-sm text-[#94A3B8]">{label}</span>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ── Tab content ─────────────────────────────────────────── */}
      {tab === "merchants" ? (
        <MerchantContent />
      ) : (
        <ConsumerContent />
      )}

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-[#0F172A] border-t border-white/5 text-[#64748B] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 text-white mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#00d66f] flex items-center justify-center">
                  <span className="text-[#0F172A] text-base font-black">›</span>
                </div>
                <span className="font-bold text-lg">Surge</span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed">
                Nigeria&apos;s embedded BNPL infrastructure. Helping merchants sell more by giving customers flexible payment options.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="text-white font-bold mb-3">Merchants</p>
                <ul className="space-y-2">
                  <li><a href="https://merchant.gosurge.xyz/register" className="hover:text-white transition-colors">Sign Up</a></li>
                  <li><a href="https://merchant.gosurge.xyz/login" className="hover:text-white transition-colors">Sign In</a></li>
                  <li><a href="https://api.gosurge.xyz/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">API Docs</a></li>
                </ul>
              </div>
              <div>
                <p className="text-white font-bold mb-3">Customers</p>
                <ul className="space-y-2">
                  <li><a href="https://consumer.gosurge.xyz/register" className="hover:text-white transition-colors">Sign Up</a></li>
                  <li><a href="https://consumer.gosurge.xyz/login" className="hover:text-white transition-colors">Sign In</a></li>
                </ul>
              </div>
              <div>
                <p className="text-white font-bold mb-3">Company</p>
                <ul className="space-y-2">
                  <li><Link href="/demo" className="hover:text-white transition-colors">Live Demo</Link></li>
                  <li><a href="mailto:support@gosurge.xyz" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p>© 2026 Surge. All rights reserved.</p>
            <p>Built by <span className="text-white font-medium">Surge Technologies</span> · Nigeria&apos;s embedded BNPL infrastructure</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Merchant tab content ─────────────────────────────────────── */
function MerchantContent() {
  return (
    <>
      {/* Portals */}
      <section className="py-16 bg-white border-b border-[#E8ECF0]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Get started</p>
          <p className="text-center text-sm text-[#64748B] mb-8">Everything you need to start selling with Surge.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {[
              { icon: "🏪", label: "Create Merchant Account", sub: "Start accepting BNPL", href: "https://merchant.gosurge.xyz/register", cta: "Sign up free", primary: true },
              { icon: "🔑", label: "Merchant Sign In", sub: "Access your dashboard", href: "https://merchant.gosurge.xyz/login", cta: "Sign in", primary: false },
            ].map((p) => (
              <a key={p.label} href={p.href}
                className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  p.primary ? "border-[#D1FAE5] bg-[#F0FDF4] hover:border-[#00d66f]/40" : "border-[#E8ECF0] bg-[#F7F8FA] hover:border-[#D1D9E0]"
                }`}>
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E8ECF0] flex items-center justify-center text-xl shadow-sm">{p.icon}</div>
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">{p.label}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{p.sub}</p>
                </div>
                <span className={`text-xs font-bold mt-auto ${p.primary ? "text-[#00a855]" : "text-[#64748B]"}`}>{p.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-24 bg-[#F7F8FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">Built for African merchants</h2>
            <p className="text-[#64748B] max-w-xl mx-auto">Everything your customers need to say yes — without you taking on any extra risk.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📈", bg: "bg-[#F0FDF4]", title: "Increase Conversion", body: "Customers are 3× more likely to complete a purchase when they can spread payments. Surge surfaces the option exactly when they need it." },
              { icon: "🛡️", bg: "bg-[#F0FDF4]", title: "Zero Merchant Risk", body: "Surge takes on the full credit risk. You get paid upfront. If a customer defaults, that's our problem — not yours." },
              { icon: "🔌", bg: "bg-[#F5F3FF]", title: "One-Line Integration", body: "Drop in a single <script> tag and three lines of JavaScript. No backend changes required. Works with any stack." },
              { icon: "⚡", bg: "bg-[#FFFBEB]", title: "Instant Checkout", body: "The Surge widget opens as a modal overlay — customers never leave your page. No redirects, no lost sessions." },
              { icon: "🏦", bg: "bg-[#EFF6FF]", title: "Merchant-Backed Scoring", body: "Set minimum trust tiers for your store. Only customers that meet your risk threshold can check out using Surge." },
              { icon: "🌍", bg: "bg-[#F0FDF4]", title: "Built for Nigeria", body: "NGN-native, Paystack-powered, and designed around the reality of the Nigerian consumer — including delinquency handling." },
            ].map(({ icon, bg, title, body }) => (
              <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-[#E8ECF0] shadow-sm hover:shadow-md hover:border-[#D1D9E0] transition-all">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center text-xl`}>{icon}</div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5">{title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-24 bg-white border-y border-[#E8ECF0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00a855] mb-3 block">Integration</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-5">Live in under 30 minutes</h2>
              <p className="text-[#64748B] leading-relaxed mb-8">
                Drop the SDK into your page, create a checkout session from your backend, and open the widget. That&apos;s it. The rest is handled by Surge.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { step: "1", title: "Add the SDK", body: 'One <script> tag in your <head>.' },
                  { step: "2", title: "Create a session", body: "Your backend calls our API with the cart amount & your merchant ID." },
                  { step: "3", title: "Open the widget", body: "Call surge.openCheckout({ sessionToken }) — Surge does the rest." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] text-[#00d66f] font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</div>
                    <div>
                      <p className="font-bold text-[#0F172A] text-sm">{item.title}</p>
                      <p className="text-sm text-[#64748B]">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a href="https://api.gosurge.xyz/docs" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00a855] hover:underline">
                  Read the full API docs →
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#0D1117] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-[#00d66f]/70" />
                  <span className="text-xs text-slate-500 ml-2">checkout.js</span>
                </div>
                <div className="p-6 text-slate-300 overflow-x-auto">
                  <CodeLine><span className="text-slate-500">{"// 1. Load the SDK"}</span></CodeLine>
                  <CodeLine>
                    <span className="text-purple-400">{"<script "}</span>
                    <span className="text-green-300">src</span>
                    <span className="text-slate-300">{"="}</span>
                    <span className="text-yellow-300">{'"https://consumer.gosurge.xyz/flex.js"'}</span>
                    <span className="text-purple-400">{"/>"}</span>
                  </CodeLine>
                  <CodeLine>&nbsp;</CodeLine>
                  <CodeLine><span className="text-slate-500">{"// 2. Initialise"}</span></CodeLine>
                  <CodeLine>
                    <span className="text-blue-400">const </span>
                    <span className="text-slate-100">surge </span>
                    <span className="text-slate-300">= </span>
                    <span className="text-slate-100">FlexConnect</span>
                    <span className="text-yellow-300">.init</span>
                    <span className="text-slate-300">{"();"}</span>
                  </CodeLine>
                  <CodeLine>&nbsp;</CodeLine>
                  <CodeLine><span className="text-slate-500">{"// 3. Open on button click"}</span></CodeLine>
                  <CodeLine>
                    <span className="text-slate-100">surge</span>
                    <span className="text-yellow-300">.openCheckout</span>
                    <span className="text-slate-300">{"({"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-300">{"  "}</span><span className="text-green-300">sessionToken</span><span className="text-slate-300">{": token,"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-300">{"  "}</span><span className="text-green-300">onSuccess</span><span className="text-slate-300">{": ({ paymentPlanId }) => "}</span><span className="text-yellow-300">{"handleSuccess()"}</span><span className="text-slate-300">{","}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-300">{"  "}</span><span className="text-green-300">onCancel</span><span className="text-slate-300">{": () => "}</span><span className="text-yellow-300">{"handleCancel()"}</span><span className="text-slate-300">{","}</span>
                  </CodeLine>
                  <CodeLine><span className="text-slate-300">{"});"}</span></CodeLine>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-black mb-5">Ready to grow your revenue?</h2>
          <p className="text-[#94A3B8] mb-10 text-lg">
            Join merchants across Nigeria giving their customers the flexibility to buy today and pay over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://merchant.gosurge.xyz/register"
              className="inline-flex items-center justify-center gap-2 bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-black px-10 py-4 rounded-xl text-lg transition-all shadow-xl shadow-[#00d66f]/20 active:scale-[0.98]">
              Create Merchant Account →
            </a>
            <Link href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-base transition-all">
              ▶&nbsp; Try the Demo First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Consumer tab content ─────────────────────────────────────── */
function ConsumerContent() {
  return (
    <>
      {/* Portals */}
      <section className="py-16 bg-white border-b border-[#E8ECF0]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Jump in</p>
          <p className="text-center text-sm text-[#64748B] mb-8">Get started in under 2 minutes — no credit card required.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {[
              { icon: "👤", label: "Create Free Account", sub: "Shop now, pay over time", href: "https://consumer.gosurge.xyz/register", cta: "Sign up free", primary: true },
              { icon: "📱", label: "Sign In", sub: "Manage your payment plans", href: "https://consumer.gosurge.xyz/login", cta: "Sign in", primary: false },
            ].map((p) => (
              <a key={p.label} href={p.href}
                className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  p.primary ? "border-[#D1FAE5] bg-[#F0FDF4] hover:border-[#00d66f]/40" : "border-[#E8ECF0] bg-[#F7F8FA] hover:border-[#D1D9E0]"
                }`}>
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E8ECF0] flex items-center justify-center text-xl shadow-sm">{p.icon}</div>
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">{p.label}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{p.sub}</p>
                </div>
                <span className={`text-xs font-bold mt-auto ${p.primary ? "text-[#00a855]" : "text-[#64748B]"}`}>{p.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#00a855] mb-2">How it works</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">Three steps to pay flexibly</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", Icon: ShoppingIcon, title: "Shop at any Surge merchant", desc: "Find a partner store and add items to your cart like normal. Look for the Surge BNPL badge at checkout." },
              { step: "02", Icon: CalendarIcon, title: "Pick your payment plan", desc: "Split your total into weekly or monthly installments. Choose what fits your budget — no hidden fees." },
              { step: "03", Icon: CheckIcon, title: "Pay automatically over time", desc: "Your linked account is debited on schedule. Track every payment and plan from your Surge dashboard." },
            ].map(({ step, Icon, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-[#E8ECF0] p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#00d66f]">
                    <Icon />
                  </div>
                  <span className="text-xs font-black text-[#E2E8F0] tracking-widest">{step}</span>
                </div>
                <h3 className="text-sm font-black text-[#0F172A] mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white border-y border-[#E8ECF0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#00a855] mb-2">Why Surge</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">Built for buyers like you</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { Icon: CreditCardIcon, title: "Zero upfront stress", desc: "Pay a small deposit, take your items home. Surge settles the merchant immediately." },
              { Icon: ShieldIcon, title: "Surge-backed guarantee", desc: "Merchants get paid upfront — your plan is protected even if store policies change." },
              { Icon: TrendingUpIcon, title: "Build your Surge Score", desc: "On-time payments raise your score, unlocking better plans and higher limits over time." },
              { Icon: StarIcon, title: "No credit card required", desc: "Link a bank account and start shopping. No card, no credit check, no stress." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl border border-[#E8ECF0] hover:border-[#CBD5E1] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E8ECF0] flex items-center justify-center text-[#0F172A] shrink-0">
                  <Icon />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] mb-1">{title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surge Score */}
      <section className="py-24 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#0F172A] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
            <div className="absolute right-0 top-0 w-[300px] h-[300px] rounded-full bg-[#00d66f] opacity-[0.06] blur-[60px] pointer-events-none" />
            <div className="flex-1 relative">
              <div className="inline-flex items-center gap-2 bg-[#00d66f]/10 border border-[#00d66f]/20 rounded-full px-3 py-1 mb-6">
                <TrendingUpIcon size={11} />
                <span className="text-xs font-bold text-[#00d66f] uppercase tracking-widest">Surge Score</span>
              </div>
              <h2 className="text-3xl font-black text-white leading-tight tracking-tight mb-4">
                Your score unlocks<br />better everything.
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-8">
                Every on-time payment builds your Surge Score — our trust metric that unlocks higher limits, lower deposits, and access to more merchant partners.
              </p>
              <div className="flex flex-col gap-2.5">
                {["Higher spending limits", "Lower deposit requirements", "Priority at partner stores"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircleIcon />
                    <span className="text-sm text-[#94A3B8] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0 w-[200px]">
              <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-6 text-center">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Your score</p>
                <p className="text-[56px] font-black leading-none text-[#00d66f] mb-1">680</p>
                <p className="text-xs font-bold text-white/30 mb-5">Surge Silver</p>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#00d66f] h-full rounded-full" style={{ width: "68%" }} />
                </div>
                <p className="text-[10px] text-white/25 mt-2">68% to Gold</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <div className="w-12 h-12 rounded-2xl bg-[#00d66f] flex items-center justify-center mx-auto mb-6 text-[#0F172A] text-2xl font-black">⚡</div>
          <h2 className="text-4xl font-black mb-5">Ready to shop smarter?</h2>
          <p className="text-[#94A3B8] mb-10 text-lg">
            Create your free account in under 2 minutes. No credit card, no credit check — just flexible payments that work for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://consumer.gosurge.xyz/register"
              className="inline-flex items-center justify-center gap-2 bg-[#00d66f] hover:bg-[#00bf63] text-[#0F172A] font-black px-10 py-4 rounded-xl text-lg transition-all shadow-xl shadow-[#00d66f]/20 active:scale-[0.98]">
              Create free account →
            </a>
            <a href="https://consumer.gosurge.xyz/login"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-base transition-all">
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
