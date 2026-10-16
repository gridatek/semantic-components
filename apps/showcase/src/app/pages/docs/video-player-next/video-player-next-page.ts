import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ControlledVideoPlayerNextDemoContainer } from './demos/controlled-video-player-next-demo-container';
import { MinimalVideoPlayerNextDemoContainer } from './demos/minimal-video-player-next-demo-container';
import { PlayerVideoPlayerNextDemoContainer } from './demos/player-video-player-next-demo-container';

@Component({
  selector: 'app-video-player-next-page',
  imports: [
    PlayerVideoPlayerNextDemoContainer,
    MinimalVideoPlayerNextDemoContainer,
    ControlledVideoPlayerNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Video Player Next</h1>
        <p class="text-muted-foreground">
          The video player, rebuilt: your video and its tracks, controls as
          parts, its state two ways — with captions, chapters, a seek preview,
          keyboard shortcuts and the system's media controls.
        </p>
        <app-component-badges path="video-player-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Player</h2>
        <p class="text-muted-foreground">
          Captions in two languages — shown by the player, above its controls —
          chapters and a preview on the seek bar, speeds, picture-in-picture and
          fullscreen. Focused, the keys work: Space or K, J and L, the arrows,
          M, F, C, 0–9. The controls hide while playing untouched.
        </p>
        <app-player-video-player-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Minimal</h2>
        <p class="text-muted-foreground">Only the parts you put in.</p>
        <app-minimal-video-player-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Controlled</h2>
        <p class="text-muted-foreground">
          Its state is two-way: here played, paused and timed from outside, its
          chapters as a list that jumps.
        </p>
        <app-controlled-video-player-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class VideoPlayerNextPage {}
