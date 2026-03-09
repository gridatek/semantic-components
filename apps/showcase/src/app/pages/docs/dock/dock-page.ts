import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BadgesDockDemoContainer } from './demos/badges-dock-demo-container';
import { BasicDockDemoContainer } from './demos/basic-dock-demo-container';
import { MagnificationScaleDockDemoContainer } from './demos/magnification-scale-dock-demo-container';
import { NoMagnificationDockDemoContainer } from './demos/no-magnification-dock-demo-container';
import { SizesDockDemoContainer } from './demos/sizes-dock-demo-container';

@Component({
  selector: 'app-dock-page',
  imports: [
    BasicDockDemoContainer,
    NoMagnificationDockDemoContainer,
    BadgesDockDemoContainer,
    SizesDockDemoContainer,
    MagnificationScaleDockDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Dock</h1>
        <p class="text-muted-foreground">A dock component.</p>
        <app-component-badges path="dock" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
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
export default class DockPage {}
