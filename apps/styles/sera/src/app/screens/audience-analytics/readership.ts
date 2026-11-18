import {
  type Article,
  type Readership,
} from '../article-directory/articles-data';
import { AGES, SOURCES } from './demographics';
import { METRICS } from './metrics-grid';

/** What the top editorials are ranked by. */
export type Metric = 'views' | 'time' | 'shares';

const VALUE: Record<Metric, (readership: Readership) => number> = {
  views: (r) => r.pageviews,
  time: (r) => r.readSeconds,
  shares: (r) => r.shares,
};

/** The read articles, most first by `metric`. */
export function ranked(articles: Article[], metric: Metric): Article[] {
  const value = VALUE[metric];
  return [...articles].sort(
    (a, b) =>
      value(b.readership ?? NO_READERS) - value(a.readership ?? NO_READERS),
  );
}

const NO_READERS: Readership = {
  published: '',
  pageviews: 0,
  readSeconds: 0,
  shares: 0,
};

/** 45200 → "45.2k". */
export function compact(count: number): string {
  return count < 1000 ? `${count}` : `${(count / 1000).toFixed(1)}k`;
}

/** 255 → "04:15". */
export function duration(seconds: number): string {
  const pad = (n: number) => `${n}`.padStart(2, '0');
  return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
}

const csvCell = (value: string | number) => {
  const text = `${value}`;
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};
const csvRow = (cells: (string | number)[]) => cells.map(csvCell).join(',');

/** The dashboard as a CSV file: its metrics, readers, sources, top editorials. */
export function reportCsv(range: string, articles: Article[]): string {
  return [
    csvRow(['Audience Analytics', range]),
    '',
    csvRow(['Metric', 'Value', 'Change']),
    ...METRICS.map((m) =>
      csvRow([
        m.label,
        m.value,
        `${m.trend === 'up' ? '+' : '-'}${m.comparison}`,
      ]),
    ),
    '',
    csvRow(['Age', 'Readers (%)']),
    ...AGES.map((a) => csvRow([a.age, a.percentage])),
    '',
    csvRow(['Source', 'Readers (%)']),
    ...SOURCES.map((s) => csvRow([s.source, s.percentage])),
    '',
    csvRow([
      'Rank',
      'Title',
      'Author',
      'Published',
      'Page Views',
      'Read Time',
      'Shares',
    ]),
    ...ranked(articles, 'views').map((article, index) => {
      const r = article.readership ?? NO_READERS;
      return csvRow([
        index + 1,
        article.title,
        article.author,
        r.published,
        r.pageviews,
        duration(r.readSeconds),
        r.shares,
      ]);
    }),
  ].join('\n');
}
