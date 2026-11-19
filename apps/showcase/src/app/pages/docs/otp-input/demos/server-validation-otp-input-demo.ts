import {
  Component,
  ViewEncapsulation,
  computed,
  resource,
  signal,
} from '@angular/core';
import {
  FormField,
  form,
  minLength,
  required,
  validateAsync,
} from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/**
 * Stands in for the server: the code is right if it is 123456, after a
 * moment; 000000 makes it unreachable.
 */
async function verifyOnServer(code: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (code === '000000') throw new Error('Unreachable');
  return code === '123456';
}

/** Checked by the server once all six digits are in (validateAsync): pending while it checks. */
@Component({
  selector: 'app-server-validation-otp-input-demo',
  imports: [
    ScField,
    FormField,
    ScFieldErrors,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScSeparator,
  ],
  template: `
    <div class="w-72 space-y-4">
      <div scField class="w-fit">
        <label scLabel>Verification code</label>
        <div
          scOtpInput
          slotLabel="Character {index} of {length}"
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
        <p scFieldErrors></p>
      </div>
      <p class="text-muted-foreground text-sm" role="status">{{ status() }}</p>
      <p class="text-muted-foreground text-xs">
        Try 123456 (right), 000000 (no answer) or any other code.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ServerValidationOtpInputDemo {
  private readonly model = signal({ code: '' });

  private readonly otpForm = form(this.model, (path) => {
    required(path.code, { message: 'Enter the code.' });
    minLength(path.code, 6, { message: 'Enter all 6 digits.' });
    // Runs only once the code is complete (the validators above pass).
    validateAsync(path.code, {
      params: ({ value }) => value(),
      factory: (code) =>
        resource({
          params: code,
          loader: ({ params }) => verifyOnServer(params),
        }),
      onSuccess: (valid) =>
        valid
          ? undefined
          : { kind: 'wrongCode', message: 'That code is wrong.' },
      onError: () => ({
        kind: 'unreachable',
        message: "The code couldn't be checked. Try again.",
      }),
    });
  });

  private readonly status = computed(() => {
    const code = this.otpForm.code();
    if (code.pending()) return 'Checking…';
    if (code.valid()) return 'Verified.';
    return '';
  });
}
