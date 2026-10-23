import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSignaturePad } from './signature-pad';

/** Picks the pen's colour (`[scSignaturePadColor]="'#1d4ed8'"`), pressed while it is the one. Write its swatch and name it ("Blue"). */
@Directive({
  selector: 'button[scSignaturePadColor]',
  host: {
    type: 'button',
    'data-slot': 'signature-pad-color',
    '[disabled]': '!pad.editable()',
    '[attr.aria-pressed]': 'pad.penColor() === color()',
    '[class]': 'class()',
    '(click)': 'pad.penColor.set(color())',
  },
})
export class ScSignaturePadColor {
  private readonly buttonStyles = injectPreset().button;

  protected readonly pad = inject(ScSignaturePad);

  readonly color = input.required<string>({
    alias: 'scSignaturePadColor',
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
    ɵwarnIfUnnamed('scSignaturePadColor');
  }
}
