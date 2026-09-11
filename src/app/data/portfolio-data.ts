// Centralized portfolio content data

export interface Project {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  role: string;
  category: "Full Stack" | "AgriTech";
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  externalUrl: string;
  overview: string[];
  problem: string[];
  myRole: string[];
  features: { title: string; description: string }[];
  architectureSections: { label: string; items: string[] }[];
}

export interface Experience {
  id: number;
  slug: string;
  role: string;
  company: string;
  companyUrl: string;
  companyDesc: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  tags: string[];
  overview: string[];
  detailedContributions: {
    title: string;
    description: string[];
  }[];
  impact: { metric: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "syncgaze-platforms",
    title: "Syncgaze Platforms",
    shortTitle: "Syncgaze",
    role: "Full-Stack AI Engineer",
    category: "Full Stack",
    period: "Aug '25",
    description:
      "Engineered full-stack platform infrastructure across frontend interfaces, server-side logic, database schemas, and API integrations, establishing the foundation for production-ready product development.",
    highlights: [
      "Designed and implemented modular application architecture to support reliable data flow between user interfaces, backend services, databases, and external APIs",
      "Collaborated with product and design stakeholders to translate business requirements into technical specifications, development roadmaps, and production-ready software",
    ],
    tags: [
      "Django",
      "PostgreSQL",
      "React",
      "REST APIs",
      "SMTP/IMAP",
      "TypeScript",
      "Google Analytics",
    ],
    externalUrl: "https://syncgaze.in/",
    overview: [
      "SyncGaze is an enterprise software development and SaaS company founded in 2025, serving clients in India and internationally. The company builds custom dashboards, web applications, mobile apps, and enterprise software — and develops its own SaaS products.",
      "The platform ecosystem spans multiple production services: SyncGaze Mail (professional business email hosting with custom domains, DKIM security, and IMAP/SMTP), SyncGaze Forms (a drag-and-drop form builder with analytics), a centralized Dashboard for enterprise administration, and an Account management portal.",
      "I joined as the first Full-Stack AI Engineer, tasked with building the foundational platform infrastructure that would power all of these products from a single, coherent codebase.",
    ],
    problem: [
      "SyncGaze was scaling from a services company to a multi-product SaaS business. Each product — Mail, Forms, Dashboard — needed to run on separate subdomains while sharing authentication, billing, and user management infrastructure.",
      "The challenge was to design an architecture that could support multiple independent frontends, a unified backend with shared services, and seamless data flow across products — without creating a monolithic mess that would be impossible to maintain as the team grew.",
    ],
    myRole: [
      "As the Full-Stack AI Engineer, I owned the entire technical infrastructure from day one. This meant designing the database schemas, building the API layer, implementing authentication workflows, and creating the frontend interfaces across all products.",
      "I worked directly with the founders and product stakeholders to translate business requirements into technical specifications and development roadmaps. Each product had different user-facing requirements but needed to share core infrastructure — user management, billing, role-based access control, and audit logging.",
      "I established reusable development patterns and coding standards that would allow new engineers to onboard quickly and contribute to any product in the ecosystem.",
    ],
    features: [
      {
        title: "Multi-Product Architecture",
        description:
          "Designed a modular Django backend serving multiple subdomains (mail, forms, dashboard, account) with shared authentication and billing infrastructure.",
      },
      {
        title: "Bank-Grade Security",
        description:
          "Implemented 2FA / passkey authentication, DKIM email security, role-based access control, and audit trails across all products.",
      },
      {
        title: "Email Infrastructure",
        description:
          "Built professional email hosting with custom domain support, IMAP/SMTP protocols, and end-to-end encryption for SyncGaze Mail.",
      },
      {
        title: "API-First Design",
        description:
          "Developed RESTful APIs powering all frontend interfaces, enabling consistent data flow and future mobile app integration.",
      },
    ],
    architectureSections: [
      {
        label: "Frontend",
        items: [
          "React / Django Templates",
          "Tailwind CSS",
          "Responsive UI",
        ],
      },
      {
        label: "API Layer",
        items: ["Django REST Framework", "Auth / JWT", "Webhooks"],
      },
      {
        label: "Database",
        items: ["PostgreSQL", "Multi-tenant schemas", "Migrations"],
      },
      {
        label: "Infrastructure",
        items: [
          "mail.syncgaze.in",
          "forms.syncgaze.in",
          "dashboard.syncgaze.in",
          "account.syncgaze.in",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "spirit-platform",
    title: "Spirit Platform",
    shortTitle: "Spirit",
    role: "Technical Architect & Full-Stack Developer",
    category: "Full Stack",
    period: "May '26",
    description:
      "Architected and developed a unified platform for talent acquisition, organizational administration, and event lifecycle management.",
    highlights: [
      "Built modular frontend interfaces, authentication workflows, RESTful services, and database architecture to support role-based organizational operations",
      "Led end-to-end technical implementation, establishing reusable development patterns and maintainable architecture across the platform",
    ],
    tags: [
      "Django",
      "RESTful APIs",
      "Auth Workflows",
      "RBAC",
      "PostgreSQL",
      "HTML/CSS/JS",
    ],
    externalUrl: "https://spirit.org.in/",
    overview: [
      "Spirit is the premier student technology organization at Lovely Professional University — a hub for hackathons, workshops, and tech events that brings together aspiring developers and engineers.",
      "The club needed a digital platform that could handle everything from member recruitment and team management to event registration and public-facing marketing. Previously, these processes were scattered across Google Forms, WhatsApp groups, and manual spreadsheets.",
      "I was brought on as the Technical Architect to design and build this unified platform from scratch, with the goal of professionalizing Spirit's operations and making it a showcase for what LPU's tech community could build.",
    ],
    problem: [
      "Spirit's operations were fragmented across multiple tools with no central system. Member applications were handled via Google Forms with manual review. Event registrations were tracked in spreadsheets. Team assignments and role management happened informally through messaging groups.",
      "The organization needed a unified platform where prospective members could apply, existing members could manage their roles and responsibilities, and events could be created, promoted, and managed through a single interface — all with proper access control so team leads, admins, and regular members had appropriate permissions.",
    ],
    myRole: [
      "I served as the sole Technical Architect and Full-Stack Developer for the project. I made all architecture decisions — from the technology stack (Django + PostgreSQL) to the database schema design, authentication workflows, and frontend component structure.",
      "I built the platform in phases: first the public-facing site (events, about, join us), then the authentication and member management system, and finally the admin dashboard for organizational operations.",
      "Beyond writing code, I established the development patterns and project structure that would make the codebase maintainable as other members joined the engineering team.",
    ],
    features: [
      {
        title: "Talent Acquisition Pipeline",
        description:
          "Built a 'Join Us' flow with applications, review stages, and acceptance tracking — replacing the Google Forms workflow entirely.",
      },
      {
        title: "Role-Based Operations",
        description:
          "Implemented granular roles (member, team lead, admin, super admin) with permission-based access to different platform areas.",
      },
      {
        title: "Event Lifecycle Management",
        description:
          "Full CRUD for events with registration, capacity management, attendee tracking, and public event pages.",
      },
      {
        title: "Modern Frontend",
        description:
          "Built a kinetic, animation-rich frontend with 3D CSS elements, smooth scroll, and responsive design that showcases Spirit's tech-forward identity.",
      },
    ],
    architectureSections: [
      {
        label: "Public Site",
        items: ["Event Pages", "Join Us Flow", "About / Team"],
      },
      {
        label: "Auth Layer",
        items: ["Registration", "Login", "Session Management"],
      },
      {
        label: "Admin Panel",
        items: [
          "Team Management",
          "Event CRUD",
          "Member Roles",
          "Application Review",
        ],
      },
      {
        label: "Database",
        items: [
          "User Profiles",
          "Events",
          "Applications",
          "Role Permissions",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "stuviora",
    title: "Stuviora — AI Quality-Gated Freelancing Platform",
    shortTitle: "Stuviora",
    role: "Full Stack · AI Integration",
    category: "Full Stack",
    period: "Jun '26",
    description:
      "Built an AI-powered quality validation engine supporting multimodal file processing, structured LLM evaluation, asynchronous workflows, and PostgreSQL-backed data persistence.",
    highlights: [
      "Engineered an escrow payment infrastructure with automated revenue distribution, webhook-based transaction verification, idempotent payout processing, and GST/TDS taxation workflows",
      "Developed a multi-tenant marketplace using Next.js and Supabase with granular role-based access, intelligent matching, asynchronous background processing, and real-time messaging workflows",
    ],
    tags: [
      "Next.js",
      "Supabase",
      "Anthropic Claude",
      "PostgreSQL",
      "Razorpay",
      "TypeScript",
    ],
    externalUrl: "https://github.com/tekigowtham2204/stuviora",
    overview: [
      "Stuviora is an AI-powered freelancing platform specifically designed for students, where every deliverable must pass an AI quality gate before reaching the client. This ensures platform-level trust and consistency that traditional freelancing marketplaces lack.",
      "The platform connects student freelancers with clients who need affordable, quality work — but adds a crucial layer of AI-driven quality assurance. When a student submits a deliverable, it's automatically evaluated by Claude (Anthropic's LLM) for quality, completeness, and adherence to the project brief before the client ever sees it.",
      "I built the entire platform end-to-end: the AI quality engine, the escrow payment infrastructure, the multi-tenant marketplace, and the real-time messaging system.",
    ],
    problem: [
      "Student freelancing faces a trust problem from both sides. Clients don't trust student work quality, and students don't trust they'll get paid fairly. Existing platforms like Fiverr and Upwork don't solve this because they lack quality guarantees and charge high fees.",
      "Stuviora solves both problems simultaneously: AI validates every deliverable before delivery (building client trust), and escrow ensures students are paid automatically once work is approved (building student trust). The platform also handles Indian tax compliance (GST/TDS) automatically, which is a major pain point for student freelancers.",
    ],
    myRole: [
      "I was the sole developer building every layer of the platform — from the Next.js frontend to the Supabase backend, the Claude-powered AI engine, and the Razorpay payment infrastructure.",
      "The most technically challenging part was building the AI quality validation engine. It needed to handle multimodal files (documents, images, code), process them through Claude with structured evaluation prompts, and return actionable feedback — all asynchronously so the student could continue working while their submission was being reviewed.",
      "The payment infrastructure was equally complex: implementing Razorpay's Route API for escrow, building idempotent payout processing, handling webhook verification, and automating GST/TDS calculations for every transaction.",
    ],
    features: [
      {
        title: "AI Quality Engine",
        description:
          "Multimodal file processing with structured LLM evaluation via Claude. Each deliverable gets a quality score, actionable feedback, and pass/fail decision.",
      },
      {
        title: "Escrow Payment System",
        description:
          "Razorpay Route integration with automated 85/15 revenue distribution, webhook-based verification, and idempotent payout processing.",
      },
      {
        title: "Tax Compliance",
        description:
          "Automated GST/TDS taxation workflows built into every transaction, handling Indian tax compliance transparently for student freelancers.",
      },
      {
        title: "Multi-Tenant Marketplace",
        description:
          "Granular role-based access (student, client, admin), intelligent matching, async background jobs, and real-time messaging.",
      },
    ],
    architectureSections: [
      {
        label: "Frontend",
        items: ["Next.js", "TypeScript", "Tailwind CSS", "Real-time UI"],
      },
      {
        label: "AI Engine",
        items: [
          "Anthropic Claude API",
          "Multimodal Processing",
          "Structured Evaluation",
          "Async Workflows",
        ],
      },
      {
        label: "Payments",
        items: [
          "Razorpay Route (Escrow)",
          "Webhook Verification",
          "GST/TDS Automation",
          "Idempotent Payouts",
        ],
      },
      {
        label: "Backend",
        items: [
          "Supabase (Auth + DB)",
          "PostgreSQL",
          "RBAC",
          "Background Jobs",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "kisanmitra",
    title: "KisanMitra — Agricultural Market Intelligence",
    shortTitle: "KisanMitra",
    role: "Full Stack · AgriTech · PWA",
    category: "AgriTech",
    period: "2025",
    description:
      "Open-source multilingual progressive web app delivering live mandi prices, MSP intelligence, weather advisories, government schemes, and direct market access to Indian farmers.",
    highlights: [
      "Real-time commodity pricing across Indian mandis with location-based 7-day weather forecasts and crop-specific guidance",
      "Minimum Support Price tracking for 23+ crops and access to 50+ government agricultural schemes in one place",
      "Data aggregated from eNAM, Agmarknet, and data.gov.in APIs; deployed on GitHub Pages with automated CI/CD via GitHub Actions",
    ],
    tags: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "PWA",
      "GitHub Pages",
      "GitHub Actions",
    ],
    externalUrl: "https://github.com/tekigowtham2204/KisanMitra",
    overview: [
      "KisanMitra (meaning 'Farmer's Friend') is an open-source progressive web app that aggregates critical agricultural data from multiple Indian government APIs into a single, farmer-friendly interface.",
      "Indian farmers typically need to check multiple websites and apps to find current mandi prices, Minimum Support Prices, weather forecasts, and government scheme eligibility. KisanMitra brings all of this into one place — accessible on any device, even with intermittent internet connectivity thanks to PWA offline support.",
      "This project was born from the observation that while India has excellent agricultural data APIs (eNAM, Agmarknet, data.gov.in), the data is scattered and presented in formats that aren't accessible to the average farmer.",
    ],
    problem: [
      "Indian farmers lack a single, accessible platform to make informed selling decisions. Mandi prices vary significantly across markets, and farmers often sell at unfavorable prices simply because they don't have real-time price visibility.",
      "Government schemes and MSP information are spread across dozens of websites, often only available in English. Weather advisories that could save entire harvests are trapped in apps that require constant internet connectivity — a challenge in rural India.",
    ],
    myRole: [
      "I built KisanMitra as a solo project from concept to deployment. I chose to build it as a progressive web app using vanilla JavaScript (no frameworks) to keep the app lightweight and fast on low-end devices that many farmers use.",
      "The key technical challenge was integrating multiple government APIs (eNAM for live prices, Agmarknet for market data, data.gov.in for MSP and schemes, and weather APIs for location-based forecasts) into a unified, offline-capable application.",
      "I also set up automated CI/CD with GitHub Actions to deploy every push to GitHub Pages, ensuring the app stays continuously updated with minimal manual intervention.",
    ],
    features: [
      {
        title: "Live Mandi Prices",
        description:
          "Real-time commodity pricing from mandis across India, helping farmers choose the best market to sell their produce.",
      },
      {
        title: "MSP Intelligence",
        description:
          "Tracking Minimum Support Prices for 23+ crops with historical comparisons and trend analysis.",
      },
      {
        title: "Weather Advisories",
        description:
          "Location-based 7-day weather forecasts with crop-specific guidance to protect harvests.",
      },
      {
        title: "Government Schemes",
        description:
          "Access to 50+ government agricultural schemes with eligibility criteria and application links.",
      },
      {
        title: "Offline-First PWA",
        description:
          "Service Worker enables offline access to previously loaded data — critical for areas with intermittent connectivity.",
      },
    ],
    architectureSections: [
      {
        label: "Client",
        items: [
          "PWA",
          "Service Worker",
          "Offline Cache",
          "Responsive UI",
        ],
      },
      {
        label: "Data Sources",
        items: [
          "eNAM API (Live Prices)",
          "Agmarknet API (Market Data)",
          "data.gov.in (MSP / Schemes)",
          "Weather API",
        ],
      },
      {
        label: "Deployment",
        items: [
          "GitHub Pages",
          "GitHub Actions CI/CD",
          "Auto-deploy on push",
        ],
      },
    ],
  },
];

export const experience: Experience = {
  id: 1,
  slug: "syncgaze",
  role: "AI Product Developer",
  company: "Syncgaze",
  companyUrl: "https://syncgaze.in/",
  companyDesc: "Full-time • India",
  period: "Aug 2025 — Present",
  current: true,
  responsibilities: [
    "Led cross-functional product initiatives from discovery through launch, writing specifications, coordinating engineering execution, and driving go-to-market strategy — leading 3 major product launches that grew user base by 20% month-over-month",
    "Built comprehensive analytics infrastructure tracking 25+ key performance indicators across AI products using Amplitude and Mixpanel dashboards",
    "Orchestrated the migration of legacy tracking to a unified data schema, improving data accuracy by 95% and enabling granular cohort-based retention strategies",
  ],
  tags: [
    "AI Products",
    "Python",
    "TypeScript",
    "LLM APIs",
    "Analytics",
    "Full-Stack",
  ],
  overview: [
    "SyncGaze is an enterprise software development and SaaS company serving clients in India and internationally. Founded in 2025, it builds custom dashboards, web applications, and mobile apps — while simultaneously developing its own product suite including SyncGaze Mail (business email hosting), SyncGaze Forms (drag-and-drop form builder), and enterprise administration dashboards.",
    "I joined as an AI Product Developer in August 2025, taking on a full-time role that spans product development, engineering execution, and data-driven growth strategy. My work bridges the gap between product vision and technical implementation across all of SyncGaze's offerings.",
  ],
  detailedContributions: [
    {
      title: "Product Launches & Growth",
      description: [
        "Led 3 major product launches from discovery through go-to-market, each following a structured process: user research → specification writing → engineering coordination → launch → post-launch optimization.",
        "These launches collectively grew the user base by 20% month-over-month, achieved through a combination of product-led growth strategies and targeted positioning.",
        "For each launch, I wrote detailed product specifications, coordinated with engineering on implementation timelines, and drove the go-to-market strategy including positioning, documentation, and user onboarding flows.",
      ],
    },
    {
      title: "Analytics Infrastructure",
      description: [
        "Built a comprehensive analytics infrastructure from scratch, tracking 25+ key performance indicators across all AI products. The system uses Amplitude and Mixpanel as complementary tools — Amplitude for product analytics and user behavior, Mixpanel for event-level analysis and funnel tracking.",
        "Designed dashboards that give the team real-time visibility into activation rates, feature adoption, retention cohorts, and revenue metrics. These dashboards are used in weekly business reviews to drive product decisions.",
        "Implemented event taxonomies and naming conventions that scale across products, ensuring consistent data collection as new features and products are launched.",
      ],
    },
    {
      title: "Data Schema Migration",
      description: [
        "Identified that legacy tracking systems had inconsistent event naming, duplicate events, and missing properties — leading to unreliable data that couldn't support segmented analysis.",
        "Orchestrated a full migration to a unified data schema, working across the engineering and product teams to re-instrument every tracking point. The migration improved data accuracy by 95%.",
        "The clean data foundation enabled granular cohort-based retention strategies — we could finally segment users by acquisition channel, feature usage patterns, and lifecycle stage to run targeted interventions.",
      ],
    },
  ],
  impact: [
    { metric: "Product Launches", value: "3" },
    { metric: "User Growth", value: "20% MoM" },
    { metric: "KPIs Tracked", value: "25+" },
    { metric: "Data Accuracy", value: "95%" },
  ],
};

export const education = [
  {
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    degree: "B.Tech in Electronics & Communication Engineering",
    period: "Aug 2021 — Present",
    score: "CGPA: 6.64",
    highlights: [
      "Technical Architect for Spirit Organization — LPU's premier student technology club",
      "Built and deployed multiple production-ready platforms during undergraduate studies",
      "Active participant in hackathons and technical workshops",
    ],
  },
  {
    institution: "Tirumala Junior College",
    location: "Andhra Pradesh",
    degree: "Intermediate — MPC Stream (Maths, Physics, Chemistry)",
    period: "Completed May 2023",
    score: "Percentage: 97%",
    highlights: [
      "Achieved 97% in MPC stream — one of the top performers",
      "Strong foundation in mathematics and analytical reasoning",
    ],
  },
];

export const certifications = [
  {
    name: "Generative AI",
    issuer: "Udemy",
    pdfUrl: "/academic-portfolio/certificates/gen-ai.pdf",
  },
  {
    name: "Product Management",
    issuer: "Udemy",
    pdfUrl: "/academic-portfolio/certificates/product-management.pdf",
  },
  {
    name: "Machine Learning",
    issuer: "Udemy",
    pdfUrl: "/academic-portfolio/certificates/machine-learning.pdf",
  },
];

export const skills = [
  {
    title: "Languages",
    items: ["Python", "SQL", "TypeScript", "JavaScript"],
  },
  {
    title: "Tools / Platforms",
    items: ["Excel", "Notion", "Linear", "Figma", "GitHub", "LangChain"],
  },
  {
    title: "Technologies",
    items: [
      "LLM API Integration (Claude, OpenAI)",
      "Prompt Engineering",
      "RAG Systems",
      "Local LLM Deployment",
      "AI Agent Architecture",
    ],
  },
  {
    title: "Engineering",
    items: [
      "Multi-Tenant Architecture",
      "Role-Based Access Control",
      "Asynchronous Processing",
      "Webhooks",
      "API Integration",
      "Database Design",
    ],
  },
];

export const contactLinks = [
  {
    label: "Email",
    value: "tekigowtham07@gmail.com",
    href: "mailto:tekigowtham07@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 83417 25726",
    href: "tel:+918341725726",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/gowthambhaskar",
    href: "https://linkedin.com/in/gowthambhaskar",
  },
  {
    label: "GitHub",
    value: "github.com/tekigowtham2204",
    href: "https://github.com/tekigowtham2204",
  },
];
