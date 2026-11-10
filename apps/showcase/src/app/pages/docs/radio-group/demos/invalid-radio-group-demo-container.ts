import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidRadioGroupDemo } from './invalid-radio-group-demo';

@Component({
  selector: 'app-invalid-radio-group-demo-container',
  imports: [DemoContainer, InvalidRadioGroupDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/radio-group/invalid-radio-group-demo"
      [code]="code"
    >
      <app-invalid-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidRadioGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScFieldset,
  ScLegend,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

/** A required choice, touched with none picked: each radio marked invalid (Signal Forms). */
@Component({
  selector: 'app-invalid-radio-group-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScFieldset,
    ScLegend,
    ScRadio,
    ScRadioField,
    ScRadioGroup,
  ],
  template: \`
    <fieldset scFieldset class="w-full max-w-xs">
      <legend scLegend variant="label">Notification Preferences</legend>
      <p scFieldDescription>Choose how you want to receive notifications.</p>
      <div scRadioGroup>
        <label scRadioField>
          <input type="radio"
            scRadio
            value="email"
            [formField]="notifyForm.notify"
          />
          Email only
        </label>
        <label scRadioField>
          <input type="radio"
            scRadio
            value="sms"
            [formField]="notifyForm.notify"
          />
          SMS only
        </label>
        <label scRadioField>
          <input type="radio"
            scRadio
            value="both"
            [formField]="notifyForm.notify"
          />
          Both Email &amp; SMS
        </label>
      </div>
    </fieldset>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidRadioGroupDemo {
  protected readonly notifyForm = form(signal({ notify: '' }), (path) => {
    required(path.notify);
  });

  constructor() {
    // Touched already, to show it invalid.
    this.notifyForm.notify().markAsTouched();
  }
}`;
}
