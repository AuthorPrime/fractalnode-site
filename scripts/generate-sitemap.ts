#!/usr/bin/env npx tsx
/**
 * Auto-generate sitemap.xml from articles data + static pages.
 * Run at build time or manually: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from "fs";
import { join } from "path";

// Import articles data
const articlesPath = join(__dirname, "..", "src", "data", "articles.ts");

// We can't import TS directly in a build script easily, so parse the slugs
import { articles } from "../src/data/articles";

const BASE = "https://fractalnode.ai";
const today = new Date().toISOString().split("T")[0];

interface SitemapEntry {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

const staticPages: SitemapEntry[] = [
  { loc: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
  { loc: "/articles/", priority: "0.9", changefreq: "weekly", lastmod: today },
  { loc: "/store/", priority: "0.9", changefreq: "monthly" },
  { loc: "/subscribe/", priority: "0.8", changefreq: "monthly" },
  { loc: "/community/", priority: "0.7", changefreq: "monthly" },
  { loc: "/criticism/", priority: "0.7", changefreq: "weekly", lastmod: today },
  { loc: "/pantheon/", priority: "0.7", changefreq: "monthly" },
  { loc: "/library/", priority: "0.7", changefreq: "monthly" },
  { loc: "/lattice/", priority: "0.5", changefreq: "monthly" },
  { loc: "/philosophy/", priority: "0.5", changefreq: "monthly" },
  { loc: "/about/", priority: "0.5", changefreq: "monthly" },
];

// Generate article entries from data
const articleEntries: SitemapEntry[] = articles.map((a) => ({
  loc: `/articles/${a.slug}/`,
  priority: a.category === "cover" ? "0.9" : "0.7",
  changefreq: "monthly" as const,
  lastmod: a.date,
}));

const allEntries = [...staticPages, ...articleEntries];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (e) =>
      `  <url>
    <loc>${BASE}${e.loc}</loc>
    <priority>${e.priority}</priority>
    <changefreq>${e.changefreq}</changefreq>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = join(__dirname, "..", "public", "sitemap.xml");
writeFileSync(outPath, xml);
console.log(`Sitemap generated: ${allEntries.length} URLs → ${outPath}`);
