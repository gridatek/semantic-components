import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledOtpFieldNextDemo } from './controlled-otp-field-next-demo';

@Component({
  selector: 'app-controlled-otp-field-next-demo-container',
  imports: [DemoContainer, ControlledOtpFieldNextDemo],
  template: `
    <app-demo-container
      title="Controlled"
      demoUrl="/demos/otp-field-next/controlled-otp-field-next-demo"
      [code]="code"
    >
      <app-controlled-otp-field-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledOtpFieldNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
} from '@semantic-components/ui';

/** Two-way, [(value)], without a form: the code shown as it is typed. */
@Component({
  selector: 'app-controlled-otp-field-next-demo',
  imports: [
    ScField,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
  ],
  template: \`
    <div class="space-y-2">
      <div scField>
        <label scLabel>One-time password</label>
        <div scOtpFieldNext [(value)]="code">
          <div scOtpFieldNextGroup>
            <input scOtpFieldNextInput />
            <input scOtpFieldNextInput aria-label="Character 2 of 6" />
            <input scOtpFieldNextInput aria-label="Character 3 of 6" />
            <input scOtpFieldNextInput aria-label="Character 4 of 6" />
            <input scOtpFieldNextInput aria-label="Character 5 of 6" />
            <input scOtpFieldNextInput aria-label="Character 6 of 6" />
          </div>
        </div>
      </div>
      <p class="text-center text-sm">
        @if (code() === '') {
          Enter your one-time password.
        } @else {
          You entered: {{ code() }}
        }
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledOtpFieldNextDemo {
  protected readonly code = signal('');
}`;
}
