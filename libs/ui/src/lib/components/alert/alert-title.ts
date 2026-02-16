import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-alert-title]',
  host: {
    'data-slot': 'alert-title',
    '[class]': 'class()',
  },
})
export class ScAlertTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3',
      this.classInput(),
    ),
  );
}
