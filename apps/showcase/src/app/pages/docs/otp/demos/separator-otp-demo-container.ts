import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorOtpDemo } from './separator-otp-demo';

@Component({
  selector: 'app-separator-otp-demo-container',
  imports: [DemoContainer, SeparatorOtpDemo],
  template: `
    <app-demo-container
      title="With Separator"
      demoUrl="/demos/otp/separator-otp-demo"
      [code]="code"
    >
      <app-separator-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScOtp,
  ScOtpSeparator,
  ScOtpSlot,
  ScOtpSlotGroup,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-separator-otp-demo',
  imports: [ScOtp, ScOtpSlotGroup, ScOtpSeparator, ScOtpSlot, SiMinusIcon],
  template: \`
    <div class="space-y-4">
      <div scOtp [(value)]="otp">
        <div scOtpSlotGroup>
          <div scOtpSlot aria-label="Digit 1 of 6"></div>
          <div scOtpSlot aria-label="Digit 2 of 6"></div>
          <div scOtpSlot aria-label="Digit 3 of 6"></div>
        </div>
        <div scOtpSeparator>
          <svg siMinusIcon class="size-4"></svg>
        </div>
        <div scOtpSlotGroup>
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
})
export class SeparatorOtpDemo {
  readonly otp = signal('');
}`;
}
