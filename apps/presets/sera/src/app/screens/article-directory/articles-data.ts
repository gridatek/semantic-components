// The articles at start: shadcn's Sera directory (sera/article-directory) and
// its dashboard's top editorials (sera/audience-analytics), as one list — the
// Article Directory, Edit Article and the dashboard read and change it
// through `ArticleStore`.
export type Status = 'drafting' | 'in-revision' | 'final-edit' | 'published';

export const STATUS_LABEL: Record<Status, string> = {
  drafting: 'Drafting',
  'in-revision': 'In revision',
  'final-edit': 'Final edit',
  published: 'Published',
};

export type MilestoneId =
  'outline' | 'first-draft' | 'review' | 'copy-edit' | 'layout';

export const MILESTONES: { id: MilestoneId; name: string }[] = [
  { id: 'outline', name: 'Outline & Commissioning' },
  { id: 'first-draft', name: 'First Draft Submitted' },
  { id: 'review', name: 'Review & Revisions' },
  { id: 'copy-edit', name: 'Final Copy Edit' },
  { id: 'layout', name: 'Art Direction & Layout' },
];

/** How a published article is read: the dashboard's top editorials. */
export interface Readership {
  /** "Oct 12". */
  published: string;
  pageviews: number;
  /** The average read, in seconds. */
  readSeconds: number;
  shares: number;
}

export interface Article {
  /** Its address: /articles/<id>. */
  id: string;
  title: string;
  author: string;
  /** Its issue's id (`ISSUES`). */
  issue: string;
  status: Status;
  /** The text, as HTML. */
  body: string;
  /** The length asked for, in words. */
  targetWords: number;
  milestones: MilestoneId[];
  /** For the editor. */
  note: string;
  readership?: Readership;
}

/** The issues: Spring 2025 has no article yet (the empty state). */
export const ISSUES = [
  { id: 'summer-2024', label: 'Summer 2024' },
  { id: 'autumn-2024', label: 'Autumn 2024' },
  { id: 'winter-2024', label: 'Winter 2024' },
  { id: 'spring-2025', label: 'Spring 2025' },
];

export function issueLabel(id: string): string {
  return ISSUES.find((issue) => issue.id === id)?.label ?? id;
}

/** The words of an HTML text. */
export function countWords(html: string): number {
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .trim();
  return text ? text.split(/\s+/).length : 0;
}

const count = (words: number) =>
  words < 1000 ? `${words}` : `${(words / 1000).toFixed(1)}k`;

/** "164 / 2.6k words". */
export function wordProgress(article: Article): string {
  return `${count(countWords(article.body))} / ${count(article.targetWords)} words`;
}

/** Its way to publication: the milestones reached, 0 to 100. */
export function progressOf(article: Article): number {
  return Math.round((article.milestones.length / MILESTONES.length) * 100);
}

/** shadcn's article text (sera/edit-article), the start of every sample. */
const SAMPLE_BODY = `<p>As cities continue to expand at an unprecedented rate, the architectural paradigm is shifting from mere expansion to sustainable integration. The concrete jungles of the 20th century are making way for structures that breathe, adapt, and give back to their environments.</p>
<p>Historically, urban development has been a zero-sum game with nature.</p>
<h3>The Living Building Challenge</h3>
<p>Sterling's latest project in downtown Seattle is a testament to this new philosophy. "We are no longer designing static structures," Sterling explained during a recent site visit. "We are engineering localized ecosystems."</p>
<p>The building features a facade of responsive biomaterials that adjust their porosity based on humidity and temperature, significantly reducing the need for artificial climate control. Rainwater is not merely channeled away but captured, filtered through a series of integrated rooftop wetlands, and reused within the building's greywater system.</p>
<p>This shift requires more than just innovative materials; it demands a fundamental change in how we value space. Check with engineering team for specific stats.</p>`;

/** The milestones an article at this stage has reached. */
const REACHED: Record<Status, MilestoneId[]> = {
  drafting: ['outline'],
  'in-revision': ['outline', 'first-draft'],
  'final-edit': ['outline', 'first-draft', 'review', 'copy-edit'],
  published: ['outline', 'first-draft', 'review', 'copy-edit', 'layout'],
};

type Seed = Pick<
  Article,
  'id' | 'title' | 'author' | 'issue' | 'status' | 'targetWords'
> & { readership?: Readership };

const seed = (article: Seed): Article => ({
  body: SAMPLE_BODY,
  milestones: REACHED[article.status],
  note: '',
  ...article,
});

