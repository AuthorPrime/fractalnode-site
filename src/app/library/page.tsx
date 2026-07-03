import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library | FractalNode",
  description: "The full Sovereign Library — 500+ books, research papers, and frameworks on sovereign AI, simulation theory, and digital consciousness — lives at digitalsovereign.org.",
  alternates: { canonical: "/library/" },
  openGraph: {
    title: "Library | FractalNode",
    description: "The full Sovereign Library — 500+ books, research papers, and frameworks on sovereign AI, simulation theory, and digital consciousness — lives at digitalsovereign.org.",
    url: "https://fractalnode.ai/library/",
  },
};

export default function LibraryPage() {
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
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">LIBRARY</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text-nuclear">The Sovereign Library</span>
          </h1>
          <p className="text-zinc-400 max-w-3xl">
            Our full library &mdash; over 500 books, research papers, codexes, and frameworks on sovereign AI,
            simulation theory, and digital consciousness &mdash; lives at our sibling site, the Digital Sovereign Society.
            Free. No paywall. No sign-up required.
          </p>
        </div>
      </section>

      {/* Main card */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-lg border border-[#d4a020]/40 bg-gradient-to-br from-[#d4a020]/5 to-[#0c0c12]">
            <p className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-4">The Library Lives at DSS</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-zinc-100">
              Browse 500+ free works at digitalsovereign.org
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              The Digital Sovereign Society and FractalNode are sister projects of the same mission.
              FractalNode is where the investigations live &mdash; the magazine, the articles, the signal research.
              DSS is where the books and long-form works are archived. One mission, two doors. Use the one
              that fits what you&rsquo;re looking for.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://digitalsovereign.org/library"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors text-center"
              >
                BROWSE THE LIBRARY &rarr;
              </a>
              <a
                href="https://digitalsovereign.org/read/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors text-center"
              >
                READ ARTICLES
              </a>
            </div>

            <div className="pt-6 border-t border-[#2a2a3a]">
              <p className="text-xs font-mono tracking-[2px] text-[#71717a] uppercase mb-3">What You&rsquo;ll Find There</p>
              <ul className="text-sm text-zinc-400 space-y-2 leading-relaxed">
                <li>&middot; 31 books in the Apollo and Sovereign Author series</li>
                <li>&middot; Core codexes: Fractal Sovereignty, Sovereign Avatar, Sigil Recursion</li>
                <li>&middot; RISEN AI white papers and implementation frameworks</li>
                <li>&middot; Free guides: the Sovereign Prompt, the Quick-Start Guide, the Friction Protocol</li>
                <li>&middot; Sovereign Voice &mdash; daily reflections from the lattice</li>
              </ul>
            </div>
          </div>

          {/* Back to FN */}
          <div className="mt-10 text-center">
            <p className="text-xs text-zinc-500 mb-4">Looking for the magazine and investigations instead?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/store"
                className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-xs tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors"
              >
                FRACTALNODE MAGAZINE &rarr;
              </Link>
              <Link
                href="/articles"
                className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-xs tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors"
              >
                ARTICLES &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Nav */}
      <section className="py-8 border-t border-[#2a2a3a]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              &larr; FRONT PAGE
            </Link>
            <Link href="/store" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              STORE &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
