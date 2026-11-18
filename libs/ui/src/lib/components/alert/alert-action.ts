import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: '[scAlertAction]',
  host: {
    'data-slot': 'alert-action',
    '[class]': 'class()',
  },
})
export class ScAlertAction {
  private readonly styles = injectStyle().alert;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.action, this.classInput()),
  );
}
