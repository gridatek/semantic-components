import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageAnnotator } from './image-annotator';
import type { ScImageAnnotatorToolName } from './image-annotator-types';

/**
 * Picks a tool (`scImageAnnotatorTool="arrow"`), pressed while it is the
 * one. Write its icon and name it; put the tools in a group you name.
 */
@Directive({
  selector: 'button[scImageAnnotatorTool]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-tool',
    '[attr.aria-pressed]': 'pressed()',
    '[disabled]': 'annotator.readonly()',
    '[class]': 'class()',
    '(click)': 'pick()',
  },
})
export class ScImageAnnotatorTool {
  private readonly buttonStyles = injectPreset().button;

  protected readonly annotator = inject(ScImageAnnotator);

  readonly value = input.required<ScImageAnnotatorToolName>({
    alias: 'scImageAnnotatorTool',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly pressed = computed(
    () => this.annotator.tool() === this.value(),
  );

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({
        variant: this.pressed() ? 'secondary' : 'ghost',
        size: this.size(),
      }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorTool');
  }

  protected pick(): void {
    this.annotator.tool.set(this.value());
    // Drawing: nothing selected.
    if (this.value() !== 'select') this.annotator.selected.set(null);
  }
}
