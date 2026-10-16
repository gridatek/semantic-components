import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageAnnotatorNext } from './image-annotator-next';

/** Undoes the last change (Ctrl+Z). Write its icon and name it. */
@Directive({
  selector: 'button[scImageAnnotatorNextUndo]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-undo',
    '[disabled]': 'annotator.readonly() || !annotator.canUndo()',
    '[class]': 'class()',
    '(click)': 'annotator.undo()',
  },
})
export class ScImageAnnotatorNextUndo {
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
    ɵwarnIfUnnamed('scImageAnnotatorNextUndo');
  }
}
