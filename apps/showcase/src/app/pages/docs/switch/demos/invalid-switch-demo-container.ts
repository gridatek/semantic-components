import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidSwitchDemo } from './invalid-switch-demo';

@Component({
  selector: 'app-invalid-switch-demo-container',
  imports: [DemoContainer, InvalidSwitchDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/switch/invalid-switch-demo"
      [code]="code"
    >
      <app-invalid-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidSwitchDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

/** A required switch, touched and off: marked invalid (Signal Forms). */
@Component({
  selector: 'app-invalid-switch-demo',
  imports: [FormField, ScFieldDescription, ScLabel, ScSwitch, ScSwitchField],
  template: \`
    <div scSwitchField class="max-w-sm">
      <label scLabel>Accept terms and conditions</label>
      <p scFieldDescription>
        You must accept the terms and conditions to continue.
      </p>
      <input type="checkbox" scSwitch [formField]="termsForm.terms" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidSwitchDemo {
  protected readonly termsForm = form(signal({ terms: false }), (path) => {
    required(path.terms);
  });

  constructor() {
    // Touched already, to show it invalid.
    this.termsForm.terms().markAsTouched();
  }
}`;
}
