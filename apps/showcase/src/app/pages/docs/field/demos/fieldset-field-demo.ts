import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldset,
  ScInput,
  ScLabel,
  ScLegend,
} from '@semantic-components/ui';

/** A fieldset: its legend and description, its fields side by side in a grid. */
@Component({
  selector: 'app-fieldset-field-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldset,
    ScInput,
    ScLabel,
    ScLegend,
  ],
  template: `
    <fieldset scFieldset class="w-full max-w-sm">
      <legend scLegend>Address Information</legend>
      <p scFieldDescription>We need your address to deliver your order.</p>
      <div scFieldGroup>
        <div scField>
          <label scLabel>Street Address</label>
          <input scInput type="text" placeholder="123 Main St" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div scField>
            <label scLabel>City</label>
            <input scInput type="text" placeholder="New York" />
          </div>
          <div scField>
            <label scLabel>Postal Code</label>
            <input scInput type="text" placeholder="90502" />
          </div>
        </div>
      </div>
    </fieldset>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldsetFieldDemo {}
