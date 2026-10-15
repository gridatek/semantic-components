import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button/button';
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
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'ms-auto',
      this.classInput(),
    ),
  );

  protected run(): void {
    this.context.toast().action?.onClick();
    this.context.dismiss();
  }
}
