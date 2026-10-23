import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScSignaturePad } from './signature-pad';

/** Picks the pen's width (`[scSignaturePadWidth]="5"`), pressed while it is the one. Write its sample and name it ("Thick"). */
@Directive({
  selector: 'button[scSignaturePadWidth]',
  host: {
    type: 'button',
    'data-slot': 'signature-pad-width',
    '[disabled]': '!pad.editable()',
    '[attr.aria-pressed]': 'pad.penWidth() === width()',
    '[class]': 'class()',
    '(click)': 'pad.penWidth.set(width())',
  },
})
export class ScSignaturePadWidth {
  private readonly buttonStyles = injectPreset().button;

  protected readonly pad = inject(ScSignaturePad);

  readonly width = input.required<number>({
    alias: 'scSignaturePadWidth',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSignaturePadWidth');
  }
}
