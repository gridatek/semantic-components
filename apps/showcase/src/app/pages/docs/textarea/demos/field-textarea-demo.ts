import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

/** In a field: named by its label, described by its description. */
@Component({
  selector: 'app-field-textarea-demo',
  imports: [ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>Message</label>
      <p scFieldDescription>Enter your message below.</p>
      <textarea scTextarea placeholder="Type your message here."></textarea>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldTextareaDemo {}
