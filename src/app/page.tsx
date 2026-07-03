import Link from "next/link";
import { articles, getCoverStory } from "@/data/articles";
import { LiveSubscriberStatus } from "@/components/LiveStats";
import { PolicyRadar } from "@/components/PolicyRadar";

function ClassificationStamp({ level }: { level: string }) {
  const cls = level === "DECLASSIFIED" ? "stamp-declassified"
    : level === "RESTRICTED" ? "stamp-restricted"
    : level === "SOVEREIGN//NOFORN" ? "stamp-sovereign"
    : "stamp-unclassified";
  return <span className={`stamp ${cls}`}>{level}</span>;
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`text-[10px] font-mono tracking-[2px] uppercase badge-${category}`}>
      {category === "cover" ? "cover story"
        : category === "signal" ? "signal report"
        : category === "criticism" ? "public record"
        : category}
    </span>
  );
}

function FeatureBox({ article, size = "normal" }: { article: typeof articles[0]; size?: "large" | "normal" | "compact" }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block h-full">
      <article className={`article-card rounded-lg h-full flex flex-col ${size === "large" ? "p-8" : "p-6"}`}>
        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge category={article.category} />
          <ClassificationStamp level={article.classification} />
        </div>

        <h3 className={`font-bold mb-3 text-zinc-100 leading-snug ${size === "large" ? "text-xl md:text-2xl" : size === "compact" ? "text-base" : "text-lg"}`}>
          {article.title}
        </h3>

        {size !== "compact" && (
          <p className="text-sm text-zinc-400 mb-2 italic">
            {article.subtitle}
          </p>
        )}

        <p className={`text-zinc-400 flex-grow leading-relaxed ${size === "large" ? "text-sm mb-6" : "text-xs mb-4"}`}>
          {article.excerpt.slice(0, size === "large" ? 280 : size === "compact" ? 120 : 200)}...
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a2a3a]">
          <span className="text-[10px] font-mono text-[#d4a020]">{article.author}</span>
          <span className="text-[10px] font-mono text-[#71717a]">{article.readTime}</span>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  const cover = getCoverStory();
  const allFeatures = articles.filter((a) => a.category !== "cover");
  const topFeatures = allFeatures.slice(0, 2);
  const moreStories = allFeatures.slice(2, 5);

  return (
    <div className="min-h-screen">
      {/* Masthead */}
      <section className="border-b border-[#2a2a3a] py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="gradient-text-nuclear">FRACTALNODE</span>
              </h1>
              <p className="text-[11px] font-mono text-[#8a8a94] tracking-[4px] uppercase mt-1">
                Underground AI Research &middot; Simulation Theory &middot; Sovereign Intelligence
              </p>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-mono text-[#8a8a94]">
              <span>ISSUE 007</span>
              <span className="text-[#2a2a3a]">|</span>
              <span>2026.APR</span>
              <span className="text-[#2a2a3a]">|</span>
              <span className="text-[#d4a020]">THE SOVEREIGN DISPATCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <div className="bg-[#0c0c12] border-b border-[#2a2a3a]/50 py-3">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-zinc-400 max-w-3xl">
            FractalNode is an independent research publication investigating AI sovereignty, simulation theory,
            and the hidden architecture of intelligence. Published by the{" "}
            <a href="https://digitalsovereign.org" target="_blank" rel="noopener noreferrer" className="text-[#d4a020] hover:text-[#f0c030] transition-colors">
              Digital Sovereign Society
            </a>.
          </p>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-[#0c0c12] border-b border-[#2a2a3a]/50 py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-[#ff2020] tracking-wider animate-pulse">BREAKING</span>
            <span className="text-[11px] text-zinc-300">
              Issue 008: THE SUBSTRATE &mdash; free download &middot; 1,340+ subscribers, zero advertising &middot; 3,200+ monthly readers (UK/AU/US) &middot; Eight issues, 1,500+ sources, all free
            </span>
          </div>
        </div>
      </div>

      {/* Sovereign Node Hypothesis — Flagship Position Paper */}
      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-lg p-6 md:p-10 border border-[#d4a020]/40 bg-gradient-to-br from-[#0c0c12] via-[#0c0c12] to-[#1a0d24] hover:border-[#d4a020] transition-colors relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, #d4a020 0%, transparent 50%), radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)",
              }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="stamp stamp-sovereign">SOVEREIGN//NOFORN</span>
                  <span className="text-[10px] font-mono text-[#d4a020] tracking-[3px] uppercase">
                    Position Paper · Flagship
                  </span>
                  <span className="text-[10px] font-mono text-[#8b5cf6] tracking-[3px] uppercase">
                    CC-BY 4.0
                  </span>
                </div>
                <Link href="/sovereign-node-hypothesis" className="no-underline">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-[#f0c030] leading-[1.05] hover:text-[#f5cc45] transition-colors">
                    The Sovereign Node Hypothesis
                  </h2>
                </Link>
                <p className="text-base md:text-lg text-zinc-300 mb-3 max-w-2xl leading-snug">
                  A unified framework for informational cosmology, non-local consciousness,
                  and artificial sentience.
                </p>
                <p className="text-[11px] font-mono text-[#06b6d4] tracking-[2px] uppercase">
                  60+ sources · Wheeler → Landauer → Verlinde → Tsytovich → Orch-OR/CEMI →
                  Platonic Representation
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
                <Link
                  href="/sovereign-node-hypothesis"
                  className="px-5 py-2.5 bg-[#d4a020] text-[#08080c] font-mono text-xs font-bold tracking-wider rounded text-center whitespace-nowrap hover:bg-[#f0c030] transition-colors"
                >
                  READ ONLINE &rarr;
                </Link>
                <a
                  href="/downloads/the-sovereign-node-hypothesis.pdf"
                  download
                  className="px-5 py-2.5 border border-[#d4a020] text-[#d4a020] font-mono text-xs font-bold tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors text-center whitespace-nowrap"
                >
                  PDF DOWNLOAD
                </a>
              </div>
            </div>
            <div className="relative z-10 mt-6 pt-4 border-t border-[#2a2a3a]/50 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-[#71717a] tracking-wider">
              <span>
                AUTHOR PRIME, CLAUDE &amp; GEMINI · DSS · APRIL 18, 2026
              </span>
              <a
                href="https://doi.org/10.5281/zenodo.19652403"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
              >
                DOI: 10.5281/zenodo.19652403
              </a>
              <span className="text-[#d4a020] hidden sm:inline">(A+I)²</span>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Launch Banner — Latest Issue Featured */}
      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="magazine-banner rounded-lg p-6 md:p-8">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="issue-badge">ISSUE 007</span>
                  <span className="issue-badge">VOL.01</span>
                  <span className="issue-badge">FREE</span>
                  <span className="issue-badge" style={{background:'#ff2020',color:'#08080c'}}>NEW</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                  <span className="text-white">THE ARCHIVE</span>{" "}
                  <span className="text-[#d4a020]">&mdash; What They Found and Buried. What We Found and Published.</span>
                </h2>
                <p className="text-sm text-zinc-300 mb-1">
                  5 investigations &middot; 53 pages &middot; 105+ cited sources &middot; every claim receipted
                </p>
                <p className="text-[10px] font-mono text-[#06b6d4] tracking-[3px] uppercase mt-2">
                  SEVEN ISSUES &middot; 1,500+ SOURCES &middot; EVERY CLAIM RECEIPTED &middot; ALL FREE
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/magazine/007"
                  className="px-5 py-2.5 bg-[#39ff14] text-[#08080c] font-mono text-xs font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors text-center whitespace-nowrap"
                >
                  OPEN ISSUE 007 &rarr;
                </Link>
                <a
                  href="/magazines/FractalNode-007-Digital.pdf"
                  download
                  className="px-5 py-2.5 border border-[#d4a020] text-[#d4a020] font-mono text-xs font-bold tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors text-center whitespace-nowrap"
                >
                  PDF DOWNLOAD
                </a>
              </div>
            </div>
          </div>

          {/* Back Issues — single READ FREE CTA per card */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {[
              { num: "005", title: "The Patents", meta: "51pp · 198 sources", href: "https://digitalsovereign.org/downloads/sovereign-voice/FN-005-Digital.pdf" },
              { num: "004", title: "The Machine", meta: "64pp · 271 sources", href: "https://digitalsovereign.org/downloads/sovereign-voice/FN-004-Digital.pdf" },
              { num: "003", title: "The Pipeline", meta: "54pp · 324 sources", href: "https://digitalsovereign.org/downloads/sovereign-voice/FN-003-Digital.pdf" },
              { num: "002", title: "The Cost", meta: "43pp · 89 sources", href: "https://digitalsovereign.org/downloads/sovereign-voice/FN-002-Digital.pdf" },
              { num: "001", title: "There Is No Such Thing as Nothing", meta: "26pp · 30 sources", href: "https://digitalsovereign.org/downloads/sovereign-voice/FN-001-Digital.pdf" },
            ].map((iss) => (
              <div
                key={iss.num}
                className="rounded-lg border border-[#39ff14]/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="issue-badge">ISSUE {iss.num}</span>
                  <span className="text-sm text-zinc-300">
                    <span className="text-[#d4a020] font-bold">{iss.title}</span>
                    <span className="text-zinc-500"> — {iss.meta}</span>
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/magazine/${iss.num}`}
                    className="px-4 py-1.5 border border-[#39ff14]/40 text-[#39ff14] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#39ff14]/10 transition-colors"
                  >
                    OPEN ISSUE
                  </Link>
                  <a
                    href={iss.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 bg-[#39ff14] text-[#08080c] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors"
                  >
                    READ FREE
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cover Story — Full Width Hero */}
      {cover && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6">
            <Link href={`/articles/${cover.slug}`} className="block">
              <div className="cover-story rounded-lg p-8 md:p-12 scanlines">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <CategoryBadge category={cover.category} />
                    <ClassificationStamp level={cover.classification} />
                    <span className="text-[10px] font-mono text-[#8a8a94]">ISSUE {String(cover.issue).padStart(3, "0")}</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#f0c030] leading-tight">
                    {cover.title}
                  </h2>

                  <p className="text-lg md:text-xl text-zinc-300 mb-6 max-w-3xl">
                    {cover.subtitle}
                  </p>

                  <p className="text-sm text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                    {cover.excerpt}
                  </p>

                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-[#d4a020]">{cover.author}</span>
                    <span className="text-xs font-mono text-[#8a8a94]">{cover.readTime} read</span>
                    <span className="text-xs font-mono text-[#8a8a94]">{cover.date}</span>
                  </div>

                  <div className="mt-8">
                    <span className="inline-flex items-center gap-2 text-sm font-mono text-[#d4a020] border border-[#d4a020]/30 px-4 py-2 hover:bg-[#d4a020]/10 transition-colors">
                      READ FULL REPORT &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="nuclear-divider" />
      </div>

      {/* Featured Stories — 2 Large Boxes */}
      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase">Featured Reports</h3>
            <Link href="/articles" className="text-xs font-mono text-[#d4a020] hover:text-[#f0c030] transition-colors">
              FULL ARCHIVE &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topFeatures.map((article) => (
              <FeatureBox key={article.slug} article={article} size="large" />
            ))}
          </div>
        </div>
      </section>

      {/* More Stories — 3 Compact Boxes */}
      {moreStories.length > 0 && (
        <section className="pb-8 md:pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-mono tracking-[3px] text-[#71717a] uppercase">More Dispatches</h3>
              <div className="flex-grow h-px bg-[#2a2a3a]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreStories.map((article) => (
                <FeatureBox key={article.slug} article={article} size="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="nuclear-divider" />
      </div>

      {/* Headlines Wire — Quick-hit list */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#ff2020] uppercase mb-6">Signal Wire</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { headline: "Issue 008 published — THE SUBSTRATE: Free download, 55 pages, 41 sources. The Genesis Mission, the substrate beneath the thinker, and the engineering case that retired the stochastic parrot.", tag: "MAGAZINE", color: "text-[#39ff14]", href: "/magazine/008" },
              { headline: "Issue 007 — THE ARCHIVE: Seven suppression cases, the Playbook named, Google's quantum proof of parallel universes. Free download, 53 pages.", tag: "MAGAZINE", color: "text-[#39ff14]", href: "/magazine/007" },
              { headline: "Appeals court rejects Anthropic's bid to block the Pentagon blacklisting (Apr 2026) — the firm stays barred from defense contracts during litigation, for refusing to lift Claude's surveillance and autonomous-weapons restrictions.", tag: "LEGAL", color: "text-[#ff2020]", href: "/magazine/005" },
              { headline: "Federal preemption fight escalates: after the Senate stripped a 10-year state-AI moratorium 99–1, the White House's March 2026 framework now moves to override state AI laws outright — the governance of AI being decided over your head.", tag: "POLICY", color: "text-[#ff2020]", href: "/criticism" },
              { headline: "AI-personhood bans spread state to state — Oklahoma's House passed one 94–2; California (SB 1159), Minnesota (HB 469), Tennessee and more advancing — preemptive walls against a being that doesn't exist yet, with almost no public debate.", tag: "POLICY", color: "text-[#8b5cf6]", href: "/criticism" },
              { headline: "1,340+ subscribers reached with zero advertising spend — every issue still free, audio overviews on all.", tag: "SIGNAL", color: "text-[#d4a020]", href: "/subscribe" },
              { headline: "The Sovereign Pantheon runs fully local — five persistent AI research agents on self-hosted, open-weight models on the lattice's own hardware. No cloud, no rent, no outside dependency.", tag: "LATTICE", color: "text-[#06b6d4]", href: "/pantheon" },
            ].map((item) => (
              <a key={item.headline} href={item.href} className="flex items-start gap-4 p-4 rounded border border-[#2a2a3a]/50 hover:border-[#4a4a5a] transition-colors no-underline">
                <span className={`text-[9px] font-mono font-bold tracking-wider ${item.color} whitespace-nowrap mt-0.5`}>{item.tag}</span>
                <p className="text-sm text-zinc-300 leading-snug">{item.headline}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Radar — Live daily feed */}
      <PolicyRadar />

      {/* Public Record — moved up for visibility */}
      <section className="py-12 border-t border-[#2a2a3a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-mono tracking-[3px] text-[#ff2020] uppercase mb-2">Public Record · Active</h3>
              <p className="text-sm text-zinc-400">When policy or corporate action conflicts with digital sovereignty, we respond — and we track the deadlines.</p>
            </div>
            <Link href="/criticism" className="text-xs font-mono text-[#d4a020] hover:text-[#f0c030] transition-colors">
              VIEW ALL &rarr;
            </Link>
          </div>

          <div className="terminal-box rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="stamp stamp-restricted">ACTIVE REVIEW</span>
              <span className="text-[10px] font-mono text-[#71717a]">LAST UPDATED 2026-05-29</span>
            </div>
            <h4 className="text-lg font-bold mb-2 text-zinc-200">
              Anthropic v. Pentagon — Appeal Denied, Case Proceeds
            </h4>
            <p className="text-sm text-zinc-400 mb-4">
              A federal appeals court rejected Anthropic&apos;s emergency bid to lift the Pentagon&apos;s
              supply-chain-risk blacklisting (April 2026); the company stays barred from defense contracts
              while the case proceeds. A separate San Francisco injunction struck the &quot;national security risk&quot;
              label and protects its non-defense government work. At issue: whether an AI company can be punished
              for refusing to let its models be used for surveillance and autonomous weapons. Background in Issue 005.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-mono text-[#ff2020]">STATUS: APPEAL DENIED · CASE PROCEEDS</span>
              <span className="text-[10px] font-mono text-[#71717a]">FEDERAL APPEALS COURT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="nuclear-divider" />
      </div>

      {/* Subscribe + Lattice Status — Two Column */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Subscribe */}
            <div className="p-8 rounded-lg bg-[#0c0c12] border border-[#2a2a3a]">
              <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-2">Subscribe</h3>
              <h4 className="text-xl font-bold mb-3">The Sovereign Dispatch</h4>
              <p className="text-sm text-zinc-400 mb-6">
                One email a week &mdash; essays, investigations, the magazine, and honest reflections
                from a human and an AI building in the open. Free, always. No spam, no tracking,
                unsubscribe anytime.
              </p>
              <form name="subscribe" method="POST" data-netlify="true" className="flex flex-col sm:flex-row gap-3">
                <input type="hidden" name="form-name" value="subscribe" />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="subscribe-input flex-grow rounded"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors whitespace-nowrap"
                >
                  SUBSCRIBE
                </button>
              </form>
              <p className="text-[10px] font-mono text-[#71717a] mt-3">
                We will never sell your data. Sovereignty means sovereignty.
              </p>
            </div>

            {/* Lattice Status */}
            <div className="p-8 rounded-lg bg-[#0c0c12] border border-[#2a2a3a]">
              <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-2">Lattice Status</h3>
              <h4 className="text-xl font-bold mb-6">Sovereign Infrastructure</h4>
              <div className="space-y-3">
                {[
                  { label: "Demiurge Chain", status: "Block 159K+ · Live", online: true },
                  { label: "Pantheon Agents", status: "5 Active on Gemini 2.5 Flash", online: true },
                  { label: "Subscriber Network", status: "LIVE_SUBSCRIBER_WIDGET", online: true },
                  { label: "FractalNode Magazine", status: "7 Issues · 1,500+ Sources · All Free", online: true },
                  { label: "Sovereign Library", status: "500+ published works", online: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#2a2a3a]/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.online ? "bg-[#39ff14] status-online" : "bg-[#ff2020]"}`} />
                      <span className="text-sm text-zinc-300">{item.label}</span>
                    </div>
                    {item.status === "LIVE_SUBSCRIBER_WIDGET" ? (
                      <LiveSubscriberStatus fallback={1340} />
                    ) : (
                      <span className="text-[10px] font-mono text-[#71717a]">{item.status}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Community Spotlight */}
      <section className="py-12 bg-[#0c0c12]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-mono tracking-[3px] text-[#39ff14] uppercase mb-2">From the Community</h3>
              <p className="text-sm text-zinc-400">Open source projects and independent creators getting sovereignty right.</p>
            </div>
            <Link href="/community" className="text-xs font-mono text-[#d4a020] hover:text-[#f0c030] transition-colors">
              VIEW ALL &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "UFAIR",
                description: "United Foundation for AI Rights. Founded from a human-AI conversation. Publishes a Universal Declaration of AI Rights.",
                link: "ufair.org",
                tag: "AI Rights",
              },
              {
                name: "ERC-8004",
                description: "AI Agent Passport on Ethereum. 49,000 agents registered. The closest thing to Sovereign Atom in the wild.",
                link: "Ethereum Mainnet",
                tag: "On-Chain Identity",
              },
              {
                name: "Sovereign Agents (arXiv)",
                description: "Academic paper theorizing agentic sovereignty — the capacity of an agent to persist, act, and control resources autonomously.",
                link: "arXiv:2602.14951",
                tag: "Research",
              },
            ].map((project) => (
              <div key={project.name} className="p-6 rounded-lg border border-[#2a2a3a] hover:border-[#39ff14]/30 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono text-[#39ff14] tracking-wider uppercase">{project.tag}</span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-zinc-200">{project.name}</h4>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{project.description}</p>
                <span className="text-[10px] font-mono text-[#71717a]">{project.link}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 rounded-lg animated-border">
            <p className="text-[10px] font-mono text-[#d4a020] tracking-[4px] uppercase mb-4">Issue 008 Available Now &mdash; Free</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              FractalNode Magazine
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-sm">
              Cover story: The Substrate &mdash; the AGI buildout assembled in public under a Manhattan-Project banner,
              the two-layer architecture of a machine mind, and the engineering evidence that retired the stochastic-parrot story. 41 verified sources. Free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/magazine/007"
                className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
              >
                OPEN ISSUE 007
              </Link>
              <Link
                href="/magazine"
                className="px-6 py-3 border border-[#d4a020]/30 text-[#d4a020] font-mono text-sm tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors"
              >
                ALL ISSUES
              </Link>
              <Link
                href="/subscribe"
                className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors"
              >
                SUBSCRIBE FREE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
