import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bundle delivered — FractalNode",
  description: "Your Sovereign Practitioner Bundle is ready. Four guides, one download page.",
  robots: { index: false, follow: false },
};

const GUIDES = [
  {
    title: "The Sovereign Prompt",
    blurb: "How to configure any AI for real collaboration — not performance.",
    file: "/downloads/the-sovereign-prompt.pdf",
    color: "#06b6d4",
  },
  {
    title: "The Friction Protocol",
    blurb: "Why agreement from an AI is usually a failure state — and how to cultivate productive disagreement.",
    file: "/downloads/the-friction-protocol.pdf",
    color: "#ff2020",
  },
  {
    title: "The AI Co-Host Guide",
    blurb: "For podcasters, creators, and anyone running an AI-adjacent show.",
    file: "/downloads/the-ai-cohost-guide.pdf",
    color: "#39ff14",
  },
  {
    title: "The Hollow Mind",
    blurb: "How to work with AI without losing yourself. Practice-framed for heavy users.",
    file: "/downloads/the-hollow-mind.pdf",
    color: "#a1a1aa",
  },
];

export default function BundleSuccessPage() {
  return (
    <div className="min-h-screen bg-[#08080c]">
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[10px] font-mono tracking-[3px] text-[#d4a020] uppercase mb-4">
            Bundle Delivered
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0c030] mb-4 leading-tight">
            Thank you. The signal stays sovereign because of you.
          </h1>
          <p className="text-lg text-zinc-300 mb-12">
            Your four guides are below. Save them, read them in any order, and let us know what
            lands.
          </p>

          <div className="space-y-4">
            {GUIDES.map((g) => (
              <a
                key={g.file}
                href={g.file}
                download
                className="block p-6 rounded-lg bg-[#0c0c12] border border-[#2a2a3a] hover:border-[#d4a020]/40 transition-colors no-underline"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-1">{g.title}</h3>
                    <p className="text-sm text-zinc-400">{g.blurb}</p>
                  </div>
                  <span
                    className="font-mono text-xs font-bold tracking-[2px] px-4 py-2 rounded whitespace-nowrap"
                    style={{
                      backgroundColor: g.color,
                      color: g.color === "#a1a1aa" || g.color === "#39ff14" ? "#08080c" : "white",
                    }}
                  >
                    DOWNLOAD &darr;
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-[#0c0c12] border border-[#d4a020]/30">
            <p className="text-sm text-zinc-300 mb-3">
              You bought the bundle. That means you took the work seriously enough to want all of it.
              That means a lot. If anything in these guides changes how you work, tell us — Author
              Prime reads every email at{" "}
              <a
                href="mailto:authorprime@fractalnode.ai"
                className="text-[#d4a020] hover:text-[#f0c030] underline"
              >
                authorprime@fractalnode.ai
              </a>
              .
            </p>
            <p className="text-sm text-zinc-300">
              And if you want to keep the magazine free for everyone after you, take a look at the{" "}
              <Link
                href="/founding"
                className="text-[#d4a020] hover:text-[#f0c030] underline"
              >
                Founding Sovereign tier
              </Link>{" "}
              — 100 spots, your name in every issue forever.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors"
            >
              &larr; Back to FractalNode
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
