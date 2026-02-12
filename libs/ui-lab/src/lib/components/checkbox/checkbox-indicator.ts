import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[sc-checkbox-indicator]',
  host: {
    'data-slot': 'checkbox-indicator',
    '[class]': 'class()',
    '[attr.data-state]': 'state()',
    '[attr.aria-hidden]': 'true',
  },
})
export class ScCheckboxIndicator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = input<'checked' | 'unchecked' | 'indeterminate'>(
    'unchecked',
  );

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary transition-colors',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
      this.classInput(),
    ),
  );
}
