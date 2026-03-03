import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsOptFieldDemo } from './signal-forms-opt-field-demo';

@Component({
  selector: 'app-signal-forms-opt-field-demo-container',
  imports: [DemoContainer, SignalFormsOptFieldDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/opt-field/signal-forms-opt-field-demo"
      [code]="code"
    >
      <app-signal-forms-opt-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsOptFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScOptField,
  ScOptFieldSeparator,
  ScOptFieldSlot,
  ScOptFieldSlotGroup,
} from '@semantic-components/ui-lab';

interface OtpFormModel {
  otp: string;
}

@Component({
  selector: 'app-signal-forms-opt-field-demo',
  imports: [
    ScOptField,
    ScOptFieldSlotGroup,
    ScOptFieldSeparator,
    ScOptFieldSlot,
    FormField,
  ],
  template: \`
    <div class="space-y-4">
      <div
        scOptField
        [formField]="otpForm.otp"
        [class.border-destructive]="
          otpForm.otp().invalid() && otpForm.otp().touched()
        "
      >
        <div scOptFieldSlotGroup>
          <div scOptFieldSlot></div>
          <div scOptFieldSlot></div>
          <div scOptFieldSlot></div>
        </div>
        <div scOptFieldSeparator>
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
        <div scOptFieldSlotGroup>
          <div scOptFieldSlot></div>
          <div scOptFieldSlot></div>
          <div scOptFieldSlot></div>
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsOptFieldDemo {
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
}`;
}
