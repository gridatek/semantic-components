import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAlertDialogFooter]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAlertDialogFooter {
  private readonly styles = injectStyle().alertDialog;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
