import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicOtpDemoContainer } from './demos/basic-otp-demo-container';
import { DisabledOtpDemoContainer } from './demos/disabled-otp-demo-container';
import { DotSeparatorOtpDemoContainer } from './demos/dot-separator-otp-demo-container';
import { PinOtpDemoContainer } from './demos/pin-otp-demo-container';
import { SeparatorOtpDemoContainer } from './demos/separator-otp-demo-container';
import { SignalFormsOtpDemoContainer } from './demos/signal-forms-otp-demo-container';
import { VerificationOtpDemoContainer } from './demos/verification-otp-demo-container';

@Component({
  selector: 'app-otp-page',
  imports: [
    BasicOtpDemoContainer,
    SeparatorOtpDemoContainer,
    PinOtpDemoContainer,
    DotSeparatorOtpDemoContainer,
    DisabledOtpDemoContainer,
    VerificationOtpDemoContainer,
    SignalFormsOtpDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>OTP</h1>
        <p class="text-muted-foreground">
          Accessible one-time password component with copy paste functionality.
        </p>
        <app-component-badges path="otp" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-otp-demo-container />
        <app-separator-otp-demo-container />
        <app-pin-otp-demo-container />
        <app-dot-separator-otp-demo-container />
        <app-disabled-otp-demo-container />
        <app-verification-otp-demo-container />
        <app-signal-forms-otp-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OtpPage {}
