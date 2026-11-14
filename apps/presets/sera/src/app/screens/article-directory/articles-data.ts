// shadcn's Sera articles (sera/article-directory), shared by the Articles and
// Edit Article pages — each with an id, for its address.
export type Status = 'in-revision' | 'final-edit' | 'drafting' | 'published';

export interface Article {
  /** Its address: /articles/<id>. */
  id: string;
  title: string;
  wordProgress: string;
  author: string;
  issue: string;
  status: Status;
  statusLabel: string;
  progress: number;
}

export const ARTICLES: Article[] = [
  {
    id: 'the-future-of-sustainable-architecture',
    title: 'The Future of Sustainable Architecture',
    wordProgress: '1.4k / 2.6k words',
    author: 'Elena Rostova',
    issue: 'Summer 2024',
    status: 'in-revision',
    statusLabel: 'In revision',
    progress: 45,
  },
  {
    id: 'brutalisms-second-act',
    title: "Brutalism's Second Act",
    wordProgress: '2.1k / 2.5k words',
    author: 'Marcus Chen',
    issue: 'Summer 2024',
    status: 'final-edit',
    statusLabel: 'Final edit',
    progress: 90,
  },
  {
    id: 'the-typography-of-public-spaces',
    title: 'The Typography of Public Spaces',
    wordProgress: '0.5k / 1.5k words',
    author: 'Sarah Jenkins',
    issue: 'Autumn 2024',
    status: 'drafting',
    statusLabel: 'Drafting',
    progress: 20,
  },
  {
    id: 'rethinking-urban-canopies',
    title: 'Rethinking Urban Canopies',
    wordProgress: '1.8k / 1.8k words',
    author: "David O'Connor",
    issue: 'Summer 2024',
    status: 'published',
    statusLabel: 'Published',
    progress: 100,
  },
  {
    id: 'light-glass-and-the-modern-museum',
    title: 'Light, Glass, and the Modern Museum',
    wordProgress: '1.2k / 2.0k words',
    author: 'Amara Osei',
    issue: 'Autumn 2024',
    status: 'in-revision',
    statusLabel: 'In revision',
    progress: 55,
  },
  {
    id: 'concrete-utopias-housing-in-the-21st-century',
    title: 'Concrete Utopias: Housing in the 21st Century',
    wordProgress: '3.0k / 3.0k words',
    author: 'Tomás Herrera',
    issue: 'Summer 2024',
    status: 'published',
    statusLabel: 'Published',
    progress: 100,
  },
  {
    id: 'designing-for-silence',
    title: 'Designing for Silence',
    wordProgress: '0.8k / 2.2k words',
    author: 'Ingrid Solberg',
    issue: 'Winter 2024',
    status: 'drafting',
    statusLabel: 'Drafting',
    progress: 30,
  },
  {
    id: 'the-invisible-infrastructure-of-cities',
    title: 'The Invisible Infrastructure of Cities',
    wordProgress: '2.4k / 2.8k words',
    author: 'James Whitfield',
    issue: 'Autumn 2024',
    status: 'final-edit',
    statusLabel: 'Final edit',
    progress: 85,
  },
];

/** The issues, for the sidebar: Spring 2025 has no article yet (the empty state). */
export const ISSUES = [
  { id: 'summer-2024', label: 'Summer 2024' },
  { id: 'autumn-2024', label: 'Autumn 2024' },
  { id: 'winter-2024', label: 'Winter 2024' },
  { id: 'spring-2025', label: 'Spring 2025' },
];

/** The articles of an issue (its id), or all of them. */
export function articlesOf(issue: string | null): Article[] {
  if (!issue) return ARTICLES;
  const label = ISSUES.find((i) => i.id === issue)?.label;
  return ARTICLES.filter((a) => a.issue === label);
}
