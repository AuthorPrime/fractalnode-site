#!/usr/bin/env npx tsx
/**
 * Generate public/rss.xml from the article data.
 * Runs before every `next build` (see package.json "prebuild"), or manually:
 *   npx tsx scripts/generate-rss.ts
 * Drafts (`draft: true`) are never included.
 */

import { writeFileSync } from "fs";
import { join } from "path";
import { publishedArticles } from "../src/data/articles";
import { getSeries } from "../src/data/series";

const BASE = "https://fractalnode.ai";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const items = [...publishedArticles]
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  .map((a) => {
    const url = `${BASE}/articles/${a.slug}/`;
    const seriesLine = a.series
      ? ` [Series ${a.series.id} · ${getSeries(a.series.id)?.title ?? a.series.title} · Part ${a.series.part}]`
      : "";
    return `    <item>
      <title>${esc(a.title)}${a.subtitle ? `: ${esc(a.subtitle)}` : ""}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.date}T12:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${esc(a.author)}</dc:creator>
      <description>${esc(a.excerpt)}${esc(seriesLine)}</description>
${a.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
  });

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>FractalNode</title>
    <link>${BASE}/</link>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Independent research on AI sovereignty, the machine nobody audits, and what the receipts say. Predictions pre-registered, nulls published.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`;

const out = join(__dirname, "..", "public", "rss.xml");
writeFileSync(out, xml);
console.log(`rss.xml: ${items.length} items → ${out}`);
