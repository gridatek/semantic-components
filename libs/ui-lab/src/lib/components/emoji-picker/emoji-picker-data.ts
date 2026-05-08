import type { EmojiCategory } from './emoji-picker-state';

const CATEGORY_ICONS: Record<string, string> = {
  'smileys-emotion': '😀',
  'people-body': '👋',
  'animals-nature': '🐻',
  'food-drink': '🍔',
  'travel-places': '✈️',
  activities: '⚽',
  objects: '💡',
  symbols: '❤️',
  flags: '🏁',
};

let cached: Promise<EmojiCategory[]> | null = null;

export function loadDefaultCategories(): Promise<EmojiCategory[]> {
  if (!cached) {
    cached = Promise.all([
      import('emojibase-data/en/compact.json'),
      import('emojibase-data/en/messages.json'),
    ]).then(([dataMod, messagesMod]) =>
      buildCategories(dataMod.default, messagesMod.default),
    );
  }
  return cached;
}

type CompactEmoji = {
  unicode: string;
  label: string;
  tags?: string[];
  order?: number;
  group?: number;
};

type Messages = {
  groups: { key: string; message: string; order: number }[];
};

function buildCategories(
  data: CompactEmoji[],
  messages: Messages,
): EmojiCategory[] {
  const grouped = new Map<number, CompactEmoji[]>();

  for (const emoji of data) {
    if (emoji.group === undefined || emoji.group === 2) continue;

    let group = grouped.get(emoji.group);
    if (!group) {
      group = [];
      grouped.set(emoji.group, group);
    }
    group.push(emoji);
  }

  return messages.groups
    .filter((g) => g.key !== 'component')
    .map((g) => {
      const emojis = grouped.get(g.order) ?? [];
      return {
        id: g.key,
        name: g.message,
        icon: CATEGORY_ICONS[g.key] ?? emojis[0]?.unicode ?? '❓',
        emojis: emojis
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((e) => ({
            emoji: e.unicode,
            name: e.label,
            keywords: e.tags,
          })),
      };
    })
    .filter((c) => c.emojis.length > 0);
}
