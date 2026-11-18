// The media at start: shadcn's Sera assets (sera/media-library/data.ts) —
// samples, without files. The Media Library reads and changes them through
// `MediaStore`; uploads join them, with their file.
export type AssetType = 'JPEG' | 'PNG' | 'WEBP' | 'MP4' | 'PDF';

export interface Asset {
  id: string;
  name: string;
  date: string;
  size: string;
  type: AssetType;
  dimensions: string;
  duration?: string;
  uploadedBy: string;
  uploadedByInitials: string;
  uploadedOn: string;
  tags: string[];
  usedIn: { title: string; role: string }[];
  /** The file's address, for an upload: a sample has none. */
  url?: string;
}

export const ASSETS: Asset[] = [
  {
    id: '1',
    name: 'brutalism-facade-01.jpg',
    date: 'Oct 24',
    size: '4.2 MB',
    type: 'JPEG',
    dimensions: '4000 × 3000',
    uploadedBy: 'Marcus Chen',
    uploadedByInitials: 'MC',
    uploadedOn: 'Oct 24, 2024',
    tags: ['architecture', 'brutalism', 'exterior', 'summer-issue'],
    usedIn: [
      { title: "Brutalism's Second Act", role: 'Cover Image' },
      { title: 'Autumn Sartorial Code', role: 'Inline Gallery' },
    ],
  },
  {
    id: '2',
    name: 'brutalism-interior-raw.jpg',
    date: 'Oct 24',
    size: '3.8 MB',
    type: 'JPEG',
    dimensions: '3800 × 2850',
    uploadedBy: 'Marcus Chen',
    uploadedByInitials: 'MC',
    uploadedOn: 'Oct 24, 2024',
    tags: ['architecture', 'brutalism', 'interior'],
    usedIn: [{ title: "Brutalism's Second Act", role: 'Inline Gallery' }],
  },
  {
    id: '3',
    name: 'seattle-living-building-diagram.png',
    date: 'Oct 22',
    size: '1.1 MB',
    type: 'PNG',
    dimensions: '2000 × 1500',
    uploadedBy: 'Sarah Jenkins',
    uploadedByInitials: 'SJ',
    uploadedOn: 'Oct 22, 2024',
    tags: ['diagram', 'sustainability', 'seattle'],
    usedIn: [
      { title: 'The Future of Sustainable Architecture', role: 'Diagram' },
    ],
  },
  {
    id: '4',
    name: 'interview-sofia-coppola-clip1.mp4',
    date: 'Oct 18',
    size: '45.0 MB',
    type: 'MP4',
    dimensions: '1920 × 1080',
    duration: '0:45',
    uploadedBy: 'Emma Ross',
    uploadedByInitials: 'ER',
    uploadedOn: 'Oct 18, 2024',
    tags: ['video', 'interview', 'film'],
    usedIn: [{ title: 'The Aesthetics of Isolation', role: 'Featured Video' }],
  },
  {
    id: '5',
    name: 'kyoto-kilns-pottery-detail.jpg',
    date: 'Oct 15',
    size: '5.6 MB',
    type: 'JPEG',
    dimensions: '4500 × 3000',
    uploadedBy: 'Marcus Chen',
    uploadedByInitials: 'MC',
    uploadedOn: 'Oct 15, 2024',
    tags: ['ceramics', 'kyoto', 'craft'],
    usedIn: [{ title: "Kyoto's Oldest Kilns", role: 'Hero Image' }],
  },
  {
    id: '6',
    name: 'copenhagen-design-week-street.jpg',
    date: 'Oct 12',
    size: '3.2 MB',
    type: 'JPEG',
    dimensions: '3600 × 2400',
    uploadedBy: 'Noah Bennett',
    uploadedByInitials: 'NB',
    uploadedOn: 'Oct 12, 2024',
    tags: ['copenhagen', 'design-week', 'street'],
    usedIn: [{ title: 'Field Notes from Copenhagen', role: 'Inline Gallery' }],
  },
  {
    id: '7',
    name: 'minimalist-chair-render.webp',
    date: 'Oct 10',
    size: '0.8 MB',
    type: 'WEBP',
    dimensions: '2400 × 1600',
    uploadedBy: 'Claire Duval',
    uploadedByInitials: 'CD',
    uploadedOn: 'Oct 10, 2024',
    tags: ['furniture', 'minimalism', 'render'],
    usedIn: [{ title: 'The New Vanguard', role: 'Product Shot' }],
  },
  {
    id: '8',
    name: 'autumn-issue-style-guide.pdf',
    date: 'Oct 05',
    size: '12.4 MB',
    type: 'PDF',
    dimensions: 'N/A',
    uploadedBy: 'Emma Ross',
    uploadedByInitials: 'ER',
    uploadedOn: 'Oct 05, 2024',
    tags: ['guidelines', 'internal', 'autumn'],
    usedIn: [{ title: 'Autumn Issue 2024', role: 'Reference' }],
  },
  {
    id: '9',
    name: 'milan-lighting-studio-visit.jpg',
    date: 'Oct 09',
    size: '6.1 MB',
    type: 'JPEG',
    dimensions: '5200 × 3466',
    uploadedBy: 'Claire Duval',
    uploadedByInitials: 'CD',
    uploadedOn: 'Oct 09, 2024',
    tags: ['milan', 'lighting', 'studio'],
    usedIn: [
      { title: "Milan's Most Elusive Lighting Designer", role: 'Hero Image' },
    ],
  },
  {
    id: '10',
    name: 'lisbon-culinary-scene-raw.webp',
    date: 'Oct 14',
    size: '2.4 MB',
    type: 'WEBP',
    dimensions: '3000 × 2000',
    uploadedBy: 'Amara Iqbal',
    uploadedByInitials: 'AI',
    uploadedOn: 'Oct 14, 2024',
    tags: ['lisbon', 'food', 'editorial'],
    usedIn: [
      { title: "Lisbon's Quiet Culinary Renaissance", role: 'Inline Gallery' },
    ],
  },
  {
    id: '11',
    name: 'print-magazine-covers-mo...',
    date: 'Sep 26',
    size: '8.9 MB',
    type: 'PNG',
    dimensions: '3200 × 2400',
    uploadedBy: 'Mina Okafor',
    uploadedByInitials: 'MO',
    uploadedOn: 'Sep 26, 2024',
    tags: ['print', 'magazine', 'covers'],
    usedIn: [{ title: 'The Return of Print', role: 'Cover Image' }],
  },
  {
    id: '12',
    name: 'avant-garde-furniture-trailer.mp4',
    date: 'Sep 30',
    size: '78.2 MB',
    type: 'MP4',
    dimensions: '3840 × 2160',
    duration: '1:12',
    uploadedBy: 'Tommy Rhodes',
    uploadedByInitials: 'TR',
    uploadedOn: 'Sep 30, 2024',
    tags: ['video', 'furniture', 'trailer'],
    usedIn: [
      { title: 'Collecting the New Avant-Garde', role: 'Featured Video' },
    ],
  },
];

