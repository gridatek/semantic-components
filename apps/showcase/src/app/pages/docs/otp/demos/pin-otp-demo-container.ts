import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PinOtpDemo } from './pin-otp-demo';

@Component({
  selector: 'app-pin-otp-demo-container',
  imports: [DemoContainer, PinOtpDemo],
  template: `
    <app-demo-container
      title="PIN (4 digits)"
      demoUrl="/demos/otp/pin-otp-demo"
      [code]="code"
    >
      <app-pin-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinOtpDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScOtp, ScOtpSlot, ScOtpSlotGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-pin-otp-demo',
  imports: [ScOtp, ScOtpSlotGroup, ScOtpSlot],
  template: \`
    <div class="space-y-4">
      <div scOtp [(value)]="otp">
        <div scOtpSlotGroup>
          <div scOtpSlot aria-label="Digit 1 of 4"></div>
          <div scOtpSlot aria-label="Digit 2 of 4"></div>
          <div scOtpSlot aria-label="Digit 3 of 4"></div>
          <div scOtpSlot aria-label="Digit 4 of 4"></div>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Value: {{ otp() || 'empty' }}</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinOtpDemo {
  readonly otp = signal('');
}`;
}
