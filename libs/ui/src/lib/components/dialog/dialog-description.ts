import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScDialog } from './dialog';

@Directive({
  selector: 'p[scDialogDescription]',
  host: {
    '[id]': 'dialog.descriptionId',
    '[class]': 'class()',
  },
})
export class ScDialogDescription {
  private readonly styles = injectPreset().dialog;
  readonly dialog = inject(ScDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
