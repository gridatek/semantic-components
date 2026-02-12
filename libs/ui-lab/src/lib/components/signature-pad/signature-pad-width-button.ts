import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SC_SIGNATURE_PAD } from './signature-pad';
import { cn } from '../../utils';

@Component({
  selector: 'button[sc-signature-pad-pen-width]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-active]': 'isActive() || null',
    '[disabled]': 'signaturePad.disabled() || null',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSignaturePadWidthButton {
  protected readonly signaturePad = inject(SC_SIGNATURE_PAD);

  readonly width = input.required<number>();
  readonly ariaLabel = input<string>('');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isActive = computed(
    () => this.signaturePad.penWidth() === this.width(),
  );

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center size-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[active]:border-primary data-[active]:bg-primary/10',
      this.classInput(),
    ),
  );

  protected onClick(): void {
    if (this.signaturePad.disabled()) return;
    this.signaturePad.penWidth.set(this.width());
  }
}
