import { Directive, computed, input, signal } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** Options together: a `group`, named by its label. */
@Directive({
  selector: 'div[scSelectGroup]',
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class]': 'class()',
  },
})
export class ScSelectGroup {
  private readonly styles = injectStyle().select;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Set by its label. */
  readonly labelId = signal<string | null>(null);

  private readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
