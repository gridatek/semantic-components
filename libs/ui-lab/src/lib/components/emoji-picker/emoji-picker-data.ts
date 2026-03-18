import data from 'emojibase-data/en/compact.json';
import messages from 'emojibase-data/en/messages.json';
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

function buildCategories(): EmojiCategory[] {
  const grouped = new Map<
    number,
    { unicode: string; label: string; tags?: string[]; order?: number }[]
  >();

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

export const DEFAULT_CATEGORIES: EmojiCategory[] = buildCategories();
