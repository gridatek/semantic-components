import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScNativeDialog } from './native-dialog';

@Directive({
  selector: 'p[scNativeDialogDescription]',
  host: {
    'data-slot': 'native-dialog-description',
    '[id]': 'dialog.descriptionId',
    '[class]': 'class()',
  },
})
export class ScNativeDialogDescription {
  readonly dialog = inject(ScNativeDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3',
      this.classInput(),
    ),
  );
}
