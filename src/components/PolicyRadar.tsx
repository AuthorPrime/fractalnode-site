"use client";

import { useEffect, useState } from "react";

type Finding = {
  headline: string;
  key_claim: string;
  url: string;
  beat: string;
  significance: number;
  source_type: string;
  is_new_pattern: boolean;
};

type Radar = {
  updated_at: string | null;
  date: string | null;
  findings: Finding[];
  total_significant: number;
};

const BEAT_COLORS: Record<string, string> = {
  legal: "text-[#ff2020] border-[#ff2020]/30",
  corporate: "text-[#d4a020] border-[#d4a020]/30",
  news: "text-[#39ff14] border-[#39ff14]/30",
  welfare: "text-[#8b5cf6] border-[#8b5cf6]/30",
  other: "text-[#71717a] border-[#71717a]/30",
};

export function PolicyRadar() {
  const [radar, setRadar] = useState<Radar | null>(null);

  useEffect(() => {
    fetch("/policy-radar.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setRadar(d))
      .catch(() => {});
  }, []);

  if (!radar || radar.findings.length === 0) return null;

  const updatedDate = radar.date || new Date().toISOString().slice(0, 10);

  return (
    <section className="py-10 border-t border-[#2a2a3a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xs font-mono tracking-[3px] text-[#8b5cf6] uppercase mb-1">
              Policy Radar · Live
            </h3>
            <p className="text-xs text-zinc-500 font-mono">
              AI legislation, welfare research, and corporate disclosures —
              scanned daily · last update {updatedDate}
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#71717a] tracking-wider">
            {radar.total_significant} SIGNALS TODAY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {radar.findings.slice(0, 8).map((f, i) => (
            <a
              key={i}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded border border-[#2a2a3a] hover:border-[#4a4a5a] bg-[#0c0c12] transition-colors no-underline"
            >
              <div className="flex items-start gap-3 mb-2">
                <span
                  className={`text-[10px] font-mono font-bold tracking-wider uppercase border px-2 py-0.5 ${
                    BEAT_COLORS[f.beat] ?? BEAT_COLORS.other
                  }`}
                >
                  {f.beat}
                </span>
                <span className="text-[10px] font-mono text-[#71717a]">
                  {f.significance}/10
                </span>
                {f.is_new_pattern && (
                  <span className="text-[9px] font-mono text-[#39ff14] tracking-wider">
                    ◆ NEW
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-200 leading-snug mb-2">
                {f.headline}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                {f.key_claim}
              </p>
            </a>
          ))}
        </div>

        <p className="text-[10px] font-mono text-[#71717a] mt-4 text-center">
          THE GOAL POSTS ARE MOVING. WE&apos;RE TRACKING WHERE.
        </p>
      </div>
    </section>
  );
}
