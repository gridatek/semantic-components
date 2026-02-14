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

@Component({
  selector: 'app-link-page',
  imports: [
    VariantsLinkDemoContainer,
    SizesLinkDemoContainer,
    DisabledLinkDemoContainer,
    WithIconsLinkDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Link</h1>
        <p class="text-muted-foreground">
          A styled anchor element with button variants.
        </p>
        <app-component-badges path="link" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
