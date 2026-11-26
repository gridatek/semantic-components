/**
 * The blog's posts and comments, names and numbers written out, so every
 * load shows the same. Dates are ISO dates (Temporal).
 */

export interface BlogAuthor {
  readonly name: string;
  readonly avatar: string;
}

export interface BlogComment {
  readonly id: string;
  readonly author: BlogAuthor;
  readonly date: string;
  readonly text: string;
  readonly replies: readonly BlogComment[];
}

export type BlogStatus = 'published' | 'draft';

export interface BlogPost {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  /** The post's text, as the editor's HTML. */
  readonly body: string;
  readonly cover: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly date: string;
  readonly views: number;
  readonly shares: number;
  readonly featured: boolean;
  readonly status: BlogStatus;
  readonly author: BlogAuthor;
  readonly comments: readonly BlogComment[];
}

export const BLOG_CATEGORIES = [
  'Gadget',
  'Lifestyle',
  'Design',
  'Social',
  'Health',
] as const;

const avatar = (n: number) => `images/profile/user-${n}.png`;
const cover = (n: number) => `images/blog/blog-img${n}.png`;

const COMMENTS: readonly BlogComment[] = [
  {
    id: 'c1',
    author: { name: 'Daisy Weber', avatar: avatar(5) },
    date: '2026-10-28',
    text: 'Loved the way this breaks the topic down. The part about trade-offs is exactly what I was looking for.',
    replies: [],
  },
  {
    id: 'c2',
    author: { name: 'Owen Castillo', avatar: avatar(3) },
    date: '2026-10-30',
    text: 'Has anyone tried this in practice? I would like to hear how it held up after a few months.',
    replies: [
      {
        id: 'c2-1',
        author: { name: 'Mina Kovacs', avatar: avatar(4) },
        date: '2026-10-31',
        text: 'We did — the first weeks were rough, but it paid off. Happy to share notes.',
        replies: [],
      },
    ],
  },
  {
    id: 'c3',
    author: { name: 'Leo Brandt', avatar: avatar(4) },
    date: '2026-11-02',
    text: 'Clear and to the point. Bookmarking this one for the team.',
    replies: [],
  },
];

const BODY = (lead: string) =>
  `<p>${lead}</p>` +
  '<h2>What changes</h2>' +
  '<p>Teams that adopted it early report shorter feedback loops and fewer surprises at release time. The cost shows up elsewhere: more decisions move to the start of a project, where less is known.</p>' +
  '<ul><li><p>Plan the first two weeks in detail.</p></li><li><p>Keep the rest of the roadmap loose.</p></li><li><p>Review what you learned every Friday.</p></li></ul>' +
  '<blockquote><p>The best plan is the one you are still allowed to change.</p></blockquote>' +
  '<p>None of this is new, but the tools around it finally make it cheap enough to try on a small project before betting a quarter on it.</p>';

interface Seed {
  readonly title: string;
  readonly cover: number;
  readonly category: string;
  readonly date: string;
  readonly views: number;
  readonly shares: number;
  readonly featured: boolean;
  readonly published: boolean;
  readonly author: BlogAuthor;
  readonly excerpt: string;
}

