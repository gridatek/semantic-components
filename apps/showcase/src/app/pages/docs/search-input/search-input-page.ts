import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSearchInputDemoContainer } from './demos/basic-search-input-demo-container';
import { LoadingSearchInputDemoContainer } from './demos/loading-search-input-demo-container';
import { CategoriesSearchInputDemoContainer } from './demos/categories-search-input-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-search-input-page',
  imports: [
    BasicSearchInputDemoContainer,
    LoadingSearchInputDemoContainer,
    CategoriesSearchInputDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">SearchInput</h1>
        <p class="text-muted-foreground">A search input component.</p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-search-input-demo-container />
        <app-loading-search-input-demo-container />
        <app-categories-search-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchInputPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'search-input')!
    .status;
}
