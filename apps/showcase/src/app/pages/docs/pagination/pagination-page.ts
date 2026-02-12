import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicPaginationDemoContainer } from './demos/basic-pagination-demo-container';
import { EllipsisPaginationDemoContainer } from './demos/ellipsis-pagination-demo-container';
import { ManyPagesPaginationDemoContainer } from './demos/many-pages-pagination-demo-container';
import { ButtonsPaginationDemoContainer } from './demos/buttons-pagination-demo-container';
import { DisabledLinkPaginationDemoContainer } from './demos/disabled-link-pagination-demo-container';
import { FirstPagePaginationDemoContainer } from './demos/first-page-pagination-demo-container';
import { LastPagePaginationDemoContainer } from './demos/last-page-pagination-demo-container';
import { PageSizePaginationDemoContainer } from './demos/page-size-pagination-demo-container';
import { KeyboardNavigationPaginationDemoContainer } from './demos/keyboard-navigation-pagination-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-pagination-page',
  imports: [
    BasicPaginationDemoContainer,
    EllipsisPaginationDemoContainer,
    ManyPagesPaginationDemoContainer,
    ButtonsPaginationDemoContainer,
    DisabledLinkPaginationDemoContainer,
    FirstPagePaginationDemoContainer,
    LastPagePaginationDemoContainer,
    PageSizePaginationDemoContainer,
    KeyboardNavigationPaginationDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Pagination</h1>
        <p class="text-muted-foreground">
          Pagination with page navigation, next and previous links.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>
      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-pagination-demo-container />
        <app-ellipsis-pagination-demo-container />
        <app-many-pages-pagination-demo-container />
        <app-buttons-pagination-demo-container />
        <app-disabled-link-pagination-demo-container />
        <app-first-page-pagination-demo-container />
        <app-last-page-pagination-demo-container />
        <app-page-size-pagination-demo-container />
        <app-keyboard-navigation-pagination-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaginationPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'pagination')!
    .status;
}
