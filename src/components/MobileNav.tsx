"use client";

import { useState } from "react";
import Link from "next/link";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-zinc-400 text-sm font-mono hover:text-zinc-300 transition-colors"
        aria-label="Toggle navigation menu"
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      {open && (
        <div className="fixed inset-0 top-[88px] z-40 bg-[#08080c]/98 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-6 py-8">
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 border-b border-[#2a2a3a]/50 text-sm font-mono tracking-wide uppercase transition-colors ${
                    link.label === "Store"
                      ? "text-[#d4a020] font-bold"
                      : link.label === "Subscribe"
                      ? "text-[#d4a020]"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#2a2a3a]">
              <p className="text-[10px] font-mono text-[#71717a] tracking-[3px] uppercase">
                Sovereign Intelligence Network
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14] status-online" />
                <span className="text-[10px] font-mono text-[#71717a]">LATTICE ONLINE</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
