import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSignaturePadNext } from './signature-pad-next';

/** Clears the signature (undoable); disabled while empty. Write its icon or text, and name it ("Clear"). */
@Directive({
  selector: 'button[scSignaturePadNextClear]',
  host: {
    type: 'button',
    'data-slot': 'signature-pad-clear',
    '[disabled]': '!pad.editable() || pad.empty()',
    '[class]': 'class()',
    '(click)': 'pad.clear()',
  },
})
export class ScSignaturePadNextClear {
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
    ɵwarnIfUnnamed('scSignaturePadNextClear');
  }
}
