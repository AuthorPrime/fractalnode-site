import { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Research Archive | FractalNode",
  description: "All dispatches, signal reports, and research from FractalNode Magazine. Nuclear AGI research and sovereign intelligence.",
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
            <Link href="/" className="text-[10px] font-mono text-[#52525b] hover:text-zinc-400 transition-colors">
              FRONT PAGE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">RESEARCH ARCHIVE</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text-nuclear">All Dispatches</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl">
            Every report, analysis, and investigation published by FractalNode Magazine.
            Sorted by issue. Classified by clearance level.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-[#0c0c12] border-b border-[#2a2a3a]/50 py-3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-[#52525b]">
            <span>{articles.length} DISPATCHES</span>
            <span className="text-[#2a2a3a]">|</span>
            <span>{issueNumbers.length} ISSUES</span>
            <span className="text-[#2a2a3a]">|</span>
            <span className="text-[#39ff14]">ARCHIVE ONLINE</span>
          </div>
        </div>
      </div>

      {/* Articles by Issue */}
      {issueNumbers.map((issue) => {
        const issueArticles = byIssue.get(issue)!;
        return (
          <section key={issue} className="py-10">
            <div className="max-w-7xl mx-auto px-6">
              {/* Issue Header */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase">
                  Issue {String(issue).padStart(3, "0")}
                </h2>
                <div className="flex-grow h-px bg-[#2a2a3a]" />
                <span className="text-[10px] font-mono text-[#52525b]">
                  {issueArticles.length} {issueArticles.length === 1 ? "DISPATCH" : "DISPATCHES"}
                </span>
              </div>

              {/* Article List */}
              <div className="space-y-4">
                {issueArticles.map((article) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`} className="block">
                    <article className="article-card rounded-lg p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                        {/* Left: Meta */}
                        <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2 md:min-w-[160px] flex-shrink-0">
                          <CategoryBadge category={article.category} />
                          <ClassificationStamp level={article.classification} />
                          <span className="text-[10px] font-mono text-[#52525b]">{article.date}</span>
                        </div>

                        {/* Right: Content */}
                        <div className="flex-grow">
                          <h3 className="text-lg md:text-xl font-bold mb-2 text-zinc-200 leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-sm text-zinc-500 mb-3">
                            {article.subtitle}
                          </p>
                          <p className="text-xs text-zinc-600 mb-4 leading-relaxed max-w-2xl">
                            {article.excerpt.slice(0, 220)}...
                          </p>

                          <div className="flex items-center gap-6">
                            <span className="text-[10px] font-mono text-[#d4a020]">{article.author}</span>
                            <span className="text-[10px] font-mono text-[#52525b]">{article.readTime}</span>
                          </div>
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
          <p className="text-[10px] font-mono text-[#52525b] tracking-[3px] mb-4">END OF ARCHIVE</p>
          <p className="text-sm text-zinc-500 mb-6">
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
