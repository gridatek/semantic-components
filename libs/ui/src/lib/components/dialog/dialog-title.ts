import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScDialog } from './dialog';

@Directive({
  selector: 'h2[scDialogTitle]',
  host: {
    '[id]': 'dialog.titleId',
    '[class]': 'class()',
  },
})
export class ScDialogTitle {
  private readonly styles = injectPreset().dialog;
  readonly dialog = inject(ScDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
