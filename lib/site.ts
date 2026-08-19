// ---------------------------------------------------------------------------
// Single content source for the site. Edit here, not in page components.
// Empty strings are values that are not yet known; the UI hides them rather
// than rendering a broken link.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Nafiz Basher Alif',
  shortName: 'Nafiz Basher',
  role: 'Researcher',

  question: 'Why do institutions persist when they fail?',
  description:
    '',

  areas: [
    'Institutions',
    'Political incentives',
    'Institutional dysfunction',
    'Political economy',
    'Governance',
    'Global South',
  ],

  email: 'nafiz-2021514942@dpa.du.ac.bd',
  substackUrl: 'https://nafizbasher.substack.com/',
  orcidUrl: '',
  linkedinUrl: '',
  cvPath: '/cv.pdf',
};

export const education = {
  institution: 'University of Dhaka',
  degree: 'Bachelor of Social Sciences, Public Administration',
  date: 'August 2026',
  thesis:
    'When the State Falters: The Political Economy of Policy Failure in Migration Governance',
  supervisor: 'Dr. Akram Hossain',
};

export const positions = [
  {
    org: 'Institute of Policy Dynamics (IPD)',
    title: 'Policy Research Fellow',
    period: 'May 2026 – Present',
    current: true,
    points: [
      'Quantitative research across five or more projects, analysing survey and policy data on governance, institutional performance, and policy outcomes using R and SPSS.',
      'Synthesis of academic literature with empirical evidence to develop research frameworks.',
      'Examines how political incentives, institutional structures, and administrative processes shape policy implementation.',
    ],
  },
  {
    org: 'Directorate General of Family Planning (DGFP), Bangladesh',
    title: 'Research Associate',
    period: 'January 2025 – December 2025',
    current: false,
    points: [
      'Field research on governance failures in migration regulation, examining how administrative incentives and political intermediaries shape pre-departure decision-making.',
      'Applied a governance diagnostics framework to identify institutional choke points associated with political discretion and implementation failure.',
      'Conducted more than thirty semi-structured interviews with migrants, returnees, and government officials.',
      'Developed a comparative analytical matrix mapping patterns of bureaucratic delay, rent-seeking, and informal brokerage.',
    ],
  },
];

// ---------------------------------------------------------------------------
// The mechanism chain — the spine of the site
// ---------------------------------------------------------------------------

export const chain = [
  {
    id: 'rule',
    label: 'Formal rule',
    note: 'On paper the institution has a mandate, a procedure, and a stated purpose. This is the version that appears in law and in reform documents.',
  },
  {
    id: 'implementation',
    label: 'Implementation',
    note: 'The rule meets the office, the queue, the form, the officer. What happens here is not fully determined by what the rule says.',
  },
  {
    id: 'incentives',
    label: 'Incentives',
    note: 'The people operating the institution face their own pressures and rewards. These need not line up with the institution performing well.',
  },
  {
    id: 'discretion',
    label: 'Discretion',
    note: 'Gaps in the rule leave room for judgement. Discretion decides who waits, who is processed, and on what terms.',
  },
  {
    id: 'behaviour',
    label: 'Behaviour',
    note: 'Delay, opacity, and selective enforcement become routine practice rather than exception.',
  },
  {
    id: 'dysfunction',
    label: 'Dysfunction',
    note: 'The institution continues to exist and continues to underdeliver. Formal capacity remains; stated outcomes do not follow.',
  },
  {
    id: 'persistence',
    label: 'Persistence',
    note: 'Because the arrangement produces advantages for some actors, it is defended rather than merely tolerated. It lasts.',
  },
];

// The people → problem → institution → question sequence
export const humanLayer = [
  {
    stage: 'People',
    kind: 'Observation',
    body: 'Someone needs a document, a clearance, a registration. They are not thinking about institutions. They are thinking about a departure date.',
  },
  {
    stage: 'Problem',
    kind: 'Observation',
    body: 'The process takes longer than it should, costs more than it should, and is difficult to see into from outside.',
  },
  {
    stage: 'Institution',
    kind: 'Observation',
    body: 'The office exists. The rules exist. Staff are present. The failure is not the absence of an institution.',
  },
  {
    stage: 'Political question',
    kind: 'Research question',
    body: 'If the institution is formally capable, why does the outcome keep repeating? Who is served by it repeating?',
  },
];

// The research puzzle sequence
export const puzzle = [
  {
    label: 'Failure',
    body: 'A formally capable institution does not deliver what it is meant to deliver.',
  },
  {
    label: 'Adaptation',
    body: 'Actors adjust to the failure. Informal routes, intermediaries, and workarounds emerge around it.',
  },
  {
    label: 'Incentives',
    body: 'Those adaptations create positions worth holding. Delay and opacity acquire value.',
  },
  {
    label: 'Benefits',
    body: 'The distribution of advantage now depends on the institution continuing to work exactly this badly.',
  },
  {
    label: 'Persistence',
    body: 'Reform threatens the distribution. The arrangement acquires defenders and outlasts attempts to change it.',
  },
];

