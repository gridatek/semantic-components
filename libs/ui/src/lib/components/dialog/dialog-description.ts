import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
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
  private readonly dialog = inject(ScDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
