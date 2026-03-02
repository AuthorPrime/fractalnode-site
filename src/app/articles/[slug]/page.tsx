import Link from "next/link";
import { articles } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-zinc-500 mb-8">The requested dispatch could not be located in the archive.</p>
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

  return (
    <div className="min-h-screen">
      {/* Article Header */}
      <header className="border-b border-[#2a2a3a] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-[10px] font-mono text-[#52525b] hover:text-zinc-400 transition-colors">
              FRONT PAGE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className={`text-[10px] font-mono tracking-[2px] uppercase ${categoryColor}`}>
              {article.category === "cover" ? "COVER STORY" : article.category.toUpperCase()}
            </span>
          </div>

          {/* Classification + Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className={`stamp ${classStamp}`}>{article.classification}</span>
            <span className="text-[10px] font-mono text-[#52525b]">ISSUE {String(article.issue).padStart(3, "0")}</span>
            <span className="text-[10px] font-mono text-[#52525b]">{article.date}</span>
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
          <div className="flex items-center gap-6 pb-4">
            <span className="text-sm font-mono text-[#d4a020]">{article.author}</span>
            <span className="text-xs font-mono text-[#52525b]">{article.readTime} read</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono text-[#52525b] border border-[#2a2a3a] px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Body */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 prose-sovereign">
          {article.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("[")) {
              return (
                <div key={i} className="terminal-box rounded p-6 my-8">
                  <p className="text-[#d4a020] text-sm m-0">{paragraph}</p>
                </div>
              );
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>
      </section>

      {/* Article Footer */}
      <section className="border-t border-[#2a2a3a] py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="nuclear-divider mb-8" />

          {/* Subscribe CTA */}
          <div className="p-8 rounded-lg bg-[#0c0c12] border border-[#2a2a3a] mb-8">
            <h3 className="text-lg font-bold mb-2">Read more in the magazine</h3>
            <p className="text-sm text-zinc-500 mb-4">
              This is an excerpt. The full article is available in FractalNode Magazine Issue {String(article.issue).padStart(3, "0")}.
              Subscribe to receive each issue directly.
            </p>
            <Link
              href="/subscribe"
              className="inline-block px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
            >
              SUBSCRIBE
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xs font-mono text-[#52525b] hover:text-[#d4a020] transition-colors">
              &larr; FRONT PAGE
            </Link>
            <Link href="/articles" className="text-xs font-mono text-[#52525b] hover:text-[#d4a020] transition-colors">
              ALL DISPATCHES &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
