import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScImageAnnotator } from './image-annotator';

/** Removes the selected annotation (Delete, on it). Write its icon and name it. */
@Directive({
  selector: 'button[scImageAnnotatorDelete]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-delete',
    '[disabled]': 'annotator.readonly() || !annotator.selected()',
    '[class]': 'class()',
    '(click)': 'annotator.removeSelected()',
  },
})
export class ScImageAnnotatorDelete {
  private readonly buttonStyles = injectPreset().button;

  protected readonly annotator = inject(ScImageAnnotator);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorDelete');
  }
}
