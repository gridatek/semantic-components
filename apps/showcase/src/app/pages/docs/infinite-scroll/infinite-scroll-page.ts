import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicInfiniteScrollDemoContainer } from './demos/basic-infinite-scroll-demo-container';
import { CustomLoaderInfiniteScrollDemoContainer } from './demos/custom-loader-infinite-scroll-demo-container';
import { EndMessageInfiniteScrollDemoContainer } from './demos/end-message-infinite-scroll-demo-container';
import { ThresholdInfiniteScrollDemoContainer } from './demos/threshold-infinite-scroll-demo-container';
import { GridInfiniteScrollDemoContainer } from './demos/grid-infinite-scroll-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-infinite-scroll-page',
  imports: [
    BasicInfiniteScrollDemoContainer,
    CustomLoaderInfiniteScrollDemoContainer,
    EndMessageInfiniteScrollDemoContainer,
    ThresholdInfiniteScrollDemoContainer,
    GridInfiniteScrollDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>InfiniteScroll</h1>
        <p class="text-muted-foreground">
          Automatically load more content as the user scrolls to the bottom.
        </p>
        <app-component-badges path="infinite-scroll" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-infinite-scroll-demo-container />
        <app-custom-loader-infinite-scroll-demo-container />
        <app-end-message-infinite-scroll-demo-container />
        <app-threshold-infinite-scroll-demo-container />
        <app-grid-infinite-scroll-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InfiniteScrollPage {}
