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
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
  ScOtpFieldNextSeparator,
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
  selector: 'app-server-validation-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScFieldErrors,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
    ScOtpFieldNextSeparator,
    SiMinusIcon,
  ],
  template: `
    <div class="w-72 space-y-4">
      <div scField class="w-fit">
        <label scLabel>Verification code</label>
        <div scOtpFieldNext [formField]="otpForm.code">
          <div scOtpFieldNextGroup>
            <input scOtpFieldNextInput />
            <input scOtpFieldNextInput aria-label="Character 2 of 6" />
            <input scOtpFieldNextInput aria-label="Character 3 of 6" />
          </div>
          <div scOtpFieldNextSeparator>
            <svg siMinusIcon></svg>
          </div>
          <div scOtpFieldNextGroup>
            <input scOtpFieldNextInput aria-label="Character 4 of 6" />
            <input scOtpFieldNextInput aria-label="Character 5 of 6" />
            <input scOtpFieldNextInput aria-label="Character 6 of 6" />
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
export class ServerValidationOtpFieldNextDemo {
  private readonly model = signal({ code: '' });

  protected readonly otpForm = form(this.model, (path) => {
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

  protected readonly status = computed(() => {
    const code = this.otpForm.code();
    if (code.pending()) return 'Checking…';
    if (code.valid()) return 'Verified.';
    return '';
  });
}
