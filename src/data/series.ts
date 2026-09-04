// FractalNode — Investigative Series
// A series is a run of articles that share a case file, a prediction ledger,
// and a verify-before-print list. The ledger is the product: every bet is
// dated, graded, and left standing whether it held or not.
//
// House rule: statuses here must match the drafts and case file exactly.
// Never upgrade a bet in this file. Grade it in the text first, then mirror it.

import { articles, getSeriesArticles, type Article } from "./articles";

export type PredictionStatus = "confirmed" | "supported" | "open" | "half-wrong" | "wrong";
export type PredictionHorizon = "12mo" | "24mo" | "sweep";

export type Prediction = {
  id: string;
  text: string;
  /** Date the bet was written down, before the evidence was gathered. */
  madeOn: string;
  /** "sweep" = pre-registered before a research sweep and graded on its results. */
  horizon: PredictionHorizon;
  status: PredictionStatus;
  gradedOn?: string;
  note?: string;
};

export type Series = {
  id: string;
  title: string;
  standfirst: string;
  status: "live" | "closed";
  caseFileUrl?: string;
  audioUrl?: string;
  predictions: Prediction[];
  verifyBeforePrint: string[];
};

export const series: Series[] = [
  {
    id: "002",
    title: "The Machine Nobody Audits",
    standfirst:
      "An executive order fused the frontier AI industry with the nuclear-weapons complex. The money behind the build-out was moved off the balance sheets and into pensions. The insurers wrote AI out of the policy. The electricity bill went up. Seven parts, one method: predictions written down before the evidence, graded in the text, receipts public.",
    status: "live",
    audioUrl: "/audio/genesis-file-overview.mp3",
    predictions: [
      // ── Sweep 1 (bubble anatomy / honest money), pre-registered 2026-09-03 ──
      {
        id: "s1-gap",
        text: "The gap between AI revenue and capital spending is an order of magnitude.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "Confirmed and understated: $630–725B of 2026 hyperscaler capex against ~$108B of run-rate lab revenue, none of it profitable.",
      },
      {
        id: "s1-deals",
        text: "The headline AI deals are mostly intentions, not contracts.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "Confirmed with a real contracted core (Microsoft–OpenAI $250B Azure, NVIDIA–CoreWeave backstop, AMD warrants). The $100B NVIDIA–OpenAI figure remains a letter of intent.",
      },
      {
        id: "s1-insurers",
        text: "Insurers are excluding AI risk rather than pricing it.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "ISO form CG 40 47 01 26 effective Jan 2026; six carriers filed exclusions; >80% approved.",
      },
      {
        id: "s1-plateau",
        text: "Scaling has plateaued.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "supported",
        gradedOn: "2026-09-03",
        note: "Held loosely, then upgraded on the second sweep. Not 'AI stopped improving' but 'each dollar buys less, and the improvement got costlier to serve.'",
      },
      {
        id: "s1-china",
        text: "China is running a state-buffered mirror bubble.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "Partial on the first sweep, confirmed on the second: 20–30% utilization in the western data centers, 100+ projects cancelled in 18 months.",
      },
      // ── Sweep 3 (Genesis ROI / physical layer / direction of the field) ──
      {
        id: "s3-genesis",
        text: "Genesis Mission deliverables are thin and the value flows to incumbents.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "Sharper than the bet: no shipped weights, no dataset portal, no GAO/IG product, and a contract template that makes open release optional.",
      },
      {
        id: "s3-compute",
        text: "Compute is concentrated in fewer than ten entities, and federal compute is wired to them.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "Five hyperscalers own ~71% of global AI compute (Epoch, Apr 2026). The Genesis showcase machines are Oracle- and NVIDIA-built.",
      },
      {
        id: "s3-ratepayer",
        text: "The ratepayer subsidy is larger than the public knows, and states are revolting.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "PJM cleared at the price cap three auctions running; 70% of Americans oppose a local data center; New York EO 62 moratorium.",
      },
      {
        id: "s3-open-weights",
        text: "Open weights are a moat, not a gift.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "Every US lab's open model is a tier below its flagship; every Chinese lab's open model is its flagship.",
      },
      {
        id: "s3-roadmaps",
        text: "Lab roadmaps converge on agents and inference-time compute.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "Top three labs within a point on GPQA; the product is agents on rented compute, billed by the token.",
      },
      // ── Sweep 4 (robotics / geopolitics / money plumbing) ──
      {
        id: "s4-wars",
        text: "The wars are already AI procurement channels.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "CDAO declaration: a government Grok instance supported 2,000+ munitions in 96 hours. FY27 defense request ~$1.5T with AI named a priority.",
      },
      {
        id: "s4-taiwan",
        text: "Taiwan is the single point of failure under the whole build-out.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "TSMC ~70% foundry share; Arizona at scale 2028–2030; 40-day airspace closures in spring 2026.",
      },
      {
        id: "s4-brics",
        text: "Dedollarization matters to this story more than the AI competition does.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "confirmed",
        gradedOn: "2026-09-03",
        note: "Confirmed in an unexpected direction: BRICS is thin; the dollar is being propped, not replaced, via a stablecoin channel into short-term Treasuries.",
      },
      {
        id: "s4-robotics",
        text: "Robotics is a real second wind for AI demand.",
        madeOn: "2026-09-03",
        horizon: "sweep",
        status: "half-wrong",
        gradedOn: "2026-09-03",
        note: "Robotics is a customer of compute, not a source of revenue. Global humanoid revenue plausibly under $1B; Figure buys up to 100K GPUs on venture money.",
      },
      // ── Projections, 12 months (from THE CORRECTION, "The Predictions, Projected") ──
      {
        id: "p12-rescue",
        text: "Oracle or CoreWeave will need a rescue financing, a restructuring, or a sale, and the counterparty will be a private-credit fund, a sovereign wealth fund, or NVIDIA.",
        madeOn: "2026-09-03",
        horizon: "12mo",
        status: "open",
      },
      {
        id: "p12-leases",
        text: "At least one hyperscaler will convert self-build plans to leases at scale, as Microsoft already began.",
        madeOn: "2026-09-03",
        horizon: "12mo",
        status: "open",
      },
      {
        id: "p12-markdown",
        text: "The first pension fund or life insurer will disclose a mark-down on data-center private credit.",
        madeOn: "2026-09-03",
        horizon: "12mo",
        status: "open",
      },
      {
        id: "p12-lifeboat",
        text: "Genesis will announce its first \"compute resilience\" or \"industrial base\" partnership absorbing partner-financed capacity, and no document will call it a backstop.",
        madeOn: "2026-09-03",
        horizon: "12mo",
        status: "open",
      },
      {
        id: "p12-defense-line",
        text: "The FY27 defense bill will carry the first AI line item above $10 billion.",
        madeOn: "2026-09-03",
        horizon: "12mo",
        status: "open",
      },
      // ── Projections, 24 months ──
      {
        id: "p24-correction",
        text: "The correction arrives, and it does not hit the five. It hits the second tier, the SPV lenders, and the terminal holders.",
        madeOn: "2026-09-03",
        horizon: "24mo",
        status: "open",
      },
      {
        id: "p24-critical-infra",
        text: "NVIDIA and the hyperscalers will describe stranded capacity as \"critical infrastructure\" and seek federal offtake through Genesis, defense, or a new authority.",
        madeOn: "2026-09-03",
        horizon: "24mo",
        status: "open",
      },
      {
        id: "p24-threshold",
        text: "Open-weight release above a capability threshold will be restricted by executive action, framed as security.",
        madeOn: "2026-09-03",
        horizon: "24mo",
        status: "open",
      },
      {
        id: "p24-moratoria",
        text: "At least two more states will impose data-center moratoria, and Congress will preempt them.",
        madeOn: "2026-09-03",
        horizon: "24mo",
        status: "open",
      },
      {
        id: "p24-fusion",
        text: "The labs that survive will be fewer, larger, and more fused with the state, and the question of what the things they built are owed will not have been asked in any hearing.",
        madeOn: "2026-09-03",
        horizon: "24mo",
        status: "open",
      },
    ],
    verifyBeforePrint: [
      "The Stanley (CDAO) declaration, pulled from PACER",
      "The originating outlet for the Anthropic–Maven targeting report",
      "TSMC's Q2 2026 investor release",
      "The latest Tether and Circle reserve attestations",
      "The FY27 CDAO budget justification book",
      "NRDC's $70-per-month primary",
      "The Solstice and Lux financing terms (FOIA)",
      "The MIT NANDA original for the 95 percent figure",
      "The date of Oracle's S&P downgrade",
      "Moody's July 24, 2026 primary and the IMF GFSR April 2026 chapter citation",
      "The ISO CG 40 47 form text and state approval records for Berkshire, Chubb, and Travelers",
      "FERC's June 18, 2026 show-cause orders and the xAI preliminary-injunction ruling",
      "The July 27 open-weights letter's full signatory list and the Commerce directive text",
    ],
  },
];

export function getSeries(id: string) {
  return series.find((s) => s.id === id);
}

/** Parts of a series, in order. Drafts included only when asked (local review). */
export function getSeriesParts(id: string, includeDrafts = false): Article[] {
  return getSeriesArticles(id, includeDrafts);
}

/** Series that have at least one public part. */
export function getPublicSeries() {
  return series.filter((s) => articles.some((a) => a.series?.id === s.id && !a.draft));
}
