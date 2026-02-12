import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-dialog-header]',
  host: {
    'data-slot': 'dialog-header',
    '[class]': 'class()',
  },
})
export class ScDialogHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('gap-2 flex flex-col', this.classInput()),
  );
}
