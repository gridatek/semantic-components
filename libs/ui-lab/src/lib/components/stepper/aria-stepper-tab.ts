import { Tab } from '@angular/aria/tabs';
import { Directive, input } from '@angular/core';
import { setInput } from '@semantic-components/ui';

/**
 * `@angular/aria`'s `Tab` with `value` made optional, so `ScStepperTrigger` can
 * host it without re-exposing a required input (angular/angular#50510) and
 * derive the value from its step instead.
 */
@Directive({ selector: '[scAriaStepperTab]' })
export class ScAriaStepperTab extends Tab {
  /** Aria's own `value` signal, captured by its pattern at construction. */
  // Read through the base type: at this point `value` is still aria's signal.
  private readonly ariaValue = (this as Tab).value;
  override readonly value = input<string>(undefined as never);

  /** Sets the tab's value (before aria first reads it, i.e. by ngOnInit). */
  setValue(value: string): void {
    setInput(this.ariaValue, value);
    setInput(this.value, value);
  }
}
