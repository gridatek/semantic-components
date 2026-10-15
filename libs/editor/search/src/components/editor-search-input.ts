import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import { cn } from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Searches the document as you type; Enter goes to the next match,
 * Shift+Enter to the previous one. Use on an `input[scInput]` and name it
 * (`aria-label`, and a placeholder if you want one). Marked `aria-invalid`
 * when nothing matches. Opening the bar puts the cursor here.
 */
@Directive({
  selector: 'input[scEditorSearchInput]',
  host: {
    type: 'search',
    '[class]': 'class()',
    '[value]': 'search.term()',
    '[attr.aria-invalid]': '(search.term() && !search.count()) || null',
    '(input)': 'onInput($event)',
    '(keydown.enter)': 'onEnter($event)',
    '(keydown.shift.enter)': 'onEnter($event)',
  },
})
export class ScEditorSearchInput {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const element =
      inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
    effect(() => {
      if (!this.search.focusRequest()) return;
      untracked(() =>
        requestAnimationFrame(() => {
          element.focus();
          element.select();
        }),
      );
    });
  }

  protected onInput(event: Event): void {
    this.search.search((event.target as HTMLInputElement).value);
  }

  protected onEnter(event: Event): void {
    event.preventDefault();
    if ((event as KeyboardEvent).shiftKey) this.search.previous();
    else this.search.next();
  }
}