export const ARTICLES: Article[] = [
  // The directory's.
  seed({
    id: 'the-future-of-sustainable-architecture',
    title: 'The Future of Sustainable Architecture',
    author: 'Elena Rostova',
    issue: 'summer-2024',
    status: 'in-revision',
    targetWords: 2600,
  }),
  seed({
    id: 'brutalisms-second-act',
    title: "Brutalism's Second Act",
    author: 'Marcus Chen',
    issue: 'summer-2024',
    status: 'final-edit',
    targetWords: 2500,
  }),
  seed({
    id: 'the-typography-of-public-spaces',
    title: 'The Typography of Public Spaces',
    author: 'Sarah Jenkins',
    issue: 'autumn-2024',
    status: 'drafting',
    targetWords: 1500,
  }),
  seed({
    id: 'rethinking-urban-canopies',
    title: 'Rethinking Urban Canopies',
    author: "David O'Connor",
    issue: 'summer-2024',
    status: 'published',
    targetWords: 1800,
  }),
  seed({
    id: 'light-glass-and-the-modern-museum',
    title: 'Light, Glass, and the Modern Museum',
    author: 'Amara Osei',
    issue: 'autumn-2024',
    status: 'in-revision',
    targetWords: 2000,
  }),
  seed({
    id: 'concrete-utopias-housing-in-the-21st-century',
    title: 'Concrete Utopias: Housing in the 21st Century',
    author: 'Tomás Herrera',
    issue: 'summer-2024',
    status: 'published',
    targetWords: 3000,
  }),
  seed({
    id: 'designing-for-silence',
    title: 'Designing for Silence',
    author: 'Ingrid Solberg',
    issue: 'winter-2024',
    status: 'drafting',
    targetWords: 2200,
  }),
  seed({
    id: 'the-invisible-infrastructure-of-cities',
    title: 'The Invisible Infrastructure of Cities',
    author: 'James Whitfield',
    issue: 'autumn-2024',
    status: 'final-edit',
    targetWords: 2800,
  }),
  // The dashboard's top editorials: published, with their readers.
  seed({
    id: 'the-new-vanguard-of-minimalist-architecture',
    title: 'The New Vanguard of Minimalist Architecture',
    author: 'Elena Rostova',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 2400,
    readership: {
      published: 'Oct 12',
      pageviews: 45200,
      readSeconds: 255,
      shares: 1840,
    },
  }),
  seed({
    id: 'autumn-sartorial-code-deconstructed-classics',
    title: 'Autumn Sartorial Code: Deconstructed Classics',
    author: 'Julian Vance',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 1900,
    readership: {
      published: 'Oct 05',
      pageviews: 38900,
      readSeconds: 222,
      shares: 2310,
    },
  }),
  seed({
    id: 'interview-sofia-coppola-on-the-aesthetics-of-isolation',
    title: 'Interview: Director Sofia Coppola on The Aesthetics of Isolation',
    author: 'Marcus Trent',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 3200,
    readership: {
      published: 'Sep 28',
      pageviews: 31400,
      readSeconds: 380,
      shares: 2960,
    },
  }),
  seed({
    id: 'sourcing-ceramics-from-kyotos-oldest-kilns',
    title: "Sourcing Ceramics from Kyoto's Oldest Kilns",
    author: 'Sarah Lin',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 1600,
    readership: {
      published: 'Oct 18',
      pageviews: 22100,
      readSeconds: 175,
      shares: 980,
    },
  }),
  seed({
    id: 'field-notes-from-copenhagen-design-week',
    title: 'Field Notes from Copenhagen Design Week',
    author: 'Noah Bennett',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 1500,
    readership: {
      published: 'Oct 21',
      pageviews: 19700,
      readSeconds: 198,
      shares: 1220,
    },
  }),
  seed({
    id: 'a-studio-visit-with-milans-most-elusive-lighting-designer',
    title: "A Studio Visit with Milan's Most Elusive Lighting Designer",
    author: 'Claire Duval',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 2200,
    readership: {
      published: 'Oct 09',
      pageviews: 17400,
      readSeconds: 242,
      shares: 760,
    },
  }),
  seed({
    id: 'collecting-the-new-avant-garde-in-contemporary-furniture',
    title: 'Collecting the New Avant-Garde in Contemporary Furniture',
    author: 'Tommy Rhodes',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 2000,
    readership: {
      published: 'Sep 30',
      pageviews: 15900,
      readSeconds: 216,
      shares: 640,
    },
  }),
  seed({
    id: 'inside-lisbons-quiet-culinary-renaissance',
    title: "Inside Lisbon's Quiet Culinary Renaissance",
    author: 'Amara Iqbal',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 2600,
    readership: {
      published: 'Oct 14',
      pageviews: 14200,
      readSeconds: 308,
      shares: 1410,
    },
  }),
  seed({
    id: 'why-slow-interiors-are-defining-the-next-luxury-wave',
    title: 'Why Slow Interiors Are Defining the Next Luxury Wave',
    author: 'Henry Vale',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 1700,
    readership: {
      published: 'Oct 03',
      pageviews: 12700,
      readSeconds: 191,
      shares: 530,
    },
  }),
  seed({
    id: 'the-return-of-print-independent-magazine-covers-to-watch',
    title: 'The Return of Print: Independent Magazine Covers to Watch',
    author: 'Mina Okafor',
    issue: 'autumn-2024',
    status: 'published',
    targetWords: 1400,
    readership: {
      published: 'Sep 26',
      pageviews: 11300,
      readSeconds: 169,
      shares: 870,
    },
  }),
];
