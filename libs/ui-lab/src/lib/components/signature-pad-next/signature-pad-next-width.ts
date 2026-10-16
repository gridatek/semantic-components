import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSignaturePadNext } from './signature-pad-next';

/** Picks the pen's width (`[scSignaturePadNextWidth]="5"`), pressed while it is the one. Write its sample and name it ("Thick"). */
@Directive({
  selector: 'button[scSignaturePadNextWidth]',
  host: {
    type: 'button',
    'data-slot': 'signature-pad-width',
    '[disabled]': '!pad.editable()',
    '[attr.aria-pressed]': 'pad.penWidth() === width()',
    '[class]': 'class()',
    '(click)': 'pad.penWidth.set(width())',
  },
})
export class ScSignaturePadNextWidth {
  protected readonly pad = inject(ScSignaturePadNext);

  readonly width = input.required<number>({
    alias: 'scSignaturePadNextWidth',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSignaturePadNextWidth');
  }
}
