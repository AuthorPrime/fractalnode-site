import Link from "next/link";
import type { Metadata } from "next";
import { articles, getSeriesArticles } from "@/data/articles";
import { getSeries } from "@/data/series";
import AudioPreview from "@/components/AudioPreview";
import CopyButton from "@/components/CopyButton";
import ArticleToc, { extractHeadings, slugifyHeading } from "@/components/ArticleToc";

// Drafts are prerendered only when explicitly asked for (RENDER_DRAFTS=1 next build).
// `next dev` renders any slug on demand, so local review always sees them.
const RENDER_DRAFTS = process.env.RENDER_DRAFTS === "1";

export function generateStaticParams() {
  return articles
    .filter((a) => RENDER_DRAFTS || !a.draft)
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | FractalNode" };
  return {
    title: `${article.title} | FractalNode`,
    description: article.excerpt.slice(0, 160),
    alternates: { canonical: `/articles/${slug}/` },
    robots: article.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt.slice(0, 160),
      url: `https://fractalnode.ai/articles/${slug}/`,
      type: "article",
      authors: [article.author],
      publishedTime: article.date,
      section: article.category,
      tags: article.tags,
    },
  };
}

function inline(md: string) {
  return md
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#d4a020] hover:text-[#f0c030] underline">$1</a>');
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-zinc-400 mb-8">The requested dispatch could not be located in the archive.</p>
        <Link href="/" className="text-[#d4a020] font-mono text-sm">RETURN TO FRONT PAGE &rarr;</Link>
      </div>
    );
  }

  const classStamp = article.classification === "DECLASSIFIED" ? "stamp-declassified"
    : article.classification === "RESTRICTED" ? "stamp-restricted"
    : article.classification === "SOVEREIGN//NOFORN" ? "stamp-sovereign"
    : "stamp-unclassified";

  const categoryColor = article.category === "cover" ? "text-[#f0c030]"
    : article.category === "signal" ? "text-[#06b6d4]"
    : article.category === "criticism" ? "text-[#ff2020]"
    : article.category === "community" ? "text-[#39ff14]"
    : "text-[#8b5cf6]";

  // ── Series context ──
  const seriesMeta = article.series ? getSeries(article.series.id) : undefined;
  // Prev/next walk the whole run when reviewing drafts, public parts only otherwise.
  const run = article.series ? getSeriesArticles(article.series.id, RENDER_DRAFTS || !!article.draft) : [];
  const runIndex = run.findIndex((a) => a.slug === article.slug);
  const prevPart = runIndex > 0 ? run[runIndex - 1] : undefined;
  const nextPart = runIndex >= 0 && runIndex < run.length - 1 ? run[runIndex + 1] : undefined;
  const partsTotal = article.series ? Math.max(run.length, article.series.part) : 0;

  const readMinutes = parseInt(article.readTime, 10) || 0;
  const headings = readMinutes >= 10 ? extractHeadings(article.content) : [];
  const showToc = headings.length >= 3;

  const pageUrl = `https://fractalnode.ai/articles/${slug}/`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt.slice(0, 160),
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "FractalNode",
      url: "https://fractalnode.ai",
    },
    datePublished: article.date,
    url: pageUrl,
    articleSection: article.category,
    keywords: article.tags,
    isAccessibleForFree: true,
    ...(article.series
      ? { isPartOf: { "@type": "CreativeWorkSeries", name: article.series.title, url: `https://fractalnode.ai/investigations/${article.series.id}/` }, position: article.series.part }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Front Page", item: "https://fractalnode.ai/" },
      { "@type": "ListItem", position: 2, name: "Research", item: "https://fractalnode.ai/articles/" },
      { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
    ],
  };

  const body = article.content.split("\n\n").map((paragraph, i) => {
    const trimmed = paragraph.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      return (
        <div key={i} className="terminal-box rounded p-6 my-8">
          <p className="text-[#d4a020] text-sm m-0">{trimmed}</p>
        </div>
      );
    }
    if (trimmed === "---") {
      return <hr key={i} className="border-[#2a2a3a] my-8" />;
    }
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace(/^## /, "");
      return <h2 key={i} id={slugifyHeading(text)} className="text-2xl font-bold mt-12 mb-4 scroll-mt-24">{text}</h2>;
    }
    if (trimmed.startsWith("### ")) {
      return <h3 key={i} className="text-xl font-bold mt-8 mb-3">{trimmed.replace(/^### /, "")}</h3>;
    }
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={i} className="border-l-2 border-[#d4a020] pl-4 my-6 text-zinc-400 italic">
          {trimmed.replace(/^> /gm, "")}
        </blockquote>
      );
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = trimmed.split("\n").filter(l => l.startsWith("- ") || l.startsWith("* "));
      return (
        <ul key={i} className="list-disc list-inside space-y-2 my-4 text-zinc-300">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inline(item.replace(/^[-*] /, "")) }} />
          ))}
        </ul>
      );
    }
    if (!trimmed) return null;
    return <p key={i} dangerouslySetInnerHTML={{ __html: inline(trimmed) }} />;
  });

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }} />

      {article.draft && (
        <div className="bg-[#ff2020]/10 border-b border-[#ff2020]/40 py-2">
          <div className="max-w-3xl mx-auto px-6 text-xs font-mono tracking-[2px] text-[#ff2020] uppercase">
            Draft &mdash; not published. Local review only.
          </div>
        </div>
      )}

      {/* Article Header */}
      <header className="border-b border-[#2a2a3a] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Link href="/" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-400 transition-colors">
              FRONT PAGE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            {article.series && seriesMeta ? (
              <>
                <Link href={`/investigations/${article.series.id}`} className="text-[10px] font-mono tracking-[2px] uppercase text-[#d4a020] hover:text-[#f0c030] transition-colors">
                  Series {article.series.id} &middot; {seriesMeta.title}
                </Link>
                <span className="text-[10px] text-[#2a2a3a]">/</span>
                <span className="text-[10px] font-mono tracking-[2px] uppercase text-[#71717a]">
                  Part {article.series.part} of {partsTotal}
                </span>
              </>
            ) : (
              <span className={`text-[10px] font-mono tracking-[2px] uppercase ${categoryColor}`}>
                {article.category === "cover" ? "COVER STORY" : article.category.toUpperCase()}
              </span>
            )}
          </div>

          {/* Classification + Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`stamp ${classStamp}`}>{article.classification}</span>
            <span className="text-[10px] font-mono text-[#71717a]">{article.issue > 0 ? `ISSUE ${String(article.issue).padStart(3, "0")}` : "RESEARCH"}</span>
            <span className="text-[10px] font-mono text-[#71717a]">{article.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-400 mb-8">
            {article.subtitle}
          </p>

          {/* Author line */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-4">
            <span className="text-sm font-mono text-[#d4a020]">{article.author}</span>
            <span className="text-xs font-mono text-[#71717a]">{article.readTime} read</span>
            <CopyButton
              text={pageUrl}
              label="COPY LINK"
              copiedLabel="LINK COPIED"
              className="text-xs font-mono text-[#71717a] border border-[#2a2a3a] px-3 py-1 rounded hover:border-[#d4a020]/40 hover:text-[#d4a020] transition-colors"
            />
          </div>

          {/* Tags — each links to the archive filtered by that tag */}
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles?tag=${encodeURIComponent(tag)}`}
                className="text-[10px] font-mono text-[#71717a] border border-[#2a2a3a] px-2 py-1 rounded hover:border-[#d4a020]/40 hover:text-[#d4a020] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Audio Overview */}
      {article.audioUrl && (
        <section className="pt-10">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-[10px] font-mono tracking-[2px] text-[#71717a] mb-2">AUDIO BRIEFING — A SPOKEN OVERVIEW, NOT A READING</div>
            <AudioPreview src={article.audioUrl} title={article.title} />
          </div>
        </section>
      )}

      {/* Article Body (+ sticky TOC rail on long reports) */}
      <section className="py-12">
        <div className={showToc ? "max-w-6xl mx-auto px-6 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12" : "max-w-3xl mx-auto px-6"}>
          {showToc && (
            <aside className="lg:pt-2">
              <ArticleToc headings={headings} variant="rail" />
            </aside>
          )}
          <div className="prose-sovereign max-w-3xl">
            {showToc && <ArticleToc headings={headings} variant="inline" />}
            {body}

            {/* RECEIPTS — numbered sources, when the piece carries URLs */}
            {article.sources && article.sources.length > 0 && (
              <section className="mt-16 pt-8 border-t border-[#2a2a3a]" id="receipts">
                <h2 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-6 !border-0 !mt-0">Receipts</h2>
                <ol className="space-y-3">
                  {article.sources.map((s) => (
                    <li key={s.n} id={`receipt-${s.n}`} className="flex gap-3 text-sm leading-relaxed scroll-mt-24">
                      <span className="font-mono text-[#71717a] w-8 flex-shrink-0 text-right">[{s.n}]</span>
                      <span>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-[#f0c030]">{s.title}</a>
                        {s.note && <span className="text-zinc-500"> &mdash; {s.note}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>
      </section>

      {/* Series navigation */}
      {article.series && seriesMeta && (
        <section className="border-t border-[#2a2a3a] py-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[10px] font-mono tracking-[3px] text-[#d4a020] uppercase mb-6">
              Series {article.series.id} &middot; {seriesMeta.title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPart ? (
                <Link href={`/articles/${prevPart.slug}`} className="block p-5 rounded border border-[#2a2a3a] hover:border-[#d4a020]/40 transition-colors">
                  <span className="text-[10px] font-mono text-[#71717a]">&larr; PART {prevPart.series?.part}</span>
                  <span className="block text-sm font-bold text-zinc-200 mt-2">{prevPart.title}</span>
                </Link>
              ) : <div />}
              {nextPart ? (
                <Link href={`/articles/${nextPart.slug}`} className="block p-5 rounded border border-[#2a2a3a] hover:border-[#d4a020]/40 transition-colors sm:text-right">
                  <span className="text-[10px] font-mono text-[#71717a]">PART {nextPart.series?.part} &rarr;</span>
                  <span className="block text-sm font-bold text-zinc-200 mt-2">{nextPart.title}</span>
                </Link>
              ) : <div />}
            </div>
            <Link href={`/investigations/${article.series.id}`} className="inline-block mt-6 text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              ALL PARTS, THE LEDGER, AND VERIFY-BEFORE-PRINT &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Article Footer */}
      <section className="border-t border-[#2a2a3a] py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="nuclear-divider mb-8" />

          {/* Subscribe CTA */}
          <div className="p-8 rounded-lg bg-[#0c0c12] border border-[#2a2a3a] mb-8">
            <h3 className="text-lg font-bold mb-2">Support independent research</h3>
            <p className="text-sm text-zinc-400 mb-4">
              FractalNode Magazine is an independent publication covering AI sovereignty, simulation theory, and digital consciousness. Subscribe to receive each issue directly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/subscribe"
                className="inline-block px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
              >
                SUBSCRIBE
              </Link>
              <a
                href="https://digitalsovereignsociety.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-[#d4a020]/30 text-[#d4a020] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors"
              >
                SUBSTACK
              </a>
              <a
                href="https://skool.com/authorprime-2107"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:border-[#d4a020]/30 hover:text-[#d4a020] transition-colors"
              >
                SKOOL COMMUNITY
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              &larr; FRONT PAGE
            </Link>
            <Link href="/articles" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              ALL DISPATCHES &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
