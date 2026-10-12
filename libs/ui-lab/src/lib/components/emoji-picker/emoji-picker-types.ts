/** An emoji: the character(s), and its name in the picker's locale. */
export interface ScEmoji {
  emoji: string;
  label: string;
}

/** A skin tone (emojis that have them are shown in it). */
export type ScEmojiSkinTone =
  'none' | 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark';

/** An emoji of the data set. */
export interface ScEmojiDataEmoji extends ScEmoji {
  /** Its category's `index`. */
  category: number;
  /** Search terms besides its label. */
  tags: string[];
  /** The Emoji version it came in (unsupported versions are hidden). */
  version: number;
  /** A country flag (some systems can't draw them). */
  countryFlag?: boolean;
  /** Its skin tone variations. */
  skins?: Partial<Record<Exclude<ScEmojiSkinTone, 'none'>, string>>;
}

/** A category of the data set. */
export interface ScEmojiDataCategory {
  index: number;
  /** A stable key, e.g. `smileys-emotion` — to pick an icon for it. */
  key: string;
  /** Its name in the data's locale. */
  label: string;
}

/** The emojis to pick from: Emojibase's (fetched), or yours. */
export interface ScEmojiData {
  locale: string;
  emojis: ScEmojiDataEmoji[];
  categories: ScEmojiDataCategory[];
  /** The skin tones' names in the data's locale. */
  skinTones: Partial<Record<Exclude<ScEmojiSkinTone, 'none'>, string>>;
}

/** A category of the list, laid out. */
export interface ScEmojiListCategory {
  index: number;
  key: string;
  label: string;
  /** The list's row it starts at, and how many rows it has. */
  startRowIndex: number;
  rowsCount: number;
}

/** An emoji of the list: in the skin tone, with its place in the grid. */
export interface ScEmojiListEmoji extends ScEmoji {
  rowIndex: number;
  columnIndex: number;
}

/** A row of the list. */
export interface ScEmojiListRow {
  index: number;
  categoryIndex: number;
  /** The first row of its category (its header sits above it). */
  startsCategory: boolean;
  emojis: ScEmojiListEmoji[];
}
