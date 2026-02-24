import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicMasonryGridDemoContainer } from './demos/basic-masonry-grid-demo-container';
import { ImageGalleryMasonryGridDemoContainer } from './demos/image-gallery-masonry-grid-demo-container';
import { BreakpointsMasonryGridDemoContainer } from './demos/breakpoints-masonry-grid-demo-container';
import { CardsMasonryGridDemoContainer } from './demos/cards-masonry-grid-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-masonry-grid-page',
  imports: [
    BasicMasonryGridDemoContainer,
    ImageGalleryMasonryGridDemoContainer,
    BreakpointsMasonryGridDemoContainer,
    CardsMasonryGridDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>MasonryGrid</h1>
        <p class="text-muted-foreground">
          A Pinterest-style layout that arranges items in columns with varying
          heights.
        </p>
        <app-component-badges path="masonry-grid" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-masonry-grid-demo-container />
        <app-image-gallery-masonry-grid-demo-container />
        <app-breakpoints-masonry-grid-demo-container />
        <app-cards-masonry-grid-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MasonryGridPage {}
