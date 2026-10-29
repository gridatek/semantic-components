import { Service, computed, signal } from '@angular/core';
import { skinToneVariation } from './emoji-picker-data';
import type {
  ScEmoji,
  ScEmojiData,
  ScEmojiDataEmoji,
  ScEmojiListCategory,
  ScEmojiListEmoji,
  ScEmojiListRow,
  ScEmojiSkinTone,
} from './emoji-picker-types';

/** Rows drawn beyond the viewport, above and below. */
const OVERSCAN_ROWS = 2;
/** Rows drawn before the row and header heights are known. */
const INITIAL_ROWS = 12;

type ScEmojiPickerInteraction = 'none' | 'keyboard' | 'pointer';

/** Emojis matching a search, best first: by label, then by tags. */
function search(emojis: ScEmojiDataEmoji[], query: string) {
  const text = query.toLowerCase().trim();
  if (!text) return emojis;
  const scores = new Map<ScEmojiDataEmoji, number>();
  for (const emoji of emojis) {
    let score = emoji.label.toLowerCase().includes(text) ? 10 : 0;
    for (const tag of emoji.tags) {
      if (tag.toLowerCase().includes(text)) score += 1;
    }
    if (score > 0) scores.set(emoji, score);
  }
  return [...scores.keys()].sort(
    (a, b) => (scores.get(b) ?? 0) - (scores.get(a) ?? 0),
  );
}

/**
 * The picker's state: the data laid out as rows of categories, what of it
 * the viewport shows (the list is virtualised), and the active emoji —
 * hovered, or moved to with the arrow keys. Provided by `scEmojiPicker`.
 */
@Service({ autoProvided: false })
export class ScEmojiPickerState {
  /** null while loading. */
  readonly data = signal<ScEmojiData | null>(null);
  readonly failed = signal(false);
  readonly search = signal('');
  readonly columns = signal(10);
  readonly skinTone = signal<ScEmojiSkinTone>('none');
  readonly sticky = signal(true);
  readonly recent = signal<ScEmoji[]>([]);
  /** The recent category's name; without one, no recent category. */
  readonly recentLabel = signal<string | null>(null);

  /** Measured: a row's and a category header's height, the viewport's. */
  readonly rowHeight = signal<number | null>(null);
  readonly headerHeight = signal<number | null>(null);
  readonly viewportHeight = signal<number | null>(null);
  readonly viewportWidth = signal<number | null>(null);
  /** A full row's width: the list's width, however few emojis show. */
  readonly rowWidth = signal<number | null>(null);
  readonly scrollTop = signal(0);

  readonly interaction = signal<ScEmojiPickerInteraction>('none');
  readonly activeRow = signal(0);
  readonly activeColumn = signal(0);

  /** Elements the keyboard handling and scrolling need. */
  searchElement: HTMLInputElement | null = null;
  viewportElement: HTMLElement | null = null;
  /** Called with the emoji picked (set by `scEmojiPicker`). */
  onSelect: (emoji: ScEmoji) => void = () => undefined;

  /** The list: categories and their rows of emojis. */
  readonly layout = computed(() => {
    const data = this.data();
    const columns = Math.max(1, this.columns());
    const tone = this.skinTone();
    const query = this.search();
    const rows: ScEmojiListRow[] = [];
    const categories: ScEmojiListCategory[] = [];
    if (!data) return { rows, categories, count: 0 };

    const groups: { key: string; label: string; emojis: ScEmoji[] }[] = [];
    const recentLabel = this.recentLabel();
    const recent = this.recent();
    if (!query && recentLabel && recent.length) {
      groups.push({
        key: 'recent',
        label: recentLabel,
        emojis: recent.map((emoji) => ({
          emoji: skinToneVariation(emoji.emoji, tone),
          label: emoji.label,
        })),
      });
    }
    const byCategory = new Map<number, ScEmoji[]>();
    for (const emoji of search(data.emojis, query)) {
      const list = byCategory.get(emoji.category) ?? [];
      list.push({
        emoji: (tone !== 'none' && emoji.skins?.[tone]) || emoji.emoji,
        label: emoji.label,
      });
      byCategory.set(emoji.category, list);
    }
    for (const category of data.categories) {
      const emojis = byCategory.get(category.index);
      if (emojis?.length) {
        groups.push({ key: category.key, label: category.label, emojis });
      }
    }

    let count = 0;
    groups.forEach((group, categoryIndex) => {
      const startRowIndex = rows.length;
      for (let i = 0; i < group.emojis.length; i += columns) {
        const rowIndex = rows.length;
        rows.push({
          index: rowIndex,
          categoryIndex,
          startsCategory: i === 0,
          emojis: group.emojis
            .slice(i, i + columns)
            .map((emoji, columnIndex) => ({ ...emoji, rowIndex, columnIndex })),
        });
      }
      count += group.emojis.length;
      categories.push({
        index: categoryIndex,
        key: group.key,
        label: group.label,
        startRowIndex,
        rowsCount: rows.length - startRowIndex,
      });
    });
    return { rows, categories, count };
  });

  readonly empty = computed(() => !!this.data() && this.layout().count === 0);
  /** Whether the heights are known (the list is laid out). */
  readonly measured = computed(
    () => !!this.rowHeight() && !!this.headerHeight(),
  );
  /** Until the data's loaded and the list laid out. */
  readonly loading = computed(
    () =>
      !this.failed() && (!this.data() || (!this.empty() && !this.measured())),
  );

