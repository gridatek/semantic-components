import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scAlertDialogMedia]',
  host: {
    'data-slot': 'alert-dialog-media',
    '[class]': 'class()',
  },
})
export class ScAlertDialogMedia {
  private readonly styles = injectPreset().alertDialog;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.media, this.classInput()),
  );
}
