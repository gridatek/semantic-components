import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FeaturedDataTableDemoContainer } from './demos/featured-data-table-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-data-table-page',
  imports: [FeaturedDataTableDemoContainer, TocHeading, ComponentStatusBadge],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">DataTable</h1>
        <p class="text-muted-foreground">
          Advanced table component with sorting, filtering, column visibility,
          row selection, and pagination.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-featured-data-table-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DataTablePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'data-table')!
    .status;
}
