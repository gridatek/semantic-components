import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_TOAST_CONTEXT } from './toast-context';

/** Your icon for the toast (inside), coloured by its variant; a spinner turns while loading. */
@Directive({
  selector: '[scToastIcon]',
  host: {
    'data-slot': 'toast-icon',
    'aria-hidden': 'true',
    '[attr.data-variant]': 'context.toast.variant ?? "default"',
    '[class]': 'class()',
  },
})
export class ScToastIcon {
  protected readonly context = inject(SC_TOAST_CONTEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex shrink-0 [&_svg]:size-4',
      'data-[variant=success]:text-green-600 dark:data-[variant=success]:text-green-400',
      'data-[variant=info]:text-blue-600 dark:data-[variant=info]:text-blue-400',
      'data-[variant=warning]:text-yellow-600 dark:data-[variant=warning]:text-yellow-400',
      'data-[variant=loading]:[&_svg]:animate-spin',
      this.classInput(),
    ),
  );
}
