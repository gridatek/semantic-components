import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicVirtualListDemoContainer } from './demos/basic-virtual-list-demo-container';
import { ComplexVirtualListDemoContainer } from './demos/complex-virtual-list-demo-container';
import { ScrollControlsVirtualListDemoContainer } from './demos/scroll-controls-virtual-list-demo-container';
import { CustomHeightVirtualListDemoContainer } from './demos/custom-height-virtual-list-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-virtual-list-page',
  imports: [
    BasicVirtualListDemoContainer,
    ComplexVirtualListDemoContainer,
    ScrollControlsVirtualListDemoContainer,
    CustomHeightVirtualListDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Virtual List</h1>
        <p class="text-muted-foreground">
          Efficiently render large lists by only rendering visible items.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
export default class VirtualListPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'virtual-list')!
    .status;
}
