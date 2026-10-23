import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ControlledVideoPlayerDemoContainer } from './demos/controlled-video-player-demo-container';
import { MinimalVideoPlayerDemoContainer } from './demos/minimal-video-player-demo-container';
import { PlayerVideoPlayerDemoContainer } from './demos/player-video-player-demo-container';

@Component({
  selector: 'app-video-player-page',
  imports: [
    PlayerVideoPlayerDemoContainer,
    MinimalVideoPlayerDemoContainer,
    ControlledVideoPlayerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Video Player</h1>
        <p class="text-muted-foreground">
          Your video and its tracks, controls as parts, its state two ways —
          with captions, chapters, a seek preview, keyboard shortcuts and the
          system's media controls.
        </p>
        <app-component-badges path="video-player" />
        <p class="text-muted-foreground text-xs">
          Video: the Sintel trailer, © Blender Foundation,
          <a
            href="https://creativecommons.org/licenses/by/3.0/"
            class="underline underline-offset-4"
            >CC BY 3.0</a
          >,
          <a
            href="https://durian.blender.org"
            class="underline underline-offset-4"
            >durian.blender.org</a
          >. Captions and chapters are ours.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Player</h2>
        <p class="text-muted-foreground">
          Captions in two languages — shown by the player, above its controls —
          chapters and a preview on the seek bar, speeds, picture-in-picture and
          fullscreen. Focused, the keys work: Space or K, J and L, the arrows,
          M, F, C, 0–9. The controls hide while playing untouched. Below 576px
          wide it has Vidstack's small layout — captions at the top, play in the
          middle, time and fullscreen at the bottom — from the parts alone: the
          template is the same.
        </p>
        <app-player-video-player-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Minimal</h2>
        <p class="text-muted-foreground">Only the parts you put in.</p>
        <app-minimal-video-player-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Controlled</h2>
        <p class="text-muted-foreground">
          Its state is two-way: here played, paused and timed from outside, its
          chapters as a list that jumps.
        </p>
        <app-controlled-video-player-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class VideoPlayerPage {}
