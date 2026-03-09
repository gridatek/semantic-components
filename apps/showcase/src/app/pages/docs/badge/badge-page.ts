import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { VariantsBadgeDemoContainer } from './demos/variants-badge-demo-container';
import { WithIconsBadgeDemoContainer } from './demos/with-icons-badge-demo-container';

@Component({
  selector: 'app-badge-page',
  imports: [
    VariantsBadgeDemoContainer,
    WithIconsBadgeDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Badge</h1>
        <p class="text-muted-foreground">
          Displays a badge or a component that looks like a badge.
        </p>
        <app-component-badges path="badge" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-variants-badge-demo-container />
        <app-with-icons-badge-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BadgePage {}
