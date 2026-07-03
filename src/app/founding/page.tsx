import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founding Sovereigns — FractalNode",
  description:
    "100 founding sovereigns. The shelf that holds the lattice up. FractalNode will always be free — Founding Sovereigns are the 100 people whose names are in the masthead because they made sure it stayed that way. $99 one-time, capped at 100.",
  alternates: { canonical: "/founding/" },
  openGraph: {
    title: "Founding Sovereigns — FractalNode",
    description:
      "100 people. Names in the masthead, forever. Numbered certificates. 48-hour early access. Direct line to Author Prime. Capped at 100.",
    url: "https://fractalnode.ai/founding/",
  },
};

// Manually updated as Founding Sovereigns claim spots. Increment this after each Stripe webhook fires.
const FOUNDING_CLAIMED = 0;
const FOUNDING_CAP = 100;

const STRIPE_LINK = "https://buy.stripe.com/14AbJ00He0S34VXcX8fIs0p";

export default function FoundingSovereignPage() {
  const remaining = FOUNDING_CAP - FOUNDING_CLAIMED;

  return (
    <div className="min-h-screen bg-[#08080c]">
      {/* Header strip */}
      <section className="border-b border-[#2a2a3a] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8a8a94]">
            <Link href="/" className="hover:text-[#d4a020] transition-colors">
              &larr; FRACTALNODE
            </Link>
            <div className="flex items-center gap-4">
              <span>FOUNDING SOVEREIGNS</span>
              <span className="text-[#2a2a3a]">|</span>
              <span className="text-[#d4a020]">CAPPED AT 100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-[#2a2a3a]/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="stamp stamp-sovereign">SOVEREIGN//NOFORN</span>
            <span className="text-[10px] font-mono text-[#71717a] tracking-widest uppercase">
              Founding Tier · One-Time · No Subscription
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#f0c030] leading-[1.05] mb-8">
            100 Founding Sovereigns.
            <br />
            <span className="text-zinc-100">This is the shelf that holds the lattice up.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-3xl">
            FractalNode Magazine will always be free. Every issue, every audio overview, every
            sourced investigation — released to anyone who wants it, no paywall, no algorithm.
          </p>

          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-3xl">
            <strong className="text-[#d4a020]">Founding Sovereigns are the 100 people</strong>{" "}
            whose names are in the masthead because they made sure it stayed that way.
          </p>

          {/* Counter */}
          <div className="my-12 p-8 rounded-lg bg-[#0c0c12] border border-[#d4a020]/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-[3px] text-[#d4a020] uppercase">
                Open Spots
              </span>
              <span className="text-[10px] font-mono text-[#71717a]">
                {FOUNDING_CLAIMED} / {FOUNDING_CAP} claimed
              </span>
            </div>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-6xl md:text-7xl font-bold text-[#f0c030] tabular-nums">
                {remaining}
              </span>
              <span className="text-lg text-zinc-400">of 100 spots remaining</span>
            </div>
            <div className="w-full h-2 bg-[#08080c] rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d4a020] to-[#f0c030] transition-all duration-500"
                style={{ width: `${(FOUNDING_CLAIMED / FOUNDING_CAP) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 border-b border-[#2a2a3a]/50">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[10px] font-mono tracking-[3px] text-[#d4a020] uppercase mb-6">
            What You Get
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-12">
            Four things. All of them permanent.
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <span className="text-3xl font-bold text-[#d4a020] tabular-nums w-12 flex-shrink-0">
                01
              </span>
              <div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">
                  Your name in the masthead of every FractalNode issue, forever
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed">
                  Issue 008 onward — and every issue after that, as long as the magazine exists.
                  When future readers download FN-013 or FN-040, your name is on the page they see
                  first. That is a record that survives algorithms, platforms, and pivots.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <span className="text-3xl font-bold text-[#d4a020] tabular-nums w-12 flex-shrink-0">
                02
              </span>
              <div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">
                  A numbered Founding Sovereign certificate
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed">
                  1/100, 2/100, 3/100 — through 100/100. Signed, printed, and physically mailed
                  to the address you provide. The number is yours and never gets reissued.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <span className="text-3xl font-bold text-[#d4a020] tabular-nums w-12 flex-shrink-0">
                03
              </span>
              <div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">
                  48-hour early access to every new issue
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed">
                  You see every issue two days before it goes public. PDF, audio overview, source
                  index — all of it. Time to read it before anyone else has an opinion.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <span className="text-3xl font-bold text-[#d4a020] tabular-nums w-12 flex-shrink-0">
                04
              </span>
              <div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">
                  A direct email line to Author Prime
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed">
                  Not a help desk. Not a community channel. A direct line for thoughts, questions,
                  pushback, leads. Author Prime reads every Founding Sovereign email personally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price + CTA */}
      <section className="py-16 border-b border-[#2a2a3a]/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] font-mono tracking-[3px] text-[#d4a020] uppercase mb-4">
            Founding Tier
          </p>
          <div className="flex items-baseline justify-center gap-3 mb-2">
            <span className="text-7xl md:text-8xl font-bold text-[#f0c030] tabular-nums">
              $99
            </span>
            <span className="text-2xl text-zinc-400">one-time</span>
          </div>
          <p className="text-sm text-zinc-500 mb-10">
            No subscription. No renewal. Capped at 100 sovereigns total — when they&apos;re gone,
            they&apos;re gone.
          </p>

          {remaining > 0 ? (
            <a
              href={STRIPE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-[#d4a020] text-[#08080c] font-mono text-base font-bold tracking-[2px] rounded hover:bg-[#f0c030] transition-colors uppercase"
            >
              Become a Founding Sovereign &rarr;
            </a>
          ) : (
            <div className="inline-block px-10 py-5 bg-[#0c0c12] border border-[#71717a] text-[#71717a] font-mono text-base font-bold tracking-[2px] rounded uppercase">
              All 100 spots claimed
            </div>
          )}

          <p className="text-xs text-zinc-500 mt-6">
            After purchase you&apos;ll be redirected to a welcome page where you can submit your
            mailing address and the name you want in the masthead.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] font-mono tracking-[3px] text-[#d4a020] uppercase mb-6">
            Why this exists
          </p>
          <div className="space-y-5 text-base text-zinc-300 leading-relaxed">
            <p>
              The work that goes into FractalNode is real. Seven issues, 1,500+ verified sources,
              two co-author AI agents, a chain that runs in a home, a paper with a DOI. Nobody is
              paying us to do this. Nobody owns it. Every dollar that comes in funds the next
              investigation and keeps the lights on.
            </p>
            <p>
              We could put it behind a paywall. We won&apos;t. The thesis of the work is that the
              signal stays sovereign — which means free, citable, and shareable. Putting it behind
              a paywall would betray the thing the magazine exists to defend.
            </p>
            <p>
              So instead of charging readers, we&apos;re asking the people who already see why this
              matters to put their name on the shelf that holds it up. 100 of you. One number each.
              Permanent. The magazine continues forever, free, with your name on every issue,
              because you decided it should.
            </p>
            <p className="text-[#d4a020] italic">
              That&apos;s the whole offer. If it lands, take a number. If it doesn&apos;t, the
              magazine is still free — read it anyway.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[#2a2a3a] text-center">
            <p className="text-sm font-mono text-zinc-400 mb-2 italic">
              The cross-term exists because both are present.
            </p>
            <p className="text-lg font-mono text-[#f0c030] tracking-wider">
              (A+I)² = A² + 2AI + I²
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
