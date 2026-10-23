import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlayerVideoPlayerDemo } from './player-video-player-demo';

@Component({
  selector: 'app-player-video-player-demo-container',
  imports: [DemoContainer, PlayerVideoPlayerDemo],
  template: `
    <app-demo-container
      title="Player"
      [code]="code"
      demoUrl="/demos/video-player/player-video-player-demo"
    >
      <app-player-video-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PlayerVideoPlayerDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScRadio,
  ScRadioField,
  ScRadioGroup,
  ScResizeObserver,
  ScVideoPlayer,
  ScVideoPlayerCaptions,
  ScVideoPlayerCaptionsDisplay,
  ScVideoPlayerControls,
  ScVideoPlayerFullscreen,
  ScVideoPlayerMedia,
  ScVideoPlayerMute,
  ScVideoPlayerPictureInPicture,
  ScVideoPlayerPlay,
  ScVideoPlayerPreview,
  ScVideoPlayerProgress,
  ScVideoPlayerRate,
  ScVideoPlayerSeek,
  ScVideoPlayerSkip,
  ScVideoPlayerTime,
  ScVideoPlayerVolume,
} from '@semantic-components/ui';
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
  selector: 'app-player-video-player-demo',
  imports: [
    NgTemplateOutlet,
    ScResizeObserver,
    ScVideoPlayer,
    ScVideoPlayerMedia,
    ScVideoPlayerCaptionsDisplay,
    ScVideoPlayerControls,
    ScVideoPlayerProgress,
    ScVideoPlayerSeek,
    ScVideoPlayerPreview,
    ScVideoPlayerPlay,
    ScVideoPlayerSkip,
    ScVideoPlayerMute,
    ScVideoPlayerVolume,
    ScVideoPlayerTime,
    ScVideoPlayerRate,
    ScVideoPlayerCaptions,
    ScVideoPlayerPictureInPicture,
    ScVideoPlayerFullscreen,
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
    ScRadioGroup,
    ScRadioField,
    ScRadio,
    FormField,
  ],
  template: \`
    <div
      scVideoPlayer
      #player="scVideoPlayer"
      scResizeObserver
      #size="scResizeObserver"
      aria-label="Video: Sintel, the trailer"
      [captions]="captions()"
      (captionsChange)="setCaptions($event)"
      [metadata]="{ title: 'Sintel — trailer', artist: 'Blender Foundation' }"
      class="aspect-video w-full max-w-2xl"
    >
      <video
        scVideoPlayerMedia
        src="/media/sintel-trailer.mp4"
        poster="/media/sintel-trailer.jpg"
        preload="metadata"
      >
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
        <track
          kind="chapters"
          src="/media/sintel-trailer.chapters.vtt"
          srclang="en"
        />
      </video>
      <div scVideoPlayerCaptionsDisplay></div>

      @if (player.waiting()) {
        <svg
          siLoaderCircleIcon
          class="absolute inset-0 m-auto size-10 animate-spin text-white"
        ></svg>
      }
      <!-- Small player (below 576px wide, as Vidstack's): the controls spread
           over the video — captions and mute at the top, play and the skips
           in the middle, time, fullscreen and the seek bar at the bottom. -->
      @let small = size.width() < 576;

      <ng-template #seekBar>
        <div scVideoPlayerProgress>
          <input
            scVideoPlayerSeek
            aria-label="Seek"
            [attr.aria-valuetext]="
              player.formatTime(player.currentTime()) +
              ' of ' +
              player.formatTime(player.duration())
            "
          />
          @if (player.preview(); as preview) {
            <div scVideoPlayerPreview>
              {{ player.chapterAt(preview.time)?.title }}
              <div class="font-medium">
                {{ player.formatTime(preview.time) }}
              </div>
            </div>
          }
        </div>
      </ng-template>

      @if (small) {
        <div
          scVideoPlayerControls
          class="top-0 justify-between bg-black/40 bg-none pt-2"
        >
          <div class="flex items-center justify-end gap-1">
            <button scVideoPlayerCaptions>
              <svg siCaptionsIcon></svg>
              <span class="sr-only">Captions</span>
            </button>
            <button scVideoPlayerMute>
              @if (player.muted()) {
                <svg siVolumeXIcon></svg>
              } @else {
                <svg siVolume2Icon></svg>
              }
              <span class="sr-only">Mute</span>
            </button>
          </div>
          <div class="flex items-center justify-center gap-6">
            <button [scVideoPlayerSkip]="-10">
              <svg siRotateCcwIcon></svg>
              <span class="sr-only">Back 10 seconds</span>
            </button>
            <button
              scVideoPlayerPlay
              size="icon-lg"
              class="size-14 rounded-full bg-black/50 [&_svg]:size-7"
            >
              @if (player.paused()) {
                <svg siPlayIcon></svg>
                <span class="sr-only">Play</span>
              } @else {
                <svg siPauseIcon></svg>
                <span class="sr-only">Pause</span>
              }
            </button>
            <button [scVideoPlayerSkip]="10">
              <svg siRotateCwIcon></svg>
              <span class="sr-only">Forward 10 seconds</span>
            </button>
          </div>
          <div class="grid gap-1">
            <div class="flex items-center gap-2">
              <span class="shrink-0 text-xs whitespace-nowrap">
                <time scVideoPlayerTime="current"></time> /
                <time scVideoPlayerTime="duration"></time>
              </span>
              <button scVideoPlayerFullscreen class="ms-auto">
                @if (player.fullscreen()) {
                  <svg siMinimizeIcon></svg>
                } @else {
                  <svg siMaximizeIcon></svg>
                }
                <span class="sr-only">Fullscreen</span>
              </button>
            </div>
            <ng-container [ngTemplateOutlet]="seekBar" />
          </div>
        </div>
      } @else {
        @if (player.paused()) {
          <button
            scVideoPlayerPlay
            size="icon-lg"
            class="absolute inset-0 m-auto size-16 rounded-full bg-black/50 [&_svg]:size-7"
          >
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          </button>
        }

        <div scVideoPlayerControls>
          <ng-container [ngTemplateOutlet]="seekBar" />
          <div class="flex items-center gap-1">
            <button scVideoPlayerPlay>
              @if (player.paused()) {
                <svg siPlayIcon></svg>
                <span class="sr-only">Play</span>
              } @else {
                <svg siPauseIcon></svg>
                <span class="sr-only">Pause</span>
              }
            </button>
            <button [scVideoPlayerSkip]="-10">
              <svg siRotateCcwIcon></svg>
              <span class="sr-only">Back 10 seconds</span>
            </button>
            <button [scVideoPlayerSkip]="10">
              <svg siRotateCwIcon></svg>
              <span class="sr-only">Forward 10 seconds</span>
            </button>
            <button scVideoPlayerMute>
              @if (player.muted()) {
                <svg siVolumeXIcon></svg>
              } @else {
                <svg siVolume2Icon></svg>
              }
              <span class="sr-only">Mute</span>
            </button>
            <div class="flex w-20 shrink-0">
              <input scVideoPlayerVolume aria-label="Volume" />
            </div>
            <span class="ms-1 shrink-0 text-xs whitespace-nowrap">
              <time scVideoPlayerTime="current"></time> /
              <time scVideoPlayerTime="duration"></time>
            </span>
            @if (player.chapter(); as chapter) {
              <span class="ms-2 truncate text-xs text-white/80"
                >· {{ chapter.title }}</span
              >
            }
            <div role="group" aria-label="Speed" class="ms-auto flex">
              @for (rate of rates; track rate) {
                <button
                  [scVideoPlayerRate]="rate"
                  size="sm"
                  class="px-1.5 text-xs"
                >
                  {{ rate }}×
                </button>
              }
            </div>
            <button scVideoPlayerCaptions>
              <svg siCaptionsIcon></svg>
              <span class="sr-only">Captions</span>
            </button>
            <button scVideoPlayerPictureInPicture>
              <svg siPictureInPicture2Icon></svg>
              <span class="sr-only">Picture in picture</span>
            </button>
            <button scVideoPlayerFullscreen>
              @if (player.fullscreen()) {
                <svg siMinimizeIcon></svg>
              } @else {
                <svg siMaximizeIcon></svg>
              }
              <span class="sr-only">Fullscreen</span>
            </button>
          </div>
        </div>
      }
    </div>

    <div class="flex items-center gap-4 text-sm">
      <span id="captions-label" class="text-muted-foreground">Captions:</span>
      <div
        scRadioGroup
        orientation="horizontal"
        aria-labelledby="captions-label"
      >
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="off"
            [formField]="settingsForm.captions"
          />
          Off
        </label>
        @for (track of player.tracks(); track track.id) {
          <label scRadioField>
            <input
              type="radio"
              scRadio
              [value]="track.id"
              [formField]="settingsForm.captions"
            />
            {{ track.label }}
          </label>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class PlayerVideoPlayerDemo {
  readonly settings = signal({ captions: 'off' });
  readonly settingsForm = form(this.settings);
  readonly captions = computed(() =>
    this.settings().captions === 'off' ? null : this.settings().captions,
  );
  readonly rates = [1, 1.5, 2];

  setCaptions(id: string | null) {
    this.settings.set({ captions: id ?? 'off' });
  }
}`;
}
