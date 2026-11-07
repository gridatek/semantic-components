import { Component, ViewEncapsulation } from '@angular/core';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

/** In a scField: it names the field’s control, with no id to write. */
@Component({
  selector: 'app-field-label-demo',
  imports: [ScField, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>Email</label>
      <input scInput type="email" placeholder="m@example.com" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldLabelDemo {}
