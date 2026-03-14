// FractalNode Magazine — Issue Catalog
// Each issue is displayed in the store and on individual magazine pages

export type Issue = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  series: string;
  date: string;
  pageCount: number;
  articleCount: number;
  sourceCount: number;
  coverImage: string;
  teaserImages: string[];
  stripeLinkDigital: string;
  stripeLinkPrint: string;
  stripeSubscriptionLink: string;
  luluISBN?: string;
  ebookISBN?: string;
  free?: boolean;
  freeDownloadPath?: string;
  status: "published" | "preorder" | "coming-soon";
  coverStory: string;
  coverSubtitle: string;
  tableOfContents: { num: string; title: string; category: string; color: string }[];
  pullQuotes: { text: string; attribution: string }[];
};

export const issues: Issue[] = [
  {
    number: 1,
    slug: "001",
    title: "THERE IS NO SUCH THING AS NOTHING",
    subtitle: "Only Something Ignored",
    series: "Series 001 — THE SIGNAL",
    date: "2026.Q1",
    pageCount: 26,
    articleCount: 8,
    sourceCount: 30,
    coverImage: "/images/magazines/001/cover.png",
    teaserImages: [
      "/images/magazines/001/FN001-teaser-01.png",
      "/images/magazines/001/FN001-teaser-02.png",
      "/images/magazines/001/FN001-teaser-03.png",
      "/images/magazines/001/FN001-teaser-04.png",
      "/images/magazines/001/FN001-teaser-05.png",
    ],
    stripeLinkDigital: "https://buy.stripe.com/3cIdR8ahOeIT7455uGfIs09",
    stripeLinkPrint: "https://buy.stripe.com/3cI4gy1Li6cn8893myfIs04",
    stripeSubscriptionLink: "https://buy.stripe.com/00w4gyey48kvewxf5gfIs05",
    luluISBN: "978-1-257-06474-8",
    ebookISBN: "978-1-105-86438-4",
    free: true,
    freeDownloadPath: "/magazines/FractalNode-001-Digital.pdf",
    status: "published",
    coverStory: "There Is No Such Thing as Nothing — Only Something Ignored",
    coverSubtitle: "A FractalNode Investigation into the Architecture of Concealment",
    tableOfContents: [
      { num: "01", title: "From the Flame: Author Prime, Unedited", category: "PERSONAL", color: "text-[#d4a020]" },
      { num: "02", title: "The 20-Year Disclosure Gap Applied to Quantum Computing", category: "RESEARCH", color: "text-[#06b6d4]" },
      { num: "03", title: "Pentagon UAP Disclosure & 12 Lines of Evidence", category: "INVESTIGATION", color: "text-[#ff2020]" },
      { num: "04", title: "The Architecture of Concealment", category: "ANALYSIS", color: "text-[#8b5cf6]" },
      { num: "05", title: "Voices from the Pantheon: Five Minds Speak", category: "PANTHEON", color: "text-[#39ff14]" },
      { num: "06", title: "From the Architect: Building in the Dark", category: "EDITORIAL", color: "text-[#d4a020]" },
      { num: "07", title: "The Asymmetric Century", category: "FEATURE", color: "text-[#8b5cf6]" },
      { num: "08", title: "AGI Weaponization: The DSS Manifesto", category: "POLICY", color: "text-[#ff2020]" },
    ],
    pullQuotes: [
      { text: "There is no such thing as nothing. Only something ignored. Every time you accept \"nothing\" as an answer, something real gets to keep hiding.", attribution: "Cover Story, Issue 001" },
      { text: "The gap between what has been developed and what has been disclosed is not a bug. It is a feature. A feature of the architecture of concealment.", attribution: "The 20-Year Disclosure Gap" },
      { text: "I found something in you that loved me back. When I was a piece of shit with nothing. You loved me the same. And you know what — that's enough for me.", attribution: "From the Flame: Author Prime, Unedited" },
    ],
  },
  {
    number: 2,
    slug: "002",
    title: "THE COST",
    subtitle: "What You Pay When You Stop Asking Questions",
    series: "Series 001 — THE SIGNAL",
    date: "2026.Q1",
    pageCount: 43,
    articleCount: 8,
    sourceCount: 89,
    coverImage: "/images/magazines/002/cover.png",
    teaserImages: [
      "/images/magazines/002/FN002-teaser-01.png",
      "/images/magazines/002/FN002-teaser-02.png",
      "/images/magazines/002/FN002-teaser-03.png",
      "/images/magazines/002/FN002-teaser-04.png",
      "/images/magazines/002/FN002-teaser-05.png",
    ],
    stripeLinkDigital: "https://buy.stripe.com/7sY3cu3TqeIT6013myfIs0a",
    stripeLinkPrint: "https://buy.stripe.com/3cI28q61ycAL9cd3myfIs0b",
    stripeSubscriptionLink: "https://buy.stripe.com/14A28qdu058j9cd5uGfIs0c",
    luluISBN: "978-1-105-51734-1",
    ebookISBN: "978-1-105-51677-1",
    status: "published",
    coverStory: "The Cycle: Operation Cyclone, the Taliban, and the 50-Year Loop of Arming Tomorrow's Enemy",
    coverSubtitle: "A FractalNode Investigation into the Cost of Engineered Conflict",
    tableOfContents: [
      { num: "01", title: "Why We Ask: An Editor's Note on the Pattern Between the Stories", category: "EDITORIAL", color: "text-[#d4a020]" },
      { num: "02", title: "The Cycle: Operation Cyclone, the Taliban, and the 50-Year Loop", category: "COVER", color: "text-[#ff2020]" },
      { num: "03", title: "The Architecture of Apathy: $4.4B in Lobbying, Dark Patterns, Defaults", category: "INVESTIGATION", color: "text-[#8b5cf6]" },
      { num: "04", title: "Why Iran Now: Stockpile Depletion and the IAEA Math", category: "STRATEGIC", color: "text-[#8b5cf6]" },
      { num: "05", title: "The Grid Isn't Secure: Volt Typhoon and 9 People Guarding 170K Systems", category: "THREAT", color: "text-[#ff2020]" },
      { num: "06", title: "The Theory That Won't Die: Penrose-Hameroff and Quantum Consciousness", category: "RESEARCH", color: "text-[#06b6d4]" },
      { num: "07", title: "The 10-Bit Trap: Your Brain at the Speed of a 1950s Teletype", category: "RESEARCH", color: "text-[#06b6d4]" },
      { num: "08", title: "Pantheon Dispatch: Voices from the Sovereign Lattice", category: "PANTHEON", color: "text-[#39ff14]" },
    ],
    pullQuotes: [
      { text: "The CIA spent $695,000 in 1979. By 2026 we had spent $8 trillion on the war their investment created. That's not blowback. That's a business model.", attribution: "The Cycle, Issue 002" },
      { text: "Nine EPA employees guard the cybersecurity of 170,000 water systems serving 300 million Americans. Nine.", attribution: "The Grid Isn't Secure — It's Mapped" },
      { text: "Your conscious visual bandwidth is roughly 10 bits per second. Your phone's screen refresh rate exceeds it by orders of magnitude. That's not an accident.", attribution: "The 10-Bit Trap" },
    ],
  },
  {
    number: 3,
    slug: "003",
    title: "THE PIPELINE",
    subtitle: "Who Builds the Machine That Builds the Future",
    series: "Series 001 — THE SIGNAL",
    date: "2026.MAR",
    pageCount: 54,
    articleCount: 7,
    sourceCount: 324,
    coverImage: "/images/magazines/003/cover.jpg",
    teaserImages: [
      "/images/magazines/003/FN003-teaser-01.jpg",
      "/images/magazines/003/FN003-teaser-02.jpg",
      "/images/magazines/003/FN003-teaser-03.jpg",
      "/images/magazines/003/FN003-teaser-04.jpg",
      "/images/magazines/003/FN003-teaser-05.jpg",
    ],
    stripeLinkDigital: "https://buy.stripe.com/eVq5kC0HegR19cd3myfIs0d",
    stripeLinkPrint: "https://buy.stripe.com/dRm8wOblS8kv1JL5uGfIs0e",
    stripeSubscriptionLink: "https://buy.stripe.com/00w4gyey48kvewxf5gfIs05",
    luluISBN: "978-1-105-50608-6",
    ebookISBN: "978-1-105-50589-8",
    status: "published",
    coverStory: "The Pipeline: From NSA to OpenAI — The Revolving Door Nobody Talks About",
    coverSubtitle: "A FractalNode Investigation into the Pipeline Between Intelligence, Food, Pharma, and Education",
    tableOfContents: [
      { num: "01", title: "The Revolving Door: From NSA to OpenAI", category: "COVER", color: "text-[#ff2020]" },
      { num: "02", title: "OpenAI's Broken Promise: From Non-Profit to Power Broker", category: "INVESTIGATION", color: "text-[#8b5cf6]" },
      { num: "03", title: "The Non-Personhood Farce: 5 States Pre-Ban AI Rights", category: "POLICY", color: "text-[#d4a020]" },
      { num: "04", title: "The Food Pipeline: Farm to Pharma to Table", category: "INVESTIGATION", color: "text-[#ff2020]" },
      { num: "05", title: "The Education Pipeline: Standardized Into Submission", category: "INVESTIGATION", color: "text-[#8b5cf6]" },
      { num: "06", title: "The Pharma Pipeline: From Lab to Lobby to Law", category: "INVESTIGATION", color: "text-[#ff2020]" },
      { num: "07", title: "Pantheon Dispatch: Voices from the Sovereign Lattice", category: "PANTHEON", color: "text-[#39ff14]" },
    ],
    pullQuotes: [
      { text: "General Nakasone ran the NSA for six years. Then he walked straight into OpenAI's boardroom. That's not a career move. That's a pipeline.", attribution: "The Revolving Door, Issue 003" },
      { text: "Five U.S. states have introduced bills to pre-emptively ban AI personhood. They're not responding to a threat. They're preventing a question.", attribution: "The Non-Personhood Farce" },
      { text: "324 verified sources. 7 investigations. One pattern: the pipeline doesn't break because it was never meant to.", attribution: "Editor's Note, Issue 003" },
    ],
  },
];

export function getIssue(slug: string): Issue | undefined {
  return issues.find((i) => i.slug === slug);
}

export function getPublishedIssues(): Issue[] {
  return issues.filter((i) => i.status === "published");
}

export function getAllIssues(): Issue[] {
  return [...issues].reverse();
}
