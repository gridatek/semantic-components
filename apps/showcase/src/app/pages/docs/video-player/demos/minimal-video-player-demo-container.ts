import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalVideoPlayerDemo } from './minimal-video-player-demo';

@Component({
  selector: 'app-minimal-video-player-demo-container',
  imports: [DemoContainer, MinimalVideoPlayerDemo],
  template: `
    <app-demo-container
      title="Minimal"
      [code]="code"
      demoUrl="/demos/video-player/minimal-video-player-demo"
    >
      <app-minimal-video-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalVideoPlayerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScVideoPlayer,
  ScVideoPlayerControls,
  ScVideoPlayerMedia,
  ScVideoPlayerPlay,
  ScVideoPlayerProgress,
  ScVideoPlayerSeek,
  ScVideoPlayerTime,
} from '@semantic-components/ui-lab';
import { SiPauseIcon, SiPlayIcon } from '@semantic-icons/lucide-icons';

/** Only what you put in: play, the seek bar, the time. */
@Component({
  selector: 'app-minimal-video-player-demo',
  imports: [
    ScVideoPlayer,
    ScVideoPlayerMedia,
    ScVideoPlayerControls,
    ScVideoPlayerProgress,
    ScVideoPlayerSeek,
    ScVideoPlayerPlay,
    ScVideoPlayerTime,
    SiPlayIcon,
    SiPauseIcon,
  ],
  template: \`
    <div
      scVideoPlayer
      #player="scVideoPlayer"
      aria-label="Video: Sintel, the trailer"
      class="aspect-video w-full max-w-xl"
    >
      <video
        scVideoPlayerMedia
        src="/media/sintel-trailer.mp4"
        poster="/media/sintel-trailer.jpg"
        preload="metadata"
      ></video>
      <div scVideoPlayerControls class="flex-row items-center gap-2">
        <button scVideoPlayerPlay>
          @if (player.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          }
        </button>
        <div scVideoPlayerProgress class="flex-1">
          <input
            scVideoPlayerSeek
            aria-label="Seek"
            [attr.aria-valuetext]="
              player.formatTime(player.currentTime()) +
              ' of ' +
              player.formatTime(player.duration())
            "
          />
        </div>
        <time scVideoPlayerTime="remaining"></time>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalVideoPlayerDemo {}`;
}
