import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-grid-input-demo',
  imports: [ScField, ScFieldGroup, ScInput, ScLabel],
  template: `
    <div scFieldGroup class="grid w-full max-w-sm grid-cols-2">
      <div scField>
        <label scLabel>First Name</label>
        <input scInput placeholder="Jordan" autocomplete="given-name" />
      </div>
      <div scField>
        <label scLabel>Last Name</label>
        <input scInput placeholder="Lee" autocomplete="family-name" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GridInputDemo {}