// Research framework nodes
export const framework = [
  {
    id: 'institutions',
    label: 'Institutions',
    body: 'Rules, mandates, and procedures, examined as arrangements that allocate advantage rather than as neutral machinery.',
  },
  {
    id: 'actors',
    label: 'Actors',
    body: 'Political and bureaucratic actors, intermediaries, and those subject to institutional decisions.',
  },
  {
    id: 'incentives',
    label: 'Incentives',
    body: 'What the arrangement actually rewards, which may differ sharply from what it formally requires.',
  },
  {
    id: 'implementation',
    label: 'Implementation',
    body: 'The point where rules become practice, and where discretion does most of its work.',
  },
  {
    id: 'outcomes',
    label: 'Outcomes',
    body: 'What the institution produces, for whom, and how consistently that pattern repeats.',
  },
];

export const mechanisms = [
  {
    num: '01',
    title: 'Incentive misalignment',
    detail:
      'The interests of political and bureaucratic actors diverge from the institution’s stated purpose, so effective performance stops being what anyone is rewarded for.',
  },
  {
    num: '02',
    title: 'Underperformance',
    detail:
      'The institution continues to operate, and may retain formal capacity, while consistently failing to deliver the outcomes it exists to produce.',
  },
  {
    num: '03',
    title: 'Benefit to incumbents',
    detail:
      'Underperformance is not costless to everyone. Delay, opacity, and discretion generate advantages for those positioned to capture them.',
  },
  {
    num: '04',
    title: 'Preservation',
    detail:
      'Because the arrangement is valuable to some actors, they work to keep it intact. Dysfunction is defended rather than merely tolerated.',
  },
];

// ---------------------------------------------------------------------------
// Research projects — real work only
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'profits-of-dysfunction',
    title:
      'The Profits of Dysfunction: Political Incentives and Institutional Failure in South Asia',
    type: 'Working paper',
    status: 'In progress',
    question: 'When does institutional failure become worth preserving?',
    summary:
      'Examines how institutional dysfunction may be sustained as a rent-generating mechanism in alternating-elite regimes.',
    description:
      'Examines how institutional dysfunction may be sustained as a rent-generating mechanism in alternating-elite regimes, drawing on mixed-methods evidence from governance in Bangladesh, with comparative evidence from Sri Lanka and Pakistan using secondary governance data.',
    themes: ['Institutional dysfunction', 'Political incentives'],
    cases: ['Bangladesh', 'Sri Lanka', 'Pakistan'],
    href: '',
  },
  {
    slug: 'when-the-state-falters',
    title:
      'When the State Falters: The Political Economy of Policy Failure in Migration Governance',
    type: 'Undergraduate thesis',
    status: 'Available on SSRN',
    year: '2026',
    question:
      'Why do formally capable institutions persistently underperform in migration governance?',
    summary:
      'Examines how political elites, bureaucratic actors, and intermediaries can benefit from delays, opacity, and discretionary enforcement.',
    description:
      'Examines why formally capable institutions persistently underperform in migration governance, focusing on how political elites, bureaucratic actors, and intermediaries can benefit from delays, opacity, and discretionary enforcement.',
    themes: ['Institutional persistence', 'Policy failure'],
    cases: ['Bangladesh'],
    href: 'https://doi.org/10.2139/ssrn.7288818',
    doi: '10.2139/ssrn.7288818',
    detail: true,
  },
];

// Backwards-compatible alias
export const publications = projects;

