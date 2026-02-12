import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { VariantsBadgeDemoContainer } from './demos/variants-badge-demo-container';
import { WithIconsBadgeDemoContainer } from './demos/with-icons-badge-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-badge-page',
  imports: [
    VariantsBadgeDemoContainer,
    WithIconsBadgeDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Badge</h1>
        <p class="text-muted-foreground">
          Displays a badge or a component that looks like a badge.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-variants-badge-demo-container />
        <app-with-icons-badge-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BadgePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'badge')!.status;
}
