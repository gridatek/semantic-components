import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScToastPosition, ScToastVariant } from './toast.types';

@Component({
  selector: 'div[scToast]',
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
  readonly position = input<ScToastPosition>('bottom-right');

  /** Emitted when pointer enters the toast (pause auto-dismiss) */
  readonly pointerEnter = output<void>();

  /** Emitted when pointer leaves the toast (resume auto-dismiss) */
  readonly pointerLeave = output<void>();

  protected readonly class = computed(() =>
    cn(
      'group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
      this.position().startsWith('bottom')
        ? 'data-[state=open]:slide-in-from-bottom-full'
        : 'data-[state=open]:slide-in-from-top-full',
      this.variantClass(),
      this.classInput(),
    ),
  );

  private readonly variantClass = computed(() => {
    const variantClasses: Record<ScToastVariant, string> = {
      default: 'border-border bg-card text-card-foreground shadow-lg',
      destructive:
        'destructive border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
      success:
        'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200',
      info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
      warning:
        'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
      error:
        'destructive border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
      loading: 'border-border bg-card text-card-foreground shadow-lg',
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
