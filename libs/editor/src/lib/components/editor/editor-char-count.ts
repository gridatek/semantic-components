import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

/**
 * The document's character count (`charCount()`) and, with a
 * `characterLimit` on the editor, what is left (`remaining()`): write the
 * text around them ("120 / 280"). `data-limit-reached` at the limit.
 */
@Directive({
  selector: 'span[scEditorCharCount]',
  exportAs: 'scEditorCharCount',
  host: {
    '[attr.data-limit-reached]': 'limitReached() || null',
    '[class]': 'class()',
  },
})
export class ScEditorCharCount {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly charCount = computed(() => this.editor.characters());

  /** The editor's limit, or null. */
  readonly limit = computed(() => this.editor.characterLimit());

  /** Characters left under the limit, or null without one. */
  readonly remaining = computed(() => {
    const limit = this.limit();
    return limit === null ? null : Math.max(0, limit - this.charCount());
  });

  readonly limitReached = computed(() => this.remaining() === 0);

  protected readonly class = computed(() =>
    cn('data-[limit-reached]:text-destructive', this.classInput()),
  );
}
