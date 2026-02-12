import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SixteenNineAspectRatioDemoContainer } from './demos/sixteen-nine-aspect-ratio-demo-container';
import { FourThreeAspectRatioDemoContainer } from './demos/four-three-aspect-ratio-demo-container';
import { SquareAspectRatioDemoContainer } from './demos/square-aspect-ratio-demo-container';
import { UltrawideAspectRatioDemoContainer } from './demos/ultrawide-aspect-ratio-demo-container';
import { PortraitAspectRatioDemoContainer } from './demos/portrait-aspect-ratio-demo-container';
import { PlaceholderAspectRatioDemoContainer } from './demos/placeholder-aspect-ratio-demo-container';
import { VideoAspectRatioDemoContainer } from './demos/video-aspect-ratio-demo-container';
import { MapAspectRatioDemoContainer } from './demos/map-aspect-ratio-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-aspect-ratio-page',
  imports: [
    SixteenNineAspectRatioDemoContainer,
    FourThreeAspectRatioDemoContainer,
    SquareAspectRatioDemoContainer,
    UltrawideAspectRatioDemoContainer,
    PortraitAspectRatioDemoContainer,
    PlaceholderAspectRatioDemoContainer,
    VideoAspectRatioDemoContainer,
    MapAspectRatioDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">AspectRatio</h1>
        <p class="text-muted-foreground">
          Displays content within a desired ratio.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-sixteen-nine-aspect-ratio-demo-container />
        <app-four-three-aspect-ratio-demo-container />
        <app-square-aspect-ratio-demo-container />
        <app-ultrawide-aspect-ratio-demo-container />
        <app-portrait-aspect-ratio-demo-container />
        <app-placeholder-aspect-ratio-demo-container />
        <app-video-aspect-ratio-demo-container />
        <app-map-aspect-ratio-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AspectRatioPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'aspect-ratio')!
    .status;
}
