// ============================================================================
//  Single source of truth for the portfolio content.
//  Edit values here — every section updates automatically.
// ============================================================================

export const profile = {
  name: "Vinit Sontakke",
  fullName: "Vinit Umesh Sontakke",
  role: "Data Engineer",
  // Rotating words shown next to the role in the hero.
  roles: ["Data Engineer", "ETL / ELT Developer", "Data Modeler", "Analytics Engineer"],
  tagline:
    "I turn messy, multi-source data into clean, analysis-ready pipelines — from SAP & ADLS through Snowflake to the reports teams actually use.",
  location: "Pune, India",
  email: "vinitsontakke27@gmail.com",
  phone: "+91 78877 13347",
  phoneHref: "+917887713347",
  available: true,
  // 👇 Replace these with your real profile URLs.
  socials: {
    github: "https://github.com/vinn27",
    linkedin: "https://www.linkedin.com/",
  },
  resumeUrl: "/resume.pdf",
};

export const about = [
  "Data Engineer with 1+ years of hands-on experience in ETL/ELT, SQL, Python and Snowflake — building data-integration workflows that pull from SAP S/4HANA and ADLS Gen2, orchestrated with Azure Data Factory.",
  "I specialize in SQL transformations, data cleansing, incremental (CDC) processing and data-quality validation — with a strong foundation in data warehousing, Star Schema modeling and source-to-target reconciliation.",
  "Beyond the day job I build end-to-end data projects for fun: streaming live Wikipedia edits through Redpanda and PySpark, modeling real datasets into star schemas, and shipping dashboards on top.",
];

// Headline stats — animated counters. All values are real from project work.
export const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 1, suffix: "+", label: "Year Experience" },
  { value: 602, suffix: "K", label: "Rows Processed" },
  { value: 6, suffix: "+", label: "ETL Pipelines Built" },
  { value: 24, suffix: "/7", label: "Streaming Pipeline Live" },
];

export type Skill = { name: string; level: number; category: string };
export type SkillCategory = { id: string; title: string; blurb: string };

export const skillCategories: SkillCategory[] = [
  { id: "etl", title: "ETL / ELT", blurb: "Pipelines that move & shape data" },
  { id: "tools", title: "Databases & Cloud", blurb: "Where the data lives" },
  { id: "modeling", title: "Modeling", blurb: "Designing for analytics" },
  { id: "cloud", title: "Sources & Practices", blurb: "How data arrives & ships" },
];

