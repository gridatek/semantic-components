import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScOtpField,
  ScOtpFieldSeparator,
  ScOtpFieldSlot,
  ScOtpFieldSlotGroup,
} from '@semantic-components/ui';

interface OtpFormModel {
  otp: string;
}

@Component({
  selector: 'app-signal-forms-otp-field-demo',
  imports: [
    ScOtpField,
    ScOtpFieldSlotGroup,
    ScOtpFieldSeparator,
    ScOtpFieldSlot,
    FormField,
  ],
  template: `
    <div class="space-y-4">
      <div
        scOtpField
        [formField]="otpForm.otp"
        [class.border-destructive]="
          otpForm.otp().invalid() && otpForm.otp().touched()
        "
      >
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
        </div>
        <div scOtpFieldSeparator>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
          >
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
        </div>
        <div scOtpFieldSlotGroup>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
          <div scOtpFieldSlot></div>
        </div>
      </div>
      @if (otpForm.otp().invalid() && otpForm.otp().touched()) {
        <p class="text-destructive text-sm font-medium" role="alert">
          Please enter all 6 digits
        </p>
      }

      <div class="bg-muted/50 rounded-lg border p-4">
        <p class="text-sm font-medium">Form State:</p>
        <pre class="text-muted-foreground mt-2 text-xs">{{ formState() }}</pre>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsOtpFieldDemo {
  private readonly formModel = signal<OtpFormModel>({
    otp: '',
  });

  readonly otpForm = form(this.formModel, (path) => {
    required(path.otp);
    minLength(path.otp, 6);
  });

  formState(): string {
    return JSON.stringify(
      {
        value: this.formModel(),
        valid: this.otpForm.otp().valid(),
        invalid: this.otpForm.otp().invalid(),
        touched: this.otpForm.otp().touched(),
      },
      null,
      2,
    );
  }
}
