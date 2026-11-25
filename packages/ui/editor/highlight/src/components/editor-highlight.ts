import { Directive, computed, inject, input } from '@angular/core';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
  ɵeditorControl,
} from '@semantic-components/ui/editor';
import { cn } from 'cn';

/**
 * The highlight button: pressed inside a highlight. It runs no command itself — make it the
 * trigger of your popover (a `scPopoverTrigger`), with
 * `scEditorHighlightColor` swatches and `scEditorRemoveHighlight`;
 * write its icon and name it. Needs `withHighlight()`.
 */
@Directive({
  selector: 'button[scEditorHighlight]',
  host: {
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScEditorHighlight {
  private readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  private readonly class = computed(() => cn(this.classInput()));

  private readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  constructor() {
    ɵassertEditorFeature('withHighlight', 'scEditorHighlight');
    ɵeditorControl({
      disabled: this.disabled,
      pressed: computed(() => this.editor.isActive('highlight')),
    });
  }
}
