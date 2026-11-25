import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The chevron in the trigger: it flips while the list is open. */
@Directive({
  selector: 'svg[scSelectIcon]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSelectIcon {
  private readonly styles = injectStyle().select;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.styles.icon,
      // Its trigger is aria-expanded while the list is open.
      'transition-transform duration-150 in-aria-expanded:rotate-180 motion-reduce:transition-none',
      this.classInput(),
    ),
  );
}
