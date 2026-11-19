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
  ScOtpInputSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

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
    ScOtpInputSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scField class="w-fit">
        <label scLabel>رمز التحقق</label>
        <div scOtpInput [formField]="otpForm.code">
          <div scOtpInputGroup>
            <input scOtpInputSlot />
            <input scOtpInputSlot aria-label="الحرف 2 من 6" />
            <input scOtpInputSlot aria-label="الحرف 3 من 6" />
          </div>
          <div scOtpInputSeparator>
            <svg siMinusIcon></svg>
          </div>
          <div scOtpInputGroup>
            <input scOtpInputSlot aria-label="الحرف 4 من 6" />
            <input scOtpInputSlot aria-label="الحرف 5 من 6" />
            <input scOtpInputSlot aria-label="الحرف 6 من 6" />
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
