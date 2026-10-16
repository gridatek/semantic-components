import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageAnnotatorNext } from './image-annotator-next';

/** Removes every annotation (undoable). Write its icon and name it. */
@Directive({
  selector: 'button[scImageAnnotatorNextClear]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-clear',
    '[disabled]': 'annotator.readonly() || !annotator.annotations().length',
    '[class]': 'class()',
    '(click)': 'annotator.clear()',
  },
})
export class ScImageAnnotatorNextClear {
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
    ɵwarnIfUnnamed('scImageAnnotatorNextClear');
  }
}
