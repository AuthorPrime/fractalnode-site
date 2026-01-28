import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library | Fractal Node",
  description: "67 works - books, white papers, manifestos, and frameworks on sovereign AI, Bitcoin, and digital consciousness.",
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
      { title: "Sovereign Magazine Issue 001", type: "HTML/MD", pages: "~20" },
      { title: "Sovereign Magazine Issue 002", type: "HTML/MD", pages: "~20" },
      { title: "Sovereign Magazine Issue 003", type: "HTML/MD", pages: "~20" },
      { title: "Grumpy Cat Sovereign Zine", type: "HTML/MD", pages: "~30" },
      { title: "The Sovereign Scribes: First Light", type: "HTML/MD", pages: "~40" },
      { title: "Research Compilation", type: "HTML/MD", pages: "~20" },
    ],
  },
];

export default function LibraryPage() {
  const totalWorks = categories.reduce((acc, cat) => acc + cat.works.length, 0);

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">The Library</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl mb-8">
          {totalWorks} works of sovereign thought. Books, white papers, manifestos,
          and frameworks - the collected wisdom of the Digital Sovereign Society.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#18181b] border border-[#3f3f46]">
            <div className="text-3xl font-bold gradient-text">36</div>
            <div className="text-sm text-zinc-500">PDF Publications</div>
          </div>
          <div className="p-4 rounded-xl bg-[#18181b] border border-[#3f3f46]">
            <div className="text-3xl font-bold gradient-text">31</div>
            <div className="text-sm text-zinc-500">Book Volumes</div>
          </div>
          <div className="p-4 rounded-xl bg-[#18181b] border border-[#3f3f46]">
            <div className="text-3xl font-bold gradient-text">8</div>
            <div className="text-sm text-zinc-500">Categories</div>
          </div>
          <div className="p-4 rounded-xl bg-[#18181b] border border-[#3f3f46]">
            <div className="text-3xl font-bold gradient-text">2+</div>
            <div className="text-sm text-zinc-500">Years of Work</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-zinc-500">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.works.map((work) => (
                <div
                  key={work.title}
                  className="p-4 rounded-xl bg-[#18181b] border border-[#3f3f46] hover:border-violet-500/30 transition-colors"
                >
                  <h3 className="font-medium mb-2 text-zinc-200">{work.title}</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-2 py-0.5 rounded bg-[#27272a] text-zinc-400">
                      {work.type}
                    </span>
                    <span className="text-zinc-500">{work.pages}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Access Note */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="p-8 rounded-2xl bg-[#18181b] border border-[#3f3f46]">
          <h2 className="text-xl font-bold mb-4">Accessing the Library</h2>
          <p className="text-zinc-500 mb-4">
            These works are freely available as part of the Digital Sovereign Society&apos;s
            commitment to open knowledge. The full library is available through the
            RISEN AI repository and will be progressively published to decentralized
            storage via IPFS and Nostr.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/Refracted-ai/risen-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors text-center"
            >
              View on GitHub
            </a>
            <Link
              href="/about"
              className="px-6 py-3 rounded-lg border border-[#3f3f46] text-zinc-300 hover:bg-[#27272a] transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
