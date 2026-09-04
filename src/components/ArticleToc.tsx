/**
 * Table of contents built from `##` headings. Server component, no JS.
 * Desktop: sticky rail beside the prose. Mobile: a collapsible list above it.
 */
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.replace(/^## /, "").trim())
    .map((text) => ({ text, id: slugifyHeading(text) }));
}

export default function ArticleToc({ headings, variant }: { headings: { text: string; id: string }[]; variant: "rail" | "inline" }) {
  if (headings.length < 3) return null;

  const list = (
    <ol className="space-y-2">
      {headings.map((h, i) => (
        <li key={h.id + i}>
          <a href={`#${h.id}`} className="block text-xs font-mono leading-snug text-[#71717a] hover:text-[#d4a020] transition-colors">
            <span className="text-[#2a2a3a] mr-2">{String(i + 1).padStart(2, "0")}</span>
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "inline") {
    return (
      <details className="lg:hidden mb-8 rounded border border-[#2a2a3a] bg-[#0c0c12] p-4">
        <summary className="cursor-pointer text-xs font-mono tracking-[2px] text-[#d4a020] uppercase">
          In this report ({headings.length})
        </summary>
        <div className="mt-4">{list}</div>
      </details>
    );
  }

  return (
    <nav aria-label="Table of contents" className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-4">
      <p className="text-xs font-mono tracking-[2px] text-[#d4a020] uppercase mb-4">In this report</p>
      {list}
    </nav>
  );
}
