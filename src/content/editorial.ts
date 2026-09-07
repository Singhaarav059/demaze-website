import type { Project } from "./projects";

/**
 * Editorial treatments sit beside the project records rather than inside them.
 * `projects.ts` is the factual register (what was built, for which sector);
 * this file is the voice: the short title a card can carry, the framing of the
 * problem, and the authored visual study each project gets. Keep every figure
 * here illustrative and say so in the UI.
 */
export type VisualKind =
  | "dashboard"
  | "flow"
  | "grid"
  | "mobile"
  | "board"
  | "document"
  | "frames";

export type Tone = "blue" | "sage" | "clay" | "plum" | "teal" | "ink";

export type ProjectEditorial = {
  /** Short, card-sized title. */
  title: string;
  /** One or two sentences for a card. */
  summary: string;
  /** The operational problem, in the client's terms. */
  context: string;
  /** How the work was approached, as short paragraphs. */
  approach: string[];
  /** What changed, as short statements. Illustrative, not audited. */
  outcome: string[];
  visual: {
    kind: VisualKind;
    tone: Tone;
    /** Product name shown inside the study. */
    brand: string;
    /** Scene labels; each visual kind reads a fixed number of them. */
    labels: string[];
    /** Headline figure inside the study. */
    figure: string;
    figureLabel: string;
  };
};

export const homeCopy = {
  eyebrow: "AI systems, shipped and kept running",
  intro:
    "We turn complex operations into products people actually use: valuation engines for dealers, case files for investigators, storefronts that know their customers. From the first data model to the software a business runs on.",
  workIntro:
    "Four studies from sixteen engagements. Each began with an operation that had outgrown its spreadsheets, and ended with a system the team still opens every morning.",
};

