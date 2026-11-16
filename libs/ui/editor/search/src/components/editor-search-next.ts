import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, ɵeditorControl } from '@semantic-components/ui/editor';
import { cn } from 'cn';
import { editorSearch } from './editor-search-state';

/**
 * Goes to the next match (from the last, to the first). Write its icon
 * and name it.
 */
@Directive({
  selector: 'button[scEditorSearchNext]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'search.next()',
  },
})
export class ScEditorSearchNext {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
  protected readonly disabled = computed(() => !this.search.count());

  constructor() {
    ɵeditorControl({ disabled: this.disabled });
  }
}
