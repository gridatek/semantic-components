import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, injectPreset } from '@semantic-components/ui';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
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
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': "editor.isActive('highlight')",
  },
})
export class ScEditorHighlight {
  private readonly toggleStyles = injectPreset().toggle;
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() =>
    cn(
      this.toggleStyles({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  constructor() {
    ɵassertEditorFeature('withHighlight', 'scEditorHighlight');
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }
}
