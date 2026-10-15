import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_SIGNATURE_PAD } from './signature-pad';

@Directive({
  selector: 'button[scSignaturePadPenWidth]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.data-active]': 'isActive() || null',
    '[disabled]': 'signaturePad.disabled() || null',
    '(click)': 'onClick()',
  },
})
export class ScSignaturePadWidthButton {
  constructor() {
    ɵwarnIfUnnamed('scSignaturePadPenWidth');
  }

  protected readonly signaturePad = inject(SC_SIGNATURE_PAD);

  readonly width = input.required<number>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isActive = computed(
    () => this.signaturePad.penWidth() === this.width(),
  );

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center size-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-active:border-primary data-active:bg-primary/10',
      this.classInput(),
    ),
  );

  protected onClick(): void {
    if (this.signaturePad.disabled()) return;
    this.signaturePad.penWidth.set(this.width());
  }
}
