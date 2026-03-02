import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicStatCardDemoContainer } from './demos/basic-stat-card-demo-container';
import { DescriptionStatCardDemoContainer } from './demos/description-stat-card-demo-container';
import { SizesStatCardDemoContainer } from './demos/sizes-stat-card-demo-container';
import { VariantsStatCardDemoContainer } from './demos/variants-stat-card-demo-container';

@Component({
  selector: 'app-stat-card-page',
  imports: [
    BasicStatCardDemoContainer,
    SizesStatCardDemoContainer,
    VariantsStatCardDemoContainer,
    DescriptionStatCardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>StatCard</h1>
        <p class="text-muted-foreground">A stat card component.</p>
        <app-component-badges path="stat-card" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-stat-card-demo-container />
        <app-sizes-stat-card-demo-container />
        <app-variants-stat-card-demo-container />
        <app-description-stat-card-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StatCardPage {}
