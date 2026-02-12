import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-alert-dialog-header]',
  host: {
    'data-slot': 'alert-dialog-header',
    '[class]': 'class()',
  },
})
export class ScAlertDialogHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center',
      'has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4',
      'sm:place-items-start sm:text-left',
      'sm:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
      this.classInput(),
    ),
  );
}
