import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Goes to the previous match (from the first, to the last). Write its
 * icon and name it.
 */
@Directive({
  selector: 'button[scEditorSearchPrevious]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!search.count()',
    '(click)': 'search.previous()',
  },
})
export class ScEditorSearchPrevious {
  private readonly buttonStyles = injectPreset().button;

  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
