import heroArchitectureImg from '../assets/images/hero_it_architecture_1794739425760.jpg';
import serviceCloudInfraImg from '../assets/images/service_cloud_infrastructure_1794739425676.jpg';
import caseLogisticsImg from '../assets/images/case_logistics_platform_1794739426772.jpg';
import caseSecurityImg from '../assets/images/case_security_operations_1794739426948.jpg';

export interface ServiceItem {
  id: string;
  number: string;
  category: 'Infrastructure' | 'Security' | 'Cloud' | 'Advisory';
  title: string;
  summary: string;
  benefits: string[];
  deliverables: string[];
  slaTarget: string;
  typicalTimeline: string;
  image?: string;
  imageAlt?: string;
  span: 'wide' | 'standard';
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  timeframe: string;
  headlineMetric: string;
  metricContext: string;
  title: string;
  before: string;
  change: string;
  outcome: string;
  image: string;
  imageAlt: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
}

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  focus: string;
  tenure: string;
  bio: string;
}

export const HERO_IMAGE = {
  src: heroArchitectureImg,
  alt: 'BusyBug IT Solutions engineering team collaborating over system architecture diagrams in a sunlit modern workspace',
};

export const HERO_BASELINES = [
  {
    value: '99.98%',
    label: 'Measured uptime across managed client clusters over 24 months',
  },
  {
    value: '< 15 min',
    label: 'Critical incident response SLA with direct senior engineer escalation',
  },
  {
    value: '42+',
    label: 'Production cloud migrations and zero-downtime cutovers delivered',
  },
  {
    value: 'Zero',
    label: 'Unpatched high-severity CVEs across audited client environments',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'managed-it',
    number: '01',
    category: 'Infrastructure',
    title: 'Managed IT Services',
    summary:
      'Continuous 24/7 monitoring, automated endpoint fleet management, proactive OS and firmware patching, and direct Tier-2/Tier-3 engineering escalation for distributed teams.',
    benefits: [
      'Eliminate reactive ticket backlogs and unscheduled operational outages',
      'Predictable monthly per-seat and per-node cost structure without surprise overages',
      'Standardized hardware provisioning and zero-touch employee onboarding',
    ],
    deliverables: [
      '24/7 telemetry monitoring across servers, endpoints, and network gear',
      'Automated patch cadences with pre-deployment staging validation',
      'MDM enforcement for macOS, Windows, and Linux workstations',
      'Monthly capacity, incident root-cause, and asset lifecycle reviews',
    ],
    slaTarget: '< 15 min P1 response · 99.95% service availability',
    typicalTimeline: '14-day onboarding & baseline stabilization',
    image: serviceCloudInfraImg,
    imageAlt: 'Structured server rack aisle with organized amber fiber optic patch cabling',
    span: 'wide',
  },
  {
    id: 'cybersecurity',
    number: '02',
    category: 'Security',
    title: 'Cybersecurity',
    summary:
      'Zero-trust identity governance, endpoint detection and response (EDR), continuous vulnerability management, and audit-ready security controls mapped to SOC 2 and HIPAA.',
    benefits: [
      'Close critical attack vectors before external penetration tests or audits',
      'Enforce phishing-resistant MFA and least-privilege access across all SaaS tools',
      'Accelerate enterprise sales cycles with verifiable compliance posture',
    ],
    deliverables: [
      'IAM & SSO consolidation with hardware-backed MFA policies',
      '24/7 managed EDR and automated SIEM alert triage',
      'Quarterly vulnerability assessments and remediation sprints',
      'Incident response playbooks and immutable off-site backup drills',
    ],
    slaTarget: 'Continuous threat containment · 100% audit control mapping',
    typicalTimeline: '3 to 6 weeks for full zero-trust rollout',
    span: 'standard',
  },
  {
    id: 'cloud-solutions',
    number: '03',
    category: 'Cloud',
    title: 'Cloud Solutions',
    summary:
      'Production-grade AWS, Google Cloud, and Azure architecture built with Terraform Infrastructure-as-Code, resilient container orchestration, and disciplined FinOps cost controls.',
    benefits: [
      'Cut over-provisioned compute and storage spend by 30–60% on average',
      'Deploy new product releases reliably with automated zero-downtime CI/CD',
      'Scale multi-region workloads without manual server intervention',
    ],
    deliverables: [
      'Modular Terraform IaC repositories owned entirely in your Git org',
      'Multi-zone Kubernetes or managed container cluster architecture',
      'Automated disaster recovery replication with tested RPO/RTO targets',
      'FinOps tagging, reserved capacity planning, and anomaly billing alerts',
    ],
    slaTarget: '99.99% multi-AZ resilience · < 10 min rollback pipeline',
    typicalTimeline: '4 to 10 weeks per workload migration',
    span: 'standard',
  },
  {
    id: 'it-consulting',
    number: '04',
    category: 'Advisory',
    title: 'IT Consulting',
    summary:
      'Pragmatic technology strategy, legacy system modernization roadmaps, M&A technical due diligence, and vendor consolidation led by principal systems architects.',
    benefits: [
      'Replace fragmented SaaS sprawl and legacy bottlenecks with clear architecture',
      'Align infrastructure capital budgets directly with 12-to-24-month growth targets',
      'Retain senior technical leadership without full-time executive overhead',
    ],
    deliverables: [
      'Comprehensive architecture, security, and cost-efficiency audit report',
      'Prioritized 90-day and 12-month execution roadmap with budget models',
      'Vendor evaluation, RFP technical scoring, and contract review',
      'Fractional CTO / Principal Architect advisory embedded with leadership',
    ],
    slaTarget: 'Board-ready technical deliverables · Weekly executive syncs',
    typicalTimeline: '2-week diagnostic sprint or ongoing retainer',
    span: 'wide',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'northstar-logistics',
    client: 'Northstar Freight Systems',
    industry: 'Regional Logistics & Fleet Operations',
    timeframe: '16-week engagement',
    headlineMetric: '-64% Cloud & Infrastructure Spend',
    metricContext: 'Achieved within 4 months while handling 2.1x higher dispatch volume',
    title: 'Legacy On-Premise ERP Consolidation & Multi-Region Cloud Migration',
    before:
      'Dispatch software ran on aging co-located servers across three regional warehouses, causing weekly sync lockups and $34,000/month in emergency maintenance and idle hardware leases.',
    change:
      'Rebuilt deployment pipelines into declarative Terraform infrastructure on managed cloud clusters, introduced automated PostgreSQL read replicas, and unified warehouse VPN links behind zero-trust gateways.',
    outcome:
      'Reduced recurring infrastructure overhead by 64%, eliminated unscheduled dispatch outages, and cut warehouse terminal provisioning time from 4 days to 22 minutes.',
    image: caseLogisticsImg,
    imageAlt: 'Logistics operations team monitoring warehouse fleet dispatch screens overlooking distribution bays',
    testimonial: {
      quote:
        'Before BusyBug stepped in, Monday morning dispatch slowdowns were treated as unavoidable. They rebuilt our underlying network and cloud database architecture with zero lost shipping hours, and our monthly IT bill dropped by more than half.',
      author: 'Marcus Vance',
      role: 'VP of Operations',
      organization: 'Northstar Freight Systems',
    },
  },
  {
    id: 'harborview-health',
    client: 'Harborview Clinical Network',
    industry: 'Multi-Site Healthcare Services',
    timeframe: '12-week security overhaul',
    headlineMetric: '100% SOC 2 & HIPAA Audit Pass',
    metricContext: 'Zero findings across 14 outpatient clinics and 420 managed endpoints',
    title: 'Zero-Trust Identity Governance & Managed Endpoint Hardening',
    before:
      'Fourteen clinics operated with inconsistent local admin privileges, shared workstation logins, and manual spreadsheet-based security patching that threatened upcoming compliance renewals.',
    change:
      'Rolled out centralized SSO with hardware security tokens, automated MDM policy enforcement across 420 endpoints, and deployed 24/7 EDR telemetry routed to BusyBug’s incident engineering desk.',
    outcome:
      'Passed independent HIPAA and SOC 2 Type II readiness audits with zero exceptions, while accelerating new clinician onboarding from 3 days to under 45 minutes.',
    image: caseSecurityImg,
    imageAlt: 'Cybersecurity engineer reviewing network telemetry beside a hardware security key',
    testimonial: {
      quote:
        'BusyBug never treated compliance as a paper-pushing exercise. They locked down 420 workstations without disrupting patient scheduling and gave our clinical directors a clear, verifiable security baseline.',
      author: 'Dr. Elena Rostova',
      role: 'Chief Operating Officer',
      organization: 'Harborview Clinical Network',
    },
  },
  {
    id: 'kestrel-commerce',
    client: 'Kestrel Industrial Supply',
    industry: 'B2B Wholesale & Procurement',
    timeframe: '10-week modernization',
    headlineMetric: '38ms P95 Checkout & API Latency',
    metricContext: 'Down from 1,420ms peak load lag, retaining +$1.8M in annual B2B orders',
    title: 'High-Availability API Architecture & Managed 24/7 Operations',
    before:
      'Seasonal procurement surges repeatedly saturated monolithic inventory databases, causing checkout timeouts during high-value corporate purchase orders.',
    change:
      'Decoupled order ingestion with idempotent event queues, implemented edge caching and connection pooling, and placed the production cluster under 24/7 automated BusyBug observability.',
    outcome:
      'Sustained 38ms P95 API response times during peak Q4 volume with 99.99% availability and recovered an estimated $1.8M in previously abandoned enterprise orders.',
    image: heroArchitectureImg,
    imageAlt: 'Software and infrastructure engineers reviewing distributed API latency metrics',
    testimonial: {
      quote:
        'Our previous vendor kept recommending bigger servers every time checkout stalled. BusyBug diagnosed the root database contention in week one and engineered a fix that held steady through our highest-volume quarter on record.',
      author: 'David Chen',
      role: 'Director of Digital Commerce',
      organization: 'Kestrel Industrial Supply',
    },
  },
];

