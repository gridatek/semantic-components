import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScNativeDialog } from './native-dialog';

/** The dialog's name (`aria-labelledby`). */
@Directive({
  selector: 'h2[scNativeDialogTitle]',
  host: {
    '[id]': 'dialog.titleId',
    '[class]': 'class()',
  },
})
export class ScNativeDialogTitle {
  private readonly styles = injectStyle().dialog;
  private readonly dialog = inject(ScNativeDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
