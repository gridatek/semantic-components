import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSignaturePadNext } from './signature-pad-next';

/** Undoes the last change; disabled with none. Write its icon and name it ("Undo"). */
@Directive({
  selector: 'button[scSignaturePadNextUndo]',
  host: {
    type: 'button',
    'data-slot': 'signature-pad-undo',
    '[disabled]': '!pad.canUndo()',
    '[class]': 'class()',
    '(click)': 'pad.undo()',
  },
})
export class ScSignaturePadNextUndo {
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
    ɵwarnIfUnnamed('scSignaturePadNextUndo');
  }
}
