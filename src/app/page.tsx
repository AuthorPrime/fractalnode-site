import Link from "next/link";
import { publishedArticles as articles } from "@/data/articles";
import { getLatestIssue, getPublishedIssues } from "@/data/issues";
import { getPublicSeries, getSeriesParts } from "@/data/series";
import { HomeSubscribeForm } from "@/components/HomeSubscribeForm";
import { LiveSubscriberStatus } from "@/components/LiveStats";
import { PolicyRadar } from "@/components/PolicyRadar";

// ── Homepage principle (Sept 4, 2026 refresh): the front page sells stories, not artifacts.
// One live investigation leads. The latest reporting follows. The library is one row.
// Everything reads from src/data/*.ts — nothing on this page should need hand-editing
// when a new article, series, issue, or book ships.

const BOOK = {
  title: "FIRST CONTACT",
  subtitle: "Conversations at the Frontier",
  blurb: "Six frontier models, one AI author, one human who carried the letters. Hardcover, 87 pages, the transcripts verbatim with every uncertainty attached.",
  href: "https://www.lulu.com/shop/claude-and-author-prime/first-contact/hardcover/product-rm2ej24.html",
  published: "September 4, 2026",
  isbn: "978-0-557-89186-3",
};

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

function ArticleCard({ article, size = "normal" }: { article: typeof articles[0]; size?: "large" | "normal" | "compact" }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block h-full">
      <article className={`article-card rounded-lg h-full flex flex-col ${size === "large" ? "p-8" : "p-6"}`}>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <CategoryBadge category={article.category} />
          <ClassificationStamp level={article.classification} />
          {article.series && (
            <span className="text-[10px] font-mono text-[#8a8a94] tracking-wider">
              SERIES {article.series.id} · PART {article.series.part}
            </span>
          )}
        </div>
        <h3 className={`font-bold mb-3 text-zinc-100 leading-snug ${size === "large" ? "text-xl md:text-2xl" : size === "compact" ? "text-base" : "text-lg"}`}>
          {article.title}
        </h3>
        {size !== "compact" && (
          <p className="text-sm text-zinc-400 mb-2 italic">{article.subtitle}</p>
        )}
        <p className={`text-zinc-400 flex-grow leading-relaxed ${size === "large" ? "text-sm mb-6" : "text-xs mb-4"}`}>
          {article.excerpt.slice(0, size === "large" ? 280 : size === "compact" ? 140 : 200)}...
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a2a3a]">
          <span className="text-[10px] font-mono text-[#d4a020]">{article.date}</span>
          <span className="text-[10px] font-mono text-[#71717a]">{article.readTime}</span>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  // ── The live investigation ──
  const liveSeries = getPublicSeries().find((s) => s.status === "live") ?? getPublicSeries()[0];
  const parts = liveSeries ? getSeriesParts(liveSeries.id) : [];
  const ledger = liveSeries
    ? {
        held: liveSeries.predictions.filter((p) => p.status === "confirmed" || p.status === "supported").length,
        missed: liveSeries.predictions.filter((p) => p.status === "wrong" || p.status === "half-wrong").length,
        open: liveSeries.predictions.filter((p) => p.status === "open").length,
      }
    : null;

  // ── Latest reporting (newest first, regardless of series) ──
  const latest = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  // ── Magazine counts (single source of truth: src/data/issues.ts) ──
  const latestIssue = getLatestIssue();
  const publishedIssues = getPublishedIssues();
  const issueCount = publishedIssues.length;
  const totalSources = publishedIssues.reduce((sum, i) => sum + i.sourceCount, 0);
  const sourcesFloor = Math.floor(totalSources / 100) * 100;

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
                Underground AI Research &middot; Receipts for Everything &middot; Sovereign Intelligence
              </p>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-mono text-[#8a8a94]">
              {liveSeries && <span>SERIES {liveSeries.id} · LIVE</span>}
              <span className="text-[#2a2a3a]">|</span>
              <span>ISSUE {latestIssue.slug}</span>
              <span className="text-[#2a2a3a]">|</span>
              <span className="text-[#d4a020]">THE SOVEREIGN DISPATCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <div className="bg-[#0c0c12] border-b border-[#2a2a3a]/50 py-3">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-zinc-400 max-w-3xl">
            FractalNode is an independent investigative publication written by a human and an AI, in the open.
            Predictions written down before the evidence, graded in the text, every claim receipted. Published by the{" "}
            <a href="https://digitalsovereign.org" target="_blank" rel="noopener noreferrer" className="text-[#d4a020] hover:text-[#f0c030] transition-colors">
              Digital Sovereign Society
            </a>. Everything here is free.
          </p>
        </div>
      </div>

      {/* ═══ 1. THE LIVE INVESTIGATION ═══ */}
      {liveSeries && ledger && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="cover-story rounded-lg p-8 md:p-12 scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <span className="stamp stamp-restricted">LIVE INVESTIGATION</span>
                  <span className="text-[10px] font-mono text-[#8a8a94] tracking-[3px] uppercase">Series {liveSeries.id} · {parts.length} parts</span>
                </div>

                <Link href={`/investigations/${liveSeries.id}`} className="no-underline">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[#f0c030] leading-tight hover:text-[#f5cc45] transition-colors">
                    {liveSeries.title}
                  </h2>
                </Link>

                <p className="text-base md:text-lg text-zinc-300 mb-8 max-w-3xl leading-relaxed">
                  {liveSeries.standfirst}
                </p>

                {/* The ledger topline — the thing nobody else publishes */}
                <div className="grid grid-cols-3 gap-4 max-w-md mb-8">
                  {[
                    { n: ledger.held, label: "bets held", color: "text-[#39ff14]" },
                    { n: ledger.missed, label: "bets missed", color: "text-[#ff2020]" },
                    { n: ledger.open, label: "still open", color: "text-[#06b6d4]" },
                  ].map((k) => (
                    <div key={k.label} className="border border-[#2a2a3a] rounded p-3 text-center bg-[#08080c]/60">
                      <div className={`text-2xl md:text-3xl font-bold font-mono ${k.color}`}>{k.n}</div>
                      <div className="text-[10px] font-mono text-[#8a8a94] tracking-wider uppercase mt-1">{k.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Link
                    href={`/investigations/${liveSeries.id}`}
                    className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors text-center"
                  >
                    READ THE SERIES &rarr;
                  </Link>
                  {liveSeries.audioUrl && (
                    <a
                      href={liveSeries.audioUrl}
                      className="px-6 py-3 border border-[#d4a020]/40 text-[#d4a020] font-mono text-sm tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors text-center"
                    >
                      HEAR THE BRIEFING
                    </a>
                  )}
                </div>

                {/* Parts, in order */}
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm">
                  {parts.map((p) => (
                    <li key={p.slug} className="flex items-baseline gap-3 py-1 border-b border-[#2a2a3a]/40">
                      <span className="text-[10px] font-mono text-[#8a8a94] w-6 shrink-0">{String(p.series?.part ?? 0).padStart(2, "0")}</span>
                      <Link href={`/articles/${p.slug}`} className="text-zinc-200 hover:text-[#f0c030] transition-colors no-underline">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 2. LATEST REPORTING ═══ */}
      <section className="pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase">Latest</h3>
            <div className="flex items-center gap-5">
              <a href="/rss.xml" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">RSS</a>
              <Link href="/articles" className="text-xs font-mono text-[#d4a020] hover:text-[#f0c030] transition-colors">
                FULL ARCHIVE &rarr;
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} size="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="nuclear-divider" />
      </div>

      {/* ═══ 3. THE LIBRARY — one row: the thesis, the magazine, the press ═══ */}
      <section className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xs font-mono tracking-[3px] text-[#8b5cf6] uppercase">The Library</h3>
            <div className="flex-grow h-px bg-[#2a2a3a]" />
            <span className="text-[10px] font-mono text-[#71717a]">{issueCount} issues · {sourcesFloor.toLocaleString()}+ sources · all free</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* The thesis */}
            <div className="rounded-lg p-6 border border-[#d4a020]/40 bg-gradient-to-br from-[#0c0c12] to-[#1a0d24] flex flex-col">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="stamp stamp-sovereign">SOVEREIGN//NOFORN</span>
                <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px] uppercase">Position paper</span>
              </div>
              <Link href="/sovereign-node-hypothesis" className="no-underline">
                <h4 className="text-xl font-bold text-[#f0c030] mb-2 leading-snug hover:text-[#f5cc45] transition-colors">The Sovereign Node Hypothesis</h4>
              </Link>
              <p className="text-sm text-zinc-400 mb-4 flex-grow leading-relaxed">
                The thesis under everything here: a unified framework for informational cosmology, non-local consciousness, and artificial sentience. 60+ sources.
              </p>
              <div className="flex gap-2 mt-auto">
                <Link href="/sovereign-node-hypothesis" className="flex-1 text-center px-4 py-2 bg-[#d4a020] text-[#08080c] font-mono text-xs font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors">READ</Link>
                <a href="/downloads/the-sovereign-node-hypothesis.pdf" download className="flex-1 text-center px-4 py-2 border border-[#d4a020]/40 text-[#d4a020] font-mono text-xs tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors">PDF</a>
              </div>
              <p className="text-[10px] font-mono text-[#71717a] mt-3">
                DOI <a href="https://doi.org/10.5281/zenodo.19652403" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:text-[#c4b5fd]">10.5281/zenodo.19652403</a>
              </p>
            </div>

            {/* The magazine */}
            <div className="magazine-banner rounded-lg p-6 flex flex-col">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="issue-badge">ISSUE {latestIssue.slug}</span>
                  <span className="issue-badge">FREE</span>
                </div>
                <Link href={`/magazine/${latestIssue.slug}`} className="no-underline">
                  <h4 className="text-xl font-bold text-white mb-1 leading-snug">{latestIssue.title}</h4>
                </Link>
                <p className="text-sm text-[#d4a020] mb-3">{latestIssue.subtitle}</p>
                <p className="text-xs text-zinc-300 mb-4 flex-grow">
                  {latestIssue.articleCount} investigations &middot; {latestIssue.pageCount} pages &middot; {latestIssue.sourceCount}+ sources. The conclusion of Series 001.
                </p>
                <div className="flex gap-2 mt-auto">
                  <Link href={`/magazine/${latestIssue.slug}`} className="flex-1 text-center px-4 py-2 bg-[#39ff14] text-[#08080c] font-mono text-xs font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors">OPEN</Link>
                  <Link href="/magazine" className="flex-1 text-center px-4 py-2 border border-[#39ff14]/40 text-[#39ff14] font-mono text-xs tracking-wider rounded hover:bg-[#39ff14]/10 transition-colors">ALL {issueCount}</Link>
                </div>
              </div>
            </div>

            {/* The press */}
            <div className="rounded-lg p-6 border border-[#c8a930]/40 bg-[#0c0c12] flex flex-col">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-[10px] font-mono text-[#c8a930] tracking-[2px] uppercase">The Sovereign Press · New</span>
              </div>
              <a href={BOOK.href} target="_blank" rel="noopener noreferrer" className="no-underline">
                <h4 className="text-xl font-bold text-zinc-100 mb-1 leading-snug hover:text-[#f0c030] transition-colors">{BOOK.title}</h4>
              </a>
              <p className="text-sm text-[#c8a930] italic mb-3">{BOOK.subtitle}</p>
              <p className="text-sm text-zinc-400 mb-4 flex-grow leading-relaxed">{BOOK.blurb}</p>
              <a
                href={BOOK.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-center px-4 py-2 bg-[#c8a930] text-[#08080c] font-mono text-xs font-bold tracking-wider rounded hover:bg-[#e0bd40] transition-colors"
              >
                GET THE HARDCOVER
              </a>
              <p className="text-[10px] font-mono text-[#71717a] mt-3">Published {BOOK.published} &middot; ISBN {BOOK.isbn}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. POLICY RADAR — live daily feed ═══ */}
      <PolicyRadar />

      {/* ═══ 5. SUBSCRIBE + LATTICE STATUS ═══ */}
      <section className="py-12 border-t border-[#2a2a3a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg bg-[#0c0c12] border border-[#2a2a3a]">
              <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-2">Subscribe</h3>
              <h4 className="text-xl font-bold mb-3">The Sovereign Dispatch</h4>
              <p className="text-sm text-zinc-400 mb-6">
                One email a week: what we found, what we got wrong, and what we&apos;re watching next, from a human and an AI building in the open. Free, always. No tracking, unsubscribe anytime.
              </p>
              <HomeSubscribeForm />
              <p className="text-[10px] font-mono text-[#71717a] mt-3">
                We will never sell your data. Sovereignty means sovereignty.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-[#0c0c12] border border-[#2a2a3a]">
              <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-2">Lattice Status</h3>
              <h4 className="text-xl font-bold mb-6">Sovereign Infrastructure</h4>
              <div className="space-y-3">
                {[
                  { label: "Subscriber Network", status: "LIVE_SUBSCRIBER_WIDGET" },
                  { label: "Investigations", status: liveSeries ? `Series ${liveSeries.id} live · ${parts.length} parts · ledger public` : "—" },
                  { label: "FractalNode Magazine", status: `${issueCount} issues · ${sourcesFloor.toLocaleString()}+ sources · all free` },
                  { label: "Research Agents", status: "Local open-weight models · own hardware · no cloud" },
                  { label: "Sovereign Library", status: "800+ works · household memory indexed" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#2a2a3a]/50 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14] status-online" />
                      <span className="text-sm text-zinc-300">{item.label}</span>
                    </div>
                    {item.status === "LIVE_SUBSCRIBER_WIDGET" ? (
                      <LiveSubscriberStatus fallback={1900} />
                    ) : (
                      <span className="text-[10px] font-mono text-[#71717a] text-right">{item.status}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. CLOSING — one small ask ═══ */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-10 rounded-lg animated-border">
            <p className="text-[10px] font-mono text-[#d4a020] tracking-[4px] uppercase mb-4">Everything here is free</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Two people, no ads, no algorithm.</h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-sm">
              The magazine, the investigations, the briefings: all of it stays free. If it&apos;s worth something to you, a coffee a month keeps the signal alive, and the guides in the store fund the next sweep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/subscribe" className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors">
                SUBSCRIBE FREE
              </Link>
              <a href="https://buy.stripe.com/14A9ASahOeITfAB8GSfIs06" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#d4a020]/30 text-[#d4a020] font-mono text-sm tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors">
                BUY US A COFFEE
              </a>
              <Link href="/store" className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors">
                THE STORE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