export const DELIVERY_PHASES = [
  {
    step: '01',
    title: 'Diagnostic & Infrastructure Audit',
    duration: 'Week 1–2',
    description:
      'We inspect cloud billing, network topology, identity permissions, and failure logs to deliver an unvarnished baseline report with prioritized risk rankings.',
  },
  {
    step: '02',
    title: 'Target Architecture Blueprint',
    duration: 'Week 3',
    description:
      'You receive concrete Terraform designs, security control matrices, and fixed-scope sprint milestones—with clear cost vs. resilience trade-offs.',
  },
  {
    step: '03',
    title: 'Parallel Execution & Migration',
    duration: 'Week 4–10',
    description:
      'Senior infrastructure, security, and software engineers build alongside your team in staging environments before executing verified, low-risk cutovers.',
  },
  {
    step: '04',
    title: 'Managed Operations or Clean Handover',
    duration: 'Ongoing',
    description:
      'Either transition seamlessly into our 24/7 Managed IT & Security SLA or take full ownership of documented repositories and runbooks with zero vendor lock-in.',
  },
];

export const COMPANY_VALUES = [
  {
    number: '01',
    title: 'Root-Cause Rigor',
    description:
      'We never mask recurring failures with larger compute instances or temporary scripts. Every incident receives a structural fix documented in plain language.',
  },
  {
    number: '02',
    title: 'Transparent Economics',
    description:
      'Clients see every line item of cloud spend, software licensing, and engineering effort. We actively eliminate unused resources—even when it shrinks infrastructure retainers.',
  },
  {
    number: '03',
    title: 'Infrastructure as Documentation',
    description:
      'Tribal knowledge creates operational fragility. Every network rule, IAM policy, and deployment pipeline is codified in version-controlled repositories you control.',
  },
  {
    number: '04',
    title: 'Zero Vendor Lock-In',
    description:
      'You own your cloud accounts, domain registrars, security keys, and source code from day one. We earn long-term partnerships through reliability, never captivity.',
  },
];

