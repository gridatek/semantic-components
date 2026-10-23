import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScImageAnnotator } from './image-annotator';

/** Redoes it (Ctrl+Shift+Z). Write its icon and name it. */
@Directive({
  selector: 'button[scImageAnnotatorRedo]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-redo',
    '[disabled]': 'annotator.readonly() || !annotator.canRedo()',
    '[class]': 'class()',
    '(click)': 'annotator.redo()',
  },
})
export class ScImageAnnotatorRedo {
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
    ɵwarnIfUnnamed('scImageAnnotatorRedo');
  }
}
