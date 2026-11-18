import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
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
  private readonly buttonStyles = injectStyle().button;

  private readonly annotator = inject(ScImageAnnotator);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorDelete');
  }
}
