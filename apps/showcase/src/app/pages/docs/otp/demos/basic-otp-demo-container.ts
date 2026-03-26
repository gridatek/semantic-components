import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicOtpDemo } from './basic-otp-demo';

@Component({
  selector: 'app-basic-otp-demo-container',
  imports: [DemoContainer, BasicOtpDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/otp/basic-otp-demo"
      [code]="code"
    >
      <app-basic-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOtpDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScOtp, ScOtpSlot, ScOtpSlotGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-otp-demo',
  imports: [ScOtp, ScOtpSlotGroup, ScOtpSlot],
  template: \`
    <div class="space-y-4">
      <div scOtp [(value)]="otp">
        <div scOtpSlotGroup>
          <div scOtpSlot aria-label="Digit 1 of 6"></div>
          <div scOtpSlot aria-label="Digit 2 of 6"></div>
          <div scOtpSlot aria-label="Digit 3 of 6"></div>
          <div scOtpSlot aria-label="Digit 4 of 6"></div>
          <div scOtpSlot aria-label="Digit 5 of 6"></div>
          <div scOtpSlot aria-label="Digit 6 of 6"></div>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Value: {{ otp() || 'empty' }}</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOtpDemo {
  readonly otp = signal('');
}`;
}
