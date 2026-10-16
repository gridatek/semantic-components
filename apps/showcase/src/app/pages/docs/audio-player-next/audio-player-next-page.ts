import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ControlledAudioPlayerNextDemoContainer } from './demos/controlled-audio-player-next-demo-container';
import { MinimalAudioPlayerNextDemoContainer } from './demos/minimal-audio-player-next-demo-container';
import { PlayerAudioPlayerNextDemoContainer } from './demos/player-audio-player-next-demo-container';

@Component({
  selector: 'app-audio-player-next-page',
  imports: [
    PlayerAudioPlayerNextDemoContainer,
    MinimalAudioPlayerNextDemoContainer,
    ControlledAudioPlayerNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Audio Player Next</h1>
        <p class="text-muted-foreground">
          The audio player, rebuilt: your audio, a playlist of your own tracks,
          controls as parts, its state two ways — with a waveform, shuffle and
          repeat, keyboard shortcuts and the system's media controls.
        </p>
        <app-component-badges path="audio-player-next" />
        <p class="text-muted-foreground text-xs">
          Music: “Carefree”, “Sneaky Snitch” and “Gymnopédie No. 1” by Kevin
          MacLeod (<a
            href="https://incompetech.com"
            class="underline underline-offset-4"
            >incompetech.com</a
          >),
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            class="underline underline-offset-4"
            >CC BY 4.0</a
          >
          — excerpts.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Player</h2>
        <p class="text-muted-foreground">
          A playlist of three tracks: the waveform seeks (click, drag, or the
          arrows), the next track plays when one ends, shuffle and repeat.
          Focused, the keys work: Space or K, J and L, the arrows, M, N and P,
          0–9.
        </p>
        <app-player-audio-player-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Minimal</h2>
        <p class="text-muted-foreground">
          One file, no playlist — the audio's own src — on one line.
        </p>
        <app-minimal-audio-player-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Controlled</h2>
        <p class="text-muted-foreground">
          Its state is two-way: the track, played, paused, timed and repeated
          from outside.
        </p>
        <app-controlled-audio-player-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AudioPlayerNextPage {}
