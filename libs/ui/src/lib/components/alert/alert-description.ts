import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: '[scAlertDescription]',
  host: {
    'data-slot': 'alert-description',
    '[class]': 'class()',
  },
})
export class ScAlertDescription {
  private readonly styles = injectStyle().alert;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
