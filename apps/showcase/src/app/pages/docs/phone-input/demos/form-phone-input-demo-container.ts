import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormPhoneInputDemo } from './form-phone-input-demo';

@Component({
  selector: 'app-form-phone-input-demo-container',
  imports: [DemoContainer, FormPhoneInputDemo],
  template: `
    <app-demo-container title="Contact Form" [code]="code">
      <app-form-phone-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScField, ScInput, ScLabel } from '@semantic-components/ui';
import { ScPhoneInput } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-phone-input-demo',
  imports: [ScPhoneInput, ScField, ScLabel, ScInput, ScButton],
  template: \`
    <div class="max-w-md space-y-4 rounded-lg border p-4">
      <div scField>
        <label scLabel>Name</label>
        <input scInput type="text" placeholder="John Doe" />
      </div>
      <div scField>
        <label scLabel>Phone Number</label>
        <sc-phone-input defaultCountry="US" />
      </div>
      <div scField>
        <label scLabel>Email</label>
        <input scInput type="email" placeholder="john@example.com" />
      </div>
      <button scButton>Submit</button>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneInputDemo {}`;
}
