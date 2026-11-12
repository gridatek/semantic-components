import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, injectPreset } from '@semantic-components/ui';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
} from '@semantic-components/ui/editor';
import { cn } from 'cn';
import { editorAlignment } from './editor-alignment';

/**
 * Centres the paragraph. Write its icon and name it (`aria-label` or visually
 * hidden text). Needs `withAlign()`.
 */
@Directive({
  selector: 'button[scEditorAlignCenter]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': "alignment() === 'center'",
    '(click)': 'onClick()',
  },
})
export class ScEditorAlignCenter {
  private readonly toggleStyles = injectPreset().toggle;
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly alignment = computed(() => editorAlignment(this.editor));

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
    ɵassertEditorFeature('withAlign', 'scEditorAlignCenter');
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.setTextAlign('center'));
  }
}
