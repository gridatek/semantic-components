import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledOtpInputDemo } from './controlled-otp-input-demo';

@Component({
  selector: 'app-controlled-otp-input-demo-container',
  imports: [DemoContainer, ControlledOtpInputDemo],
  template: `
    <app-demo-container
      title="Controlled"
      demoUrl="/demos/otp-input/controlled-otp-input-demo"
      [code]="code"
    >
      <app-controlled-otp-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledOtpInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
} from '@semantic-components/ui';

/** Two-way, [(value)], without a form: the code shown as it is typed. */
@Component({
  selector: 'app-controlled-otp-input-demo',
  imports: [ScField, ScLabel, ScOtpInput, ScOtpInputGroup, ScOtpInputSlot],
  template: \`
    <div class="space-y-2">
      <div scField class="w-fit">
        <label scLabel>One-time password</label>
        <div
          scOtpInput
          slotLabel="Character {index} of {length}"
          [(value)]="code"
        >
          <div scOtpInputGroup>
            <input scOtpInputSlot />
            <input scOtpInputSlot />
            <input scOtpInputSlot />
            <input scOtpInputSlot />
            <input scOtpInputSlot />
            <input scOtpInputSlot />
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
export class ControlledOtpInputDemo {
  private readonly code = signal('');
}`;
}
