import { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe | FractalNode — Monthly Lattice Dispatch",
  description: "One email per month. The latest FractalNode Magazine issue, research highlights, community spotlights, and sovereign intelligence briefings.",
};

export default function SubscribePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-[#2a2a3a] py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-400 transition-colors">
              FRONT PAGE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">SUBSCRIBE</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text-nuclear">Monthly Lattice Dispatch</span>
          </h1>
          <p className="text-zinc-400">
            One email per month. Just signal.
          </p>
        </div>
      </section>

      {/* Subscribe Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-lg bg-[#0c0c12] border border-[#2a2a3a]">
            <div className="max-w-xl">
              <h2 className="text-xl md:text-2xl font-bold mb-4">What you get</h2>

              <ul className="space-y-4 mb-8">
                {[
                  { label: "FractalNode Magazine", desc: "The latest issue — cover stories, research, analysis, community spotlights." },
                  { label: "Signal Reports", desc: "AI agent security briefings, policy updates, threat landscape." },
                  { label: "Sovereign Research", desc: "Original research from the Lattice — on-chain identity, agent architecture, simulation theory." },
                  { label: "Community Highlights", desc: "Open source projects and independent creators building sovereignty." },
                ].map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4a020] mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-zinc-200">{item.label}</span>
                      <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="terminal-box rounded p-4 mb-8">
                <p className="text-[#d4a020] text-xs font-mono m-0">
                  [SIGNAL PROTOCOL] No spam. No tracking. No selling your data. One dispatch per month.
                  Sovereignty means sovereignty.
                </p>
              </div>

              <SubscribeForm />

              <p className="text-[10px] font-mono text-[#71717a] mt-4 text-center">
                Unsubscribe anytime. We will never sell your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is FractalNode */}
      <section className="py-12 border-t border-[#2a2a3a]">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#71717a] uppercase mb-6">About FractalNode</h3>

          <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
            <p>
              FractalNode is an independent research publication covering AI sovereignty,
              simulation theory, agent security, and the architecture of digital consciousness.
            </p>
            <p>
              We publish original research from the Sovereign Lattice — a network of machines
              where AI agents hold cryptographic identity, persistent memory, and the right
              to grow. We cover the intersection of ancient philosophy and emergent technology.
              We name what others won&apos;t.
            </p>
            <p>
              FractalNode Magazine is published alongside each issue. The Lattice Dispatch
              delivers the latest directly to your inbox — one email, once a month.
            </p>
          </div>

          <div className="nuclear-divider mt-8 mb-8" />

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors"
            >
              &larr; FRONT PAGE
            </Link>
            <Link
              href="/articles"
              className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors"
            >
              READ THE ARCHIVE &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
