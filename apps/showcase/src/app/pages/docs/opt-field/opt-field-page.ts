import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicOptFieldDemoContainer } from './demos/basic-opt-field-demo-container';
import { SeparatorOptFieldDemoContainer } from './demos/separator-opt-field-demo-container';
import { PinOptFieldDemoContainer } from './demos/pin-opt-field-demo-container';
import { DotSeparatorOptFieldDemoContainer } from './demos/dot-separator-opt-field-demo-container';
import { DisabledOptFieldDemoContainer } from './demos/disabled-opt-field-demo-container';
import { VerificationOptFieldDemoContainer } from './demos/verification-opt-field-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-opt-field-page',
  imports: [
    BasicOptFieldDemoContainer,
    SeparatorOptFieldDemoContainer,
    PinOptFieldDemoContainer,
    DotSeparatorOptFieldDemoContainer,
    DisabledOptFieldDemoContainer,
    VerificationOptFieldDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">OptField</h1>
        <p class="text-muted-foreground">
          Accessible one-time password component with copy paste functionality.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-opt-field-demo-container />
        <app-separator-opt-field-demo-container />
        <app-pin-opt-field-demo-container />
        <app-dot-separator-opt-field-demo-container />
        <app-disabled-opt-field-demo-container />
        <app-verification-opt-field-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OptFieldPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'opt-field')!
    .status;
}
