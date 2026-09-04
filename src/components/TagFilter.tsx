"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export type TagFilterItem = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
};

/**
 * Static export has no server-side query handling, so `/articles?tag=x` is
 * resolved in the browser. With no tag in the URL the normal archive (children)
 * renders untouched; with a tag, a filtered list replaces it.
 */
function TagFilterInner({ items, children }: { items: TagFilterItem[]; children: React.ReactNode }) {
  const params = useSearchParams();
  const tag = params.get("tag");
  if (!tag) return <>{children}</>;

  const matches = items.filter((a) => a.tags.includes(tag));

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <h2 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase">
            Tagged: {tag}
          </h2>
          <div className="flex-grow h-px bg-[#2a2a3a]" />
          <span className="text-xs font-mono text-[#71717a]">
            {matches.length} {matches.length === 1 ? "DISPATCH" : "DISPATCHES"}
          </span>
          <Link href="/articles" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
            CLEAR &times;
          </Link>
        </div>

        {matches.length === 0 ? (
          <p className="text-sm text-zinc-400">Nothing filed under that tag yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="block">
                <article className="article-card rounded-lg p-6 h-full flex flex-col">
                  <span className={`text-xs font-mono tracking-[2px] uppercase badge-${a.category} mb-3`}>
                    {a.category === "cover" ? "cover story" : a.category}
                  </span>
                  <h3 className="text-lg font-bold mb-2 text-zinc-100 leading-snug">{a.title}</h3>
                  <p className="text-sm text-zinc-300 italic mb-4 flex-grow">{a.subtitle}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#2a2a3a]">
                    <span className="text-xs font-mono text-[#71717a]">{a.readTime}</span>
                    <span className="text-xs font-mono text-[#71717a]">{a.date}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function TagFilter(props: { items: TagFilterItem[]; children: React.ReactNode }) {
  // useSearchParams needs a Suspense boundary for static prerendering.
  return (
    <Suspense fallback={<>{props.children}</>}>
      <TagFilterInner {...props} />
    </Suspense>
  );
}
