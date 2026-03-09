import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSwitchDemoContainer } from './demos/basic-switch-demo-container';
import { DescriptionSwitchDemoContainer } from './demos/description-switch-demo-container';
import { DisabledSwitchDemoContainer } from './demos/disabled-switch-demo-container';
import { InputFirstSwitchDemoContainer } from './demos/input-first-switch-demo-container';
import { InputLastSwitchDemoContainer } from './demos/input-last-switch-demo-container';
import { SignalFormsSwitchDemoContainer } from './demos/signal-forms-switch-demo-container';
import { StateSwitchDemoContainer } from './demos/state-switch-demo-container';

@Component({
  selector: 'app-switch-page',
  imports: [
    BasicSwitchDemoContainer,
    StateSwitchDemoContainer,
    DisabledSwitchDemoContainer,
    InputFirstSwitchDemoContainer,
    InputLastSwitchDemoContainer,
    DescriptionSwitchDemoContainer,
    SignalFormsSwitchDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Switch</h1>
        <p class="text-muted-foreground">
          A control that allows the user to toggle between checked and not
          checked.
        </p>
        <app-component-badges path="switch" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-switch-demo-container />
        <app-state-switch-demo-container />
        <app-disabled-switch-demo-container />
        <app-input-first-switch-demo-container />
        <app-input-last-switch-demo-container />
        <app-description-switch-demo-container />
        <app-signal-forms-switch-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SwitchPage {}
