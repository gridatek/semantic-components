import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { VariantsLinkDemoContainer } from './demos/variants-link-demo-container';
import { SizesLinkDemoContainer } from './demos/sizes-link-demo-container';
import { DisabledLinkDemoContainer } from './demos/disabled-link-demo-container';
import { WithIconsLinkDemoContainer } from './demos/with-icons-link-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-link-page',
  imports: [
    VariantsLinkDemoContainer,
    SizesLinkDemoContainer,
    DisabledLinkDemoContainer,
    WithIconsLinkDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Link</h1>
        <p class="text-muted-foreground">
          A styled anchor element with button variants.
        </p>
        <app-component-badges path="link" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-variants-link-demo-container />
        <app-sizes-link-demo-container />
        <app-with-icons-link-demo-container />
        <app-disabled-link-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LinkPage {}
