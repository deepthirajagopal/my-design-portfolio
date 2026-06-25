export type CaseStudySection = {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  tags: string[];
  summary: string;
  coverImage: string;
  featured: boolean;
  protected: boolean;
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ready1",
    title: "Ready1",
    subtitle: "Incident Response Orchestration",
    role: "Principal Product Designer",
    timeline: "2024",
    tags: ["Agentic UX", "Security", "Enterprise B2B"],
    summary:
      "Agentic SOC platform redesign. MTTC reduced 62% in pilot — unified triage, severity cues, and cross-team coordination under pressure.",
    coverImage: "/assets/ready1-cover.png",
    featured: true,
    protected: true,
    sections: [
      {
        title: "Problem",
        body: "Incident response teams juggle fragmented tools, slow handoffs, and unclear severity signals. Ready1 needed a unified workspace that surfaces what matters without overwhelming operators during high-stakes moments.",
        image: "/assets/ready1-cover.png",
        imageAlt: "Ready1 incident response dashboard overview",
      },
      {
        title: "Research & competitive analysis",
        body: "Benchmarked leading incident management products to map feature gaps, information hierarchy patterns, and escalation flows. Synthesized findings into design principles: clarity under pressure, progressive disclosure, and scannable severity cues.",
      },
      {
        title: "Agentic workflow design",
        body: "Defined when AI agents should act autonomously vs. surface human judgment. Designed scribe summaries, task orchestration, and bridge features for cross-team coordination with clear handoff states.",
      },
      {
        title: "Outcome",
        body: "Delivered a cohesive dashboard system — active incident views, severity and stage indicators, impact widgets, and analyst workflows tuned for rapid scanning. Pilot teams reported 62% reduction in mean time to contain.",
      },
    ],
  },
  {
    slug: "forest-druid",
    title: "Forest Druid",
    subtitle: "Attack Path Visualization",
    role: "Principal Product Designer",
    timeline: "2023",
    tags: ["Data Viz", "Security", "Threat intelligence"],
    summary:
      "Identity graph threat intelligence platform. Attack-path visualization reduced time-to-identify critical exposures by 71%.",
    coverImage: "/assets/forest-druid-cover.png",
    featured: true,
    protected: true,
    sections: [
      {
        title: "Context",
        body: "Security analysts struggled to trace lateral movement and privilege escalation paths across sprawling identity graphs. Forest Druid needed to make invisible attack paths legible at a glance.",
        image: "/assets/forest-druid-cover.png",
        imageAlt: "Forest Druid attack path visualization",
      },
      {
        title: "Discovery",
        body: "Conducted analyst interviews and shadowed SOC workflows. Identified that existing tools forced sequential drill-down — the opposite of how experts mentally model blast radius.",
      },
      {
        title: "Visualization system",
        body: "Designed node-link graphs with severity-weighted edges, collapsible subgraphs, and contextual panels that preserve spatial memory. Progressive disclosure keeps novices oriented while experts stay fast.",
      },
      {
        title: "Outcome",
        body: "Time-to-identify critical attack paths dropped 71% in usability testing. The visual language became the foundation for subsequent threat-intel features across the product suite.",
      },
    ],
  },
  {
    slug: "enterprise-soc",
    title: "Enterprise SOC",
    subtitle: "AI Triage Redesign",
    role: "Staff Product Designer",
    timeline: "2023",
    tags: ["Agentic UX", "Fortune 500", "NDA"],
    summary:
      "Fortune 500 SOC AI triage redesign. Rebuilt alert prioritization and analyst trust patterns for autonomous vs. human-in-the-loop decisions.",
    coverImage: "/assets/delegation-cover.png",
    featured: true,
    protected: true,
    sections: [
      {
        title: "Challenge",
        body: "A Fortune 500 security operations center was drowning in alert volume. A new AI triage layer promised relief — but analysts didn't trust it. False positives eroded confidence; black-box recommendations were ignored.",
        image: "/assets/delegation-cover.png",
        imageAlt: "Enterprise SOC triage interface concept",
      },
      {
        title: "Trust architecture",
        body: "Mapped the decision loop from alert ingestion to escalation. Designed explainability surfaces, confidence indicators, and override patterns that make AI reasoning inspectable without adding cognitive load.",
      },
      {
        title: "Triage redesign",
        body: "Restructured the alert queue around severity, blast radius, and analyst workload. Introduced batch actions, smart grouping, and a review queue for edge cases the model flags as uncertain.",
      },
      {
        title: "Impact",
        body: "Analyst satisfaction reached 4.7/5 in post-launch surveys. Alert review time dropped significantly while maintaining zero missed critical escalations during the pilot period.",
      },
    ],
  },
  {
    slug: "ekstep",
    title: "Ekstep",
    subtitle: "Classroom Learning Platform",
    role: "Product Designer",
    timeline: "2022",
    tags: ["Ed-tech", "Wireframing", "Classroom UX"],
    summary:
      "Classroom experiences for an education platform recognized for impact — balancing teacher workflows with student engagement in resource-constrained environments.",
    coverImage: "/assets/ekstep-cover.png",
    featured: false,
    protected: true,
    sections: [
      {
        title: "Context",
        body: "Ekstep serves educators and learners in resource-constrained environments. The design needed to work across devices, literacy levels, and classroom dynamics.",
        image: "/assets/ekstep-cover.png",
        imageAlt: "Ekstep education platform overview",
      },
      {
        title: "Exploration",
        body: "Developed wireframes exploring lesson flow, classroom management, and content discovery — prioritizing clarity for first-time users.",
      },
      {
        title: "Impact",
        body: "Delivered polished classroom screens and visual systems that supported scale and recognition for meaningful educational outcomes.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured);
}
