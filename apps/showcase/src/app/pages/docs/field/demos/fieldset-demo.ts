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
    <fieldset scFieldset>
      <legend scLegend>Personal Information</legend>
      <p scFieldDescription>Please provide your personal details below.</p>

      <div scFieldGroup>
        <div scField>
          <label scLabel for="firstName">First Name</label>
          <input scInput id="firstName" type="text" placeholder="John" />
        </div>

        <div scField>
          <label scLabel for="lastName">Last Name</label>
          <input scInput id="lastName" type="text" placeholder="Doe" />
        </div>

        <div scField>
          <label scLabel for="email">Email</label>
          <input
            scInput
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
