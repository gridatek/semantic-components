import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BothScrollAreaDemoContainer } from './demos/both-scroll-area-demo-container';
import { HorizontalScrollAreaDemoContainer } from './demos/horizontal-scroll-area-demo-container';
import { VerticalScrollAreaDemoContainer } from './demos/vertical-scroll-area-demo-container';

@Component({
  selector: 'app-scroll-area-page',
  imports: [
    VerticalScrollAreaDemoContainer,
    HorizontalScrollAreaDemoContainer,
    BothScrollAreaDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Scroll Area</h1>
        <p class="text-muted-foreground">
          A scrollable area with thin, styled scrollbars that appear on hover.
        </p>
        <app-component-badges path="scroll-area" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-vertical-scroll-area-demo-container />
        <app-horizontal-scroll-area-demo-container />
        <app-both-scroll-area-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ScrollAreaPage {}
