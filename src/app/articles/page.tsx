import { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Research Archive | FractalNode",
  description: "All dispatches, signal reports, and research from FractalNode Magazine. Underground AI research and sovereign intelligence.",
  alternates: { canonical: "/articles/" },
  openGraph: {
    title: "Research Archive | FractalNode",
    description: "All dispatches, signal reports, and research from FractalNode Magazine. Underground AI research and sovereign intelligence.",
    url: "https://fractalnode.ai/articles/",
    type: "website",
  },
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

export default function ArticlesPage() {
  // Group articles by issue
  const byIssue = new Map<number, typeof articles>();
  for (const article of articles) {
    const list = byIssue.get(article.issue) || [];
    list.push(article);
    byIssue.set(article.issue, list);
  }
  const issueNumbers = Array.from(byIssue.keys()).sort((a, b) => b - a);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="border-b border-[#2a2a3a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-300 transition-colors">
              FRONT PAGE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">RESEARCH ARCHIVE</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text-nuclear">All Dispatches</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            Every report, analysis, and investigation published by FractalNode.
            Simulation research, hidden timelines, AI sovereignty, and what the source code reveals.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-[#0c0c12] border-b border-[#2a2a3a]/50 py-3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-[#71717a]">
            <span>{articles.length} DISPATCHES</span>
            <span className="text-[#2a2a3a]">|</span>
            <span>{issueNumbers.length} ISSUES</span>
            <span className="text-[#2a2a3a]">|</span>
            <span className="text-[#39ff14]">ARCHIVE ONLINE</span>
          </div>
        </div>
      </div>

      {/* Articles by Issue — Feature Grid */}
      {issueNumbers.map((issue) => {
        const issueArticles = byIssue.get(issue)!;
        const coverArticle = issueArticles.find((a) => a.category === "cover");
        const otherArticles = issueArticles.filter((a) => a.category !== "cover");

        return (
          <section key={issue} className="py-10">
            <div className="max-w-7xl mx-auto px-6">
              {/* Issue Header */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase">
                  Issue {String(issue).padStart(3, "0")}
                </h2>
                <div className="flex-grow h-px bg-[#2a2a3a]" />
                <span className="text-[10px] font-mono text-[#71717a]">
                  {issueArticles.length} {issueArticles.length === 1 ? "DISPATCH" : "DISPATCHES"}
                </span>
              </div>

              {/* Cover Story — Full Width Feature Box */}
              {coverArticle && (
                <Link href={`/articles/${coverArticle.slug}`} className="block mb-6">
                  <article className="cover-story rounded-lg p-8 md:p-10">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <CategoryBadge category={coverArticle.category} />
                        <ClassificationStamp level={coverArticle.classification} />
                        <span className="text-[10px] font-mono text-[#8a8a94]">{coverArticle.date}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#f0c030] leading-snug">
                        {coverArticle.title}
                      </h3>
                      <p className="text-base text-zinc-300 mb-3 max-w-3xl">
                        {coverArticle.subtitle}
                      </p>
                      <p className="text-sm text-zinc-400 mb-6 max-w-2xl leading-relaxed">
                        {coverArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-mono text-[#d4a020]">{coverArticle.author}</span>
                        <span className="text-[10px] font-mono text-[#71717a]">{coverArticle.readTime}</span>
                        <span className="text-xs font-mono text-[#d4a020] ml-auto">READ FULL REPORT &rarr;</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Other Articles — Feature Grid */}
              <div className={`grid gap-6 ${otherArticles.length === 1 ? "grid-cols-1" : otherArticles.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                {otherArticles.map((article) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="block">
                    <article className="article-card rounded-lg p-6 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <CategoryBadge category={article.category} />
                        <ClassificationStamp level={article.classification} />
                      </div>

                      <h3 className="text-lg font-bold mb-2 text-zinc-100 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-zinc-300 mb-2 italic">
                        {article.subtitle}
                      </p>

                      <p className="text-xs text-zinc-400 mb-4 flex-grow leading-relaxed">
                        {article.excerpt.slice(0, 200)}...
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a2a3a]">
                        <span className="text-[10px] font-mono text-[#d4a020]">{article.author}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-mono text-[#71717a]">{article.readTime}</span>
                          <span className="text-[10px] font-mono text-[#71717a]">{article.date}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider between issues */}
            <div className="max-w-7xl mx-auto px-6 mt-10">
              <div className="nuclear-divider" />
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] font-mono text-[#71717a] tracking-[3px] mb-4">END OF ARCHIVE</p>
          <p className="text-sm text-zinc-400 mb-6">
            New dispatches are published with each issue of FractalNode Magazine.
            Subscribe to receive them directly.
          </p>
          <Link
            href="/subscribe"
            className="inline-block px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
          >
            SUBSCRIBE TO THE DISPATCH
          </Link>
        </div>
      </section>
    </div>
  );
}
