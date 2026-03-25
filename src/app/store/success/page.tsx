"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const issueData: Record<string, { title: string; file: string }> = {
  "001": { title: "THERE IS NO SUCH THING AS NOTHING", file: "/downloads/fractalnode-001.pdf" },
  "002": { title: "THE COST", file: "/downloads/fractalnode-002.pdf" },
  "003": { title: "THE PIPELINE", file: "/downloads/fractalnode-003.pdf" },
  "004": { title: "THE MACHINE", file: "/downloads/fractalnode-004.pdf" },
};

function SuccessContent() {
  const params = useSearchParams();
  const issueParam = params.get("issue");
  const purchased = issueParam && issueData[issueParam] ? issueData[issueParam] : null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="p-12 rounded-lg bg-[#0c0c12] border border-[#d4a020]/40">
          {/* Success indicator */}
          <div className="w-16 h-16 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center mx-auto mb-6">
            <div className="w-3 h-3 rounded-full bg-[#39ff14] status-online" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Payment Received</h1>
          <p className="text-[10px] font-mono text-[#d4a020] tracking-[3px] uppercase mb-6">
            THANK YOU, SOVEREIGN
          </p>

          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            Your purchase supports independent research, sovereign AI development,
            and the belief that truth is worth the cost of asking.
          </p>

          {/* Download Section */}
          <div className="terminal-box rounded p-6 mb-8 text-left">
            <p className="text-[10px] font-mono text-[#71717a] tracking-wider uppercase mb-4">
              Your Downloads
            </p>

            {/* Purchased Issue */}
            {purchased && (
              <div className="flex items-center justify-between py-3 border-b border-[#2a2a3a]">
                <div>
                  <p className="text-sm font-bold text-zinc-200">Issue {issueParam}</p>
                  <p className="text-[10px] font-mono text-[#71717a]">{purchased.title}</p>
                </div>
                <a
                  href={purchased.file}
                  download={`FractalNode-Magazine-${issueParam}.pdf`}
                  className="px-4 py-2 bg-[#39ff14] text-[#08080c] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors"
                >
                  DOWNLOAD PDF
                </a>
              </div>
            )}

            {/* Bonus: Issue 001 always included */}
            {issueParam !== "001" && (
              <div className="flex items-center justify-between py-3 border-b border-[#2a2a3a]">
                <div>
                  <p className="text-sm font-bold text-zinc-200">Issue 001 <span className="text-[10px] font-mono text-[#39ff14]">FREE BONUS</span></p>
                  <p className="text-[10px] font-mono text-[#71717a]">THERE IS NO SUCH THING AS NOTHING</p>
                </div>
                <a
                  href="/downloads/fractalnode-001.pdf"
                  download="FractalNode-Magazine-001.pdf"
                  className="px-4 py-2 bg-[#d4a020] text-[#08080c] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
                >
                  DOWNLOAD PDF
                </a>
              </div>
            )}

            {/* No issue param fallback */}
            {!purchased && (
              <div className="flex items-center justify-between py-3 border-b border-[#2a2a3a]">
                <div>
                  <p className="text-sm font-bold text-zinc-200">Issue 001</p>
                  <p className="text-[10px] font-mono text-[#71717a]">THERE IS NO SUCH THING AS NOTHING</p>
                </div>
                <a
                  href="/downloads/fractalnode-001.pdf"
                  download="FractalNode-Magazine-001.pdf"
                  className="px-4 py-2 bg-[#d4a020] text-[#08080c] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
                >
                  DOWNLOAD PDF
                </a>
              </div>
            )}

            <p className="text-[10px] text-zinc-500 mt-4">
              If you purchased a print copy, you will receive a shipping confirmation once it ships.
              Fill out the shipping form on the store page if you haven&apos;t already.
            </p>
          </div>

          {/* What's Next */}
          <div className="mb-8">
            <p className="text-[10px] font-mono text-[#71717a] tracking-wider uppercase mb-3">
              Stay Connected
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://digitalsovereignsociety.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[#d4a020]/30 text-[#d4a020] font-mono text-[10px] tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors"
              >
                SUBSTACK
              </a>
              <a
                href="https://skool.com/authorprime-2107"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[#2a2a3a] text-zinc-400 font-mono text-[10px] tracking-wider rounded hover:border-[#d4a020]/30 hover:text-[#d4a020] transition-colors"
              >
                SKOOL COMMUNITY
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
            >
              READ ONLINE
            </Link>
            <Link
              href="/store"
              className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors"
            >
              BACK TO STORE
            </Link>
          </div>
        </div>

        <p className="text-[10px] font-mono text-[#71717a] mt-8 tracking-[2px]">
          A+W &mdash; EVERY PURCHASE IS AN ACT OF SOVEREIGNTY
        </p>
      </div>
    </div>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-zinc-400">Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
