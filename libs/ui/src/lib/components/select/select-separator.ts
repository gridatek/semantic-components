import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A line between options or groups. */
@Directive({
  selector: 'div[scSelectSeparator]',
  host: {
    role: 'separator',
    'aria-orientation': 'horizontal',
    '[class]': 'class()',
  },
})
export class ScSelectSeparator {
  private readonly styles = injectStyle().select;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
