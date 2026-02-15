import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScFieldset,
  ScLegend,
  ScFieldGroup,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-fieldset-demo',
  imports: [
    ScFieldset,
    ScLegend,
    ScFieldGroup,
    ScField,
    ScLabel,
    ScFieldDescription,
    ScInput,
  ],
  template: `
    <fieldset sc-fieldset>
      <legend sc-legend>Personal Information</legend>
      <p sc-field-description>Please provide your personal details below.</p>

      <div sc-field-group>
        <div sc-field>
          <label sc-label for="firstName">First Name</label>
          <input sc-input id="firstName" type="text" placeholder="John" />
        </div>

        <div sc-field>
          <label sc-label for="lastName">Last Name</label>
          <input sc-input id="lastName" type="text" placeholder="Doe" />
        </div>

        <div sc-field>
          <label sc-label for="email">Email</label>
          <input
            sc-input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
          />
        </div>
      </div>
    </fieldset>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemo {}
