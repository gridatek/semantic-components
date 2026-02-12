import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicDrawerDemoContainer } from './demos/basic-drawer-demo-container';
import { TopDrawerDemoContainer } from './demos/top-drawer-demo-container';
import { LeftDrawerDemoContainer } from './demos/left-drawer-demo-container';
import { RightDrawerDemoContainer } from './demos/right-drawer-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-drawer-page',
  imports: [
    BasicDrawerDemoContainer,
    TopDrawerDemoContainer,
    LeftDrawerDemoContainer,
    RightDrawerDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Drawer</h1>
        <p class="text-muted-foreground">
          A mobile-friendly slide-in panel that can be opened from any edge of
          the screen. Ideal for navigation menus, forms, and quick actions on
          touch devices.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-drawer-demo-container />
        <app-top-drawer-demo-container />
        <app-left-drawer-demo-container />
        <app-right-drawer-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DrawerPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'drawer')!
    .status;
}
