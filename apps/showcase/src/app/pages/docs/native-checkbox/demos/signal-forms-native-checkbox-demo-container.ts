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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsNativeCheckboxDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import { ScNativeCheckbox } from '@semantic-components/ui-lab';

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
        <label class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [formField]="checkboxForm.newsletter"
          />
          <span class="text-sm leading-none font-medium">Subscribe to newsletter</span>
        </label>

        <label class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [formField]="checkboxForm.marketing"
          />
          <span class="text-sm leading-none font-medium">Receive marketing emails</span>
        </label>

        <label class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [formField]="checkboxForm.acceptTerms"
          />
          <span class="text-sm leading-none font-medium">Accept terms and conditions</span>
        </label>
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
