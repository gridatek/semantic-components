import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { VideoPlayerDemoContainer } from './demos/video-player-demo-container';

@Component({
  selector: 'app-video-player-page',
  imports: [VideoPlayerDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Video Player</h1>
        <p class="text-muted-foreground">
          Full-featured HTML5 video player with custom controls, keyboard
          shortcuts, and fullscreen support.
        </p>
        <app-component-badges path="video-player" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-video-player-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VideoPlayerPage {}
