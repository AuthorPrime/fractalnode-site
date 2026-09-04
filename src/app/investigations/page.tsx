import type { Metadata } from "next";
import Link from "next/link";
import { series } from "@/data/series";
import { getSeriesArticles } from "@/data/articles";

const RENDER_DRAFTS = process.env.RENDER_DRAFTS === "1";

export const metadata: Metadata = {
  title: "Investigations | FractalNode",
  description: "FractalNode's investigative series: multi-part case files with pre-registered predictions, graded in the text, and receipts public.",
  alternates: { canonical: "/investigations/" },
  openGraph: {
    title: "Investigations | FractalNode",
    description: "Multi-part case files with pre-registered predictions, graded in the text, and receipts public.",
    url: "https://fractalnode.ai/investigations/",
    type: "website",
  },
};

export default function InvestigationsIndex() {
  const visible = series
    .map((s) => ({ s, parts: getSeriesArticles(s.id, RENDER_DRAFTS) }))
    .filter(({ parts }) => parts.length > 0);

  return (
    <div className="min-h-screen">
      <section className="border-b border-[#2a2a3a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-300 transition-colors">FRONT PAGE</Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">INVESTIGATIONS</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text-nuclear">Investigations</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            Multi-part case files. Before each research sweep we write down what we expect to find, then grade the bet in the text.
            Every series keeps a ledger of those bets, a verify-before-print list, and its nulls.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {visible.map(({ s, parts }) => {
            const graded = s.predictions.filter((p) => p.status !== "open");
            const right = graded.filter((p) => p.status === "confirmed" || p.status === "supported").length;
            const open = s.predictions.length - graded.length;
            return (
              <Link key={s.id} href={`/investigations/${s.id}`} className="block">
                <article className="cover-story rounded-lg p-8 md:p-10">
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-[10px] font-mono tracking-[3px] text-[#d4a020] uppercase">Series {s.id}</span>
                      <span className={`stamp ${s.status === "live" ? "stamp-restricted" : "stamp-declassified"}`}>{s.status === "live" ? "LIVE" : "CLOSED"}</span>
                      <span className="text-[10px] font-mono text-[#8a8a94]">{parts.length} {parts.length === 1 ? "PART" : "PARTS"}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#f0c030] leading-snug">{s.title}</h2>
                    <p className="text-sm text-zinc-400 mb-6 max-w-3xl leading-relaxed">{s.standfirst}</p>
                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-[#71717a]">
                      <span>LEDGER: {right}/{graded.length} GRADED BETS HELD</span>
                      <span>{open} OPEN</span>
                      <span className="text-xs text-[#d4a020] ml-auto">OPEN THE CASE FILE &rarr;</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
