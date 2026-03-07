export interface NavPage {
  title: string;
  href: string;
}

export interface NavGroup {
  group: string;
  pages: NavPage[];
}

export interface NavTab {
  tab: string;
  slug: string;
  groups: NavGroup[];
}

export const navigation: NavTab[] = [
  {
    tab: 'Product',
    slug: '',
    groups: [
      {
        group: 'Overview',
        pages: [
          { title: 'Introduction', href: '/' },
          { title: 'Feature walkthrough', href: '/walkthrough' },
        ],
      },
      {
        group: 'Features',
        pages: [
          { title: 'Dashboard', href: '/features/dashboard' },
          { title: 'Bank-readiness scoring', href: '/features/scoring' },
          { title: 'Regulatory reference library', href: '/features/library' },
          { title: 'Examinations', href: '/features/examinations' },
          { title: 'Evidence collection', href: '/features/evidence' },
          { title: 'Evidence linking', href: '/features/evidence-linking' },
          { title: 'Archive and remediation', href: '/features/archive' },
        ],
      },
    ],
  },
  {
    tab: 'Developers',
    slug: 'developers',
    groups: [
      {
        group: 'Getting started',
        pages: [
          { title: 'Quickstart', href: '/developers/quickstart' },
          { title: 'Docker demo', href: '/developers/docker' },
        ],
      },
      {
        group: 'Architecture',
        pages: [
          { title: 'Architecture', href: '/developers/architecture' },
          { title: 'Architecture diagrams', href: '/developers/architecture-diagrams' },
          { title: 'Data model', href: '/developers/data-model' },
          { title: 'Background jobs', href: '/developers/background-jobs' },
          { title: 'AWS migration', href: '/developers/aws-migration' },
        ],
      },
      {
        group: 'Workflow',
        pages: [
          { title: 'Developing with Claude Code', href: '/developers/claude-code' },
        ],
      },
      {
        group: 'Contributing',
        pages: [
          { title: 'Conventions', href: '/developers/conventions' },
          { title: 'Testing', href: '/developers/testing' },
          { title: 'Build tracker', href: '/developers/todo' },
          { title: 'Roadmap', href: '/developers/roadmap' },
        ],
      },
    ],
  },
  {
    tab: 'API reference',
    slug: 'api-reference',
    groups: [
      {
        group: 'Overview',
        pages: [
          { title: 'API reference', href: '/api-reference/introduction' },
        ],
      },
      {
        group: 'Examinations',
        pages: [
          { title: 'Examinations', href: '/api-reference/examinations' },
        ],
      },
      {
        group: 'Compliance programs',
        pages: [
          { title: 'Compliance programs', href: '/api-reference/compliance-programs' },
        ],
      },
      {
        group: 'Knowledge base',
        pages: [
          { title: 'Knowledge base', href: '/api-reference/knowledge-base' },
        ],
      },
      {
        group: 'Remediation items',
        pages: [
          { title: 'Remediation items', href: '/api-reference/mras' },
        ],
      },
      {
        group: 'Evidence links',
        pages: [
          { title: 'Evidence links', href: '/api-reference/evidence-links' },
        ],
      },
      {
        group: 'Organization',
        pages: [
          { title: 'Organization', href: '/api-reference/organization' },
        ],
      },
    ],
  },
];

export function getActiveTab(pathname: string): NavTab {
  if (pathname.startsWith('/developers')) return navigation[1];
  if (pathname.startsWith('/api-reference')) return navigation[2];
  return navigation[0];
}

export const flatPages: NavPage[] = navigation.flatMap(tab => tab.groups.flatMap(g => g.pages));
