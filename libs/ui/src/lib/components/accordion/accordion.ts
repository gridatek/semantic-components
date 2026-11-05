import { AccordionGroup } from '@angular/aria/accordion';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { bindInput, cn } from '../../utils';

/**
 * An accordion: items whose panels open and close under their heading. Holds
 * which are open (`[(value)]`, their values).
 */
@Directive({
  selector: '[scAccordion]',
  exportAs: 'scAccordion',
  hostDirectives: [
    {
      directive: AccordionGroup,
      inputs: ['disabled'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScAccordion {
  private readonly styles = injectPreset().accordion;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Several items open at once; one at a time by default. */
  readonly multiple = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  /** The open items' values; `[(value)]`. */
  readonly value = model<readonly string[]>([]);

  protected readonly class = computed(() =>
    cn(this.styles.root, this.classInput()),
  );

  constructor() {
    // Aria's default is several at once: one at a time here, as Base UI.
    bindInput(inject(AccordionGroup).multiExpandable, this.multiple);
  }
}