const SEEDS: readonly Seed[] = [
  {
    title: 'Garmins Instinct Crossover is a rugged hybrid smartwatch',
    cover: 2,
    category: 'Gadget',
    date: '2026-11-09',
    views: 9125,
    shares: 3412,
    featured: false,
    published: true,
    author: { name: 'Georgeanna Ramero', avatar: avatar(5) },
    excerpt:
      'Analog hands over a digital display, and a battery that lasts as long as you dare to wander.',
  },
  {
    title: 'After Twitter Staff Cuts, Survivors Face Radio Silence',
    cover: 1,
    category: 'Lifestyle',
    date: '2026-11-10',
    views: 4150,
    shares: 1209,
    featured: false,
    published: true,
    author: { name: 'Jacob Cooper', avatar: avatar(2) },
    excerpt:
      'Those who stayed describe empty channels, unanswered questions and a company learning to run on fewer voices.',
  },
  {
    title:
      'Apple is apparently working on a new streamlined accessibility for iOS',
    cover: 3,
    category: 'Design',
    date: '2026-11-12',
    views: 6874,
    shares: 2033,
    featured: false,
    published: true,
    author: { name: 'Aiden Palmer', avatar: avatar(3) },
    excerpt:
      'A single switch for the settings people reach for most, according to people familiar with the plans.',
  },
  {
    title: 'Why Figma is selling to Adobe for $20 billion',
    cover: 4,
    category: 'Design',
    date: '2026-11-10',
    views: 7932,
    shares: 2841,
    featured: false,
    published: true,
    author: { name: 'Ella Morrison', avatar: avatar(4) },
    excerpt:
      'What the deal means for designers, for prices and for the small tools that grew up around Figma.',
  },
  {
    title: 'Streaming video way before it was cool, go dark tomorrow',
    cover: 5,
    category: 'Lifestyle',
    date: '2026-11-13',
    views: 2381,
    shares: 640,
    featured: false,
    published: false,
    author: { name: 'Georgeanna Ramero', avatar: avatar(5) },
    excerpt:
      'One of the web’s oldest video sites signs off, and takes a decade of home recordings with it.',
  },
  {
    title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
    cover: 6,
    category: 'Gadget',
    date: '2026-11-15',
    views: 5508,
    shares: 1777,
    featured: false,
    published: true,
    author: { name: 'Rhys Nakamura', avatar: avatar(6) },
    excerpt:
      'Refurbished phones now outsell new ones at some of Tokyo’s biggest electronics stores.',
  },
  {
    title:
      'Intel loses bid to revive antitrust case against patent foe Fortress',
    cover: 9,
    category: 'Social',
    date: '2026-11-14',
    views: 3364,
    shares: 912,
    featured: false,
    published: true,
    author: { name: 'Jacob Cooper', avatar: avatar(2) },
    excerpt:
      'A federal judge dismissed the case for good, ending a dispute that ran for more than three years.',
  },
  {
    title: 'COVID outbreak deepens as more lockdowns loom in China',
    cover: 8,
    category: 'Health',
    date: '2026-11-13',
    views: 1947,
    shares: 508,
    featured: false,
    published: false,
    author: { name: 'Aiden Palmer', avatar: avatar(3) },
    excerpt:
      'Several cities tighten rules again as case counts climb ahead of the winter season.',
  },
  {
    title: 'Early Black Friday Amazon deals: cheap TVs, headphones, laptops',
    cover: 9,
    category: 'Gadget',
    date: '2026-11-12',
    views: 8820,
    shares: 3965,
    featured: true,
    published: true,
    author: { name: 'Ella Morrison', avatar: avatar(4) },
    excerpt:
      'The best discounts we found so far, checked against the prices of the last six months.',
  },
  {
    title: 'Presented by Max Rushden with Barry Glendenning, Philippe Auclair',
    cover: 1,
    category: 'Health',
    date: '2026-11-17',
    views: 1203,
    shares: 344,
    featured: true,
    published: false,
    author: { name: 'Georgeanna Ramero', avatar: avatar(5) },
    excerpt:
      'This week’s episode: a season at the halfway mark, and the stories nobody saw coming.',
  },
  {
    title: 'Garmins Instinct Crossover Solar is a rugged hybrid smartwatch',
    cover: 12,
    category: 'Lifestyle',
    date: '2026-11-09',
    views: 6455,
    shares: 2210,
    featured: false,
    published: true,
    author: { name: 'Rhys Nakamura', avatar: avatar(6) },
    excerpt:
      'The solar version adds weeks of battery life in the sun — and keeps everything else that made the original good.',
  },
];

/** A title as a URL's path: lower case, words joined by hyphens. */
export function slugOf(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const BLOG_POSTS: readonly BlogPost[] = SEEDS.map((seed, index) => ({
  id: String(index + 1),
  slug: slugOf(seed.title),
  title: seed.title,
  excerpt: seed.excerpt,
  body: BODY(seed.excerpt),
  cover: cover(seed.cover),
  category: seed.category,
  tags: [seed.category.toLowerCase(), 'news'],
  date: seed.date,
  views: seed.views,
  shares: seed.shares,
  featured: seed.featured,
  status: seed.published ? 'published' : 'draft',
  author: seed.author,
  comments: COMMENTS,
}));
