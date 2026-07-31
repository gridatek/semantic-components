import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DemoQueryParamStateDemoContainer } from './demos/demo-query-param-state-demo-container';

@Component({
  selector: 'app-query-param-state-page',
  imports: [
    DemoQueryParamStateDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Query Param State</h1>
        <p class="text-muted-foreground">
          Type-safe, signal-based URL query parameter state management inspired
          by nuqs.
        </p>
        <app-component-badges path="query-param-state" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-demo-query-param-state-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class QueryParamStatePage {}
