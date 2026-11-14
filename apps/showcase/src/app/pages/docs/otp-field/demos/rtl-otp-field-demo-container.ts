import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlOtpFieldDemo } from './rtl-otp-field-demo';

@Component({
  selector: 'app-rtl-otp-field-demo-container',
  imports: [DemoContainer, RtlOtpFieldDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/otp-field/rtl-otp-field-demo"
      [code]="code"
    >
      <app-rtl-otp-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlOtpFieldDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: filled from the right; the arrows mirrored. */
@Component({
  selector: 'app-rtl-otp-field-demo',
  imports: [
    Dir,
    ScField,
    FormField,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
    ScOtpFieldSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scField class="w-fit">
        <label scLabel>رمز التحقق</label>
        <div scOtpField [formField]="otpForm.code">
          <div scOtpFieldGroup>
            <input scOtpFieldInput />
            <input scOtpFieldInput aria-label="الحرف 2 من 6" />
            <input scOtpFieldInput aria-label="الحرف 3 من 6" />
          </div>
          <div scOtpFieldSeparator>
            <svg siMinusIcon></svg>
          </div>
          <div scOtpFieldGroup>
            <input scOtpFieldInput aria-label="الحرف 4 من 6" />
            <input scOtpFieldInput aria-label="الحرف 5 من 6" />
            <input scOtpFieldInput aria-label="الحرف 6 من 6" />
          </div>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlOtpFieldDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}`;
}
