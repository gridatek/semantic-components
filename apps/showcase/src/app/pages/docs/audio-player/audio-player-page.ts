import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ControlledAudioPlayerDemoContainer } from './demos/controlled-audio-player-demo-container';
import { MinimalAudioPlayerDemoContainer } from './demos/minimal-audio-player-demo-container';
import { PlayerAudioPlayerDemoContainer } from './demos/player-audio-player-demo-container';

@Component({
  selector: 'app-audio-player-page',
  imports: [
    ScKbd,
    PlayerAudioPlayerDemoContainer,
    MinimalAudioPlayerDemoContainer,
    ControlledAudioPlayerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Audio Player</h1>
        <p class="text-muted-foreground">
          Your audio, a playlist of your own tracks, controls as parts, its
          state two ways — with a waveform, shuffle and repeat, keyboard
          shortcuts and the system's media controls.
        </p>
        <app-component-badges path="audio-player" />
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
        <h2 scTypeset appToc>Player</h2>
        <p class="text-muted-foreground">
          A playlist of three tracks: the waveform seeks (click, drag, or the
          arrows), the next track plays when one ends, shuffle and repeat.
          Focused, the keys work: <kbd scKbd>Space</kbd> or <kbd scKbd>K</kbd>,
          <kbd scKbd>J</kbd> and <kbd scKbd>L</kbd>, the arrows,
          <kbd scKbd>M</kbd>, <kbd scKbd>N</kbd> and <kbd scKbd>P</kbd>,
          <kbd scKbd>0</kbd>–<kbd scKbd>9</kbd>.
        </p>
        <app-player-audio-player-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Minimal</h2>
        <p class="text-muted-foreground">
          One file, no playlist — the audio's own src — on one line.
        </p>
        <app-minimal-audio-player-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Controlled</h2>
        <p class="text-muted-foreground">
          Its state is two-way: the track, played, paused, timed and repeated
          from outside.
        </p>
        <app-controlled-audio-player-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AudioPlayerPage {}
