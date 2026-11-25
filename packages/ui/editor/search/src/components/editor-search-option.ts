import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, ɵeditorControl } from '@semantic-components/ui/editor';
import { cn } from 'cn';
import {
  type ScEditorSearchFlag as Option,
  editorSearch,
} from './editor-search-state';

/**
 * A search option, on and off: `caseSensitive`, `wholeWord` (ignored with
 * `useRegex`), `useRegex` (RE2 syntax: no lookarounds or backreferences).
 * Write its icon and name it ("Match case", "Whole word", "Regular
 * expression").
 */
@Directive({
  selector: 'button[scEditorSearchOption]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'search.setOption(option(), !pressed())',
  },
})
export class ScEditorSearchOption {
  private readonly search = editorSearch(inject(SC_EDITOR));

  readonly option = input.required<Option>({ alias: 'scEditorSearchOption' });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly pressed = computed(() => {
    switch (this.option()) {
      case 'caseSensitive':
        return this.search.caseSensitive();
      case 'wholeWord':
        return this.search.wholeWord();
      case 'useRegex':
        return this.search.useRegex();
    }
  });

  private readonly class = computed(() => cn(this.classInput()));
  constructor() {
    ɵeditorControl({ disabled: computed(() => false), pressed: this.pressed });
  }
}
