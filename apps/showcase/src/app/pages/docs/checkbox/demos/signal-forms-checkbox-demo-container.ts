import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsCheckboxDemo } from './signal-forms-checkbox-demo';

@Component({
  selector: 'app-signal-forms-checkbox-demo-container',
  imports: [DemoContainer, SignalFormsCheckboxDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/checkbox/signal-forms-checkbox-demo"
      [code]="code"
    >
      <app-signal-forms-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsCheckboxDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScField,
  ScFieldGroup,
  ScFrame,
  ScLabel,
} from '@semantic-components/ui';

/** Bound with [formField]: the form's values follow. */
@Component({
  selector: 'app-signal-forms-checkbox-demo',
  imports: [
    FormField,
    JsonPipe,
    ScCheckbox,
    ScFieldGroup,
    ScFrame,
    ScLabel,
    ScField,
  ],
  template: \`
    <div class="flex w-64 flex-col gap-4">
      <div scFieldGroup class="gap-3">
        <div scField orientation="horizontal">
          <input scCheckbox [formField]="emailForm.newsletter" />
          <label scLabel>Subscribe to newsletter</label>
        </div>
        <div scField orientation="horizontal">
          <input scCheckbox [formField]="emailForm.marketing" />
          <label scLabel>Receive marketing emails</label>
        </div>
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsCheckboxDemo {
  protected readonly model = signal({ newsletter: true, marketing: false });
  protected readonly emailForm = form(this.model);
}`;
}
