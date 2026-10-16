import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageAnnotator } from './image-annotator';

/** Removes every annotation (undoable). Write its icon and name it. */
@Directive({
  selector: 'button[scImageAnnotatorClear]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-clear',
    '[disabled]': 'annotator.readonly() || !annotator.annotations().length',
    '[class]': 'class()',
    '(click)': 'annotator.clear()',
  },
})
export class ScImageAnnotatorClear {
  protected readonly annotator = inject(ScImageAnnotator);

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
    ɵwarnIfUnnamed('scImageAnnotatorClear');
  }
}
