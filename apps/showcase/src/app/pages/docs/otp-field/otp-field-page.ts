import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicOtpFieldDemoContainer } from './demos/basic-otp-field-demo-container';
import { DisabledOtpFieldDemoContainer } from './demos/disabled-otp-field-demo-container';
import { DotSeparatorOtpFieldDemoContainer } from './demos/dot-separator-otp-field-demo-container';
import { PinOtpFieldDemoContainer } from './demos/pin-otp-field-demo-container';
import { SeparatorOtpFieldDemoContainer } from './demos/separator-otp-field-demo-container';
import { SignalFormsOtpFieldDemoContainer } from './demos/signal-forms-otp-field-demo-container';
import { VerificationOtpFieldDemoContainer } from './demos/verification-otp-field-demo-container';

@Component({
  selector: 'app-otp-field-page',
  imports: [
    BasicOtpFieldDemoContainer,
    SeparatorOtpFieldDemoContainer,
    PinOtpFieldDemoContainer,
    DotSeparatorOtpFieldDemoContainer,
    DisabledOtpFieldDemoContainer,
    VerificationOtpFieldDemoContainer,
    SignalFormsOtpFieldDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>OTP Field</h1>
        <p class="text-muted-foreground">
          Accessible one-time password component with copy paste functionality.
        </p>
        <app-component-badges path="otp-field" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-otp-field-demo-container />
        <app-separator-otp-field-demo-container />
        <app-pin-otp-field-demo-container />
        <app-dot-separator-otp-field-demo-container />
        <app-disabled-otp-field-demo-container />
        <app-verification-otp-field-demo-container />
        <app-signal-forms-otp-field-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OtpFieldPage {}
