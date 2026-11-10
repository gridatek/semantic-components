import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsCheckboxNextDemo } from './signal-forms-checkbox-next-demo';

@Component({
  selector: 'app-signal-forms-checkbox-next-demo-container',
  imports: [DemoContainer, SignalFormsCheckboxNextDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/checkbox-next/signal-forms-checkbox-next-demo"
      [code]="code"
    >
      <app-signal-forms-checkbox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsCheckboxNextDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Bound with [formField]: the form's values follow. */
@Component({
  selector: 'app-signal-forms-checkbox-next-demo',
  imports: [
    FormField,
    JsonPipe,
    ScCheckboxNext,
    ScCheckboxNextField,
    ScFieldGroup,
    ScLabel,
  ],
  template: \`
    <div class="flex w-64 flex-col gap-4">
      <div scFieldGroup class="gap-3">
        <div scCheckboxNextField>
          <input
            type="checkbox"
            scCheckboxNext
            [formField]="emailForm.newsletter"
          />
          <label scLabel>Subscribe to newsletter</label>
        </div>
        <div scCheckboxNextField>
          <input
            type="checkbox"
            scCheckboxNext
            [formField]="emailForm.marketing"
          />
          <label scLabel>Receive marketing emails</label>
        </div>
      </div>
      <pre class="bg-muted rounded-md p-4 text-xs">{{ model() | json }}</pre>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsCheckboxNextDemo {
  protected readonly model = signal({ newsletter: true, marketing: false });
  protected readonly emailForm = form(this.model);
}`;
}
