import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** Your chevron, in the trigger: at its end, turned while open. */
@Directive({
  selector: 'svg[scAccordionTriggerIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScAccordionTriggerIcon {
  private readonly styles = injectStyle().accordion;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.styles.icon,
      'transition-transform group-aria-expanded/accordion-trigger:rotate-180',
      this.classInput(),
    ),
  );
}
