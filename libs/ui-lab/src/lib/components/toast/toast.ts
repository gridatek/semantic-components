import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScToastVariant } from './toast.types';

@Component({
  selector: 'div[sc-toast]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'toast',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
    '(pointerenter)': 'onPointerEnter()',
    '(pointerleave)': 'onPointerLeave()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScToast {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScToastVariant>('default');

  /** Emitted when pointer enters the toast (pause auto-dismiss) */
  readonly pointerEnter = output<void>();

  /** Emitted when pointer leaves the toast (resume auto-dismiss) */
  readonly pointerLeave = output<void>();

  protected readonly class = computed(() =>
    cn(
      'group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
      this.variantClass(),
      this.classInput(),
    ),
  );

  private readonly variantClass = computed(() => {
    const variantClasses: Record<ScToastVariant, string> = {
      default: 'border bg-background text-foreground',
      destructive:
        'destructive group border-destructive bg-destructive text-destructive-foreground',
    };
    return variantClasses[this.variant()];
  });

  protected onPointerEnter(): void {
    this.pointerEnter.emit();
  }

  protected onPointerLeave(): void {
    this.pointerLeave.emit();
  }
}
