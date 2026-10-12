import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

/**
 * The search field: filters the list as you type; the arrow keys move
 * through the results and Enter picks, without leaving the field. Give it
 * a placeholder and an `aria-label`.
 */
@Directive({
  selector: 'input[scEmojiPickerSearch]',
  host: {
    'data-slot': 'emoji-picker-search',
    type: 'search',
    autocomplete: 'off',
    autocapitalize: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    enterkeyhint: 'done',
    '[class]': 'class()',
    '[value]': 'state.search()',
    '(input)': 'onInput($event)',
  },
})
export class ScEmojiPickerSearch {
  protected readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    const element =
      inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
    this.state.searchElement = element;
    inject(DestroyRef).onDestroy(() => {
      if (this.state.searchElement === element) {
        this.state.searchElement = null;
      }
    });
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.state.search.set(value);
    // Typing: the first result is active, Enter picks it.
    if (value) this.state.setActive('keyboard', 0, 0);
    else this.state.resetActive();
    this.state.viewportElement?.scrollTo({ top: 0 });
  }
}
