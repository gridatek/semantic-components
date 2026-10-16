import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageAnnotatorNext } from './image-annotator-next';
import type { ScImageAnnotatorNextToolName } from './image-annotator-next-types';

/**
 * Picks a tool (`scImageAnnotatorNextTool="arrow"`), pressed while it is the
 * one. Write its icon and name it; put the tools in a group you name.
 */
@Directive({
  selector: 'button[scImageAnnotatorNextTool]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-tool',
    '[attr.aria-pressed]': 'pressed()',
    '[disabled]': 'annotator.readonly()',
    '[class]': 'class()',
    '(click)': 'pick()',
  },
})
export class ScImageAnnotatorNextTool {
  protected readonly annotator = inject(ScImageAnnotatorNext);

  readonly value = input.required<ScImageAnnotatorNextToolName>({
    alias: 'scImageAnnotatorNextTool',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly pressed = computed(
    () => this.annotator.tool() === this.value(),
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({
        variant: this.pressed() ? 'secondary' : 'ghost',
        size: this.size(),
      }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorNextTool');
  }

  protected pick(): void {
    this.annotator.tool.set(this.value());
    // Drawing: nothing selected.
    if (this.value() !== 'select') this.annotator.selected.set(null);
  }
}
