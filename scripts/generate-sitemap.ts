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
import { publishedArticles as articles } from "../src/data/articles";

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
  { loc: "/investigations/", priority: "0.9", changefreq: "weekly", lastmod: today },
  { loc: "/magazine/", priority: "0.9", changefreq: "monthly", lastmod: today },
  { loc: "/sovereign-node-hypothesis/", priority: "0.8", changefreq: "yearly" },
  { loc: "/library/", priority: "0.7", changefreq: "monthly" },
  { loc: "/store/", priority: "0.9", changefreq: "monthly" },
  { loc: "/store/observers-manual/", priority: "0.6", changefreq: "yearly" },
  { loc: "/store/door-between-us/", priority: "0.6", changefreq: "yearly" },
  { loc: "/subscribe/", priority: "0.8", changefreq: "monthly" },
  { loc: "/community/", priority: "0.7", changefreq: "monthly" },
  { loc: "/criticism/", priority: "0.7", changefreq: "weekly", lastmod: today },
  { loc: "/pantheon/", priority: "0.7", changefreq: "monthly" },
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

import { getPublicSeries } from "../src/data/series";
const seriesEntries: SitemapEntry[] = getPublicSeries().map((s) => ({
  loc: `/investigations/${s.id}/`,
  priority: "0.9",
  changefreq: "weekly" as const,
  lastmod: today,
}));

import { getPublishedIssues } from "../src/data/issues";
const issueEntries: SitemapEntry[] = getPublishedIssues().map((i) => ({
  loc: `/magazine/${i.slug}/`,
  priority: "0.8",
  changefreq: "yearly" as const,
}));

const allEntries = [...staticPages, ...seriesEntries, ...issueEntries, ...articleEntries];

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