export const skills: Skill[] = [
  { name: "SQL / T-SQL", level: 92, category: "etl" },
  { name: "Python (Pandas)", level: 88, category: "etl" },
  { name: "PySpark", level: 76, category: "etl" },
  { name: "CDC & Incremental Loading", level: 78, category: "etl" },
  { name: "Snowpark Python", level: 72, category: "etl" },

  { name: "SQL Server (SSMS)", level: 86, category: "tools" },
  { name: "MySQL", level: 85, category: "tools" },
  { name: "Snowflake", level: 82, category: "tools" },
  { name: "Azure Data Factory", level: 78, category: "tools" },
  { name: "ADLS Gen2", level: 76, category: "tools" },
  { name: "Power BI", level: 78, category: "tools" },
  { name: "Databricks", level: 70, category: "tools" },
  { name: "AWS (S3, EC2)", level: 66, category: "tools" },

  { name: "Star Schema", level: 88, category: "modeling" },
  { name: "Data Warehousing", level: 84, category: "modeling" },
  { name: "Dimensional Modeling", level: 82, category: "modeling" },
  { name: "Data Lakes (Parquet)", level: 72, category: "modeling" },

  { name: "SAP S/4HANA", level: 72, category: "cloud" },
  { name: "REST APIs", level: 80, category: "cloud" },
  { name: "Git", level: 86, category: "cloud" },
  { name: "Agile / Scrum", level: 82, category: "cloud" },
  { name: "SDLC & Testing", level: 80, category: "cloud" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    role: "Data Engineer",
    company: "Inteliment Technologies",
    period: "Dec 2025 — Jul 2026",
    location: "Pune, India",
    highlights: [
      "Worked on ETL/ELT pipelines with SAP as an upstream source, supporting data integration and downstream analytical processing.",
      "Worked with data stored in Azure Data Lake Storage (ADLS) in Parquet format, with ingestion and pipeline orchestration managed through Azure Data Factory (ADF).",
      "Developed SQL-based transformations in Snowflake using Joins, CTEs, Window Functions, Aggregations, Filtering and Deduplication to prepare analytics-ready datasets.",
      "Implemented incremental data processing using Change Data Capture (CDC) concepts to identify and process new and updated records, avoiding unnecessary full-data processing.",
      "Used Snowpark Python for data-quality validation and programmatic data processing within the Snowflake environment.",
      "Performed source-to-target validation and reconciliation using record-count comparisons, null checks, duplicate checks and data-consistency validations.",
      "Worked with Fact and Dimension tables following Star Schema dimensional modeling to support analytical reporting and data warehousing.",
      "Contributed to ETL testing, troubleshooting, technical documentation and Git-based version control within an Agile/Scrum environment.",
    ],
  },
  {
    role: "Junior Data Engineer Intern",
    company: "ThirdOrigin LLC",
    period: "Oct 2024 — Apr 2025",
    location: "US (Remote)",
    highlights: [
      "Developed ETL workflows using Python (Pandas) and SQL to process data from CSV files and SQL databases.",
      "Performed data cleaning and transformation using Pandas — null handling, duplicate removal, data-type correction, filtering and derived columns.",
      "Developed SQL transformations using Joins, CTEs, Window Functions, Aggregations, CASE statements and Views.",
      "Prepared curated datasets as processed output files for downstream analysis and reporting.",
      "Performed data-quality checks and source-to-target validation, including record counts, nulls, duplicates and data consistency.",
      "Contributed to testing, troubleshooting, documentation and Git-based version control in an Agile/Scrum environment.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  accent: string; // tailwind-ish gradient hint
  link?: string;
  liveUrl?: string; // live deployment (shows a LIVE badge + CTA)
  featured?: boolean; // renders as a full-width highlight card
};

export const projects: Project[] = [
  {
    name: "WikiPulse — Real-Time Wikipedia Edit Analytics",
    tagline: "Kafka-style streaming, 100% serverless",
    description:
      "Live window into what the world is editing right now: a producer streams Wikipedia's RecentChanges firehose into Redpanda (Kafka API, SASL/SSL), a PySpark consumer aggregates 1-minute edit windows and top pages, and upserts them into Neon Postgres — surfaced by a Power BI-style Next.js dashboard with drilldown, cross-filtering and auto-refresh. Orchestrated by GitHub Actions on a 10-minute schedule, entirely on free tiers.",
    stack: ["Redpanda (Kafka)", "PySpark", "Neon Postgres", "Next.js", "GitHub Actions"],
    metrics: [
      { label: "Cadence", value: "10 min" },
      { label: "Cost", value: "₹0" },
      { label: "Delivery", value: "Upsert / CDC" },
    ],
    accent: "from-emerald-400 to-cyan-500",
    link: "https://github.com/vinn27/wikpulse",
    liveUrl: "https://wikpulse-live.netlify.app",
    featured: true,
  },
  {
    name: "Job Radar — Job-Market Intelligence Pipeline",
    tagline: "Scrape → dedupe → score → notify, 24/7",
    description:
      "Self-running pipeline that tracks LinkedIn + Naukri around the clock: postings are collected politely, deduplicated across runs (job-id + fuzzy title|company + emailed-ledger), scored against a weighted skill profile, and delivered as ranked email digests with apply links. Split across a free GitHub Actions cloud runner (works even with my PC off) and a local Playwright runner that passes Naukri's anti-bot defenses.",
    stack: ["Python", "Playwright", "SQLite", "GitHub Actions"],
    metrics: [
      { label: "Runs / Day", value: "~40" },
      { label: "Cost", value: "₹0" },
    ],
    accent: "from-rose-400 to-red-500",
    link: "https://github.com/vinn27/job-radar",
  },
  {
    name: "Stock Market ETL — Medallion Architecture",
    tagline: "Bronze → Silver → Gold pipeline",
    description:
      "End-to-end PySpark pipeline ingesting raw stock-market CSVs and refining them through a Medallion architecture (Bronze/Silver/Gold) before loading a modeled warehouse in MySQL for Power BI reporting.",
    stack: ["PySpark", "MySQL", "Medallion", "Power BI"],
    metrics: [
      { label: "Rows Loaded", value: "602K" },
      { label: "Architecture", value: "Medallion" },
    ],
    accent: "from-cyan-400 to-blue-500",
    link: "https://github.com/vinn27/stock-market-etl",
  },
  {
    name: "Employment Job Market Analytics",
    tagline: "Naukri data → star schema",
    description:
      "Naukri job listings (xlsx) transformed with Pandas into a clean star schema and loaded into a MySQL warehouse — fully referentially-integrated, zero orphan keys, ready for BI.",
    stack: ["Pandas", "MySQL", "Star Schema", "SQLAlchemy"],
    metrics: [
      { label: "Fact Rows", value: "97,679" },
      { label: "Tables", value: "6" },
    ],
    accent: "from-violet-400 to-fuchsia-500",
    link: "https://github.com/vinn27/indian-job-market-analytics",
  },
  {
    name: "Weather Analytics Platform",
    tagline: "Live API → warehouse → BI",
    description:
      "Scheduled ingestion of Open-Meteo forecast data, cleaned and modeled in Pandas, persisted to MySQL and surfaced through interactive Power BI dashboards tracking climate trends.",
    stack: ["Pandas", "MySQL", "Open-Meteo API", "Power BI"],
    metrics: [
      { label: "Source", value: "REST API" },
      { label: "Sink", value: "MySQL" },
    ],
    accent: "from-teal-400 to-emerald-500",
  },
  {
    name: "Finance Data Pipeline",
    tagline: "Alpha Vantage → PySpark",
    description:
      "Distributed processing of financial market data pulled from the Alpha Vantage API using PySpark — extracting, transforming and aggregating ticker-level data at scale.",
    stack: ["PySpark", "Alpha Vantage", "Python", "Aggregations"],
    metrics: [
      { label: "Engine", value: "PySpark" },
      { label: "Source", value: "API" },
    ],
    accent: "from-amber-400 to-orange-500",
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "CSMSS Chh. Shahu College of Engineering",
  period: "Jun 2020 — Jul 2024",
  location: "Chh. Sambhajinagar, Maharashtra",
  detail: "Bachelor of Engineering in Computer Science & Engineering — Graduated July 2024 (CGPA 7.96).",
};
