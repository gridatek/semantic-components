import { Service, computed, signal } from '@angular/core';

export interface ScEmoji {
  emoji: string;
  name: string;
  keywords?: string[];
}

export interface ScEmojiCategory {
  id: string;
  name: string;
  icon: string;
  emojis: ScEmoji[];
}

@Service({ autoProvided: false })
export class ScEmojiPickerState {
  readonly categories = signal<ScEmojiCategory[]>([]);
  readonly searchQuery = signal<string>('');
  readonly activeCategory = signal<string>('');
  readonly recentEmojis = signal<ScEmoji[]>([]);
  readonly maxRecent = signal<number>(8);
  readonly columns = signal<number>(8);

  readonly filteredEmojis = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return [];

    const results: ScEmoji[] = [];
    for (const category of this.categories()) {
      for (const emoji of category.emojis) {
        if (
          emoji.name.toLowerCase().includes(query) ||
          emoji.keywords?.some((k) => k.toLowerCase().includes(query))
        ) {
          results.push(emoji);
        }
      }
    }
    return results;
  });

  readonly activeCategoryEmojis = computed(() => {
    const category = this.categories().find(
      (c) => c.id === this.activeCategory(),
    );
    return category?.emojis ?? [];
  });

  readonly gridColumns = computed(
    () => `repeat(${this.columns()}, minmax(0, 1fr))`,
  );

  addToRecent(emoji: ScEmoji): void {
    const recent = this.recentEmojis();
    const filtered = recent.filter((e) => e.emoji !== emoji.emoji);
    const updated = [emoji, ...filtered].slice(0, this.maxRecent());
    this.recentEmojis.set(updated);
  }

  clearRecent(): void {
    this.recentEmojis.set([]);
  }
}
