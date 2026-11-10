import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlOtpFieldNextDemo } from './rtl-otp-field-next-demo';

@Component({
  selector: 'app-rtl-otp-field-next-demo-container',
  imports: [DemoContainer, RtlOtpFieldNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/otp-field-next/rtl-otp-field-next-demo"
      [code]="code"
    >
      <app-rtl-otp-field-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlOtpFieldNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
  ScOtpFieldNextSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: filled from the right; the arrows mirrored. */
@Component({
  selector: 'app-rtl-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
    ScOtpFieldNextSeparator,
    SiMinusIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scField class="w-fit">
        <label scLabel>رمز التحقق</label>
        <div scOtpFieldNext [formField]="otpForm.code">
          <div scOtpFieldNextGroup>
            <input scOtpFieldNextInput />
            <input scOtpFieldNextInput aria-label="الحرف 2 من 6" />
            <input scOtpFieldNextInput aria-label="الحرف 3 من 6" />
          </div>
          <div scOtpFieldNextSeparator>
            <svg siMinusIcon></svg>
          </div>
          <div scOtpFieldNextGroup>
            <input scOtpFieldNextInput aria-label="الحرف 4 من 6" />
            <input scOtpFieldNextInput aria-label="الحرف 5 من 6" />
            <input scOtpFieldNextInput aria-label="الحرف 6 من 6" />
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}`;
}
