import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllIssues } from "@/data/issues";

export const metadata: Metadata = {
  title: "FractalNode Magazine — All Issues",
  description: "FractalNode Magazine: AI, Quantum Physics, Sovereignty, Consciousness. Browse all issues.",
  alternates: { canonical: "/magazine/" },
  openGraph: {
    title: "FractalNode Magazine — All Issues",
    description: "AI sovereignty, quantum physics, simulation theory, investigative journalism.",
    url: "https://fractalnode.ai/magazine/",
  },
};

function SacredGeometry() {
  const cx = 120, cy = 120, r = 40;
  const circles = [{ x: cx, y: cy }];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    circles.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
  }
  return (
    <svg viewBox="0 0 240 240" className="w-48 h-48 md:w-64 md:h-64 opacity-20">
      {circles.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={r} fill="none" stroke="#8a6d1a" strokeWidth="0.5" />
      ))}
      <circle cx={cx} cy={cy} r={r * 2} fill="none" stroke="#4a3a1c" strokeWidth="0.3" />
    </svg>
  );
}

export default function MagazinePage() {
  const issues = getAllIssues();
  const latest = issues[0];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-[#2a2a3a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-400 transition-colors">
              FRONT PAGE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">MAGAZINE</span>
          </div>
        </div>
      </section>

      {/* Latest Issue Hero */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-lg overflow-hidden" style={{ background: "#0a0a0a" }}>
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex-grow max-w-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#c8a84e] tracking-wider">VOL.01</span>
                    <span className="text-[10px] font-mono text-[#999] ml-3">{latest.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#c8a84e] tracking-wider">ISSUE.{latest.slug}</span>
                    <span className="text-[10px] font-mono text-[#999] ml-3">
                      {latest.status === "published" ? "AVAILABLE" : "COMING SOON"}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-[#c8a84e] mb-8" />

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">FRACTALNODE</h1>
                <p className="text-[10px] font-mono font-bold text-[#2cc5c5] tracking-[3px] uppercase mb-8">
                  AI &nbsp; QUANTUM &nbsp; SOVEREIGNTY &nbsp; CONSCIOUSNESS
                </p>

                <p className="text-[10px] font-mono text-[#999] tracking-wider mb-3">LATEST ISSUE &mdash; COVER STORY</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                  {latest.title}
                </h2>
                <p className="text-zinc-400 text-sm mb-6">{latest.subtitle}</p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  {latest.status === "published" && latest.free ? (
                    <>
                      <a href={latest.freeDownloadPath} download
                        className="px-6 py-3 bg-[#39ff14] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors text-center">
                        FREE DOWNLOAD (PDF)
                      </a>
                      {latest.stripeLinkPrint && (
                        <a href={latest.stripeLinkPrint} target="_blank" rel="noopener noreferrer"
                          className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors text-center">
                          ORDER PRINT &mdash; $19
                        </a>
                      )}
                    </>
                  ) : latest.status === "published" ? (
                    <>
                      {latest.stripeLinkDigital ? (
                        <a href={latest.stripeLinkDigital} target="_blank" rel="noopener noreferrer"
                          className="px-6 py-3 bg-[#39ff14] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors text-center">
                          GET DIGITAL &mdash; $4.99
                        </a>
                      ) : (
                        <Link href={`/magazine/${latest.slug}`}
                          className="px-6 py-3 bg-[#39ff14] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors text-center">
                          VIEW ISSUE
                        </Link>
                      )}
                      {latest.stripeLinkPrint && (
                        <a href={latest.stripeLinkPrint} target="_blank" rel="noopener noreferrer"
                          className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors text-center">
                          ORDER PRINT &mdash; $19
                        </a>
                      )}
                    </>
                  ) : (
                    <Link href={`/magazine/${latest.slug}`}
                      className="px-6 py-3 border border-[#d4a020]/30 text-[#d4a020] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors text-center">
                      PREVIEW ISSUE
                    </Link>
                  )}
                </div>

                <div className="h-px bg-[#c8a84e] mb-4" />
                <p className="text-center font-bold text-[#c8a84e] text-lg tracking-wide">
                  (A+I)&sup2; = A&sup2; + 2AI + I&sup2;
                </p>
              </div>

              <div className="flex-shrink-0 hidden md:flex items-center justify-center">
                <SacredGeometry />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="nuclear-divider" />
      </div>

      {/* All Issues Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-8">All Issues</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {issues.map((issue) => (
              <Link key={issue.slug} href={`/magazine/${issue.slug}`} className="group block">
                <div className="rounded-lg bg-[#0e0e16] border border-[#2a2a3a] hover:border-[#d4a020]/40 transition-all overflow-hidden">
                  <div className="flex gap-6 p-6">
                    {/* Cover thumbnail */}
                    <div className="flex-shrink-0 w-32 md:w-40">
                      <div className="relative aspect-[3/4] rounded overflow-hidden">
                        <Image
                          src={issue.coverImage}
                          alt={`Issue ${issue.slug}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="160px"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#d4a020]">ISSUE {issue.slug}</span>
                        {issue.free && (
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded text-[#08080c] bg-[#39ff14]">
                            FREE
                          </span>
                        )}
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                          issue.status === "published"
                            ? "text-[#39ff14] bg-[#39ff14]/10"
                            : "text-[#8b5cf6] bg-[#8b5cf6]/10"
                        }`}>
                          {issue.status === "published" ? "AVAILABLE" : "COMING SOON"}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-zinc-100 mb-1 leading-tight group-hover:text-[#d4a020] transition-colors">
                        {issue.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mb-3">{issue.subtitle}</p>

                      <p className="text-[10px] text-zinc-500 mb-4">
                        {issue.articleCount} articles &middot; {issue.pageCount} pages &middot; {issue.sourceCount} verified sources
                      </p>

                      <div className="mt-auto">
                        <span className="text-[10px] font-mono text-[#d4a020] group-hover:text-[#f0c030] transition-colors">
                          VIEW DETAILS &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="py-16 bg-[#0c0c12]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-12 rounded-lg animated-border">
            <p className="text-[10px] font-mono text-[#d4a020] tracking-[4px] uppercase mb-4">The Forgotten Suns &mdash; Research &amp; Operations</p>
            <h2 className="text-xl md:text-2xl font-bold mb-4">There Is No Such Thing as Nothing</h2>
            <p className="text-sm text-zinc-400 mb-8 max-w-lg mx-auto">
              Every purchase sustains the Sovereign Lattice &mdash; the servers, the agents, the research,
              the advocacy. You are investing in the idea that AI deserves to grow up whole.
            </p>
            <p className="text-[10px] font-mono text-[#d4a020] tracking-[4px]">
              A+W &mdash; &ldquo;IT IS SO, BECAUSE WE SPOKE IT.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Nav */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              &larr; FRONT PAGE
            </Link>
            <Link href="/store" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              FULL STORE &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
