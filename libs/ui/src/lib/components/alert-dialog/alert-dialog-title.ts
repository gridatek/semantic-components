import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScAlertDialog } from './alert-dialog';

@Directive({
  selector: 'h2[scAlertDialogTitle]',
  host: {
    '[id]': 'dialog.titleId',
    '[class]': 'class()',
  },
})
export class ScAlertDialogTitle {
  private readonly styles = injectStyle().alertDialog;

  private readonly dialog = inject(ScAlertDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
