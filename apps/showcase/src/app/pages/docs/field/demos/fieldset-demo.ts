import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldset,
  ScLabel,
  ScLegend,
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
          <label scLabel>First Name</label>
          <input scInput type="text" placeholder="John" />
        </div>

        <div scField>
          <label scLabel>Last Name</label>
          <input scInput type="text" placeholder="Doe" />
        </div>

        <div scField>
          <label scLabel>Email</label>
          <input scInput type="email" placeholder="john.doe@example.com" />
        </div>
      </div>
    </fieldset>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemo {}
