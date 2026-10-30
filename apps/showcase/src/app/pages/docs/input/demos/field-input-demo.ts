import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-field-input-demo',
  imports: [ScField, ScFieldDescription, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-xs">
      <label scLabel>Username</label>
      <input scInput type="text" placeholder="Enter your username" />
      <p scFieldDescription>Choose a unique username for your account.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldInputDemo {}
