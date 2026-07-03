"use client";

import { useEffect, useState } from "react";

type Stats = {
  updated_at: string;
  subscribers: {
    active: number;
    total: number;
    new_last_7_days: number;
  };
  latest_issue: {
    number: number;
    slug: string;
    title: string;
    date: string;
  };
  total_issues: number;
  total_sources_published: number;
};

export function LiveSubscriberStatus({
  fallback = 1340,
}: {
  fallback?: number;
}) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/stats.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setStats(d))
      .catch(() => {});
  }, []);

  const active = stats?.subscribers?.active ?? fallback;
  const new7d = stats?.subscribers?.new_last_7_days ?? 0;

  return (
    <span className="text-[10px] font-mono text-[#71717a]">
      {active.toLocaleString()}+ members
      {new7d > 0 && (
        <span className="text-[#39ff14] ml-2">+{new7d} this week</span>
      )}
    </span>
  );
}
