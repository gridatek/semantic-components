import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScNativeDialog } from './native-dialog';

/** The dialog's description (`aria-describedby`). */
@Directive({
  selector: 'p[scNativeDialogDescription]',
  host: {
    '[id]': 'dialog.descriptionId',
    '[class]': 'class()',
  },
})
export class ScNativeDialogDescription {
  private readonly styles = injectStyle().dialog;
  private readonly dialog = inject(ScNativeDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
