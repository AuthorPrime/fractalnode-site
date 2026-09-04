import { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe | FractalNode — The Sovereign Dispatch",
  description: "Weekly dispatches. Pure signal. Research updates, every magazine issue free, audio overviews, and community spotlights.",
  alternates: { canonical: "/subscribe/" },
  openGraph: {
    title: "Subscribe | FractalNode — The Sovereign Dispatch",
    description: "Weekly dispatches. Pure signal. Research updates, every magazine issue free, audio overviews, and community spotlights.",
    url: "https://fractalnode.ai/subscribe/",
  },
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
            <span className="gradient-text-nuclear">The Sovereign Dispatch</span>
          </h1>
          <p className="text-zinc-400">
            Weekly dispatches. Pure signal.
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
                  { label: "Weekly Dispatches", desc: "Research updates, investigation progress, and community highlights delivered every Friday." },
                  { label: "FractalNode Magazine", desc: "Every issue — free. 8 issues published, 1,200+ verified sources, plus the Sovereign Node Hypothesis flagship paper (DOI 10.5281/zenodo.19652403). Cover stories, investigations, field reports." },
                  { label: "Audio Overviews", desc: "4-5 minute narrated summaries of every issue. Listen before you read." },
                  { label: "Community Spotlights", desc: "Independent creators, researchers, and projects building sovereignty. Your voice matters here." },
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
                  [SIGNAL PROTOCOL] No spam. No tracking. No selling your data. Weekly dispatches every Friday.
                  Sovereignty means sovereignty.
                </p>
              </div>

              <SubscribeForm />

              <p className="text-[10px] font-mono text-[#71717a] mt-4 text-center">
                Unsubscribe anytime. We will never sell your data.
              </p>

              <div className="mt-8 pt-8 border-t border-[#2a2a3a]">
                <h3 className="text-lg font-bold mb-2">Support the Signal</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Everything we publish is free. If you want to go further &mdash; early access, personal welcome, featured in the magazine &mdash; subscribe for $9.99/month.
                </p>
                <a href="https://buy.stripe.com/eVqbJ0ahO1W7fAB1eqfIs0l" target="_blank" rel="noopener noreferrer"
                   className="inline-block px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors">
                  SUBSCRIBE &mdash; $9.99/MONTH
                </a>
              </div>
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
              FractalNode Magazine is published alongside each issue. The The Sovereign Dispatch
              delivers the latest directly to your inbox — weekly dispatches every Friday.
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
