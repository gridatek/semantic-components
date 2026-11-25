import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: '[scAlertTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAlertTitle {
  private readonly styles = injectStyle().alert;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
