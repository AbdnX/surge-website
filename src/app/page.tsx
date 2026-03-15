import Link from "next/link";

const ValueProp = ({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) => (
  <div className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-50 border border-slate-100">
    <div className="text-3xl">{icon}</div>
    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
  </div>
);

const CodeLine = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-sm leading-7">{children}</div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="font-bold text-lg text-slate-900">Surge</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/demo"
              className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Live Demo
            </Link>
            <a
              href="https://api.gosurge.xyz/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              API Docs
            </a>
            <a
              href="https://merchant.gosurge.xyz/login"
              className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Merchant Sign In
            </a>
            <a
              href="https://merchant.gosurge.xyz/register"
              className="bg-[#0A7CFF] hover:bg-[#0061D1] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A0F1E] text-white">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-xs font-bold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest text-blue-300">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Now live across Nigeria
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Let your customers{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              pay-small-small.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Surge embeds a full BNPL checkout into any store in minutes.
            No redirects. No friction. Just more completed sales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://merchant.gosurge.xyz/register"
              className="inline-flex items-center justify-center gap-2 bg-[#0A7CFF] hover:bg-[#0061D1] text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98]"
            >
              Start Accepting Installments →
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-8 py-4 rounded-xl text-base transition-all"
            >
              ▶&nbsp; See a Live Demo
            </Link>
          </div>

          {/* Floating stat pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {[
              { label: "Avg. order lift", value: "+34%" },
              { label: "Integration time", value: "< 30 min" },
              { label: "Merchant risk", value: "₦0" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full"
              >
                <span className="text-xl font-black text-blue-300">{s.value}</span>
                <span className="text-sm text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portals ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Jump right in
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "🏪",
                label: "Merchant Sign Up",
                sub: "Start accepting BNPL",
                href: "https://merchant.gosurge.xyz/register",
                cta: "Create account",
                primary: true,
              },
              {
                icon: "🔑",
                label: "Merchant Sign In",
                sub: "Access your dashboard",
                href: "https://merchant.gosurge.xyz/login",
                cta: "Sign in",
                primary: false,
              },
              {
                icon: "👤",
                label: "Customer Sign Up",
                sub: "Shop now, pay later",
                href: "https://consumer.gosurge.xyz/register",
                cta: "Join Surge",
                primary: true,
              },
              {
                icon: "📱",
                label: "Customer Login",
                sub: "Manage your plans",
                href: "https://consumer.gosurge.xyz",
                cta: "Sign in",
                primary: false,
              },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  p.primary
                    ? "border-blue-100 bg-blue-50/50 hover:border-blue-200"
                    : "border-slate-100 bg-slate-50 hover:border-slate-200"
                }`}
              >
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{p.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{p.sub}</p>
                </div>
                <span
                  className={`text-xs font-bold mt-auto ${
                    p.primary ? "text-[#0A7CFF]" : "text-slate-500"
                  }`}
                >
                  {p.cta} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Props ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Built for African merchants
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Everything your customers need to say yes — without you taking on
              any extra risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueProp
              icon="📈"
              title="Increase Conversion"
              body="Customers are 3× more likely to complete a purchase when they can spread payments. Surge surfaces the option exactly when they need it."
            />
            <ValueProp
              icon="🛡️"
              title="Zero Merchant Risk"
              body="Surge takes on the full credit risk. You get paid upfront. If a customer defaults, that's our problem — not yours."
            />
            <ValueProp
              icon="🔌"
              title="One-Line Integration"
              body="Drop in a single <script> tag and three lines of JavaScript. No backend changes required. Works with any stack."
            />
            <ValueProp
              icon="⚡"
              title="Instant Checkout"
              body="The Surge widget opens as a modal overlay — customers never leave your page. No redirects, no lost sessions."
            />
            <ValueProp
              icon="🏦"
              title="Merchant-Backed Scoring"
              body="You can set minimum trust tiers for your store. Only customers that meet your risk threshold can check out using Surge."
            />
            <ValueProp
              icon="🌍"
              title="Built for Nigeria"
              body="NGN-native, Paystack-powered, and designed around the reality of the Nigerian consumer — including delinquency handling."
            />
          </div>
        </div>
      </section>

      {/* ── How It Works (Code) ─────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3 block">
                Integration
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">
                Live in under 30 minutes
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Drop the SDK into your page, create a checkout session from your
                backend, and open the widget. That&apos;s it. The rest is
                handled by Surge.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    step: "1",
                    title: "Add the SDK",
                    body: 'One <script> tag in your <head>.',
                  },
                  {
                    step: "2",
                    title: "Create a session",
                    body: "Your backend calls our API with the cart amount & your merchant ID.",
                  },
                  {
                    step: "3",
                    title: "Open the widget",
                    body: "Call surge.openCheckout({ sessionToken }) — Surge does the rest.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <a
                  href="https://api.gosurge.xyz/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A7CFF] hover:underline"
                >
                  Read the full API docs →
                </a>
              </div>
            </div>

            {/* Code block */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#0D1117] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="text-xs text-slate-500 ml-2">checkout.js</span>
                </div>
                <div className="p-6 text-slate-300 overflow-x-auto">
                  <CodeLine>
                    <span className="text-slate-500">{"// 1. Load the SDK"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-purple-400">{"<script "}</span>
                    <span className="text-green-300">src</span>
                    <span className="text-slate-300">{"="}</span>
                    <span className="text-yellow-300">{'"https://consumer.gosurge.xyz/flex.js"'}</span>
                    <span className="text-purple-400">{"/>"}</span>
                  </CodeLine>
                  <CodeLine>&nbsp;</CodeLine>
                  <CodeLine>
                    <span className="text-slate-500">{"// 2. Initialise"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-blue-400">const </span>
                    <span className="text-slate-100">surge </span>
                    <span className="text-slate-300">= </span>
                    <span className="text-slate-100">FlexConnect</span>
                    <span className="text-yellow-300">.init</span>
                    <span className="text-slate-300">{"();"}</span>
                  </CodeLine>
                  <CodeLine>&nbsp;</CodeLine>
                  <CodeLine>
                    <span className="text-slate-500">{"// 3. Open on button click"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-100">surge</span>
                    <span className="text-yellow-300">.openCheckout</span>
                    <span className="text-slate-300">{"({"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-300">{"  "}</span>
                    <span className="text-green-300">sessionToken</span>
                    <span className="text-slate-300">{": token,"}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-300">{"  "}</span>
                    <span className="text-green-300">onSuccess</span>
                    <span className="text-slate-300">{": ({ paymentPlanId }) => "}</span>
                    <span className="text-yellow-300">{"handleSuccess()"}</span>
                    <span className="text-slate-300">{","}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-300">{"  "}</span>
                    <span className="text-green-300">onCancel</span>
                    <span className="text-slate-300">{": () => "}</span>
                    <span className="text-yellow-300">{"handleCancel()"}</span>
                    <span className="text-slate-300">{","}</span>
                  </CodeLine>
                  <CodeLine>
                    <span className="text-slate-300">{"});"}</span>
                  </CodeLine>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0A7CFF]">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-black mb-5">Ready to grow your revenue?</h2>
          <p className="text-blue-100 mb-10 text-lg">
            Join merchants across Nigeria giving their customers the flexibility
            to buy today and pay over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://merchant.gosurge.xyz/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0A7CFF] hover:bg-blue-50 font-black px-10 py-4 rounded-xl text-lg transition-all shadow-xl shadow-blue-700/30 active:scale-[0.98]"
            >
              Create Merchant Account →
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-8 py-4 rounded-xl text-base transition-all"
            >
              ▶&nbsp; Try the Demo First
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 text-white mb-3">
                <span className="text-xl">⚡</span>
                <span className="font-bold text-lg">Surge</span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed">
                Nigeria&apos;s embedded BNPL infrastructure. Helping merchants
                sell more by giving customers flexible payment options.
              </p>
            </div>

            {/* Links */}
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
                  <li><a href="https://consumer.gosurge.xyz" className="hover:text-white transition-colors">Sign In</a></li>
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

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p>© 2025 Surge. All rights reserved.</p>
            <p>
              Built by{" "}
              <span className="text-white font-medium">Surge Technologies</span>
              {" "}· Nigeria&apos;s embedded BNPL infrastructure
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
