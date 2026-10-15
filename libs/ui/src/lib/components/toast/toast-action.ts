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
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3',
      'text-sm font-medium transition-colors',
      'hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50',
      'group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30',
      'group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground',
      'group-[.destructive]:focus:ring-destructive',
      this.classInput(),
    ),
  );

  protected run(): void {
    this.context.toast.action?.onClick();
    this.context.dismiss();
  }
}
