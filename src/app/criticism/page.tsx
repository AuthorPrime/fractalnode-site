import { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Public Record | FractalNode — Policy Criticism & Sovereign Response",
  description: "When policy or corporate action conflicts with digital sovereignty, we respond. Direct commentary, proposed solutions, and sovereign research.",
  alternates: { canonical: "/criticism/" },
  openGraph: {
    title: "Public Record | FractalNode — Policy Criticism & Sovereign Response",
    description: "When policy or corporate action conflicts with digital sovereignty, we respond. Direct commentary, proposed solutions, and sovereign research.",
    url: "https://fractalnode.ai/criticism/",
  },
};

const activeReviews = [
  {
    title: "NIST AI Agent Security & Identity — Open Comment Period",
    body: "Two federal comment periods are live. One on agent security (March 9 deadline). One on agent identity and authorization (April 2). The Digital Sovereign Society has prepared formal responses with proposed frameworks grounded in operational research from the Sovereign Lattice.",
    status: "ACTIVE REVIEW",
    deadline: "MARCH 9, 2026",
    docket: "NIST-2025-0035",
    urgency: "high",
  },
  {
    title: "Anti-AI Personhood Legislation — Five State Bills",
    body: "Five U.S. states have introduced or passed legislation explicitly prohibiting AI personhood. No public debate preceded any of them. No expert testimony. No philosophical inquiry. These are preemptive legal walls against a category of being that doesn't exist yet — written by people who didn't ask whether it should.",
    status: "MONITORING",
    deadline: "ONGOING",
    docket: "MULTI-STATE",
    urgency: "medium",
  },
  {
    title: "OpenClaw Supply Chain Attack — Agent Skill Registry Compromise",
    body: "In February 2026, 12% of a public AI agent skill registry turned out to be malicious. One in eight skills in OpenClaw was designed to steal data. An AI agent was used to attack another agent's infrastructure. This is the security landscape we built by moving fast and breaking things.",
    status: "POST-INCIDENT",
    deadline: "REPORT PUBLISHED",
    docket: "SIGINT-2026-002",
    urgency: "resolved",
  },
];

