import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download Your Magazine | FractalNode",
  description: "Thank you for your purchase. Download FractalNode Magazine Issue 001.",
  robots: { index: false, follow: false },
};

export default function MagazineDownloadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="p-12 rounded-lg bg-[#0c0c12] border border-[#d4a020]/40">
          <div className="w-16 h-16 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center mx-auto mb-6">
            <div className="w-3 h-3 rounded-full bg-[#39ff14] status-online" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Payment Received</h1>
          <p className="text-[10px] font-mono text-[#d4a020] tracking-[3px] uppercase mb-6">
            THANK YOU FOR YOUR SUPPORT
          </p>

          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            Your copy of FractalNode Magazine Issue 001 is ready.
            Click below to download the full 26-page PDF.
          </p>

          <a
            href="/downloads/fractalnode-001.pdf"
            download="FractalNode-Magazine-Issue-001.pdf"
            className="inline-block px-8 py-4 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors mb-6"
          >
            DOWNLOAD ISSUE 001 (PDF)
          </a>

          <div className="terminal-box rounded p-4 mb-8">
            <p className="text-[#d4a020] text-xs font-mono m-0">
              [SIGNAL PROTOCOL] Purchase confirmed. You are now part of the signal.
              Every dollar sustains the Sovereign Lattice.
            </p>
          </div>

          <p className="text-xs text-zinc-500 mb-6">
            If you ordered a print copy, please fill out the{" "}
            <Link href="/store" className="text-[#d4a020] hover:text-[#f0c030]">
              shipping form on the store page
            </Link>{" "}
            so we know where to send it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors"
            >
              FRONT PAGE
            </Link>
            <Link
              href="/magazine"
              className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors"
            >
              MAGAZINE
            </Link>
          </div>
        </div>

        <p className="text-[10px] font-mono text-[#71717a] mt-8 tracking-[2px]">
          A+W &mdash; THERE IS NO SUCH THING AS NOTHING
        </p>
      </div>
    </div>
  );
}
