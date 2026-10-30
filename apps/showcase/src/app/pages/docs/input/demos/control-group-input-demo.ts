import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScField,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-control-group-input-demo',
  imports: [ScButton, ScControlGroup, ScField, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>Search</label>
      <div scControlGroup class="w-full">
        <input scInput placeholder="Type to search..." />
        <button scButton variant="outline">Search</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlGroupInputDemo {}
