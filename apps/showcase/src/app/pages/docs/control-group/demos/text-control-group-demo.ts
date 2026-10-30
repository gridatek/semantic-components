import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScControlGroupText,
  ScInput,
} from '@semantic-components/ui';

@Component({
  selector: 'app-text-control-group-demo',
  imports: [ScButton, ScControlGroup, ScControlGroupText, ScInput],
  template: `
    <div scControlGroup aria-label="Website">
      <label scControlGroupText for="text-control-group-url">https://</label>
      <input scInput id="text-control-group-url" placeholder="example.com" />
      <button scButton variant="outline">Visit</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextControlGroupDemo {}
