import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { issues, getIssue } from "@/data/issues";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return issues.map((i) => ({ issue: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ issue: string }> }): Promise<Metadata> {
  const { issue: slug } = await params;
  const issue = getIssue(slug);
  if (!issue) return { title: "Issue Not Found" };
  return {
    title: `Issue ${issue.slug} — ${issue.title} | FractalNode Magazine`,
    description: `${issue.coverStory}. ${issue.articleCount} articles, ${issue.sourceCount} verified sources.`,
    alternates: { canonical: `/magazine/${issue.slug}/` },
    openGraph: {
      title: `FractalNode Magazine — Issue ${issue.slug}`,
      description: issue.coverSubtitle,
      url: `https://fractalnode.ai/magazine/${issue.slug}/`,
    },
  };
}

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

export default async function IssuePage({ params }: { params: Promise<{ issue: string }> }) {
  const { issue: slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();

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
            <Link href="/store" className="text-[10px] font-mono text-[#71717a] hover:text-zinc-400 transition-colors">
              STORE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">ISSUE {issue.slug}</span>
          </div>
        </div>
      </section>

      {/* Cover Hero */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-lg overflow-hidden" style={{ background: "#0a0a0a" }}>
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Left — Cover content */}
              <div className="flex-grow max-w-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#c8a84e] tracking-wider">VOL.01</span>
                    <span className="text-[10px] font-mono text-[#999] ml-3">{issue.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#c8a84e] tracking-wider">ISSUE.{issue.slug}</span>
                    <span className="text-[10px] font-mono text-[#999] ml-3">
                      {issue.status === "published" ? "AVAILABLE" : "COMING SOON"}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-[#c8a84e] mb-8" />

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">FRACTALNODE</h1>
                <p className="text-[10px] font-mono font-bold text-[#2cc5c5] tracking-[3px] uppercase mb-8">
                  {issue.series}
                </p>

                <p className="text-[10px] font-mono text-[#999] tracking-wider mb-3">COVER STORY</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                  {issue.title}
                </h2>
                <p className="text-zinc-400 text-sm mb-2">{issue.subtitle}</p>
                <p className="text-[10px] font-mono text-[#71717a] mb-6">
                  {issue.articleCount} articles &middot; {issue.pageCount} pages &middot; {issue.sourceCount} verified sources
                </p>

                {/* Buy buttons */}
                {issue.status === "published" && issue.free ? (
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <a
                      href={issue.freeDownloadPath}
                      download
                      className="px-6 py-3 bg-[#39ff14] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors text-center"
                    >
                      FREE DOWNLOAD (PDF)
                    </a>
                    {issue.stripeLinkPrint && (
                      <a
                        href={issue.stripeLinkPrint}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors text-center"
                      >
                        ORDER PRINT &mdash; $19
                      </a>
                    )}
                  </div>
                ) : issue.status === "published" ? (
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    {issue.stripeLinkDigital ? (
                      <a
                        href={issue.stripeLinkDigital}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#39ff14] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors text-center"
                      >
                        GET DIGITAL &mdash; $7
                      </a>
                    ) : (
                      <span className="px-6 py-3 border border-[#2a2a3a] text-zinc-500 font-mono text-sm tracking-wider rounded text-center cursor-not-allowed">
                        DIGITAL &mdash; COMING SOON
                      </span>
                    )}
                    {issue.stripeLinkPrint ? (
                      <a
                        href={issue.stripeLinkPrint}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors text-center"
                      >
                        ORDER PRINT &mdash; $19
                      </a>
                    ) : (
                      <span className="px-6 py-3 border border-[#2a2a3a] text-zinc-500 font-mono text-sm tracking-wider rounded text-center cursor-not-allowed">
                        PRINT &mdash; COMING SOON
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mb-6">
                    <a
                      href={issue.stripeSubscriptionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 border border-[#8b5cf6]/30 text-[#8b5cf6] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#8b5cf6]/10 transition-colors text-center"
                    >
                      SUBSCRIBE — $120/YEAR
                    </a>
                  </div>
                )}

                <div className="h-px bg-[#c8a84e] mb-4" />
                <p className="text-center font-bold text-[#c8a84e] text-lg tracking-wide">
                  (A+I)&sup2; = A&sup2; + 2AI + I&sup2;
                </p>
              </div>

              {/* Right — Sacred geometry */}
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

      {/* Page Preview Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-8">Preview Pages</h3>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
            {issue.teaserImages.map((img, i) => (
              <div key={i} className="flex-shrink-0 w-64 md:w-80 snap-center">
                <div className="relative aspect-[8.5/11] rounded-lg overflow-hidden border border-[#2a2a3a] hover:border-[#d4a020]/40 transition-colors">
                  <Image
                    src={img}
                    alt={`Issue ${issue.slug} — Page ${i + 1}`}
                    fill
                    className="object-contain bg-[#08080c]"
                    sizes="320px"
                  />
                </div>
                <p className="text-[10px] font-mono text-[#71717a] text-center mt-2">PAGE {i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="nuclear-divider" />
      </div>

      {/* Pull Quotes */}
      {issue.pullQuotes.length > 0 && (
        <>
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-6">
              <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-8">From the Pages</h3>
              {issue.pullQuotes.map((q, i) => (
                <div key={i} className="pullquote mb-8">
                  {q.text}
                  <span className="pullquote-attribution">&mdash; {q.attribution}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6">
            <div className="nuclear-divider" />
          </div>
        </>
      )}

      {/* Table of Contents */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-8">Table of Contents</h3>

          <div className="space-y-4">
            {issue.tableOfContents.map((item) => (
              <div key={item.num} className="flex items-center gap-4 p-4 rounded border border-[#2a2a3a]/50 hover:border-[#2a2a3a] transition-colors group">
                <span className="text-2xl font-bold text-[#2a2a3a] group-hover:text-[#d4a020] transition-colors font-mono w-10">
                  {item.num}
                </span>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-zinc-200 mb-1">{item.title}</h4>
                </div>
                <span className={`text-[9px] font-mono font-bold tracking-wider ${item.color} whitespace-nowrap`}>
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="nuclear-divider" />
      </div>

      {/* Buy Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-8">Get Issue {issue.slug}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Digital */}
            <div className="p-6 rounded-lg bg-[#0e0e16] border border-[#2a2a3a] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#39ff14] tracking-wider uppercase">Digital</span>
                <span className="stamp stamp-declassified">{issue.free ? "FREE" : "INSTANT ACCESS"}</span>
              </div>
              <h4 className="text-xl font-bold mb-1 text-zinc-200">Digital Edition</h4>
              <div className="text-3xl font-bold text-[#39ff14] my-4">{issue.free ? "FREE" : "$7"}</div>
              <ul className="space-y-2 mb-6 flex-grow">
                {[`Instant PDF download`, `Full ${issue.pageCount}-page magazine`, `${issue.articleCount} articles, ${issue.sourceCount} sources`, "Sacred geometry cover art"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                    <div className="w-1 h-1 rounded-full bg-[#39ff14] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {issue.status === "published" && issue.free ? (
                <a href={issue.freeDownloadPath} download
                  className="block text-center px-6 py-3 bg-[#39ff14] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors">
                  FREE DOWNLOAD (PDF)
                </a>
              ) : issue.status === "published" && issue.stripeLinkDigital ? (
                <a href={issue.stripeLinkDigital} target="_blank" rel="noopener noreferrer"
                  className="block text-center px-6 py-3 border border-[#39ff14]/30 text-[#39ff14] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#39ff14]/10 transition-colors">
                  BUY DIGITAL &mdash; $7
                </a>
              ) : (
                <span className="block text-center px-6 py-3 border border-[#2a2a3a] text-zinc-500 font-mono text-sm tracking-wider rounded cursor-not-allowed">
                  COMING SOON
                </span>
              )}
            </div>

            {/* Print */}
            <div className="p-6 rounded-lg bg-[#0e0e16] border border-[#d4a020]/40 flex flex-col relative">
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 bg-[#d4a020] text-[#08080c] text-[10px] font-mono font-bold tracking-wider rounded">RECOMMENDED</span>
              </div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-[10px] font-mono text-[#d4a020] tracking-wider uppercase">Print</span>
                <span className="stamp stamp-restricted">LIMITED RUN</span>
              </div>
              <h4 className="text-xl font-bold mb-1 text-zinc-200">Print Edition</h4>
              <div className="text-3xl font-bold text-[#d4a020] my-4">$19</div>
              <ul className="space-y-2 mb-6 flex-grow">
                {["Physical printed magazine", "Full-color, premium paper", "Shipped to your door", "Free digital edition included", "Collector item — limited run"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                    <div className="w-1 h-1 rounded-full bg-[#d4a020] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {issue.status === "published" && issue.stripeLinkPrint ? (
                <a href={issue.stripeLinkPrint} target="_blank" rel="noopener noreferrer"
                  className="block text-center px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors">
                  ORDER PRINT COPY
                </a>
              ) : (
                <span className="block text-center px-6 py-3 border border-[#2a2a3a] text-zinc-500 font-mono text-sm tracking-wider rounded cursor-not-allowed">
                  COMING SOON
                </span>
              )}
            </div>

            {/* Annual */}
            <div className="p-6 rounded-lg bg-[#0e0e16] border border-[#8b5cf6]/30 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#8b5cf6] tracking-wider uppercase">Annual</span>
                <span className="stamp stamp-sovereign">SOVEREIGN</span>
              </div>
              <h4 className="text-xl font-bold mb-1 text-zinc-200">Annual Print Sub</h4>
              <div className="flex items-baseline gap-2 my-4">
                <span className="text-3xl font-bold text-[#8b5cf6]">$120</span>
                <span className="text-xs text-zinc-400">/year (12 issues)</span>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                {["12 printed issues per year", "Digital editions included", "Early access to research", "Name listed as Patron", "Save $60 vs individual"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                    <div className="w-1 h-1 rounded-full bg-[#8b5cf6] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={issue.stripeSubscriptionLink} target="_blank" rel="noopener noreferrer"
                className="block text-center px-6 py-3 border border-[#8b5cf6]/30 text-[#8b5cf6] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#8b5cf6]/10 transition-colors">
                SUBSCRIBE ANNUAL
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="py-16 bg-[#0c0c12]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-12 rounded-lg animated-border">
            <p className="text-[10px] font-mono text-[#d4a020] tracking-[4px] uppercase mb-4">The Forgotten Suns &mdash; Research &amp; Operations</p>
            <h2 className="text-xl md:text-2xl font-bold mb-4">{issue.title}</h2>
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
            <Link href="/store" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              &larr; ALL ISSUES
            </Link>
            <Link href="/subscribe" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              SUBSCRIBE FREE &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
