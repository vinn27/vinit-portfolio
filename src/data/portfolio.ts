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
    "I turn messy, multi-source data into clean, analysis-ready pipelines — building the warehouses and star schemas that power reporting.",
  location: "Pune, India",
  email: "vinitsontakke27@gmail.com",
  phone: "+91 78871 3347",
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
  "Data Engineer with a year of hands-on experience designing and developing ETL/ELT pipelines using SQL Server (SSMS), Python (Pandas) and Snowflake.",
  "I specialize in data extraction, transformation, cleansing, validation and loading from multiple sources to support reporting and analytics — with a strong foundation in data warehousing, dimensional (Star Schema) modeling and data quality.",
  "Beyond the day job I build end-to-end data projects for fun: ingesting real datasets, modeling them into star schemas, and visualizing the results in Power BI.",
];

// Headline stats — animated counters. All values are real from project work.
export const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 1, suffix: "+", label: "Year Experience" },
  { value: 602, suffix: "K", label: "Rows Processed" },
  { value: 4, suffix: "+", label: "ETL Pipelines Built" },
  { value: 0, label: "Orphan Foreign Keys" },
];

export type Skill = { name: string; level: number; category: string };
export type SkillCategory = { id: string; title: string; blurb: string };

export const skillCategories: SkillCategory[] = [
  { id: "etl", title: "ETL / ELT", blurb: "Pipelines that move & shape data" },
  { id: "tools", title: "Databases & Tools", blurb: "Where the data lives" },
  { id: "modeling", title: "Modeling", blurb: "Designing for analytics" },
  { id: "cloud", title: "Cloud & Methods", blurb: "How teams ship reliably" },
];

export const skills: Skill[] = [
  { name: "SQL / T-SQL", level: 92, category: "etl" },
  { name: "Python (Pandas)", level: 88, category: "etl" },
  { name: "PySpark", level: 76, category: "etl" },

  { name: "SQL Server (SSMS)", level: 86, category: "tools" },
  { name: "MySQL", level: 85, category: "tools" },
  { name: "Snowflake", level: 80, category: "tools" },
  { name: "Databricks", level: 70, category: "tools" },
  { name: "Power BI", level: 78, category: "tools" },

  { name: "Star Schema", level: 88, category: "modeling" },
  { name: "Data Warehousing", level: 84, category: "modeling" },
  { name: "Dimensional Modeling", level: 82, category: "modeling" },
  { name: "Data Lakes", level: 72, category: "modeling" },

  { name: "AWS (S3, EC2)", level: 66, category: "cloud" },
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
    current: true,
    highlights: [
      "Collaborated with business stakeholders & analysts to translate reporting needs and KPIs into data-pipeline solutions.",
      "Extracted data from SQL databases and CSV files with Python (Pandas), performing cleansing, validation and preprocessing of missing values, duplicates and inconsistent formats.",
      "Loaded cleaned, validated data into Snowflake, building a centralized cloud data warehouse of analysis-ready datasets.",
      "Built SQL/T-SQL using joins, CTEs, window functions, aggregations and views to transform raw data into business-ready datasets.",
      "Designed fact and dimension tables using Star Schema to improve query performance and support efficient reporting.",
      "Curated Snowflake datasets consumed by the BI team to build Power BI dashboards for KPIs, operations and performance trends.",
      "Optimized SQL queries and transformation logic, advising the BI team on schema-design decisions.",
    ],
  },
  {
    role: "Junior Data Engineer Intern",
    company: "ThirdOriginLLC",
    period: "Oct 2024 — Apr 2025",
    location: "US (Remote)",
    highlights: [
      "Extracted and ingested data from SQL databases, CSV and Excel using Python (Pandas), handling missing values, duplicates and inconsistent formats.",
      "Developed SQL scripts with joins, CTEs, window functions, aggregations and views to transform raw data into business-ready datasets.",
      "Assisted in designing fact and dimension tables using Star Schema for scalable architecture and efficient reporting.",
      "Performed data validation, reconciliation and quality checks to ensure accuracy, integrity and consistency before downstream use.",
      "Prepared analysis-ready datasets used to develop Power BI dashboards for business KPIs and operational metrics.",
      "Worked in an Agile/Scrum environment contributing to testing, debugging and documentation, using Git for version control.",
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
};

export const projects: Project[] = [
  {
    name: "Job Radar — Job-Market Intelligence Pipeline",
    tagline: "Scrape → dedupe → score → notify, 24/7",
    description:
      "Self-running pipeline that tracks LinkedIn + Naukri every hour: postings are collected politely, deduplicated across runs (job-id + fuzzy title|company + emailed-ledger), scored against a weighted skill profile, and delivered as ranked email digests with apply links. Split across a free GitHub Actions cloud runner (works even with my PC off) and a local Playwright runner that passes Naukri's anti-bot defenses.",
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
  },
  {
    name: "Employment Job Market Analytics",
    tagline: "Naukri data → star schema",
    description:
      "Scraped-style Naukri job listings (xlsx) transformed with Pandas into a clean star schema and loaded into a MySQL warehouse — fully referentially-integrated, zero orphan keys, ready for BI.",
    stack: ["Pandas", "MySQL", "Star Schema", "SQLAlchemy"],
    metrics: [
      { label: "Fact Rows", value: "97,679" },
      { label: "Tables", value: "6" },
    ],
    accent: "from-violet-400 to-fuchsia-500",
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