// Thesis long-form presentation
export const thesis = {
  title:
    'When the State Falters: The Political Economy of Policy Failure in Migration Governance',
  type: 'Undergraduate thesis',
  year: '2026',
  institution: 'University of Dhaka',
  supervisor: 'Dr. Akram Hossain',
  doi: '10.2139/ssrn.7288818',
  href: 'https://doi.org/10.2139/ssrn.7288818',
  sections: [
    {
      label: 'The puzzle',
      body: 'Migration governance in Bangladesh is not an empty institutional space. Agencies exist, rules exist, procedures exist. Yet outcomes for those moving through the system remain poor in ways that repeat rather than fluctuate. A capacity account struggles with that regularity.',
    },
    {
      label: 'Question',
      body: 'Why do formally capable institutions persistently underperform in migration governance, and what sustains that pattern across time?',
    },
    {
      label: 'Case',
      body: 'Migration governance in Bangladesh, examined through the administrative processes that govern pre-departure decision-making, and through the intermediaries who operate around them.',
    },
    {
      label: 'Evidence',
      body: 'A mixed-methods design combining semi-structured interviews with migrants, returnees, and government officials, alongside quantitative analysis. The study drew on a survey sample of 73, ordinary least squares regression, and six composite indices constructed for the analysis.',
    },
    {
      label: 'Findings',
      body: 'Underperformance is not evenly costly. Political elites, bureaucratic actors, and intermediaries can benefit from delay, opacity, and discretionary enforcement, which gives the existing arrangement a constituency with reasons to keep it as it is.',
    },
    {
      label: 'What remains open',
      body: 'How far the account travels beyond this case, whether the same mechanisms appear in institutions with different functions, and what conditions would have to change before the arrangement gave way.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Notebook — conceptual entries derived from the research, not personal diary
// ---------------------------------------------------------------------------

export const notebook = [
  {
    kind: 'Observation',
    body: 'The absence of an institution and the failure of an institution produce similar experiences at the counter, but they are not the same political problem and do not have the same remedy.',
  },
  {
    kind: 'Question',
    body: 'If discretion is where rules become outcomes, how much of institutional performance is decided at a level that formal reform never reaches?',
  },
  {
    kind: 'Reading',
    body: 'Work on rents, path dependence, and limited access orders keeps arriving at the same point from different directions: arrangements survive when somebody has reason to defend them.',
  },
  {
    kind: 'Field',
    body: 'Interviews conducted for the migration governance study repeatedly located the friction not in the written rule but in the interval between steps, where waiting itself became the resource.',
  },
  {
    kind: 'Observation',
    body: 'Reform that changes formal rules without changing what actors are rewarded for may alter documentation more than it alters outcomes.',
  },
  {
    kind: 'Open question',
    body: 'Comparative material from Sri Lanka and Pakistan suggests family resemblance across cases, but resemblance is not yet a mechanism. Establishing that is the next problem.',
  },
];

export const openQuestions = [
  'Why do dysfunctional institutions persist across changes of government?',
  'Who benefits from institutional underperformance, and how stable is that group over time?',
  'How does discretion reshape formal rules in practice?',
  'Why do some reforms change rules without changing outcomes?',
  'When does adaptation around an institution end up reinforcing it?',
  'Under what conditions do political incentives shift enough to produce genuine institutional change?',
  'How far do mechanisms identified in one case travel across the Global South?',
];

// Conceptual terrain the research sits in. No quotations, no attributions.
export const concepts = [
  {
    term: 'Rents',
    body: 'Advantages generated by an arrangement rather than by production. Where dysfunction produces rents, ending dysfunction has a cost for someone.',
  },
  {
    term: 'Path dependence',
    body: 'Arrangements become harder to displace as actors organise around them. History does not merely precede the present; it constrains it.',
  },
  {
    term: 'Discretion',
    body: 'The judgement exercised where rules are incomplete. It is often where an institution’s real distributional decisions are made.',
  },
  {
    term: 'State capacity',
    body: 'The ability to implement. Treating every failure as a capacity shortfall assumes performance is always wanted, which is the assumption in question.',
  },
  {
    term: 'Informal institutions',
    body: 'Regularised practice that operates alongside formal rules, sometimes substituting for them and sometimes quietly sustaining them.',
  },
  {
    term: 'Implementation gap',
    body: 'The distance between the rule as written and the rule as experienced. The size of that gap is itself a political outcome.',
  },
];

// ---------------------------------------------------------------------------
// Research map — only cases actually present in the research
// ---------------------------------------------------------------------------

export const mapCases = [
  {
    id: 'bd',
    name: 'Bangladesh',
    role: 'Primary case',
    x: 62,
    y: 47,
    body: 'Comparative research on institutions, political incentives, and governance.',
  },
  {
    id: 'in',
    name: 'India',
    role: 'Comparative',
    x: 47,
    y: 38,
    body: 'Comparative evidence drawn from secondary governance data.',
  },
  {
    id: 'np',
    name: 'Nepal',
    role: 'Comparative',
    x: 38,
    y: 20,
    body: 'Comparative evidence drawn from secondary governance data.',
  },
  {
    id: 'pk',
    name: 'Pakistan',
    role: 'Comparative',
    x: 26,
    y: 33,
    body: 'Comparative evidence drawn from secondary governance data.',
  },
  {
    id: 'lk',
    name: 'Sri Lanka',
    role: 'Comparative',
    x: 44,
    y: 76,
    body: 'Comparative evidence drawn from secondary governance data.',
  },
];

// ---------------------------------------------------------------------------
// IDRG
// ---------------------------------------------------------------------------

export const idrg = {
  name: 'Institutional Dysfunction Research Group',
  short: 'IDRG',
  line: 'Researching why institutions persist, adapt, and underperform.',
  question: 'Why do institutions that fail continue to exist in the form they do?',
  mission:
    'IDRG studies institutional dysfunction as a political outcome rather than as a residual category for things that did not work. It examines how rules, incentives, and discretion combine to produce arrangements that underperform consistently, and asks who those arrangements serve.',
  vision:
    'To build a collaborative research community producing empirical and comparative work on institutions and governance across the Global South, developed from cases rather than imported to them, and legible enough that findings in one setting can be read against another.',
};

export const idrgAreas = [
  {
    title: 'Institutional persistence',
    body: 'Why particular arrangements endure when performance alone cannot explain their survival.',
  },
  {
    title: 'Institutional dysfunction',
    body: 'Dysfunction examined as an outcome with identifiable beneficiaries.',
  },
  {
    title: 'Political incentives',
    body: 'How incentives shape what institutions are permitted to do, and what they are permitted to fail at.',
  },
  {
    title: 'Bureaucratic politics',
    body: 'Administrative behaviour, discretion, and implementation as the site where rules meet interests.',
  },
  {
    title: 'Rent extraction and distribution',
    body: 'How arrangements generate and allocate advantage, and how that feeds back into durability.',
  },
  {
    title: 'Institutional adaptation',
    body: 'The conditions under which institutions adjust, reform, or decline.',
  },
  {
    title: 'Comparative politics of the Global South',
    body: 'Building theory from cases rather than treating them as tests of frameworks developed elsewhere.',
  },
];

export const idrgProjects = [
  {
    name: 'Institutional Dysfunction Observatory',
    status: 'Proposed',
    line: 'A structured repository of cases where formally existing institutions repeatedly underperform.',
    dimensions: [
      'Formal function',
      'Observed dysfunction',
      'Actors',
      'Incentives',
      'Implementation',
      'Adaptation',
      'Persistence',
      'Reform attempts',
    ],
  },
  {
    name: 'Voices from Institutions',
    status: 'Proposed',
    line: 'An anonymised archive of accounts from people navigating institutions, built to research ethics standards.',
    dimensions: [],
  },
  {
    name: 'Institutional Persistence Casebook',
    status: 'Proposed',
    line: 'Comparative case studies examining how institutions persist despite poor performance.',
    dimensions: [],
  },
  {
    name: 'Institutional Change and Reform',
    status: 'Proposed',
    line: 'Research on reforms that change formal rules but may or may not change underlying incentives and outcomes.',
    dimensions: [],
  },
  {
    name: 'Comparative Institutions',
    status: 'Future direction',
    line: 'Longer-term comparative research across the Global South.',
    dimensions: [],
  },
];

export const idrgCurrent = [
  {
    name: 'The Profits of Dysfunction',
    status: 'Current',
    line: 'Working paper on political incentives and institutional failure in South Asia.',
    href: '/publications',
  },
  {
    name: 'When the State Falters',
    status: 'Completed',
    line: 'Mixed-methods study of policy failure in migration governance.',
    href: '/publications/when-the-state-falters',
  },
];

export const idrgMethods = [
  {
    name: 'Interviews',
    body: 'Semi-structured interviewing with people inside and around institutions.',
  },
  {
    name: 'Case studies',
    body: 'Cases developed carefully enough to carry analytical weight.',
  },
  {
    name: 'Comparative analysis',
    body: 'Reading cases against one another to separate the general from the particular.',
  },
  {
    name: 'Qualitative coding',
    body: 'Thematic analysis and structured coding of interview material.',
  },
  {
    name: 'Quantitative analysis',
    body: 'Survey and policy data analysis using R and SPSS.',
  },
  {
    name: 'Policy and document analysis',
    body: 'Reading formal rules, mandates, and reform documents against observed practice.',
  },
];

export const idrgActivities = [
  {
    title: 'Research discussions',
    body: 'Regular discussion of work in progress, framed around the argument rather than the polish.',
  },
  {
    title: 'Working papers',
    body: 'Developing drafts toward circulation, with structured internal review.',
  },
  {
    title: 'Collaborative projects',
    body: 'Joint work where questions overlap and a shared design beats parallel effort.',
  },
  {
    title: 'Literature discussions',
    body: 'Close reading of the work the group builds on and argues with.',
  },
  {
    title: 'Case development',
    body: 'Building cases to a standard that supports comparison.',
  },
  {
    title: 'Methodological exchange',
    body: 'Practical discussion of design, measurement, and inference.',
  },
];

export const idrgPeople = [
  {
    name: 'Nafiz Basher Alif',
    role: 'Founder and research lead',
    line: 'Researcher working on institutions, political incentives, and governance in the Global South.',
  },
];
