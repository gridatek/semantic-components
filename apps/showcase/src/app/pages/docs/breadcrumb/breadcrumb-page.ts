import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicBreadcrumbDemoContainer } from './demos/basic-breadcrumb-demo-container';
import { CustomSeparatorBreadcrumbDemoContainer } from './demos/custom-separator-breadcrumb-demo-container';
import { EllipsisBreadcrumbDemoContainer } from './demos/ellipsis-breadcrumb-demo-container';
import { LongerPathBreadcrumbDemoContainer } from './demos/longer-path-breadcrumb-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-breadcrumb-page',
  imports: [
    BasicBreadcrumbDemoContainer,
    EllipsisBreadcrumbDemoContainer,
    CustomSeparatorBreadcrumbDemoContainer,
    LongerPathBreadcrumbDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Breadcrumb</h1>
        <p class="text-muted-foreground">
          Displays the path to the current resource using a hierarchy of links.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-breadcrumb-demo-container />
        <app-ellipsis-breadcrumb-demo-container />
        <app-custom-separator-breadcrumb-demo-container />
        <app-longer-path-breadcrumb-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BreadcrumbPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'breadcrumb')!
    .status;
}
