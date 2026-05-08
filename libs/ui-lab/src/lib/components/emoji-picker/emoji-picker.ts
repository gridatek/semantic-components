import {
  Directive,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { loadDefaultCategories } from './emoji-picker-data';
import {
  type Emoji,
  type EmojiCategory,
  ScEmojiPickerState,
} from './emoji-picker-state';

@Directive({
  selector: 'div[scEmojiPicker]',
  exportAs: 'scEmojiPicker',
  host: {
    '[class]': 'class()',
  },
  providers: [ScEmojiPickerState],
})
export class ScEmojiPicker {
  private readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly categories = input<EmojiCategory[]>([]);
  readonly maxRecent = input<number>(8);
  readonly columns = input<number>(8);

  readonly value = model<string>('');
  readonly emojiSelect = output<Emoji>();

  private readonly defaultCategories = signal<EmojiCategory[]>([]);

  protected readonly class = computed(() =>
    cn(
      'block w-72 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      const provided = this.categories();
      const cats = provided.length > 0 ? provided : this.defaultCategories();
      this.state.categories.set(cats);
      if (cats.length > 0 && !this.state.activeCategory()) {
        this.state.activeCategory.set(cats[0].id);
      }
    });

    loadDefaultCategories().then((cats) => this.defaultCategories.set(cats));

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
