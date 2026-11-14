import { Component, ViewEncapsulation } from '@angular/core';
import { ScField, ScLabelText, ScSwitch } from '@semantic-components/ui';

/** A switch after its text: the whole row toggles it. */
@Component({
  selector: 'app-switch-field-demo',
  imports: [ScLabelText, ScSwitch, ScField],
  template: `
    <label scField orientation="horizontal" class="w-fit">
      <p scLabelText>Multi-factor authentication</p>
      <input scSwitch />
    </label>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SwitchFieldDemo {}
