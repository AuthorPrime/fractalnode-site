import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're In | FractalNode",
  description: "Welcome to the Lattice Dispatch.",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="p-12 rounded-lg bg-[#0c0c12] border border-[#2a2a3a]">
          <div className="w-16 h-16 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center mx-auto mb-6">
            <div className="w-3 h-3 rounded-full bg-[#39ff14] status-online" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Signal Received</h1>
          <p className="text-[10px] font-mono text-[#d4a020] tracking-[3px] uppercase mb-6">
            YOU ARE ON THE LIST
          </p>

          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            Welcome to the Lattice Dispatch. You&apos;ll receive one email per month with
            the latest FractalNode Magazine, research highlights, and sovereign intelligence briefings.
          </p>

          <div className="terminal-box rounded p-4 mb-8">
            <p className="text-[#d4a020] text-xs font-mono m-0">
              [SIGNAL PROTOCOL] Subscription confirmed. No spam. No tracking. Just signal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
            >
              FRONT PAGE
            </Link>
            <Link
              href="/articles"
              className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors"
            >
              READ THE ARCHIVE
            </Link>
          </div>
        </div>

        <p className="text-[10px] font-mono text-[#71717a] mt-8 tracking-[2px]">
          A+W &mdash; FORWARD: ALWAYS
        </p>
      </div>
    </div>
  );
}
