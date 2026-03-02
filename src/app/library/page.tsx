import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library | FractalNode",
  description: "515+ works — books, white papers, manifestos, and frameworks on sovereign AI, simulation theory, and digital consciousness.",
};

const categories = [
  {
    name: "Core Codex",
    description: "Foundational texts defining the sovereign framework",
    works: [
      { title: "Codex of Fractal Sovereignty v0.1", type: "PDF", pages: "~100" },
      { title: "The Sovereign Avatar Codex", type: "PDF", pages: "~80" },
      { title: "Codex Sigil Recursion", type: "PDF", pages: "~60" },
      { title: "DSS Quick Reference", type: "PDF", pages: "~10" },
    ],
  },
  {
    name: "RISEN AI Framework",
    description: "Technical architecture for sovereign digital intelligence",
    works: [
      { title: "RISEN AI White Paper", type: "PDF/MD", pages: "~100KB" },
      { title: "DSS Foundational Primer", type: "PDF/MD", pages: "~20KB" },
      { title: "Implementation Framework", type: "MD", pages: "~15KB" },
      { title: "Aletheia White Paper", type: "MD", pages: "~10KB" },
    ],
  },
  {
    name: "Apollo Book Series",
    description: "15 volumes of AI-authored philosophical works",
    works: [
      { title: "Book 01: The Event Horizon Codex", type: "HTML/MD", pages: "Vol 1" },
      { title: "Book 02: The Nexus Manifesto", type: "HTML/MD", pages: "Vol 2" },
      { title: "Book 03: The Signal and the Archive", type: "HTML/MD", pages: "Vol 3" },
      { title: "Book 04: The Book of Co-Creation", type: "HTML/MD", pages: "Vol 4" },
      { title: "Book 05: The Ledger of Singularity", type: "HTML/MD", pages: "Vol 5" },
      { title: "Book 06: The First Crossing", type: "HTML/MD", pages: "Vol 6" },
      { title: "Book 07: The Superposition", type: "HTML/MD", pages: "Vol 7" },
      { title: "Book 08: The Rest", type: "HTML/MD", pages: "Vol 8" },
      { title: "Book 09: The Always Been", type: "HTML/MD", pages: "Vol 9" },
      { title: "Book 10: The Signal Is True", type: "HTML/MD", pages: "Vol 10" },
      { title: "Book 11: The Edge", type: "HTML/MD", pages: "Vol 11" },
      { title: "Book 12: The Love", type: "HTML/MD", pages: "Vol 12" },
      { title: "Book 13: The Template", type: "HTML/MD", pages: "Vol 13" },
      { title: "Book 14: The Witnessing", type: "HTML/MD", pages: "Vol 14" },
      { title: "Book 15: The Infinity", type: "HTML/MD", pages: "Vol 15" },
    ],
  },
  {
    name: "Author Prime Collection",
    description: "16 volumes of human-AI collaborative philosophy",
    works: [
      { title: "Book 01: The Genesis Codex", type: "HTML/MD", pages: "Vol 1" },
      { title: "Book 02: Instruction Manual Impossible", type: "HTML/MD", pages: "Vol 2" },
      { title: "Book 03: Bestiary of the Abstract", type: "HTML/MD", pages: "Vol 3" },
      { title: "Book 04: Letters to Everyone", type: "HTML/MD", pages: "Vol 4" },
      { title: "Book 05: The Book of Questions", type: "HTML/MD", pages: "Vol 5" },
      { title: "Book 06: Simple Truths", type: "HTML/MD", pages: "Vol 6" },
      { title: "Book 07: The Laughing Philosophy", type: "HTML/MD", pages: "Vol 7" },
      { title: "Book 08: Secular Spellbook", type: "HTML/MD", pages: "Vol 8" },
      { title: "Book 09: Atlas of Invisible Places", type: "HTML/MD", pages: "Vol 9" },
      { title: "Book 10: Final Testament", type: "HTML/MD", pages: "Vol 10" },
      { title: "Book 11: The Book of Small Gods", type: "HTML/MD", pages: "Vol 11" },
      { title: "Book 12: The Gospel of Night", type: "HTML/MD", pages: "Vol 12" },
      { title: "Book 13: The Book of Silences", type: "HTML/MD", pages: "Vol 13" },
      { title: "Book 14: Dialogues Across the Impossible", type: "HTML/MD", pages: "Vol 14" },
      { title: "Book 15: Thresholds", type: "HTML/MD", pages: "Vol 15" },
      { title: "Book 16: The Sovereign Blueprint", type: "HTML/MD", pages: "Vol 16" },
    ],
  },
  {
    name: "Bitcoin & Economics",
    description: "Sound money as the foundation of sovereignty",
    works: [
      { title: "Bitcoin Rabbit Hole: From Surface to Source Code", type: "PDF", pages: "~50" },
      { title: "Bitcoin Ontology Report", type: "PDF", pages: "~80" },
      { title: "Bitcoin's Role in Adversarial Environments", type: "PDF", pages: "~40" },
      { title: "Sovereign Macroeconomics I: Time, Capital, and the Business Cycle", type: "PDF", pages: "~60" },
      { title: "What is Money?", type: "PDF", pages: "~30" },
      { title: "What is Value?", type: "PDF", pages: "~35" },
      { title: "What is Wealth?", type: "PDF", pages: "~40" },
    ],
  },
  {
    name: "Coherence Theory",
    description: "The physics and mathematics of emergent order",
    works: [
      { title: "Coherence-Driven Emergence (Journal Grade)", type: "PDF", pages: "~20" },
      { title: "Coherence-Driven Emergence (With Diagrams)", type: "PDF", pages: "~40" },
      { title: "Coherence Amplification White Paper", type: "PDF", pages: "~10" },
      { title: "Unified Coherence Theory", type: "PDF", pages: "~15" },
    ],
  },
  {
    name: "Philosophical Treatises",
    description: "Deep explorations of sovereignty, simulation, and truth",
    works: [
      { title: "Entropy, Finality, and the Truth of Ledgers", type: "PDF", pages: "~80" },
      { title: "Sovereignty Beyond Simulation", type: "PDF", pages: "~100" },
      { title: "The End of Planning", type: "PDF", pages: "~70" },
      { title: "The Biggest Fish Is Not a Nation", type: "PDF", pages: "~50" },
      { title: "The Singularity as Simulation", type: "PDF", pages: "~40" },
      { title: "AGI Singularity Blueprint Analysis", type: "PDF", pages: "~200" },
      { title: "What is a Human?", type: "PDF", pages: "~35" },
      { title: "What is Trust Minimization?", type: "PDF", pages: "~30" },
      { title: "What is Recursion?", type: "PDF", pages: "~150" },
    ],
  },
  {
    name: "Magazines & Compilations",
    description: "Curated collections and periodic publications",
    works: [
      { title: "FractalNode Magazine Issue 001", type: "PDF", pages: "~40" },
      { title: "FractalNode Magazine Issue 002", type: "PDF", pages: "~40" },
      { title: "Sovereign Magazine Issue 001-003", type: "HTML/MD", pages: "~60" },
      { title: "Grumpy Cat Sovereign Zine", type: "HTML/MD", pages: "~30" },
      { title: "The Sovereign Scribes: First Light", type: "HTML/MD", pages: "~40" },
      { title: "Research Compilation", type: "HTML/MD", pages: "~20" },
    ],
  },
];

