import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlOtpInputDemo } from './rtl-otp-input-demo';

@Component({
  selector: 'app-rtl-otp-input-demo-container',
  imports: [DemoContainer, RtlOtpInputDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/otp-input/rtl-otp-input-demo"
      [code]="code"
    >
      <app-rtl-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlOtpInputDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScSeparator,
} from '@semantic-components/ui';

/** In a right-to-left page: filled from the right; the arrows mirrored. */
@Component({
  selector: 'app-rtl-otp-input-demo',
  imports: [
    Dir,
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScSeparator,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scField class="w-fit">
        <label scLabel>رمز التحقق</label>
        <div
          scOtpInput
          slotLabel="الحرف {index} من {length}"
          [formField]="otpForm.code"
        >
          <div scOtpInputGroup>
            <input scOtpInputSlot />
            <input scOtpInputSlot />
            <input scOtpInputSlot />
          </div>
          <div scSeparator></div>
          <div scOtpInputGroup>
            <input scOtpInputSlot />
            <input scOtpInputSlot />
            <input scOtpInputSlot />
          </div>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }));
}`;
}
