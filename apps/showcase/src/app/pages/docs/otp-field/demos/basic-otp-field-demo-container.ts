import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicOtpFieldDemo } from './basic-otp-field-demo';

@Component({
  selector: 'app-basic-otp-field-demo-container',
  imports: [DemoContainer, BasicOtpFieldDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/otp-field/basic-otp-field-demo"
      [code]="code"
    >
      <app-basic-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicOtpFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-otp-field-demo',
  imports: [ScOtpField, ScOtpFieldGroup, ScOtpFieldInput],
  template: \`
    <div class="space-y-4">
      <div scOtpField [(value)]="otp">
        <div scOtpFieldGroup>
          <input scOtpFieldInput aria-label="Digit 1 of 6" />
          <input scOtpFieldInput aria-label="Digit 2 of 6" />
          <input scOtpFieldInput aria-label="Digit 3 of 6" />
          <input scOtpFieldInput aria-label="Digit 4 of 6" />
          <input scOtpFieldInput aria-label="Digit 5 of 6" />
          <input scOtpFieldInput aria-label="Digit 6 of 6" />
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Value: {{ otp() || 'empty' }}</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicOtpFieldDemo {
  readonly otp = signal('');
}`;
}
