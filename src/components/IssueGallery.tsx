"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Issue } from "@/data/issues";

function StatusBadge({ status }: { status: Issue["status"] }) {
  if (status === "published")
    return <span className="stamp stamp-declassified">AVAILABLE</span>;
  if (status === "preorder")
    return <span className="stamp stamp-restricted">PRE-ORDER</span>;
  return <span className="stamp stamp-sovereign">COMING SOON</span>;
}

function IssueCard({ issue, onHover }: { issue: Issue; onHover: (issue: Issue | null) => void }) {
  return (
    <div
      className="group relative rounded-lg bg-[#0e0e16] border border-[#2a2a3a] overflow-hidden hover:border-[#d4a020]/60 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => onHover(issue)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#08080c]">
        <Image
          src={issue.coverImage}
          alt={`FractalNode Magazine Issue ${issue.slug}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16] via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-mono font-bold text-[#d4a020] bg-[#08080c]/80 px-2 py-1 rounded">
            ISSUE {issue.slug}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {issue.free && (
            <span className="text-[10px] font-mono font-bold text-[#08080c] bg-[#39ff14] px-2 py-1 rounded tracking-wider">
              FREE
            </span>
          )}
          <StatusBadge status={issue.status} />
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-mono text-[#71717a] tracking-wider">{issue.date}</span>
          <span className="text-[9px] text-[#2a2a3a]">|</span>
          <span className="text-[9px] font-mono text-[#71717a]">{issue.pageCount}pp</span>
          <span className="text-[9px] text-[#2a2a3a]">|</span>
          <span className="text-[9px] font-mono text-[#71717a]">{issue.sourceCount} sources</span>
        </div>

        <h3 className="text-base font-bold text-zinc-100 mb-1 leading-tight">
          {issue.title}
        </h3>
        <p className="text-xs text-zinc-400 mb-4">{issue.subtitle}</p>

        {/* Buttons */}
        <div className="flex gap-2">
          {issue.status === "published" && issue.free ? (
            <>
              <a
                href={issue.freeDownloadPath}
                download
                className="flex-1 text-center px-3 py-2 bg-[#39ff14] text-[#08080c] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#50ff30] transition-colors"
              >
                FREE DOWNLOAD
              </a>
              {issue.stripeLinkPrint && (
                <a
                  href={issue.stripeLinkPrint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-3 py-2 bg-[#d4a020] text-[#08080c] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
                >
                  PRINT $19
                </a>
              )}
            </>
          ) : issue.status === "published" ? (
            <>
              {issue.stripeLinkDigital ? (
                <a
                  href={issue.stripeLinkDigital}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-3 py-2 border border-[#39ff14]/30 text-[#39ff14] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#39ff14]/10 transition-colors"
                >
                  DIGITAL $7
                </a>
              ) : (
                <span className="flex-1 text-center px-3 py-2 border border-[#2a2a3a] text-zinc-500 font-mono text-[10px] tracking-wider rounded cursor-not-allowed">
                  COMING SOON
                </span>
              )}
              {issue.stripeLinkPrint ? (
                <a
                  href={issue.stripeLinkPrint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-3 py-2 bg-[#d4a020] text-[#08080c] font-mono text-[10px] font-bold tracking-wider rounded hover:bg-[#f0c030] transition-colors"
                >
                  PRINT $19
                </a>
              ) : (
                <Link
                  href={`/magazine/${issue.slug}`}
                  className="flex-1 text-center px-3 py-2 border border-[#d4a020]/30 text-[#d4a020] font-mono text-[10px] tracking-wider rounded hover:bg-[#d4a020]/10 transition-colors"
                >
                  VIEW DETAILS
                </Link>
              )}
            </>
          ) : (
            <Link
              href={`/magazine/${issue.slug}`}
              className="flex-1 text-center px-3 py-2 border border-[#2a2a3a] text-zinc-400 font-mono text-[10px] tracking-wider rounded hover:border-[#d4a020] hover:text-[#d4a020] transition-colors"
            >
              PREVIEW ISSUE
            </Link>
          )}
        </div>

        <Link
          href={`/magazine/${issue.slug}`}
          className="block text-center mt-3 text-[10px] font-mono text-[#71717a] hover:text-[#d4a020] transition-colors"
        >
          VIEW DETAILS &rarr;
        </Link>
      </div>
    </div>
  );
}

function PreviewPanel({ issue }: { issue: Issue }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = issue.teaserImages;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-end pr-8">
      <div className="pointer-events-auto max-w-md w-full bg-[#0c0c14] border border-[#d4a020]/40 rounded-lg shadow-2xl shadow-[#d4a020]/10 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Image */}
        <div className="relative aspect-[8.5/11] bg-[#08080c]">
          <Image
            src={images[currentImage]}
            alt={`Page ${currentImage + 1}`}
            fill
            className="object-contain"
            sizes="400px"
            priority
          />

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage((i) => (i > 0 ? i - 1 : images.length - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#08080c]/80 border border-[#2a2a3a] flex items-center justify-center text-zinc-400 hover:text-[#d4a020] hover:border-[#d4a020] transition-colors"
              >
                &larr;
              </button>
              <button
                onClick={() => setCurrentImage((i) => (i < images.length - 1 ? i + 1 : 0))}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#08080c]/80 border border-[#2a2a3a] flex items-center justify-center text-zinc-400 hover:text-[#d4a020] hover:border-[#d4a020] transition-colors"
              >
                &rarr;
              </button>
            </>
          )}

          {/* Page indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentImage ? "bg-[#d4a020]" : "bg-[#2a2a3a]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info bar */}
        <div className="px-4 py-3 border-t border-[#2a2a3a]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#d4a020]">
              ISSUE {issue.slug} — PAGE {currentImage + 1} OF {images.length}
            </span>
            <Link
              href={`/magazine/${issue.slug}`}
              className="text-[10px] font-mono text-zinc-400 hover:text-[#d4a020] transition-colors"
            >
              FULL DETAILS &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IssueGallery({ issues }: { issues: Issue[] }) {
  const [hoveredIssue, setHoveredIssue] = useState<Issue | null>(null);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <IssueCard key={issue.slug} issue={issue} onHover={setHoveredIssue} />
        ))}
      </div>

      {/* Desktop hover preview panel */}
      {hoveredIssue && (
        <div className="hidden lg:block">
          <PreviewPanel issue={hoveredIssue} />
        </div>
      )}
    </div>
  );
}
