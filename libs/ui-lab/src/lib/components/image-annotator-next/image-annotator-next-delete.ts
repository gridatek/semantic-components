import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageAnnotatorNext } from './image-annotator-next';

/** Removes the selected annotation (Delete, on it). Write its icon and name it. */
@Directive({
  selector: 'button[scImageAnnotatorNextDelete]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-delete',
    '[disabled]': 'annotator.readonly() || !annotator.selected()',
    '[class]': 'class()',
    '(click)': 'annotator.removeSelected()',
  },
})
export class ScImageAnnotatorNextDelete {
  protected readonly annotator = inject(ScImageAnnotatorNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorNextDelete');
  }
}
