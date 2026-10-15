import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

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
    '[value]': 'editor.searchTerm()',
    '[attr.aria-invalid]':
      '(editor.searchTerm() && !editor.searchResults()) || null',
    '(input)': 'onInput($event)',
    '(keydown.enter)': 'onEnter($event)',
  },
})
export class ScEditorSearchInput {
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const element =
      inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
    effect(() => {
      if (!this.editor.searchFocusRequest()) return;
      untracked(() =>
        requestAnimationFrame(() => {
          element.focus();
          element.select();
        }),
      );
    });
  }

  protected onInput(event: Event): void {
    this.editor.search((event.target as HTMLInputElement).value);
  }

  protected onEnter(event: Event): void {
    event.preventDefault();
    if ((event as KeyboardEvent).shiftKey) this.editor.searchPrevious();
    else this.editor.searchNext();
  }
}
