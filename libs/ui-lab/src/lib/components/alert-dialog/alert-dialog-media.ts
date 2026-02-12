import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-alert-dialog-media]',
  host: {
    'data-slot': 'alert-dialog-media',
    '[class]': 'class()',
  },
})
export class ScAlertDialogMedia {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md',
      'sm:row-span-2',
      '*:[svg:not([class*="size-"])]:size-6',
      this.classInput(),
    ),
  );
}
