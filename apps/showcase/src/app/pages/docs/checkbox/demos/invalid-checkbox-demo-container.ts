import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidCheckboxDemo } from './invalid-checkbox-demo';

@Component({
  selector: 'app-invalid-checkbox-demo-container',
  imports: [DemoContainer, InvalidCheckboxDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/checkbox/invalid-checkbox-demo"
      [code]="code"
    >
      <app-invalid-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidCheckboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScCheckboxField,
  ScLabel,
} from '@semantic-components/ui';

/** A required checkbox, touched and not checked: marked invalid (Signal Forms). */
@Component({
  selector: 'app-invalid-checkbox-demo',
  imports: [FormField, ScCheckbox, ScCheckboxField, ScLabel],
  template: \`
    <div scCheckboxField class="w-56">
      <input type="checkbox" scCheckbox [formField]="termsForm.terms" />
      <label scLabel>Accept terms and conditions</label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidCheckboxDemo {
  protected readonly termsForm = form(signal({ terms: false }), (path) => {
    required(path.terms);
  });

  constructor() {
    // Touched already, to show it invalid.
    this.termsForm.terms().markAsTouched();
  }
}`;
}
