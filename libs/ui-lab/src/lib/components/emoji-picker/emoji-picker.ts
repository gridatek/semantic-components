import {
  Directive,
  computed,
  effect,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { DEFAULT_CATEGORIES } from './emoji-picker-data';
import {
  type Emoji,
  type EmojiCategory,
  ScEmojiPickerState,
} from './emoji-picker-state';

@Directive({
  selector: 'div[scEmojiPicker]',
  exportAs: 'scEmojiPicker',
  host: {
    'data-slot': 'emoji-picker',
    '[class]': 'class()',
  },
  providers: [ScEmojiPickerState],
})
export class ScEmojiPicker {
  private readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly categories = input<EmojiCategory[]>(DEFAULT_CATEGORIES);
  readonly maxRecent = input<number>(8);
  readonly columns = input<number>(8);

  readonly value = model<string>('');
  readonly emojiSelect = output<Emoji>();

  protected readonly class = computed(() =>
    cn(
      'block w-72 rounded-lg border bg-popover text-popover-foreground shadow-md',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      this.state.categories.set(this.categories());
      const cats = this.categories();
      if (cats.length > 0 && !this.state.activeCategory()) {
        this.state.activeCategory.set(cats[0].id);
      }
    });

    effect(() => {
      this.state.maxRecent.set(this.maxRecent());
    });

    effect(() => {
      this.state.columns.set(this.columns());
    });
  }

  selectEmoji(emoji: Emoji): void {
    this.value.set(emoji.emoji);
    this.emojiSelect.emit(emoji);
    this.state.addToRecent(emoji);
  }
}
