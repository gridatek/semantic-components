import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicCountdownDemoContainer } from './demos/basic-countdown-demo-container';
import { CompactCountdownDemoContainer } from './demos/compact-countdown-demo-container';
import { CardsCountdownDemoContainer } from './demos/cards-countdown-demo-container';
import { SeparatorCountdownDemoContainer } from './demos/separator-countdown-demo-container';
import { LabelsCountdownDemoContainer } from './demos/labels-countdown-demo-container';
import { NodaysCountdownDemoContainer } from './demos/nodays-countdown-demo-container';
import { SimpleCountdownDemoContainer } from './demos/simple-countdown-demo-container';
import { EventCountdownDemoContainer } from './demos/event-countdown-demo-container';
import { SaleCountdownDemoContainer } from './demos/sale-countdown-demo-container';
import { CompletedCountdownDemoContainer } from './demos/completed-countdown-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-countdown-page',
  imports: [
    BasicCountdownDemoContainer,
    CompactCountdownDemoContainer,
    CardsCountdownDemoContainer,
    SeparatorCountdownDemoContainer,
    LabelsCountdownDemoContainer,
    NodaysCountdownDemoContainer,
    SimpleCountdownDemoContainer,
    EventCountdownDemoContainer,
    SaleCountdownDemoContainer,
    CompletedCountdownDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Countdown</h1>
        <p class="text-muted-foreground">
          Countdown timer with multiple variants, customizable labels, and
          completion events.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-countdown-demo-container />
        <app-compact-countdown-demo-container />
        <app-cards-countdown-demo-container />
        <app-separator-countdown-demo-container />
        <app-labels-countdown-demo-container />
        <app-nodays-countdown-demo-container />
        <app-simple-countdown-demo-container />
        <app-event-countdown-demo-container />
        <app-sale-countdown-demo-container />
        <app-completed-countdown-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CountdownPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'countdown')!
    .status;
}
