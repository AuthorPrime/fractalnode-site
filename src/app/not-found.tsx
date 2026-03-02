import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="terminal-box rounded-lg p-12">
          <div className="text-[10px] font-mono text-[#ff2020] tracking-[4px] mb-4">SIGNAL LOST</div>
          <h1 className="text-6xl font-bold text-[#d4a020] mb-4">404</h1>
          <p className="text-sm text-zinc-400 mb-8">
            The requested node could not be located in the Lattice.
            The signal may have been rerouted, archived, or never existed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-[#d4a020] text-[#08080c] font-mono text-sm font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
            >
              RETURN TO FRONT PAGE
            </Link>
            <Link
              href="/articles"
              className="px-6 py-3 border border-[#2a2a3a] text-zinc-400 font-mono text-sm tracking-wider rounded hover:text-white hover:border-zinc-500 transition-colors"
            >
              BROWSE RESEARCH
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
