import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlayerVideoPlayerNextDemo } from './player-video-player-next-demo';

@Component({
  selector: 'app-player-video-player-next-demo-container',
  imports: [DemoContainer, PlayerVideoPlayerNextDemo],
  template: `
    <app-demo-container
      title="Player"
      [code]="code"
      demoUrl="/demos/video-player-next/player-video-player-next-demo"
    >
      <app-player-video-player-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PlayerVideoPlayerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScVideoPlayerNext,
  ScVideoPlayerNextCaptions,
  ScVideoPlayerNextCaptionsDisplay,
  ScVideoPlayerNextControls,
  ScVideoPlayerNextFullscreen,
  ScVideoPlayerNextMedia,
  ScVideoPlayerNextMute,
  ScVideoPlayerNextPictureInPicture,
  ScVideoPlayerNextPlay,
  ScVideoPlayerNextPreview,
  ScVideoPlayerNextProgress,
  ScVideoPlayerNextRate,
  ScVideoPlayerNextSeek,
  ScVideoPlayerNextSkip,
  ScVideoPlayerNextTime,
  ScVideoPlayerNextVolume,
} from '@semantic-components/ui-lab';
import {
  SiCaptionsIcon,
  SiLoaderCircleIcon,
  SiMaximizeIcon,
  SiMinimizeIcon,
  SiPauseIcon,
  SiPictureInPicture2Icon,
  SiPlayIcon,
  SiRotateCcwIcon,
  SiRotateCwIcon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';

/** Everything: captions in two languages, chapters and a preview on the seek bar, speeds, picture-in-picture, fullscreen — and the keys, once focused. */
@Component({
  selector: 'app-player-video-player-next-demo',
  imports: [
    ScVideoPlayerNext,
    ScVideoPlayerNextMedia,
    ScVideoPlayerNextCaptionsDisplay,
    ScVideoPlayerNextControls,
    ScVideoPlayerNextProgress,
    ScVideoPlayerNextSeek,
    ScVideoPlayerNextPreview,
    ScVideoPlayerNextPlay,
    ScVideoPlayerNextSkip,
    ScVideoPlayerNextMute,
    ScVideoPlayerNextVolume,
    ScVideoPlayerNextTime,
    ScVideoPlayerNextRate,
    ScVideoPlayerNextCaptions,
    ScVideoPlayerNextPictureInPicture,
    ScVideoPlayerNextFullscreen,
    SiPlayIcon,
    SiPauseIcon,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiVolume2Icon,
    SiVolumeXIcon,
    SiCaptionsIcon,
    SiPictureInPicture2Icon,
    SiMaximizeIcon,
    SiMinimizeIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scVideoPlayerNext
      #player="scVideoPlayerNext"
      aria-label="Video: Sintel, the trailer"
      [(captions)]="captions"
      [metadata]="{ title: 'Sintel — trailer', artist: 'Blender Foundation' }"
      class="aspect-video w-full max-w-2xl"
    >
      <video scVideoPlayerNextMedia src="/media/sintel-trailer.mp4" preload="metadata">
        <track
          kind="captions"
          src="/media/sintel-trailer.en.vtt"
          srclang="en"
          label="English"
        />
        <track
          kind="captions"
          src="/media/sintel-trailer.fr.vtt"
          srclang="fr"
          label="Français"
        />
        <track kind="chapters" src="/media/sintel-trailer.chapters.vtt" srclang="en" />
      </video>
      <div scVideoPlayerNextCaptionsDisplay></div>

      @if (player.waiting()) {
        <svg
          siLoaderCircleIcon
          class="absolute inset-0 m-auto size-10 animate-spin text-white"
        ></svg>
      }
      @if (player.paused()) {
        <button
          scVideoPlayerNextPlay
          size="icon-lg"
          class="absolute inset-0 m-auto size-16 rounded-full bg-black/50 [&_svg]:size-7"
        >
          <svg siPlayIcon></svg>
          <span class="sr-only">Play</span>
        </button>
      }

      <div scVideoPlayerNextControls>
        <div scVideoPlayerNextProgress>
          <input
            scVideoPlayerNextSeek
            aria-label="Seek"
            [attr.aria-valuetext]="
              player.formatTime(player.currentTime()) +
              ' of ' +
              player.formatTime(player.duration())
            "
          />
          @if (player.preview(); as preview) {
            <div scVideoPlayerNextPreview>
              {{ player.chapterAt(preview.time)?.title }}
              <div class="font-medium">
                {{ player.formatTime(preview.time) }}
              </div>
            </div>
          }
        </div>
        <div class="flex items-center gap-1">
          <button scVideoPlayerNextPlay>
            @if (player.paused()) {
              <svg siPlayIcon></svg>
              <span class="sr-only">Play</span>
            } @else {
              <svg siPauseIcon></svg>
              <span class="sr-only">Pause</span>
            }
          </button>
          <button [scVideoPlayerNextSkip]="-10">
            <svg siRotateCcwIcon></svg>
            <span class="sr-only">Back 10 seconds</span>
          </button>
          <button [scVideoPlayerNextSkip]="10">
            <svg siRotateCwIcon></svg>
            <span class="sr-only">Forward 10 seconds</span>
          </button>
          <button scVideoPlayerNextMute>
            @if (player.muted()) {
              <svg siVolumeXIcon></svg>
            } @else {
              <svg siVolume2Icon></svg>
            }
            <span class="sr-only">Mute</span>
          </button>
          <div class="flex w-20 shrink-0">
            <input scVideoPlayerNextVolume aria-label="Volume" />
          </div>
          <span class="ms-1 shrink-0 text-xs whitespace-nowrap">
            <time scVideoPlayerNextTime="current"></time> /
            <time scVideoPlayerNextTime="duration"></time>
          </span>
          @if (player.chapter(); as chapter) {
            <span class="ms-2 truncate text-xs text-white/80"
              >· {{ chapter.title }}</span
            >
          }
          <div role="group" aria-label="Speed" class="ms-auto flex">
            @for (rate of rates; track rate) {
              <button
                [scVideoPlayerNextRate]="rate"
                size="sm"
                class="px-1.5 text-xs"
              >
                {{ rate }}×
              </button>
            }
          </div>
          <button scVideoPlayerNextCaptions>
            <svg siCaptionsIcon></svg>
            <span class="sr-only">Captions</span>
          </button>
          <button scVideoPlayerNextPictureInPicture>
            <svg siPictureInPicture2Icon></svg>
            <span class="sr-only">Picture in picture</span>
          </button>
          <button scVideoPlayerNextFullscreen>
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

    <div
      role="radiogroup"
      aria-label="Captions"
      class="flex items-center gap-2 text-sm"
    >
      <span class="text-muted-foreground">Captions:</span>
      <label class="flex items-center gap-1">
        <input
          type="radio"
          name="captions"
          [checked]="captions() === null"
          (change)="captions.set(null)"
        />
        Off
      </label>
      @for (track of player.tracks(); track track.id) {
        <label class="flex items-center gap-1">
          <input
            type="radio"
            name="captions"
            [checked]="captions() === track.id"
            (change)="captions.set(track.id)"
          />
          {{ track.label }}
        </label>
      }
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class PlayerVideoPlayerNextDemo {
  readonly captions = signal<string | null>(null);
  readonly rates = [1, 1.5, 2];
}`;
}
