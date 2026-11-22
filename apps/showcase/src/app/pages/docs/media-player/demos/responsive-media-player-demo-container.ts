import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ResponsiveMediaPlayerDemo } from './responsive-media-player-demo';

@Component({
  selector: 'app-responsive-media-player-demo-container',
  imports: [DemoContainer, ResponsiveMediaPlayerDemo],
  template: `
    <app-demo-container
      title="Responsive"
      [code]="code"
      demoUrl="/demos/media-player/responsive-media-player-demo"
    >
      <app-responsive-media-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveMediaPlayerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMediaPlayer,
  ScMediaPlayerCaptions,
  ScMediaPlayerCaptionsDisplay,
  ScMediaPlayerControls,
  ScMediaPlayerFullscreen,
  ScMediaPlayerLoop,
  ScMediaPlayerMedia,
  ScMediaPlayerMute,
  ScMediaPlayerPictureInPicture,
  ScMediaPlayerPlay,
  ScMediaPlayerPreview,
  ScMediaPlayerRate,
  ScMediaPlayerSeek,
  ScMediaPlayerSkip,
  ScMediaPlayerTime,
  ScMediaPlayerVolume,
} from '@semantic-components/ui';
import {
  SiCaptionsIcon,
  SiLoaderCircleIcon,
  SiMaximizeIcon,
  SiMinimizeIcon,
  SiPauseIcon,
  SiPictureInPicture2Icon,
  SiPlayIcon,
  SiRepeatIcon,
  SiRotateCcwIcon,
  SiRotateCwIcon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';

/** The same player in a box you resize: under 576px wide, the small layout — play in the middle, the seek bar at the bottom, the extras away. */
@Component({
  selector: 'app-responsive-media-player-demo',
  imports: [
    ScMediaPlayer,
    ScMediaPlayerCaptions,
    ScMediaPlayerCaptionsDisplay,
    ScMediaPlayerControls,
    ScMediaPlayerFullscreen,
    ScMediaPlayerLoop,
    ScMediaPlayerMedia,
    ScMediaPlayerMute,
    ScMediaPlayerPictureInPicture,
    ScMediaPlayerPlay,
    ScMediaPlayerPreview,
    ScMediaPlayerRate,
    ScMediaPlayerSeek,
    ScMediaPlayerSkip,
    ScMediaPlayerTime,
    ScMediaPlayerVolume,
    SiCaptionsIcon,
    SiLoaderCircleIcon,
    SiMaximizeIcon,
    SiMinimizeIcon,
    SiPauseIcon,
    SiPictureInPicture2Icon,
    SiPlayIcon,
    SiRepeatIcon,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiVolume2Icon,
    SiVolumeXIcon,
  ],
  template: \`
    <div
      class="w-full max-w-2xl min-w-64 resize-x overflow-hidden rounded-xl border p-2"
      data-testid="box"
    >
      <div
        scMediaPlayer
        #player="scMediaPlayer"
        aria-label="Video: Sintel, the trailer"
        class="aspect-video w-full"
      >
        <video
          scMediaPlayerMedia
          src="/media/sintel-trailer.mp4"
          poster="/media/sintel-trailer.jpg"
          preload="metadata"
        >
          <track
            kind="captions"
            src="/media/sintel-trailer-en.vtt"
            srclang="en"
            label="English"
          />
          <track
            kind="captions"
            src="/media/sintel-trailer-fr.vtt"
            srclang="fr"
            label="Français"
          />
          <track
            kind="chapters"
            src="/media/sintel-trailer-chapters.vtt"
            srclang="en"
          />
        </video>
        <div scMediaPlayerCaptionsDisplay></div>
        @if (player.waiting()) {
          <svg
            siLoaderCircleIcon
            class="pointer-events-none absolute inset-0 z-20 m-auto size-10 animate-spin"
          ></svg>
        }
        <!-- Over the video: in the middle. -->
        <button scMediaPlayerPlay>
          @if (player.ended()) {
            <svg siRotateCcwIcon></svg>
            <span class="sr-only">Replay</span>
          } @else if (player.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          }
        </button>
        @if (!player.started()) {
          <time
            scMediaPlayerTime="duration"
            class="absolute end-3 bottom-3 rounded-md bg-black/70 px-1.5 py-0.5"
          ></time>
        }

        <div scMediaPlayerControls>
          <input scMediaPlayerSeek aria-label="Seek" />
          @if (player.preview(); as preview) {
            <div scMediaPlayerPreview>
              {{ player.chapterAt(preview.time)?.title }}
              <div class="font-medium">
                {{ player.formatTime(preview.time) }}
              </div>
            </div>
          }
          <button scMediaPlayerPlay>
            @if (player.ended()) {
              <svg siRotateCcwIcon></svg>
              <span class="sr-only">Replay</span>
            } @else if (player.paused()) {
              <svg siPlayIcon></svg>
              <span class="sr-only">Play</span>
            } @else {
              <svg siPauseIcon></svg>
              <span class="sr-only">Pause</span>
            }
          </button>
          <button [scMediaPlayerSkip]="-10">
            <svg siRotateCcwIcon></svg>
            <span class="sr-only">Back 10 seconds</span>
          </button>
          <button [scMediaPlayerSkip]="10">
            <svg siRotateCwIcon></svg>
            <span class="sr-only">Forward 10 seconds</span>
          </button>
          <button scMediaPlayerMute>
            @if (player.muted()) {
              <svg siVolumeXIcon></svg>
            } @else {
              <svg siVolume2Icon></svg>
            }
            <span class="sr-only">Mute</span>
          </button>
          <input scMediaPlayerVolume aria-label="Volume" />
          <span class="flex items-center gap-1 px-1 text-xs">
            <time scMediaPlayerTime></time> /
            <time scMediaPlayerTime="duration"></time>
          </span>
          <!-- Grows: what follows sits at the end. -->
          <span class="min-w-0 flex-1 truncate text-xs text-white/80">{{
            player.chapter()?.title
          }}</span>
          <div role="group" aria-label="Speed" class="flex">
            @for (rate of rates; track rate) {
              <button
                [scMediaPlayerRate]="rate"
                size="sm"
                class="px-1.5 text-xs"
              >
                {{ rate }}×
              </button>
            }
          </div>
          <button scMediaPlayerLoop>
            <svg siRepeatIcon></svg>
            <span class="sr-only">Loop</span>
          </button>
          <button scMediaPlayerCaptions>
            <svg siCaptionsIcon></svg>
            <span class="sr-only">Captions</span>
          </button>
          <button scMediaPlayerPictureInPicture>
            <svg siPictureInPicture2Icon></svg>
            <span class="sr-only">Picture in picture</span>
          </button>
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
    </div>
    <p class="text-muted-foreground text-sm">
      Drag the box&apos;s corner to resize it.
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-2' },
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveMediaPlayerDemo {
  private readonly rates = [1, 1.5, 2];
}`;
}