  /** A category's top in the list. */
  categoryTop(category: ScEmojiListCategory): number {
    return (
      category.index * (this.headerHeight() ?? 0) +
      category.startRowIndex * (this.rowHeight() ?? 0)
    );
  }

  readonly totalHeight = computed(() => {
    const { rows, categories } = this.layout();
    return (
      rows.length * (this.rowHeight() ?? 0) +
      categories.length * (this.headerHeight() ?? 0)
    );
  });

  /** The rows the viewport shows, plus a few around them. */
  readonly range = computed((): [number, number] => {
    const { rows, categories } = this.layout();
    const rowHeight = this.rowHeight();
    const headerHeight = this.headerHeight();
    const viewportHeight = this.viewportHeight();
    if (!rows.length) return [0, -1];
    if (!rowHeight || !headerHeight || !viewportHeight) {
      return [0, Math.min(rows.length, INITIAL_ROWS) - 1];
    }
    const scrollTop = this.scrollTop();
    // The headers above the scroll position.
    let headersAbove = 0;
    for (const category of categories) {
      if (this.categoryTop(category) < scrollTop) headersAbove += headerHeight;
      else break;
    }
    const overscan = (OVERSCAN_ROWS * rowHeight) / 2;
    const start = Math.min(
      scrollTop - headersAbove - overscan,
      this.totalHeight() - viewportHeight,
    );
    return [
      Math.max(0, Math.floor(start / rowHeight)),
      Math.min(
        rows.length - 1,
        Math.ceil((start + viewportHeight + overscan) / rowHeight),
      ),
    ];
  });

  readonly visibleRows = computed(() => {
    const [start, end] = this.range();
    return this.layout().rows.slice(start, end + 1);
  });

  /** The space above the first row drawn: the rows and headers before it. */
  readonly offsetTop = computed(() => {
    const [start] = this.range();
    const headers = this.layout().categories.filter(
      (category) => category.startRowIndex < start,
    ).length;
    return (
      start * (this.rowHeight() ?? 0) + headers * (this.headerHeight() ?? 0)
    );
  });

  /** The category at the top of the viewport. */
  readonly currentCategory = computed(() => {
    const scrollTop = this.scrollTop();
    let current = 0;
    for (const category of this.layout().categories) {
      if (this.categoryTop(category) <= scrollTop + 1) current = category.index;
      else break;
    }
    return current;
  });

  readonly activeEmoji = computed((): ScEmojiListEmoji | null =>
    this.interaction() === 'none'
      ? null
      : (this.layout().rows[this.activeRow()]?.emojis[this.activeColumn()] ??
        null),
  );

  setActive(
    interaction: ScEmojiPickerInteraction,
    column: number,
    row: number,
  ): void {
    this.interaction.set(interaction);
    this.activeColumn.set(column);
    this.activeRow.set(row);
    if (interaction === 'keyboard') this.scrollToRow(row);
  }

  resetActive(): void {
    this.interaction.set('none');
    this.activeColumn.set(0);
    this.activeRow.set(0);
  }

  /** Arrow keys: the next emoji that way, across rows and categories. */
  move(key: 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown'): void {
    const { rows } = this.layout();
    if (!rows.length) return;
    if (this.interaction() === 'none') {
      this.setActive('keyboard', 0, 0);
      return;
    }
    let row = this.activeRow();
    let column = this.activeColumn();
    const width = (index: number) => rows[index]?.emojis.length ?? 0;
    switch (key) {
      case 'ArrowLeft':
        if (column > 0) column--;
        else if (row > 0) column = width(--row) - 1;
        break;
      case 'ArrowRight':
        if (column < width(row) - 1) column++;
        else if (row < rows.length - 1) {
          row++;
          column = 0;
        }
        break;
      case 'ArrowUp':
        if (row > 0) column = Math.min(column, width(--row) - 1);
        break;
      case 'ArrowDown':
        if (row < rows.length - 1) column = Math.min(column, width(++row) - 1);
        break;
    }
    this.setActive('keyboard', column, row);
  }

  /** Picks the active emoji (Enter). */
  selectActive(): boolean {
    const emoji = this.activeEmoji();
    if (!emoji) return false;
    this.onSelect({ emoji: emoji.emoji, label: emoji.label });
    return true;
  }

  /** Scrolls a category to the top of the viewport. */
  scrollToCategory(index: number): void {
    const category = this.layout().categories[index];
    if (!category || !this.viewportElement) return;
    this.viewportElement.scrollTo({ top: this.categoryTop(category) });
  }

  /** Scrolls so that a row shows — below its sticky header. */
  private scrollToRow(index: number): void {
    const viewport = this.viewportElement;
    const rowHeight = this.rowHeight();
    const headerHeight = this.headerHeight();
    const viewportHeight = this.viewportHeight();
    const row = this.layout().rows[index];
    if (!viewport || !row || !rowHeight || !headerHeight || !viewportHeight) {
      return;
    }
    if (index === 0) {
      viewport.scrollTo({ top: 0 });
      return;
    }
    const rowTop = (row.categoryIndex + 1) * headerHeight + index * rowHeight;
    const scrollTop = viewport.scrollTop;
    const header = this.sticky() ? headerHeight : 0;
    if (rowTop < scrollTop + header) {
      viewport.scrollTo({ top: Math.max(0, rowTop - header) });
    } else if (rowTop + rowHeight > scrollTop + viewportHeight) {
      viewport.scrollTo({ top: rowTop + rowHeight - viewportHeight });
    }
  }
}
