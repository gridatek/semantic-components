import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicVirtualListDemoContainer } from './demos/basic-virtual-list-demo-container';
import { ComplexVirtualListDemoContainer } from './demos/complex-virtual-list-demo-container';
import { CustomHeightVirtualListDemoContainer } from './demos/custom-height-virtual-list-demo-container';
import { ScrollControlsVirtualListDemoContainer } from './demos/scroll-controls-virtual-list-demo-container';

@Component({
  selector: 'app-virtual-list-page',
  imports: [
    BasicVirtualListDemoContainer,
    ComplexVirtualListDemoContainer,
    ScrollControlsVirtualListDemoContainer,
    CustomHeightVirtualListDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Virtual List</h1>
        <p class="text-muted-foreground">
          Efficiently render large lists by only rendering visible items.
        </p>
        <app-component-badges path="virtual-list" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-virtual-list-demo-container />
        <app-complex-virtual-list-demo-container />
        <app-scroll-controls-virtual-list-demo-container />
        <app-custom-height-virtual-list-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VirtualListPage {}