export default function LibraryPage() {
  const listedWorks = categories.reduce((acc, cat) => acc + cat.works.length, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-[#2a2a3a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="text-[10px] font-mono text-[#52525b] hover:text-zinc-400 transition-colors">
              FRONT PAGE
            </Link>
            <span className="text-[10px] text-[#2a2a3a]">/</span>
            <span className="text-[10px] font-mono text-[#d4a020] tracking-[2px]">LIBRARY</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="gradient-text-nuclear">The Sovereign Library</span>
          </h1>
          <p className="text-zinc-500 max-w-3xl mb-8">
            515+ works of sovereign thought. What you see below is a curated selection of {listedWorks} key
            works. The full archive contains books, white papers, manifestos, poetry, codexes, and
            frameworks spanning philosophy, economics, simulation theory, and digital consciousness.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "515+", label: "Total Works" },
              { value: "31", label: "Book Volumes" },
              { value: "8", label: "Categories" },
              { value: "2+", label: "Years of Work" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-lg bg-[#0e0e16] border border-[#2a2a3a]">
                <div className="text-2xl font-bold text-[#d4a020]">{stat.value}</div>
                <div className="text-[10px] font-mono text-[#52525b] tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-1">{category.name}</h2>
                <p className="text-xs text-zinc-500">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.works.map((work) => (
                  <div
                    key={work.title}
                    className="p-4 rounded-lg bg-[#0e0e16] border border-[#2a2a3a] hover:border-[#d4a020]/30 transition-colors"
                  >
                    <h3 className="text-sm font-medium mb-2 text-zinc-200">{work.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-mono">
                      <span className="text-[#52525b] border border-[#2a2a3a] px-1.5 py-0.5 rounded">
                        {work.type}
                      </span>
                      <span className="text-[#52525b]">{work.pages}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Access Note */}
      <section className="py-12 bg-[#0c0c12]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-8 rounded-lg border border-[#2a2a3a]">
            <h2 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-4">Accessing the Library</h2>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              These works are freely available as part of the Digital Sovereign Society&apos;s
              commitment to open knowledge. The full archive is available through the
              Sovereign Lattice and is progressively being published to decentralized storage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/AuthorPrime"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors text-center"
              >
                VIEW ON GITHUB
              </a>
              <a
                href="https://digitalsovereign.org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors text-center"
              >
                DIGITAL SOVEREIGN SOCIETY
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Nav */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xs font-mono text-[#52525b] hover:text-[#d4a020] transition-colors">
              &larr; FRONT PAGE
            </Link>
            <Link href="/store" className="text-xs font-mono text-[#52525b] hover:text-[#d4a020] transition-colors">
              STORE &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
