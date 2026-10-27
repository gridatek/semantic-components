import { Directive, computed, inject, input } from '@angular/core';
import { cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from '@semantic-components/ui/editor';
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
    '[attr.aria-pressed]': 'pressed()',
    '(click)': 'search.setOption(option(), !pressed())',
  },
})
export class ScEditorSearchOption {
  protected readonly search = editorSearch(inject(SC_EDITOR));

  readonly option = input.required<Option>({ alias: 'scEditorSearchOption' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly pressed = computed(() => {
    switch (this.option()) {
      case 'caseSensitive':
        return this.search.caseSensitive();
      case 'wholeWord':
        return this.search.wholeWord();
      case 'useRegex':
        return this.search.useRegex();
    }
  });

  protected readonly class = computed(() =>
    cn(toggleVariants({ variant: 'default', size: 'sm' }), this.classInput()),
  );
}
