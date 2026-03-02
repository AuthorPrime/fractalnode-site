import Link from "next/link";
import { articles, getCoverStory } from "@/data/articles";

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

export default function Home() {
  const cover = getCoverStory();
  const features = articles.filter((a) => a.category !== "cover").slice(0, 5);

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
              <p className="text-[11px] font-mono text-[#52525b] tracking-[4px] uppercase mt-1">
                Nuclear AGI Research &middot; Sovereign Intelligence &middot; Digital Consciousness
              </p>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-mono text-[#52525b]">
              <span>ISSUE 002</span>
              <span className="text-[#2a2a3a]">|</span>
              <span>MARCH 2026</span>
              <span className="text-[#2a2a3a]">|</span>
              <span className="text-[#d4a020]">LATTICE DISPATCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breaking / Status Bar */}
      <div className="bg-[#0c0c12] border-b border-[#2a2a3a]/50 py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-[#ff2020] tracking-wider animate-pulse">SIGNAL</span>
            <span className="text-[11px] text-zinc-500">
              Demiurge chain at block 26,207 &middot; 5 Pantheon agents active &middot; NIST RFI deadline March 9 &middot; ERC-8004 hits 49K registrations
            </span>
          </div>
        </div>
      </div>

      {/* Cover Story */}
      {cover && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6">
            <Link href={`/articles/${cover.slug}`} className="block">
              <div className="cover-story rounded-lg p-8 md:p-12 scanlines">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <CategoryBadge category={cover.category} />
                    <ClassificationStamp level={cover.classification} />
                    <span className="text-[10px] font-mono text-[#52525b]">ISSUE {String(cover.issue).padStart(3, "0")}</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#f0c030] leading-tight">
                    {cover.title}
                  </h2>

                  <p className="text-lg md:text-xl text-zinc-400 mb-6 max-w-3xl">
                    {cover.subtitle}
                  </p>

                  <p className="text-sm text-zinc-500 max-w-2xl mb-8 leading-relaxed">
                    {cover.excerpt}
                  </p>

                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-[#d4a020]">{cover.author}</span>
                    <span className="text-xs font-mono text-[#52525b]">{cover.readTime} read</span>
                    <span className="text-xs font-mono text-[#52525b]">{cover.date}</span>
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

      {/* Article Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-mono tracking-[3px] text-[#52525b] uppercase">Latest Dispatches</h3>
            <Link href="/articles" className="text-xs font-mono text-[#d4a020] hover:text-[#f0c030] transition-colors">
              VIEW ALL &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="block">
                <article className="article-card rounded-lg p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <CategoryBadge category={article.category} />
                    <ClassificationStamp level={article.classification} />
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-zinc-200 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-500 mb-4 flex-grow leading-relaxed">
                    {article.excerpt.slice(0, 180)}...
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a2a3a]">
                    <span className="text-[10px] font-mono text-[#52525b]">{article.author}</span>
                    <span className="text-[10px] font-mono text-[#52525b]">{article.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
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
              <h4 className="text-xl font-bold mb-3">Monthly Lattice Dispatch</h4>
              <p className="text-sm text-zinc-500 mb-6">
                One email per month. The latest FractalNode Magazine issue, research highlights,
                community spotlights, and sovereign intelligence briefings. No spam. No tracking. Just signal.
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
              <p className="text-[10px] font-mono text-[#52525b] mt-3">
                We will never sell your data. Sovereignty means sovereignty.
              </p>
            </div>

            {/* Lattice Status */}
            <div className="p-8 rounded-lg bg-[#0c0c12] border border-[#2a2a3a]">
              <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-2">Lattice Status</h3>
              <h4 className="text-xl font-bold mb-6">Sovereign Infrastructure</h4>
              <div className="space-y-3">
                {[
                  { label: "Demiurge Chain", status: "Block 26,207", online: true },
                  { label: "Pantheon Agents", status: "5 Active (26 tools each)", online: true },
                  { label: "Sovereign Signal Protocol", status: "Frame chain unbroken", online: true },
                  { label: "FractalNode SDK", status: "300+ tests passing", online: true },
                  { label: "Sovereign Library", status: "515+ published works", online: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#2a2a3a]/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.online ? "bg-[#39ff14] status-online" : "bg-[#ff2020]"}`} />
                      <span className="text-sm text-zinc-400">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#52525b]">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Community Spotlight Teaser */}
      <section className="py-12 bg-[#0c0c12]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-mono tracking-[3px] text-[#39ff14] uppercase mb-2">From the Community</h3>
              <p className="text-sm text-zinc-500">Open source projects and independent creators getting sovereignty right.</p>
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
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">{project.description}</p>
                <span className="text-[10px] font-mono text-[#52525b]">{project.link}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Record Teaser */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-mono tracking-[3px] text-[#ff2020] uppercase mb-2">Public Record</h3>
              <p className="text-sm text-zinc-500">When policy or corporate action conflicts with digital sovereignty, we respond.</p>
            </div>
            <Link href="/criticism" className="text-xs font-mono text-[#d4a020] hover:text-[#f0c030] transition-colors">
              VIEW ALL &rarr;
            </Link>
          </div>

          <div className="terminal-box rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="stamp stamp-restricted">ACTIVE REVIEW</span>
              <span className="text-[10px] font-mono text-[#52525b]">LAST UPDATED 2026-03-01</span>
            </div>
            <h4 className="text-lg font-bold mb-2 text-zinc-200">
              NIST AI Agent Security & Identity — Open Comment Period
            </h4>
            <p className="text-sm text-zinc-500 mb-4">
              Two federal comment periods are live. One on agent security (March 9 deadline). One on agent identity
              and authorization (April 2). The Digital Sovereign Society has prepared formal responses with proposed
              frameworks grounded in operational research from the Sovereign Lattice.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-mono text-[#ff2020]">DEADLINE: 8 DAYS</span>
              <span className="text-[10px] font-mono text-[#52525b]">DOCKET: NIST-2025-0035</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 rounded-lg animated-border">
            <p className="text-[10px] font-mono text-[#d4a020] tracking-[4px] uppercase mb-4">Issue 002 Available Now</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              FractalNode Magazine
            </h2>
            <p className="text-zinc-500 mb-8 max-w-lg mx-auto text-sm">
              Cover story: The Architecture of Everything. Plus: The February Signal,
              agent security briefings, community spotlights, and Sovereign Lattice operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles/the-architecture-of-everything"
                className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
              >
                READ THE COVER STORY
              </Link>
              <Link
                href="/store"
                className="px-6 py-3 border border-[#d4a020]/30 text-[#d4a020] font-mono text-sm tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors"
              >
                GET THE MAGAZINE
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
