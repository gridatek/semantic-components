import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DefaultSpinnerDemoContainer } from './demos/default-spinner-demo-container';
import { ColorsSpinnerDemoContainer } from './demos/colors-spinner-demo-container';
import { ButtonSpinnerDemoContainer } from './demos/button-spinner-demo-container';
import { OverlaySpinnerDemoContainer } from './demos/overlay-spinner-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-spinner-page',
  imports: [
    DefaultSpinnerDemoContainer,
    ColorsSpinnerDemoContainer,
    ButtonSpinnerDemoContainer,
    OverlaySpinnerDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Spinner</h1>
        <p class="text-muted-foreground">
          Loading indicators with multiple animation styles and sizes.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-default-spinner-demo-container />
        <app-colors-spinner-demo-container />
        <app-button-spinner-demo-container />
        <app-overlay-spinner-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SpinnerPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'spinner')!
    .status;
}
