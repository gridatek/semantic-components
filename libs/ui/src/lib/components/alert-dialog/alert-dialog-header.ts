import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scAlertDialogHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAlertDialogHeader {
  private readonly styles = injectPreset().alertDialog;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
