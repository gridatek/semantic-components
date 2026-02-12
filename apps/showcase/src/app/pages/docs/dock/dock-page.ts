import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BadgesDockDemoContainer } from './demos/badges-dock-demo-container';
import { BasicDockDemoContainer } from './demos/basic-dock-demo-container';
import { MagnificationScaleDockDemoContainer } from './demos/magnification-scale-dock-demo-container';
import { NoMagnificationDockDemoContainer } from './demos/no-magnification-dock-demo-container';
import { SizesDockDemoContainer } from './demos/sizes-dock-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-dock-page',
  imports: [
    BasicDockDemoContainer,
    NoMagnificationDockDemoContainer,
    BadgesDockDemoContainer,
    SizesDockDemoContainer,
    MagnificationScaleDockDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Dock</h1>
        <p class="text-muted-foreground">A dock component.</p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-dock-demo-container />
        <app-no-magnification-dock-demo-container />
        <app-badges-dock-demo-container />
        <app-sizes-dock-demo-container />
        <app-magnification-scale-dock-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DockPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'dock')!.status;
}
