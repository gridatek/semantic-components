import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_TOAST_CONTEXT } from './toast-context';

/** Runs its toast's action, then dismisses it. Write its text (`toast.action.label`). */
@Directive({
  selector: 'button[scToastAction]',
  host: {
    type: 'button',
    'data-slot': 'toast-action',
    '[class]': 'class()',
    '(click)': 'run()',
  },
})
export class ScToastAction {
  private readonly context = inject(SC_TOAST_CONTEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'ms-auto inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3',
      'text-sm font-medium transition-colors',
      'hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected run(): void {
    this.context.toast().action?.onClick();
    this.context.dismiss();
  }
}