export const COMPANY_MILESTONES = [
  {
    year: '2019',
    title: 'Founded as a Systems Debugging Practice',
    detail:
      'Started by three infrastructure and backend engineers helping mid-sized regional businesses untangle fragile legacy servers and recurring database outages.',
  },
  {
    year: '2021',
    title: 'Cloud Engineering & Automation Division',
    detail:
      'Formalized our Infrastructure-as-Code practice, delivering zero-downtime AWS and Google Cloud migrations for logistics, finance, and SaaS teams.',
  },
  {
    year: '2023',
    title: '24/7 Managed IT & Cybersecurity Desk',
    detail:
      'Launched round-the-clock endpoint management, zero-trust IAM hardening, and compliance readiness programs for distributed multi-site organizations.',
  },
  {
    year: '2026',
    title: '42+ Production Environments Under Stewardship',
    detail:
      'Operating as an integrated engineering partner maintaining a 99.98% measured uptime record across North America and APAC client clusters.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'arjun-mehta',
    initials: 'AM',
    name: 'Arjun Mehta',
    role: 'Co-Founder & Principal Systems Architect',
    focus: 'Cloud Architecture · High-Availability Systems',
    tenure: '14 years in enterprise infrastructure',
    bio: 'Leads cloud migrations, database topology redesigns, and fault-tolerant systems architecture for high-throughput B2B platforms.',
  },
  {
    id: 'claire-lindqvist',
    initials: 'CL',
    name: 'Claire Lindqvist',
    role: 'Head of Cybersecurity & Compliance',
    focus: 'Zero-Trust IAM · SOC 2 & HIPAA Governance',
    tenure: '11 years in security engineering',
    bio: 'Directs identity hardening, EDR operations, and audit readiness frameworks across healthcare, fintech, and distributed corporate fleets.',
  },
  {
    id: 'tomas-novak',
    initials: 'TN',
    name: 'Tomas Novak',
    role: 'Director of Managed IT Operations',
    focus: '24/7 Reliability · Endpoint Lifecycle & MDM',
    tenure: '12 years in network & fleet operations',
    bio: 'Oversees our <15-minute critical escalation desk, automated patching pipelines, and multi-site office networking deployments.',
  },
  {
    id: 'priya-nair',
    initials: 'PN',
    name: 'Priya Nair',
    role: 'Principal IT Consultant & Delivery Lead',
    focus: 'Technology Roadmaps · FinOps & M&A Audits',
    tenure: '10 years in technical advisory',
    bio: 'Partners directly with executive leadership on vendor consolidation, cloud cost reduction, and multi-quarter modernization budgets.',
  },
];

