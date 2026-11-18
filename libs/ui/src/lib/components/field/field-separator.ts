import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: '[scFieldSeparator]',
  host: {
    '[class]': 'class()',
  },
})
export class ScFieldSeparator {
  private readonly styles = injectStyle().field;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
