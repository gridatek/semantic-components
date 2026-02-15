import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScDialog } from './dialog';

@Directive({
  selector: 'p[sc-dialog-description]',
  host: {
    'data-slot': 'dialog-description',
    '[id]': 'dialog.descriptionId',
    '[class]': 'class()',
  },
})
export class ScDialogDescription {
  readonly dialog = inject(ScDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3',
      this.classInput(),
    ),
  );
}
