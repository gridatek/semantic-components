import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSeparatorDemoContainer } from './demos/basic-separator-demo-container';
import { CardSeparatorDemoContainer } from './demos/card-separator-demo-container';
import { VerticalSeparatorDemoContainer } from './demos/vertical-separator-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-separator-page',
  imports: [
    BasicSeparatorDemoContainer,
    VerticalSeparatorDemoContainer,
    CardSeparatorDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Separator</h1>
        <p class="text-muted-foreground">
          Visually or semantically separates content.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-separator-demo-container />
        <app-vertical-separator-demo-container />
        <app-card-separator-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SeparatorPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'separator')!
    .status;
}
