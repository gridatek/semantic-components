import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidSwitchNextDemo } from './invalid-switch-next-demo';

@Component({
  selector: 'app-invalid-switch-next-demo-container',
  imports: [DemoContainer, InvalidSwitchNextDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/switch-next/invalid-switch-next-demo"
      [code]="code"
    >
      <app-invalid-switch-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidSwitchNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** A required switch, touched and off: marked invalid (Signal Forms). */
@Component({
  selector: 'app-invalid-switch-next-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScLabel,
    ScSwitchNext,
    ScSwitchNextField,
  ],
  template: \`
    <div scSwitchNextField class="max-w-sm">
      <label scLabel>Accept terms and conditions</label>
      <p scFieldDescription>
        You must accept the terms and conditions to continue.
      </p>
      <input type="checkbox" scSwitchNext [formField]="termsForm.terms" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidSwitchNextDemo {
  protected readonly termsForm = form(signal({ terms: false }), (path) => {
    required(path.terms);
  });

  constructor() {
    // Touched already, to show it invalid.
    this.termsForm.terms().markAsTouched();
  }
}`;
}