export const projectEditorial: Record<Project["slug"], ProjectEditorial> = {
  "luxury-car-dealer-software": {
    title: "A dealership that knows what every car is worth",
    summary:
      "Valuation, EMI, refurbishment and the sales backend in one platform, so a vehicle moves from intake to sale without leaving the system.",
    context:
      "Luxury dealer groups were running four disconnected tools and a lot of WhatsApp. A used car was valued by instinct, refurbished on a paper estimate and sold from a spreadsheet nobody trusted.",
    approach: [
      "We began with the data model for a vehicle's life inside the dealership: intake, inspection, valuation, reconditioning, listing, sale. Every screen was designed against that model rather than against a department.",
      "Valuation pulls live market comparables and adjusts for condition and region, then shows its reasoning so a sales manager can override it with a record of why.",
      "Refurbishment costing and EMI calculation share the same vehicle record, so the number a customer hears matches the one finance approves.",
    ],
    outcome: [
      "One record per vehicle from intake to sale.",
      "Valuations explained, not just asserted.",
      "Sales, finance and workshop working from the same screen.",
    ],
    visual: {
      kind: "dashboard",
      tone: "blue",
      brand: "dealerOS",
      labels: ["Suggested buy price", "Market comparables", "Condition", "Days to sale"],
      figure: "58.4L",
      figureLabel: "INR, live market",
    },
  },
  "investigative-case-management": {
    title: "A case file that connects its own evidence",
    summary:
      "Web-based case management for private investigators, with AI-assisted tooling for documents, media and workflow.",
    context:
      "Investigators held cases across folders, inboxes and notebooks. The relationships between pieces of evidence lived in one person's head, and left with them.",
    approach: [
      "Every artefact, from a bank statement to a CCTV still, becomes a typed record that can be linked to people, places and events. The links are the product.",
      "Document automation drafts the routine paperwork from the case record; the investigator edits rather than retypes.",
      "Access is role-based and every view is logged, because the client's own evidence-handling standards had to survive an audit.",
    ],
    outcome: [
      "Case context visible to a whole team, not one investigator.",
      "Routine documents generated from the record.",
      "Subscription pricing with automated deposits.",
    ],
    visual: {
      kind: "flow",
      tone: "ink",
      brand: "casefile",
      labels: ["Statement", "CCTV still", "Email thread", "Field notes"],
      figure: "8",
      figureLabel: "linked artefacts",
    },
  },
  "luxury-ecommerce-platform": {
    title: "Luxury retail that adapts to the person browsing",
    summary:
      "A sustainability-led luxury storefront with AI search, virtual try-ons, personalised pricing models and a drag-and-drop CMS.",
    context:
      "The client wanted a premium digital experience that could carry live selling, product authentication and personalisation without feeling like a marketplace template.",
    approach: [
      "Merchandising, search and recommendations share one product graph, so a change in the CMS reaches the storefront, the live-selling stream and the recommendation engine at once.",
      "Try-on and visual search were built as services behind the storefront rather than plugins on top of it, which kept the front end fast.",
      "Operations got a dashboard that reads the same events the storefront emits: orders, returns, authentication checks, stock.",
    ],
    outcome: [
      "One product graph across storefront, CMS and analytics.",
      "Personalisation without a second catalogue.",
      "Authentication and inventory in the operations view.",
    ],
    visual: {
      kind: "grid",
      tone: "clay",
      brand: "maison",
      labels: ["Curated for you", "Try on", "Authenticated", "Live now"],
      figure: "4.8",
      figureLabel: "relevance score",
    },
  },
  "senior-engagement-platform": {
    title: "A community platform built for seniors, not around them",
    summary:
      "Coaching, meetups, conversations and a companion community, designed for older adults and the people who support them.",
    context:
      "Sukoon Unlimited needed a platform that reduced isolation, which meant every interaction had to be legible, forgiving and warm on the devices seniors actually own.",
    approach: [
      "We designed for large type, slow networks and one-handed use first, then scaled the interface up rather than down.",
      "Speaking with a Sarathi, joining a club and booking a coaching session are the same three-step pattern, so the platform is learnt once.",
      "Moderation and safeguarding tools sit with the community team, with clear escalation paths.",
    ],
    outcome: [
      "One interaction pattern across coaching, clubs and meetups.",
      "Readable on modest phones and tablets.",
      "A community team with the tools to keep it safe.",
    ],
    visual: {
      kind: "mobile",
      tone: "sage",
      brand: "Sukoon",
      labels: ["Speak with a Sarathi", "Club Sukoon, 6pm", "Coaching session", "Sukoon Corner"],
      figure: "3",
      figureLabel: "conversations today",
    },
  },
  "multi-vendor-ecommerce-marketplace": {
    title: "A marketplace where good causes share the checkout",
    summary:
      "Australia and New Zealand's multi-vendor marketplace with drop auctions, currency conversion and a near-perfect Lighthouse score.",
    context:
      "Shoppers, retailers and charities needed one storefront: category browsing, wishlists, live drop auctions and many payment options, fast enough to compete on mobile.",
    approach: [
      "Performance was a product requirement, so rendering, imagery and third-party scripts were budgeted from the start.",
      "Auctions run on their own real-time service, isolated from the catalogue so a busy drop cannot slow browsing.",
      "Vendor onboarding, payouts and cause allocations are modelled explicitly rather than bolted onto orders.",
    ],
    outcome: [
      "99 Lighthouse performance on the storefront.",
      "Drop auctions without touching catalogue speed.",
      "Retailers and causes settled from the same order record.",
    ],
    visual: {
      kind: "grid",
      tone: "teal",
      brand: "marketplace",
      labels: ["Drop auction", "Wishlist", "AUD / NZD", "For good"],
      figure: "99",
      figureLabel: "Lighthouse",
    },
  },
  "food-grocery-delivery-app": {
    title: "Three apps, one neighbourhood delivery network",
    summary:
      "Flutter apps for customers, sellers and riders with a React admin, so local shops can run a digital store and its deliveries.",
    context:
      "Local vendors wanted to sell groceries, household goods and restaurant food online without a national aggregator taking the relationship.",
    approach: [
      "Customer, seller and rider apps share one order state machine, so every party sees the same truth about a delivery.",
      "Sellers control their own catalogue, opening hours and delivery areas; the admin sets the rules of the network.",
      "Rider assignment weighs distance, load and shop readiness instead of first-come dispatch.",
    ],
    outcome: [
      "One order state across three apps.",
      "Shops in control of their own store and delivery areas.",
      "Dispatch that considers the shop, not just the map.",
    ],
    visual: {
      kind: "mobile",
      tone: "clay",
      brand: "Basket",
      labels: ["Preparing", "Rider assigned", "12 min away", "Delivered"],
      figure: "12",
      figureLabel: "min to door",
    },
  },
  "car-service-engagement-platform": {
    title: "A service department that remembers every customer",
    summary:
      "Web and mobile tooling for an authorised dealership's service arm: reminders, tracking, role-based access and live analytics.",
    context:
      "Preventive maintenance, general repairs and body-and-paint each had their own way of tracking a customer. Reminders went out late or twice.",
    approach: [
      "One customer and vehicle record underneath all three service lines, with the workflow differences expressed as stages, not separate systems.",
      "Automated communication is driven by the record: a due date, a completed job or a delayed part triggers the right message.",
      "Managers see live throughput and satisfaction by line, bay and advisor.",
    ],
    outcome: [
      "Reminders from the record, not the calendar.",
      "Three service lines on one customer view.",
      "Real-time analytics for the service manager.",
    ],
    visual: {
      kind: "dashboard",
      tone: "teal",
      brand: "serviceDesk",
      labels: ["Bays in use", "Due this week", "Satisfaction", "Avg. turnaround"],
      figure: "96%",
      figureLabel: "on-time completion",
    },
  },
  "b2b-gift-marketplace": {
    title: "Manufacturers and resellers on one gifting ledger",
    summary:
      "A multi-vendor B2B platform connecting gift manufacturers with resellers, with AI product discovery and an admin that sees the whole system.",
    context:
      "Gifting orders travelled by phone and PDF. Resellers could not see stock, manufacturers could not see demand, and administrators reconciled everything by hand.",
    approach: [
      "A reseller app, a manufacturer portal and an admin console, each a view on the same catalogue and order book.",
      "Discovery uses product embeddings so a reseller can search by occasion and budget, not just SKU.",
      "Production capacity is part of the order flow, so a large order is confirmed against what can actually be made.",
    ],
    outcome: [
      "Shared stock and demand across the network.",
      "Search by occasion, budget and lead time.",
      "Orders confirmed against real capacity.",
    ],
    visual: {
      kind: "grid",
      tone: "plum",
      brand: "giftwire",
      labels: ["Diwali corporate", "MOQ 250", "Ships in 6 days", "Reseller price"],
      figure: "250",
      figureLabel: "unit minimum",
    },
  },
  "global-payment-transfer-platform": {
    title: "Cross-border money without the correspondent bank",
    summary:
      "A stablecoin-based transfer platform for fast, low-cost international payments for individuals and businesses.",
    context:
      "Traditional remittance meant days of settlement and layered fees. The client wanted transfers that felt instant and cost what they should.",
    approach: [
      "On-ramp, transfer and off-ramp are separate services with explicit states, so a stuck transfer is visible rather than mysterious.",
      "Compliance checks run inside the flow with clear reasons surfaced to the user when something needs review.",
      "Fees, rates and arrival estimates are quoted before confirmation and held for the quote window.",
    ],
    outcome: [
      "Minutes rather than days to settle.",
      "Every transfer state visible to support and user.",
      "Fees quoted up front and honoured.",
    ],
    visual: {
      kind: "flow",
      tone: "blue",
      brand: "relay",
      labels: ["Sender", "Compliance", "Stablecoin rail", "Recipient"],
      figure: "4m",
      figureLabel: "typical settlement",
    },
  },
  "cma-report-generation-software": {
    title: "Credit reports assembled, not typed",
    summary:
      "A cloud platform that prepares, edits and finalises Credit Monitoring Arrangement reports with all tables and charts, exported to PDF and Excel.",
    context:
      "Preparing a CMA report meant days in spreadsheets and a final formatting pass that introduced its own errors.",
    approach: [
      "Financial inputs are captured once, validated, and flow into every dependent table and ratio.",
      "The editor shows the report as the bank will read it, with charts regenerated as figures change.",
      "PDF and Excel exports come from the same model so they never disagree.",
    ],
    outcome: [
      "Reports prepared in hours, not days.",
      "Tables and charts that stay consistent.",
      "Exports that match each other.",
    ],
    visual: {
      kind: "document",
      tone: "ink",
      brand: "CMA Studio",
      labels: ["Projected balance sheet", "Fund flow", "Ratio analysis", "MPBF"],
      figure: "1.42",
      figureLabel: "current ratio",
    },
  },
  "recruitment-platform": {
    title: "Hiring pipelines with the conversation built in",
    summary:
      "A recruitment consultancy platform with job listings, candidate tracking from application to offer, real-time chat and reporting.",
    context:
      "Employers lost candidates between the interview and the offer because the conversation lived in a different tool from the pipeline.",
    approach: [
      "Each candidate moves through a visible pipeline, with the chat thread attached to the stage rather than floating beside it.",
      "Employers create and manage listings themselves; consultants see the whole book of work.",
      "Reporting covers time-in-stage and drop-off so the consultancy can fix its process, not just its throughput.",
    ],
    outcome: [
      "Pipeline and conversation in one place.",
      "Self-service listings for employers.",
      "Drop-off visible by stage.",
    ],
    visual: {
      kind: "board",
      tone: "teal",
      brand: "talentline",
      labels: ["Applied", "Interview", "Offer", "Joined"],
      figure: "18d",
      figureLabel: "median time to offer",
    },
  },
  "task-staff-document-platform": {
    title: "Field, office and documents in one agency workspace",
    summary:
      "A cross-platform system for insurance and investment agencies: task assignment, WebSocket messaging and family-wise document storage.",
    context:
      "Agencies ran on paper files and phone calls. A policy document could be anywhere; a task could be with anyone.",
    approach: [
      "Tasks carry an owner, a due date and a follow-up chain, and heads see them by person and by client family.",
      "Documents are filed under the policy or investment holder they belong to, with search that understands that structure.",
      "Real-time messaging is attached to the task, so the discussion never loses its subject.",
    ],
    outcome: [
      "Every task with an owner and a follow-up.",
      "Documents findable by family and policy.",
      "Conversations attached to the work.",
    ],
    visual: {
      kind: "board",
      tone: "plum",
      brand: "agencyDesk",
      labels: ["Assigned", "In progress", "Follow up", "Done"],
      figure: "42",
      figureLabel: "open tasks",
    },
  },
  "educational-courses-lms-platform": {
    title: "A learning platform that tracks progress, not just enrolment",
    summary:
      "Courses, assessments and certificates for learners and instructors, with the analytics an academy needs to improve its teaching.",
    context:
      "The academy sold courses but could not see where learners stalled. Completion was a guess.",
    approach: [
      "Lessons, quizzes and assignments are events on a learner timeline, so progress is measured, not inferred from log-ins.",
      "Instructors author once and publish to web and mobile with the same structure.",
      "Certificates are issued from verified completion and can be checked by anyone with the code.",
    ],
    outcome: [
      "Progress visible lesson by lesson.",
      "One course structure across devices.",
      "Verifiable certificates.",
    ],
    visual: {
      kind: "dashboard",
      tone: "sage",
      brand: "learnbase",
      labels: ["Completion", "Active learners", "Avg. quiz score", "Certificates issued"],
      figure: "78%",
      figureLabel: "cohort completion",
    },
  },
  "ai-storyboard-platform": {
    title: "Storyboards drafted from the script, revised by the director",
    summary:
      "An AI-assisted storyboard tool for film: scene breakdown, generated frames, camera notes and a board that exports to the shoot.",
    context:
      "Pre-production teams spent weeks on boards that changed the moment the script did. Revisions meant redrawing.",
    approach: [
      "The script is parsed into scenes and beats; each beat becomes a frame with a prompt the artist can steer.",
      "Frames keep their shot metadata, so a change in lens or blocking is a field edit, not a new drawing.",
      "The board exports as a shooting document with continuity notes and a timeline.",
    ],
    outcome: [
      "A first board in hours, not weeks.",
      "Revisions as edits, not redraws.",
      "Shot metadata that survives to the set.",
    ],
    visual: {
      kind: "frames",
      tone: "ink",
      brand: "boardroom",
      labels: ["Sc. 12A wide", "Sc. 12B two-shot", "Sc. 12C insert", "Sc. 13 exterior"],
      figure: "48",
      figureLabel: "frames this scene",
    },
  },
  "insurance-management-platform": {
    title: "Every policy in one place, every premium on time",
    summary:
      "A personal insurance hub: health, auto and more in one app, with timely notifications for premiums and coverage updates.",
    context:
      "People held policies across insurers and forgot due dates. Missed premiums lapsed cover they were still paying for.",
    approach: [
      "Policies are modelled generically enough to cover health, motor, life and property while keeping the fields each type needs.",
      "Reminders are scheduled from the policy, with quiet escalation as a due date approaches.",
      "The interface leads with what needs attention, then everything else.",
    ],
    outcome: [
      "All policies in one hub.",
      "Reminders that escalate sensibly.",
      "Attention first, archive second.",
    ],
    visual: {
      kind: "mobile",
      tone: "blue",
      brand: "InsureTech",
      labels: ["Health, due in 4 days", "Motor, active", "Term life, active", "Home, renew Nov"],
      figure: "4",
      figureLabel: "policies covered",
    },
  },
  "social-commerce-platform": {
    title: "Communities that shop from each other",
    summary:
      "A social platform where interest groups share, compete on leaderboards and trade peer-to-peer using in-app crypto wallets.",
    context:
      "The client wanted a space where creators, consumers and brands meet around interests, with commerce as a natural extension rather than an advert.",
    approach: [
      "Groups, posts and listings share one identity and reputation model, so trust built in a community carries into a trade.",
      "Wallets are custodial with clear balances and receipts; the crypto is infrastructure, not the pitch.",
      "Leaderboards and brand promotions run on the same event stream as posts and purchases.",
    ],
    outcome: [
      "Reputation that follows the user into commerce.",
      "Wallets people can understand.",
      "Brands and creators on the same rails.",
    ],
    visual: {
      kind: "mobile",
      tone: "plum",
      brand: "circle",
      labels: ["Dance crew, 1.2k", "Listing: studio mic", "Leaderboard #3", "Wallet 240.00"],
      figure: "1.2k",
      figureLabel: "members in your circle",
    },
  },
};