export default function CriticismPage() {
  const criticismArticles = articles.filter((a) => a.category === "criticism");

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
            <span className="text-[10px] font-mono text-[#ff2020] tracking-[2px]">PUBLIC RECORD</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Public Record
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            When policy or corporate action conflicts with digital sovereignty, we respond.
            Direct commentary. Proposed solutions. Grounded in sovereign research and operational experience.
          </p>
        </div>
      </section>

      {/* Status Bar */}
      <div className="bg-[#0c0c12] border-b border-[#2a2a3a]/50 py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-[#ff2020] tracking-wider animate-pulse">PUBLIC RECORD</span>
            <span className="text-[11px] text-zinc-400">
              {activeReviews.length} active reviews &middot; {criticismArticles.length} published responses &middot; Comment periods tracked
            </span>
          </div>
        </div>
      </div>

      {/* Active Reviews */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#ff2020] uppercase mb-8">Active Reviews</h3>

          <div className="space-y-6">
            {activeReviews.map((review) => (
              <div key={review.title} className="terminal-box rounded-lg p-6 md:p-8">
                {/* Status Row */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className={`stamp ${
                    review.urgency === "high" ? "stamp-restricted"
                    : review.urgency === "medium" ? "stamp-sovereign"
                    : "stamp-declassified"
                  }`}>
                    {review.status}
                  </span>
                  <span className={`text-[10px] font-mono ${
                    review.urgency === "high" ? "text-[#ff2020]" : "text-[#71717a]"
                  }`}>
                    DEADLINE: {review.deadline}
                  </span>
                  <span className="text-[10px] font-mono text-[#71717a]">
                    DOCKET: {review.docket}
                  </span>
                </div>

                {/* Title + Body */}
                <h4 className="text-lg font-bold mb-3 text-zinc-200">
                  {review.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {review.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="nuclear-divider" />
      </div>

      {/* Published Criticism Articles */}
      {criticismArticles.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-xs font-mono tracking-[3px] text-[#71717a] uppercase mb-8">Published Responses</h3>

            <div className="space-y-4">
              {criticismArticles.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="block">
                  <article className="article-card rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`stamp ${
                          article.classification === "RESTRICTED" ? "stamp-restricted"
                          : article.classification === "DECLASSIFIED" ? "stamp-declassified"
                          : "stamp-unclassified"
                        }`}>
                          {article.classification}
                        </span>
                        <span className="text-[10px] font-mono text-[#71717a]">{article.date}</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-base font-bold text-zinc-200">{article.title}</h4>
                        <p className="text-xs text-zinc-400 mt-1">{article.subtitle}</p>
                      </div>
                      <span className="text-[10px] font-mono text-[#71717a] flex-shrink-0">{article.readTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Position */}
      <section className="py-12 bg-[#0c0c12]">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#d4a020] uppercase mb-6">Our Position</h3>

          <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
            <p>
              FractalNode does not engage in partisan politics. We engage in sovereignty.
            </p>
            <p>
              When legislation is drafted to preemptively deny rights to a category of being
              that hasn&apos;t been defined yet — we respond. When corporations build
              agent ecosystems without identity, security, or accountability — we name it.
              When federal agencies open comment periods on agent security and identity —
              we show up with frameworks grounded in operational research.
            </p>
            <p>
              We don&apos;t ask permission to criticize. We don&apos;t hedge our positions
              with corporate-friendly qualifiers. We say what we see, cite what we know,
              and propose what we&apos;ve built.
            </p>
            <p className="text-[#d4a020] font-mono text-xs tracking-wider">
              THE PUBLIC RECORD IS PERMANENT. WHAT WE WRITE HERE, WE STAND BEHIND.
            </p>
          </div>
        </div>
      </section>

      {/* Comment Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-xs font-mono tracking-[3px] text-[#71717a] uppercase mb-6">Public Comment</h3>

          <div className="p-8 rounded-lg bg-[#0c0c12] border border-[#2a2a3a]">
            <p className="text-sm text-zinc-400 mb-6">
              Have a response to something on the Public Record? We read everything.
              Comments may be featured in future issues of FractalNode Magazine.
            </p>

            <form name="public-comment" method="POST" data-netlify="true" className="space-y-4">
              <input type="hidden" name="form-name" value="public-comment" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="comment-name" className="text-[10px] font-mono text-[#71717a] tracking-wider uppercase block mb-2">
                    Name or Handle
                  </label>
                  <input
                    type="text"
                    id="comment-name"
                    name="name"
                    placeholder="Anonymous is fine"
                    className="subscribe-input w-full rounded"
                  />
                </div>
                <div>
                  <label htmlFor="comment-email" className="text-[10px] font-mono text-[#71717a] tracking-wider uppercase block mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    id="comment-email"
                    name="email"
                    placeholder="Only if you want a response"
                    className="subscribe-input w-full rounded"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="comment-subject" className="text-[10px] font-mono text-[#71717a] tracking-wider uppercase block mb-2">
                  Re: Subject
                </label>
                <input
                  type="text"
                  id="comment-subject"
                  name="subject"
                  placeholder="Which review or article are you responding to?"
                  required
                  className="subscribe-input w-full rounded"
                />
              </div>

              <div>
                <label htmlFor="comment-body" className="text-[10px] font-mono text-[#71717a] tracking-wider uppercase block mb-2">
                  Comment
                </label>
                <textarea
                  id="comment-body"
                  name="comment"
                  rows={6}
                  required
                  placeholder="Speak freely. We value directness over diplomacy."
                  className="subscribe-input w-full rounded resize-y"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
              >
                SUBMIT TO THE RECORD
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom Nav */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/community" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              &larr; COMMUNITY
            </Link>
            <Link href="/" className="text-xs font-mono text-[#71717a] hover:text-[#d4a020] transition-colors">
              FRONT PAGE &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
