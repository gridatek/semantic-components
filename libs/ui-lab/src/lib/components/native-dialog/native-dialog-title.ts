import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScNativeDialog } from './native-dialog';

@Directive({
  selector: 'h2[scNativeDialogTitle]',
  host: {
    'data-slot': 'native-dialog-title',
    '[id]': 'dialog.titleId',
    '[class]': 'class()',
  },
})
export class ScNativeDialogTitle {
  readonly dialog = inject(ScNativeDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-base leading-none font-medium', this.classInput()),
  );
}
