import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScAlertDialog } from './alert-dialog';

@Directive({
  selector: 'h2[scAlertDialogTitle]',
  host: {
    '[id]': 'dialog.titleId',
    '[class]': 'class()',
  },
})
export class ScAlertDialogTitle {
  private readonly styles = injectPreset().alertDialog;

  readonly dialog = inject(ScAlertDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
