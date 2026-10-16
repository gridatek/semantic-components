import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageAnnotator } from './image-annotator';

/** Undoes the last change (Ctrl+Z). Write its icon and name it. */
@Directive({
  selector: 'button[scImageAnnotatorUndo]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-undo',
    '[disabled]': 'annotator.readonly() || !annotator.canUndo()',
    '[class]': 'class()',
    '(click)': 'annotator.undo()',
  },
})
export class ScImageAnnotatorUndo {
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
    ɵwarnIfUnnamed('scImageAnnotatorUndo');
  }
}
