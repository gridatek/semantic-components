import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsNativeCheckboxDemo } from './signal-forms-native-checkbox-demo';

@Component({
  selector: 'app-signal-forms-native-checkbox-demo-container',
  imports: [DemoContainer, SignalFormsNativeCheckboxDemo],
  template: `
    <app-demo-container
      title="Signal Forms Integration"
      demoUrl="/demos/native-checkbox/signal-forms-native-checkbox-demo"
      [code]="code"
    >
      <app-signal-forms-native-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsNativeCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import { ScNativeCheckbox } from '@semantic-components/ui-lab';
import { JsonPipe } from '@angular/common';

interface CheckboxFormModel {
  newsletter: boolean;
  marketing: boolean;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-signal-forms-native-checkbox-demo',
  imports: [ScNativeCheckbox, JsonPipe, FormField],
  template: \`
    <form>
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            id="newsletter"
            type="checkbox"
            [formField]="checkboxForm.newsletter"
          />
          <label
            for="newsletter"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Subscribe to newsletter
          </label>
        </div>

        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            id="marketing"
            type="checkbox"
            [formField]="checkboxForm.marketing"
          />
          <label
            for="marketing"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Receive marketing emails
          </label>
        </div>

        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            id="terms-signal"
            type="checkbox"
            [formField]="checkboxForm.acceptTerms"
          />
          <label
            for="terms-signal"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>

      <div class="mt-4 p-4 bg-muted rounded-md">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="text-xs mt-2">{{ formModel() | json }}</pre>
      </div>
    </form>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsNativeCheckboxDemo {
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
