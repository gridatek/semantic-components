import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
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
    '[disabled]': '!search.count()',
    '(click)': 'search.next()',
  },
})
export class ScEditorSearchNext {
  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