export interface OpenRole {
  id: string;
  title: string;
  department: string;
  type: string;
  summary: string;
  stack: string;
}

export const OPEN_ROLES: OpenRole[] = [
  {
    id: 'cloud-devops-engineer',
    title: 'Senior Cloud & DevOps Engineer',
    department: 'Cloud Solutions',
    type: 'Full-Time · Remote',
    summary:
      'Design modular Terraform repositories, Kubernetes clusters, and zero-downtime CI/CD pipelines across AWS and Google Cloud environments.',
    stack: 'Terraform · Kubernetes · AWS/GCP · PostgreSQL',
  },
  {
    id: 'cybersecurity-iam-specialist',
    title: 'Cybersecurity & IAM Specialist',
    department: 'Cybersecurity',
    type: 'Full-Time · Remote',
    summary:
      'Lead zero-trust identity rollouts, EDR telemetry monitoring, and SOC 2 / HIPAA technical readiness controls for multi-site clients.',
    stack: 'SSO/SAML · MDM · EDR · SOC 2 Controls',
  },
  {
    id: 'managed-it-reliability-engineer',
    title: 'Managed IT Reliability Engineer',
    department: 'Managed IT Services',
    type: 'Full-Time · Hybrid / Remote',
    summary:
      'Own Tier-2/Tier-3 infrastructure incident response, automated fleet patching, and network observability across distributed client offices.',
    stack: 'Linux/macOS/Windows · Networking · Observability',
  },
];

