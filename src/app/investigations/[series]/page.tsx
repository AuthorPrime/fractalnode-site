import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { series, getSeries, type Prediction, type PredictionStatus } from "@/data/series";
import { getSeriesArticles } from "@/data/articles";
import AudioPreview from "@/components/AudioPreview";

const RENDER_DRAFTS = process.env.RENDER_DRAFTS === "1";

export function generateStaticParams() {
  return series
    .filter((s) => getSeriesArticles(s.id, RENDER_DRAFTS).length > 0)
    .map((s) => ({ series: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ series: string }> }): Promise<Metadata> {
  const { series: id } = await params;
  const s = getSeries(id);
  if (!s) return { title: "Series Not Found | FractalNode" };
  return {
    title: `Series ${s.id} — ${s.title} | FractalNode`,
    description: s.standfirst.slice(0, 160),
    alternates: { canonical: `/investigations/${s.id}/` },
    openGraph: {
      title: `Series ${s.id} — ${s.title}`,
      description: s.standfirst.slice(0, 160),
      url: `https://fractalnode.ai/investigations/${s.id}/`,
      type: "website",
    },
  };
}

// ── Status badges: the statuses are the product. Make them legible. ──
const STATUS: Record<PredictionStatus, { label: string; cls: string }> = {
  confirmed:   { label: "CONFIRMED",  cls: "text-[#39ff14] border-[#39ff14]/40 bg-[#39ff14]/5" },
  supported:   { label: "SUPPORTED",  cls: "text-[#2cc5c5] border-[#2cc5c5]/40 bg-[#2cc5c5]/5" },
  open:        { label: "OPEN",       cls: "text-[#d4a020] border-[#d4a020]/40 bg-[#d4a020]/5" },
  "half-wrong": { label: "HALF WRONG", cls: "text-[#f0a030] border-[#f0a030]/50 bg-[#f0a030]/5" },
  wrong:       { label: "WRONG",      cls: "text-[#ff2020] border-[#ff2020]/50 bg-[#ff2020]/5" },
};

const HORIZON: Record<Prediction["horizon"], string> = {
  sweep: "Pre-registered before a sweep",
  "12mo": "Within 12 months",
  "24mo": "Within 24 months",
};

function StatusBadge({ status }: { status: PredictionStatus }) {
  const s = STATUS[status];
  return (
    <span className={`inline-block whitespace-nowrap border px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-[2px] ${s.cls}`}>
      {s.label}
    </span>
  );
}

function Ledger({ predictions }: { predictions: Prediction[] }) {
  const groups: Prediction["horizon"][] = ["sweep", "12mo", "24mo"];
  return (
    <div className="space-y-10">
      {groups.map((h) => {
        const rows = predictions.filter((p) => p.horizon === h);
        if (rows.length === 0) return null;
        return (
          <div key={h}>
            <div className="flex items-center gap-4 mb-4">
              <h4 className="text-xs font-mono tracking-[2px] text-zinc-300 uppercase">{HORIZON[h]}</h4>
              <div className="flex-grow h-px bg-[#2a2a3a]" />
              <span className="text-[10px] font-mono text-[#71717a]">{rows.length} {rows.length === 1 ? "BET" : "BETS"}</span>
            </div>

            {/* Desktop table */}
            <table className="hidden md:table w-full text-sm border-collapse">
              <thead>
                <tr className="text-[10px] font-mono tracking-[2px] text-[#71717a] uppercase text-left">
                  <th className="py-2 pr-4 font-normal w-[46%]">Bet</th>
                  <th className="py-2 pr-4 font-normal">Made</th>
                  <th className="py-2 pr-4 font-normal">Status</th>
                  <th className="py-2 pr-4 font-normal">Graded</th>
                  <th className="py-2 font-normal">Note</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} id={`bet-${p.id}`} className="border-t border-[#2a2a3a]/60 align-top scroll-mt-24">
                    <td className="py-3 pr-4 text-zinc-200 leading-relaxed">{p.text}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-[#71717a] whitespace-nowrap">{p.madeOn}</td>
                    <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
                    <td className="py-3 pr-4 font-mono text-xs text-[#71717a] whitespace-nowrap">{p.gradedOn ?? "—"}</td>
                    <td className="py-3 text-xs text-zinc-400 leading-relaxed">{p.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {rows.map((p) => (
                <div key={p.id} className="p-4 rounded border border-[#2a2a3a] bg-[#0c0c12]">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <StatusBadge status={p.status} />
                    <span className="font-mono text-xs text-[#71717a]">{p.madeOn}{p.gradedOn ? ` → ${p.gradedOn}` : ""}</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">{p.text}</p>
                  {p.note && <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{p.note}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function SeriesPage({ params }: { params: Promise<{ series: string }> }) {
  const { series: id } = await params;
  const s = getSeries(id);
  if (!s) notFound();

  const parts = getSeriesArticles(s.id, RENDER_DRAFTS);
  const graded = s.predictions.filter((p) => p.status !== "open");
  const held = graded.filter((p) => p.status === "confirmed" || p.status === "supported").length;
  const missed = graded.filter((p) => p.status === "half-wrong" || p.status === "wrong").length;
  const open = s.predictions.length - graded.length;

  const seriesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: s.title,
    description: s.standfirst,
    url: `https://fractalnode.ai/investigations/${s.id}/`,
    publisher: { "@type": "Organization", name: "FractalNode", url: "https://fractalnode.ai" },
    hasPart: parts.map((a) => ({ "@type": "Article", headline: a.title, url: `https://fractalnode.ai/articles/${a.slug}/`, position: a.series?.part })),
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesJsonLd) }} />

      {/* ── Masthead ── */}
      <section className="border-b border-[#2a2a3a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link href="/" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-300 transition-colors">FRONT PAGE</Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <Link href="/investigations" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-300 transition-colors">INVESTIGATIONS</Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">SERIES {s.id}</span>
          </div>

          <div className="relative rounded-lg overflow-hidden p-8 md:p-12" style={{ background: "#0a0a0a" }}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[10px] font-mono font-bold text-[#c8a84e] tracking-[3px]">SERIES {s.id}</span>
              <span className={`stamp ${s.status === "live" ? "stamp-restricted" : "stamp-declassified"}`}>
                {s.status === "live" ? "LIVE — STILL FILING" : "CLOSED"}
              </span>
              <span className="text-[10px] font-mono text-[#999]">{parts.length} {parts.length === 1 ? "PART" : "PARTS"}</span>
            </div>
            <div className="h-px bg-[#c8a84e] mb-8" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">{s.title}</h1>
            <p className="text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed mb-8">{s.standfirst}</p>

            {/* Ledger topline */}
            <div className="flex flex-wrap gap-6 text-[10px] font-mono tracking-[2px] uppercase">
              <span className="text-[#39ff14]">{held} held</span>
              <span className="text-[#f0a030]">{missed} missed</span>
              <span className="text-[#d4a020]">{open} open</span>
              <a href="#ledger" className="text-[#71717a] hover:text-[#d4a020] transition-colors">See the ledger &darr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Audio briefing ── */}
      {s.audioUrl && (
        <>
          <section className="py-10">
            <div className="max-w-4xl mx-auto px-6">
              <div className="p-6 rounded-lg border border-[#d4a020]/30 bg-gradient-to-r from-[#0e0e16] via-[#0a0a10] to-[#0e0e16]">
                <p className="text-[10px] font-mono tracking-[3px] text-[#d4a020] uppercase mb-1">Audio briefing</p>
                <p className="text-sm text-zinc-400 mb-4">A spoken overview of the series&rsquo; opening file. Not a reading; a briefing.</p>
                <AudioPreview src={s.audioUrl} title={`Series ${s.id} — ${s.title} (Audio Briefing)`} />
              </div>
            </div>
          </section>
          <div className="max-w-7xl mx-auto px-6"><div className="nuclear-divider" /></div>
        </>
      )}

      {/* ── Parts ── */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-8">The Files, In Order</h3>
          <div className="space-y-4">
            {parts.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="block">
                <article className="flex gap-5 p-5 rounded border border-[#2a2a3a]/60 hover:border-[#d4a020]/40 transition-colors group">
                  <span className="text-3xl font-bold font-mono text-[#2a2a3a] group-hover:text-[#d4a020] transition-colors w-12 flex-shrink-0 leading-none pt-1">
                    {String(a.series?.part ?? 0).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="text-base md:text-lg font-bold text-zinc-100 leading-snug">{a.title}</h4>
                      {a.draft && <span className="stamp stamp-restricted">DRAFT</span>}
                      {a.audioUrl && <span className="text-[10px] font-mono text-[#71717a]">&#127911; AUDIO</span>}
                    </div>
                    <p className="text-sm text-zinc-300 italic mb-2">{a.subtitle}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">{a.excerpt.length > 260 ? a.excerpt.slice(0, 260).replace(/\s+\S*$/, "") + "…" : a.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[#71717a]">
                      <span>{a.readTime}</span>
                      <span>{a.date}</span>
                      <span className="text-[#d4a020] ml-auto">READ &rarr;</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6"><div className="nuclear-divider" /></div>

      {/* ── The Ledger ── */}
      <section className="py-12" id="ledger">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-3">The Ledger</h3>
          <p className="text-sm text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Every bet this series made, dated when it was written down, graded when the evidence came in.
            A bet that failed stays on the board. Open bets are the ones you can grade us on.
          </p>
          <Ledger predictions={s.predictions} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6"><div className="nuclear-divider" /></div>

      {/* ── Verify before print ── */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-3">Verify Before Print</h3>
          <p className="text-sm text-zinc-400 max-w-2xl mb-8 leading-relaxed">
            Claims in this series that rest on secondary reporting until the primary document is in hand. Published so you can hold us to it.
          </p>
          <ul className="space-y-3">
            {s.verifyBeforePrint.map((v, i) => (
              <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                <span className="font-mono text-[#71717a] w-8 flex-shrink-0 text-right">{String(i + 1).padStart(2, "0")}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Case file ── */}
      <section className="py-12 bg-[#0c0c12]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] font-mono text-[#d4a020] tracking-[4px] uppercase mb-4">The Case File</p>
          <p className="text-sm text-zinc-400 mb-6 max-w-lg mx-auto leading-relaxed">
            Every research brief, verbatim, including the dead ends. {s.caseFileUrl ? "Public." : "Available to any researcher who asks."}
          </p>
          {s.caseFileUrl ? (
            <a href={s.caseFileUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 border border-[#d4a020]/30 text-[#d4a020] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors">
              OPEN THE CASE FILE
            </a>
          ) : (
            <a href="https://digitalsovereign.org" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 border border-[#d4a020]/30 text-[#d4a020] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors">
              REQUEST THE CASE FILE
            </a>
          )}
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <Link href="/investigations" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">&larr; ALL INVESTIGATIONS</Link>
          <Link href="/subscribe" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">SUBSCRIBE FREE &rarr;</Link>
        </div>
      </section>
    </div>
  );
}
