import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DotSeparatorOtpFieldDemo } from './dot-separator-otp-field-demo';

@Component({
  selector: 'app-dot-separator-otp-field-demo-container',
  imports: [DemoContainer, DotSeparatorOtpFieldDemo],
  template: `
    <app-demo-container
      title="With Dot Separator"
      demoUrl="/demos/otp-field/dot-separator-otp-field-demo"
      [code]="code"
    >
      <app-dot-separator-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DotSeparatorOtpFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength } from '@angular/forms/signals';
import {
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
} from '@semantic-components/ui';
import { SiDotIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dot-separator-otp-field-demo',
  imports: [
    FormField,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldSeparator,
    ScOtpFieldInput,
    SiDotIcon,
  ],
  template: \`
    <div class="space-y-4">
      <div scOtpField [formField]="otpForm.code">
        <div scOtpFieldGroup>
          <input scOtpFieldInput aria-label="Digit 1 of 6" />
          <input scOtpFieldInput aria-label="Digit 2 of 6" />
          <div scOtpFieldSeparator>
            <svg siDotIcon></svg>
          </div>
          <input scOtpFieldInput aria-label="Digit 3 of 6" />
          <input scOtpFieldInput aria-label="Digit 4 of 6" />
          <div scOtpFieldSeparator>
            <svg siDotIcon></svg>
          </div>
          <input scOtpFieldInput aria-label="Digit 5 of 6" />
          <input scOtpFieldInput aria-label="Digit 6 of 6" />
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Value: {{ otpForm.code().value() || 'empty' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DotSeparatorOtpFieldDemo {
  readonly otpForm = form(signal({ code: '' }), (path) => {
    minLength(path.code, 6);
  });
}`;
}
