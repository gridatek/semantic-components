import { TabPanel } from '@angular/aria/tabs';
import { Directive, input } from '@angular/core';
import { setInput } from '@semantic-components/ui';

/**
 * `@angular/aria`'s `TabPanel` with `value` made optional, so `ScStepperPanel`
 * can host it without re-exposing a required input (angular/angular#50510) and
 * derive the value from its step instead.
 */
@Directive({ selector: '[scAriaStepperPanel]' })
export class ScAriaStepperPanel extends TabPanel {
  /** Aria's own `value` signal, captured by its pattern at construction. */
  // Read through the base type: at this point `value` is still aria's signal.
  private readonly ariaValue = (this as TabPanel).value;
  override readonly value = input<string>(undefined as never);

  /** Sets the panel's value (before aria first reads it, i.e. by ngOnInit). */
  setValue(value: string): void {
    setInput(this.ariaValue, value);
    setInput(this.value, value);
  }
}
