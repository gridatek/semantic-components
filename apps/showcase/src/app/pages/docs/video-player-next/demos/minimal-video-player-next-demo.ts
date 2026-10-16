import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScVideoPlayerNext,
  ScVideoPlayerNextControls,
  ScVideoPlayerNextMedia,
  ScVideoPlayerNextPlay,
  ScVideoPlayerNextProgress,
  ScVideoPlayerNextSeek,
  ScVideoPlayerNextTime,
} from '@semantic-components/ui-lab';
import { SiPauseIcon, SiPlayIcon } from '@semantic-icons/lucide-icons';

/** Only what you put in: play, the seek bar, the time. */
@Component({
  selector: 'app-minimal-video-player-next-demo',
  imports: [
    ScVideoPlayerNext,
    ScVideoPlayerNextMedia,
    ScVideoPlayerNextControls,
    ScVideoPlayerNextProgress,
    ScVideoPlayerNextSeek,
    ScVideoPlayerNextPlay,
    ScVideoPlayerNextTime,
    SiPlayIcon,
    SiPauseIcon,
  ],
  template: `
    <div
      scVideoPlayerNext
      #player="scVideoPlayerNext"
      aria-label="Video: a day"
      class="aspect-video w-full max-w-xl"
    >
      <video
        scVideoPlayerNextMedia
        src="/media/day.webm"
        preload="metadata"
      ></video>
      <div scVideoPlayerNextControls class="flex-row items-center gap-2">
        <button scVideoPlayerNextPlay>
          @if (player.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          }
        </button>
        <div scVideoPlayerNextProgress class="flex-1">
          <input
            scVideoPlayerNextSeek
            aria-label="Seek"
            [attr.aria-valuetext]="
              player.formatTime(player.currentTime()) +
              ' of ' +
              player.formatTime(player.duration())
            "
          />
        </div>
        <time scVideoPlayerNextTime="remaining"></time>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalVideoPlayerNextDemo {}
