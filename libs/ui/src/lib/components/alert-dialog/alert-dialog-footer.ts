import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scAlertDialogFooter]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAlertDialogFooter {
  private readonly styles = injectPreset().alertDialog;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
