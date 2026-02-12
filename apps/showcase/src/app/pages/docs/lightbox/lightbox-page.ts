import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicLightboxDemoContainer } from './demos/basic-lightbox-demo-container';
import { InfoLightboxDemoContainer } from './demos/info-lightbox-demo-container';
import { GalleryLightboxDemoContainer } from './demos/gallery-lightbox-demo-container';
import { NoThumbnailsLightboxDemoContainer } from './demos/no-thumbnails-lightbox-demo-container';
import { NoZoomLightboxDemoContainer } from './demos/no-zoom-lightbox-demo-container';
import { NoLoopLightboxDemoContainer } from './demos/no-loop-lightbox-demo-container';
import { SingleLightboxDemoContainer } from './demos/single-lightbox-demo-container';
import { KeyboardLightboxDemoContainer } from './demos/keyboard-lightbox-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-lightbox-page',
  imports: [
    BasicLightboxDemoContainer,
    InfoLightboxDemoContainer,
    GalleryLightboxDemoContainer,
    NoThumbnailsLightboxDemoContainer,
    NoZoomLightboxDemoContainer,
    NoLoopLightboxDemoContainer,
    SingleLightboxDemoContainer,
    KeyboardLightboxDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Lightbox</h1>
        <p class="text-muted-foreground">
          Full-screen image viewer with zoom, navigation, and keyboard support.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-lightbox-demo-container />
        <app-info-lightbox-demo-container />
        <app-gallery-lightbox-demo-container />
        <app-no-thumbnails-lightbox-demo-container />
        <app-no-zoom-lightbox-demo-container />
        <app-no-loop-lightbox-demo-container />
        <app-single-lightbox-demo-container />
        <app-keyboard-lightbox-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LightboxPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'lightbox')!
    .status;
}
