import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-alert-dialog-footer]',
  host: {
    'data-slot': 'alert-dialog-footer',
    '[class]': 'class()',
  },
})
export class ScAlertDialogFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted/50 -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4',
      'sm:flex-row sm:justify-end',
      this.classInput(),
    ),
  );
}
