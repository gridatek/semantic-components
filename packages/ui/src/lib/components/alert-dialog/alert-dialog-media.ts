import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAlertDialogMedia]',
  host: {
    'data-slot': 'alert-dialog-media',
    '[class]': 'class()',
  },
})
export class ScAlertDialogMedia {
  private readonly styles = injectStyle().alertDialog;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.media, this.classInput()),
  );
}
