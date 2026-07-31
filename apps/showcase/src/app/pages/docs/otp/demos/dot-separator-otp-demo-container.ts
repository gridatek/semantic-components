import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DotSeparatorOtpDemo } from './dot-separator-otp-demo';

@Component({
  selector: 'app-dot-separator-otp-demo-container',
  imports: [DemoContainer, DotSeparatorOtpDemo],
  template: `
    <app-demo-container
      title="With Dot Separator"
      demoUrl="/demos/otp/dot-separator-otp-demo"
      [code]="code"
    >
      <app-dot-separator-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DotSeparatorOtpDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScOtp,
  ScOtpSeparator,
  ScOtpSlot,
  ScOtpSlotGroup,
} from '@semantic-components/ui';
import { SiDotIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dot-separator-otp-demo',
  imports: [ScOtp, ScOtpSlotGroup, ScOtpSeparator, ScOtpSlot, SiDotIcon],
  template: \`
    <div class="space-y-4">
      <div scOtp [(value)]="otp">
        <div scOtpSlotGroup>
          <div scOtpSlot aria-label="Digit 1 of 6"></div>
          <div scOtpSlot aria-label="Digit 2 of 6"></div>
        </div>
        <div scOtpSeparator>
          <svg siDotIcon class="size-4"></svg>
        </div>
        <div scOtpSlotGroup>
          <div scOtpSlot aria-label="Digit 3 of 6"></div>
          <div scOtpSlot aria-label="Digit 4 of 6"></div>
        </div>
        <div scOtpSeparator>
          <svg siDotIcon class="size-4"></svg>
        </div>
        <div scOtpSlotGroup>
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
export class DotSeparatorOtpDemo {
  readonly otp = signal('');
}`;
}
