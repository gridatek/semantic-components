import { AccordionPanel, AccordionTrigger } from '@angular/aria/accordion';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { SC_ACCORDION_ITEM } from './accordion-item-context';

/**
 * Opens and closes its item's panel (Enter, Space, a click) — connected by
 * the item, nothing to wire.
 *
 * Angular Aria's trigger itself (extended, not a host directive): Aria
 * declares its panel a required input, which every template would then have
 * to bind; here it is optional, and the item sets it.
 */
@Directive({
  selector: 'button[scAccordionTrigger]',
  exportAs: 'scAccordionTrigger',
  host: {
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScAccordionTrigger extends AccordionTrigger {
  private readonly styles = injectPreset().accordion;

  /** Its panel: set by the item. */
  override readonly panel = input<AccordionPanel>(
    undefined as unknown as AccordionPanel,
  );

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      // Focus shown in every style (luma's has none); a style's own wins.
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      this.styles.trigger,
      this.classInput(),
    ),
  );

  constructor() {
    super();
    inject(SC_ACCORDION_ITEM).registerTrigger(this);
  }
}
