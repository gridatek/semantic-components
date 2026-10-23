import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { editorSearch } from './editor-search-state';

/**
 * Replaces every match at once — one change, undone in one step (disabled
 * with no match, or when the document can't be edited). Write its
 * text.
 */
@Directive({
  selector: 'button[scEditorReplaceAll]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!search.editor.editable() || !search.count()',
    '(click)': 'search.replaceAll()',
  },
})
export class ScEditorReplaceAll {
  private readonly buttonStyles = injectPreset().button;

  protected readonly search = editorSearch(inject(SC_EDITOR));
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
