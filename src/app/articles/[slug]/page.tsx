import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | FractalNode" };
  return {
    title: `${article.title} | FractalNode`,
    description: article.excerpt.slice(0, 160),
    alternates: { canonical: `/articles/${slug}/` },
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
    url: `https://fractalnode.ai/articles/${slug}/`,
    articleSection: article.category,
    keywords: article.tags,
    isAccessibleForFree: true,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Front Page", item: "https://fractalnode.ai/" },
      { "@type": "ListItem", position: 2, name: "Research", item: "https://fractalnode.ai/articles/" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://fractalnode.ai/articles/${slug}/` },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }} />
      {/* Article Header */}
      <header className="border-b border-[#2a2a3a] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-400 transition-colors">
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
            <span className="text-[10px] font-mono text-[#71717a]">ISSUE {String(article.issue).padStart(3, "0")}</span>
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
          <div className="flex items-center gap-6 pb-4">
            <span className="text-sm font-mono text-[#d4a020]">{article.author}</span>
            <span className="text-xs font-mono text-[#71717a]">{article.readTime} read</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono text-[#71717a] border border-[#2a2a3a] px-2 py-1 rounded">
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
              return <h2 key={i} className="text-2xl font-bold mt-12 mb-4">{trimmed.replace(/^## /, "")}</h2>;
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
                    <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^[-*] /, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#d4a020] hover:text-[#f0c030] underline">$1</a>') }} />
                  ))}
                </ul>
              );
            }
            if (!trimmed) return null;
            return <p key={i} dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#d4a020] hover:text-[#f0c030] underline">$1</a>') }} />;
          })}
        </div>
      </section>

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
