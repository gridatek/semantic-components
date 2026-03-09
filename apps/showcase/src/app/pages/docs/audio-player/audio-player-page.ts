import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AudioPlayerDemoContainer } from './demos/audio-player-demo-container';

@Component({
  selector: 'app-audio-player-page',
  imports: [AudioPlayerDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Audio Player</h1>
        <p class="text-muted-foreground">
          Feature-rich audio player with playlist support, shuffle, and repeat.
        </p>
        <app-component-badges path="audio-player" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-audio-player-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioPlayerPage {}
