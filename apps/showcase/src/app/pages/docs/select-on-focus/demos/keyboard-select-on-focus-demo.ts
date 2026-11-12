import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';

/** Selected on a keyboard focus only: a click places the caret. */
@Component({
  selector: 'app-keyboard-select-on-focus-demo',
  imports: [ScSelectOnFocus, ScInput, ScField, ScLabel],
  template: `
    <div scField class="w-64">
      <label scLabel>Coupon code</label>
      <input scInput scSelectOnFocus="keyboard" value="SPRING-2026" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardSelectOnFocusDemo {}
