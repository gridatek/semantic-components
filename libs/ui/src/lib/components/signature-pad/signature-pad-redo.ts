import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScSignaturePad } from './signature-pad';

/** Redoes what was undone; disabled with none. Write its icon and name it ("Redo"). */
@Directive({
  selector: 'button[scSignaturePadRedo]',
  host: {
    type: 'button',
    'data-slot': 'signature-pad-redo',
    '[disabled]': '!pad.canRedo()',
    '[class]': 'class()',
    '(click)': 'pad.redo()',
  },
})
export class ScSignaturePadRedo {
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
    ɵwarnIfUnnamed('scSignaturePadRedo');
  }
}
