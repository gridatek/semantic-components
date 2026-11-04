import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScAlertDialog } from './alert-dialog';

@Directive({
  selector: 'p[scAlertDialogDescription]',
  host: {
    '[id]': 'dialog.descriptionId',
    '[class]': 'class()',
  },
})
export class ScAlertDialogDescription {
  private readonly styles = injectPreset().alertDialog;

  readonly dialog = inject(ScAlertDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
