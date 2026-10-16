import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSignaturePadNext } from './signature-pad-next';

/** Redoes what was undone; disabled with none. Write its icon and name it ("Redo"). */
@Directive({
  selector: 'button[scSignaturePadNextRedo]',
  host: {
    type: 'button',
    'data-slot': 'signature-pad-redo',
    '[disabled]': '!pad.canRedo()',
    '[class]': 'class()',
    '(click)': 'pad.redo()',
  },
})
export class ScSignaturePadNextRedo {
  protected readonly pad = inject(ScSignaturePadNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSignaturePadNextRedo');
  }
}
