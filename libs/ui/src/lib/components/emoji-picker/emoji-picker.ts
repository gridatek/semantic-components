import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  untracked,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import {
  SC_EMOJIBASE_URL,
  SC_EMOJI_SKIN_TONES,
  loadEmojiData,
  skinToneVariation,
} from './emoji-picker-data';
import { ScEmojiPickerState } from './emoji-picker-state';
import type {
  ScEmoji,
  ScEmojiData,
  ScEmojiSkinTone,
} from './emoji-picker-types';

const ARROW_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

/**
 * An emoji picker, as Frimousse (React) builds it: a search field and one
 * scrolling list of every category with sticky headers — virtualised —
 * through which the arrow keys move from the search field, Enter picking.
 * Write its parts: `scEmojiPickerSearch`, `scEmojiPickerViewport` with
 * `scEmojiPickerList` and its categories, rows and emojis,
 * `scEmojiPickerLoading`, `scEmojiPickerEmpty`, and what you like around
 * (`activeEmoji()` for a preview, `scEmojiPickerSkinTone`,
 * `scEmojiPickerCategoryNav`).
 */
@Directive({
  selector: 'div[scEmojiPicker]',
  exportAs: 'scEmojiPicker',
  providers: [ScEmojiPickerState],
  host: {
    'data-slot': 'emoji-picker',
    '[class]': 'class()',
    '[style.--sc-emoji-picker-viewport-width.px]': 'state.viewportWidth()',
    '(keydown)': 'onKeydown($event)',
    '(focusin)': 'onFocusin($event)',
    '(focusout)': 'onFocusout($event)',
  },
})
export class ScEmojiPicker {
  protected readonly state = inject(ScEmojiPickerState);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The language of the emojis' names and of the search (Emojibase's). */
  readonly locale = input('en');
  /** Emojis per row. */
  readonly columns = input(10);
  /** The skin tone emojis are shown in. */
  readonly skinTone = model<ScEmojiSkinTone>('none');
  /**
   * The newest Emoji version to show; by default the newest the system
   * draws (newer emojis would show as boxes).
   */
  readonly emojiVersion = input<number | null>(null);
  /** Where Emojibase's data is (`${url}/${locale}/data.json`): a CDN by default; host it yourself if you like. */
  readonly emojibaseUrl = input(SC_EMOJIBASE_URL);
  /** Your emojis instead of Emojibase's. */
  readonly data = input<ScEmojiData | null>(null);
  /** Category headers stick to the top while their emojis scroll. */
  readonly sticky = input(true);
  /** Recently picked emojis, latest first (keep them to restore them). */
  readonly recent = model<ScEmoji[]>([]);
  readonly maxRecent = input(20);
  /** The name of a first category of the recent emojis; none without it. */
  readonly recentLabel = input<string | null>(null);

  /** An emoji was picked. */
  readonly emojiSelect = output<ScEmoji>();

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground isolate flex h-[342px] w-fit flex-col overflow-hidden rounded-md',
      this.classInput(),
    ),
  );

  /** For your text: the state of the list. */
  readonly loading = this.state.loading;
  readonly failed = this.state.failed;
  readonly empty = this.state.empty;
  readonly search = this.state.search.asReadonly();
  /** The emoji hovered or moved to with the keyboard (for a preview). */
  readonly activeEmoji = this.state.activeEmoji;
  /** The categories (for a category navigation). */
  readonly categories = computed(() => this.state.layout().categories);
  /** The category at the top of the list. */
  readonly currentCategory = this.state.currentCategory;
  /** The names of the skin tones, in the data's locale. */
  readonly skinToneNames = computed(
    (): Partial<Record<ScEmojiSkinTone, string>> =>
      this.state.data()?.skinTones ?? {},
  );

  constructor() {
    effect(() => this.state.columns.set(this.columns()));
    effect(() => this.state.skinTone.set(this.skinTone()));
    effect(() => this.state.sticky.set(this.sticky()));
    effect(() => this.state.recent.set(this.recent()));
    effect(() => this.state.recentLabel.set(this.recentLabel()));
    this.state.onSelect = (emoji) => this.select(emoji);

    // The data: yours, or Emojibase's for the locale.
    let request = 0;
    effect(() => {
      const data = this.data();
      const locale = this.locale();
      const url = this.emojibaseUrl();
      const version = this.emojiVersion();
      untracked(() => {
        const current = ++request;
        this.state.failed.set(false);
        if (data) {
          this.state.data.set(data);
          return;
        }
        this.state.data.set(null);
        if (typeof window === 'undefined') return;
        loadEmojiData(locale, url, version).then(
          (loaded) => current === request && this.state.data.set(loaded),
          () => current === request && this.state.failed.set(true),
        );
      });
    });
  }

  /** Picks an emoji: emitted, and first of the recent ones. */
  select(emoji: ScEmoji): void {
    this.emojiSelect.emit(emoji);
    const base = skinToneVariation(emoji.emoji, 'none');
    this.recent.update((recent) =>
      [
        { emoji: base, label: emoji.label },
        ...recent.filter((e) => e.emoji !== base),
      ].slice(0, this.maxRecent()),
    );
  }

  /** The next skin tone, round (a skin tone button). */
  nextSkinTone(): void {
    const tones = SC_EMOJI_SKIN_TONES;
    this.skinTone.set(
      tones[(tones.indexOf(this.skinTone()) + 1) % tones.length],
    );
  }

  /** An emoji in each skin tone (for a skin tone menu). */
  skinToneVariations(
    emoji = '✋',
  ): { skinTone: ScEmojiSkinTone; emoji: string }[] {
    return SC_EMOJI_SKIN_TONES.map((skinTone) => ({
      skinTone,
      emoji: skinToneVariation(emoji, skinTone),
    }));
  }

  /** Scrolls to a category. */
  scrollToCategory(index: number): void {
    this.state.scrollToCategory(index);
  }

  /** Focuses the search field (e.g. when shown in a popover). */
  focus(): void {
    (this.state.searchElement ?? this.state.viewportElement)?.focus();
  }

  /** In the search field or the list: arrows move, Enter picks. */
  protected onKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented || !this.inPicker(event.target)) return;
    if (event.key === 'Enter') {
      if (this.state.selectActive()) event.preventDefault();
    } else if (ARROW_KEYS.includes(event.key)) {
      event.preventDefault();
      this.state.move(event.key as Parameters<ScEmojiPickerState['move']>[0]);
    }
  }

  protected onFocusin(event: FocusEvent): void {
    if (event.target === this.state.viewportElement) {
      // Tabbing into the list: its first emoji.
      if (this.state.interaction() === 'none') {
        this.state.setActive('keyboard', 0, 0);
      }
    } else if (
      event.target === this.state.searchElement &&
      !this.state.search()
    ) {
      this.state.resetActive();
    }
  }

  protected onFocusout(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.contains(next)) this.state.resetActive();
  }

  /** The search field or the list (not a button of yours). */
  private inPicker(target: EventTarget | null): boolean {
    return (
      target === this.state.searchElement ||
      (!!target && !!this.state.viewportElement?.contains(target as Node))
    );
  }
}
