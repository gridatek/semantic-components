import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsCheckboxDemo } from './signal-forms-checkbox-demo';

@Component({
  selector: 'app-signal-forms-checkbox-demo-container',
  imports: [DemoContainer, SignalFormsCheckboxDemo],
  template: `
    <app-demo-container
      title="Signal Forms Integration"
      demoUrl="/demos/checkbox/signal-forms-checkbox-demo"
      [code]="code"
    >
      <app-signal-forms-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsCheckboxDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

interface CheckboxFormModel {
  newsletter: boolean;
  marketing: boolean;
  acceptTerms: boolean;
}
@Component({
  selector: 'app-signal-forms-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel, JsonPipe, FormField],
  template: \`
    <form>
      <div class="space-y-4">
        <div scCheckboxField>
          <input
            type="checkbox"
            scCheckbox
            [formField]="checkboxForm.newsletter"
          />
          <label scLabel>Subscribe to newsletter</label>
        </div>
        <div scCheckboxField>
          <input
            type="checkbox"
            scCheckbox
            [formField]="checkboxForm.marketing"
          />
          <label scLabel>Receive marketing emails</label>
        </div>
        <div scCheckboxField>
          <input
            type="checkbox"
            scCheckbox
            [formField]="checkboxForm.acceptTerms"
          />
          <label scLabel>Accept terms and conditions</label>
        </div>
      </div>
      <div class="bg-muted mt-4 rounded-md p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </form>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsCheckboxDemo {
  readonly formModel = signal<CheckboxFormModel>({
    newsletter: false,
    marketing: false,
    acceptTerms: false,
  });
  readonly checkboxForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.newsletter);
    required(schemaPath.acceptTerms);
  });
}`;
}