/** What a type is, for the filters. */
export type AssetKind = 'images' | 'video' | 'documents' | 'audio';

const KIND: Record<AssetType, AssetKind> = {
  JPEG: 'images',
  PNG: 'images',
  WEBP: 'images',
  MP4: 'video',
  PDF: 'documents',
};

export function kindOf(asset: Asset): AssetKind {
  return KIND[asset.type];
}

/** "4.2 MB" → 4.2. */
export function sizeInMb(asset: Asset): number {
  return parseFloat(asset.size) || 0;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** "Oct 24, 2024" → 2024-10-24. */
export function uploadedOn(asset: Asset): Temporal.PlainDate | null {
  const match = /^(\w{3}) (\d{1,2}), (\d{4})$/.exec(asset.uploadedOn);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1]) + 1;
  if (!month) return null;
  return Temporal.PlainDate.from({
    year: Number(match[3]),
    month,
    day: Number(match[2]),
  });
}

/** 2024-10-24 → "Oct 24" and "Oct 24, 2024", as the samples write them. */
export function dateTexts(date: Temporal.PlainDate): {
  short: string;
  long: string;
} {
  const short = `${MONTHS[date.month - 1]} ${`${date.day}`.padStart(2, '0')}`;
  return { short, long: `${short}, ${date.year}` };
}

/** The filters of the Media Library's table, once applied. */
export interface AssetFilters {
  kinds: AssetKind[];
  /** Within the last day, week or month; any. */
  uploaded: 'any' | '24h' | 'week' | 'month';
  /** A custom range: before `uploaded` when set. */
  from: Temporal.PlainDate | null;
  to: Temporal.PlainDate | null;
  minMb: number;
  /** null: no maximum. */
  maxMb: number | null;
  /** Any of them. */
  tags: string[];
}

export function matches(
  asset: Asset,
  filters: AssetFilters,
  today: Temporal.PlainDate,
): boolean {
  if (!filters.kinds.includes(kindOf(asset))) return false;
  const size = sizeInMb(asset);
  if (size < filters.minMb) return false;
  if (filters.maxMb !== null && size > filters.maxMb) return false;
  if (
    filters.tags.length &&
    !filters.tags.some((tag) => asset.tags.includes(tag))
  ) {
    return false;
  }
  const date = uploadedOn(asset);
  if (!date) return true;
  const compare = Temporal.PlainDate.compare;
  if (filters.from) {
    const to = filters.to ?? filters.from;
    return compare(date, filters.from) >= 0 && compare(date, to) <= 0;
  }
  const since = {
    any: null,
    '24h': today.subtract({ days: 1 }),
    week: today.subtract({ weeks: 1 }),
    month: today.subtract({ months: 1 }),
  }[filters.uploaded];
  return !since || compare(date, since) >= 0;
}

/** Its name or one of its tags has the query. */
export function found(asset: Asset, query: string): boolean {
  const q = query.trim().toLowerCase();
  return (
    !q ||
    asset.name.toLowerCase().includes(q) ||
    asset.tags.some((tag) => tag.includes(q))
  );
}

/** An image (JPEG, PNG, WEBP): its file can be shown. */
export function isImage(asset: Asset): boolean {
  return kindOf(asset) === 'images';
}
