import { AccordionTrigger } from '@angular/aria/accordion';
import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * Opens and closes a panel (Enter, Space, a click): `[panel]`, the panel
 * (`<div scAccordionNextPanel #shipping>`).
 */
@Directive({
  selector: 'button[scAccordionNextTrigger]',
  exportAs: 'scAccordionNextTrigger',
  hostDirectives: [{ directive: AccordionTrigger, inputs: ['id', 'panel'] }],
  host: {
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScAccordionNextTrigger {
  private readonly styles = injectPreset().accordion;
  readonly trigger = inject(AccordionTrigger);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      // Focus shown in every style (luma's has none); a style's own wins.
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      this.styles.trigger,
      this.classInput(),
    ),
  );
}
