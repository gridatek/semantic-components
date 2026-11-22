import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalMediaPlayerDemo } from './minimal-media-player-demo';

@Component({
  selector: 'app-minimal-media-player-demo-container',
  imports: [DemoContainer, MinimalMediaPlayerDemo],
  template: `
    <app-demo-container
      title="Minimal"
      [code]="code"
      demoUrl="/demos/media-player/minimal-media-player-demo"
    >
      <app-minimal-media-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalMediaPlayerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMediaPlayer,
  ScMediaPlayerControls,
  ScMediaPlayerFullscreen,
  ScMediaPlayerMedia,
  ScMediaPlayerPlay,
  ScMediaPlayerSeek,
  ScMediaPlayerTime,
} from '@semantic-components/ui';
import {
  SiMaximizeIcon,
  SiMinimizeIcon,
  SiPauseIcon,
  SiPlayIcon,
} from '@semantic-icons/lucide-icons';

/** Only what you put in: play, the seek bar, the time left, fullscreen. No play over the video: the controls show from the start. */
@Component({
  selector: 'app-minimal-media-player-demo',
  imports: [
    ScMediaPlayer,
    ScMediaPlayerControls,
    ScMediaPlayerFullscreen,
    ScMediaPlayerMedia,
    ScMediaPlayerPlay,
    ScMediaPlayerSeek,
    ScMediaPlayerTime,
    SiMaximizeIcon,
    SiMinimizeIcon,
    SiPauseIcon,
    SiPlayIcon,
  ],
  template: \`
    <div
      scMediaPlayer
      #player="scMediaPlayer"
      aria-label="Video: Sintel, the trailer"
      class="aspect-video w-full max-w-xl"
    >
      <video
        scMediaPlayerMedia
        src="/media/sintel-trailer.mp4"
        poster="/media/sintel-trailer.jpg"
        preload="metadata"
      ></video>
      <div scMediaPlayerControls>
        <input scMediaPlayerSeek aria-label="Seek" />
        <button scMediaPlayerPlay>
          @if (player.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          }
        </button>
        <time scMediaPlayerTime="remaining" class="me-auto"></time>
        <button scMediaPlayerFullscreen>
          @if (player.fullscreen()) {
            <svg siMinimizeIcon></svg>
          } @else {
            <svg siMaximizeIcon></svg>
          }
          <span class="sr-only">Fullscreen</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalMediaPlayerDemo {}`;
}
