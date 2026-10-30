import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-file-input-demo',
  imports: [ScField, ScFieldDescription, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-xs">
      <label scLabel>Picture</label>
      <input scInput type="file" accept="image/*" />
      <p scFieldDescription>Select a picture to upload.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FileInputDemo {}
