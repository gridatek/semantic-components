import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { toastColors } from './toast-colors';
import { SC_TOAST_CONTEXT } from './toast-context';

/** The toast's description: muted, or in its variant's colour (success, warning, error). */
@Directive({
  selector: '[scToastDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScToastDescription {
  private readonly context = inject(SC_TOAST_CONTEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-sm text-muted-foreground',
      toastColors[this.context.toast().variant ?? 'default'],
      this.classInput(),
    ),
  );
}
