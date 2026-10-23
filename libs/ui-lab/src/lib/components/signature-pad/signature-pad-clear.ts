import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSignaturePad } from './signature-pad';

/** Clears the signature (undoable); disabled while empty. Write its icon or text, and name it ("Clear"). */
@Directive({
  selector: 'button[scSignaturePadClear]',
  host: {
    type: 'button',
    'data-slot': 'signature-pad-clear',
    '[disabled]': '!pad.editable() || pad.empty()',
    '[class]': 'class()',
    '(click)': 'pad.clear()',
  },
})
export class ScSignaturePadClear {
  private readonly buttonStyles = injectPreset().button;

  protected readonly pad = inject(ScSignaturePad);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSignaturePadClear');
  }
}
