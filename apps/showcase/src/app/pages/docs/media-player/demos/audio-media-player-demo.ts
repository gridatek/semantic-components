import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMediaPlayer,
  ScMediaPlayerControls,
  ScMediaPlayerLoop,
  ScMediaPlayerMedia,
  ScMediaPlayerMute,
  ScMediaPlayerPlay,
  ScMediaPlayerSeek,
  ScMediaPlayerSkip,
  ScMediaPlayerTime,
  ScMediaPlayerVolume,
} from '@semantic-components/ui';
import {
  SiPauseIcon,
  SiPlayIcon,
  SiRepeatIcon,
  SiRotateCcwIcon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';

/** An <audio>: the same parts in a bar — no overlay, no fullscreen. Small, the volume and extras step aside; mute stays. */
@Component({
  selector: 'app-audio-media-player-demo',
  imports: [
    NgOptimizedImage,
    ScMediaPlayer,
    ScMediaPlayerControls,
    ScMediaPlayerLoop,
    ScMediaPlayerMedia,
    ScMediaPlayerMute,
    ScMediaPlayerPlay,
    ScMediaPlayerSeek,
    ScMediaPlayerSkip,
    ScMediaPlayerTime,
    ScMediaPlayerVolume,
    SiPauseIcon,
    SiPlayIcon,
    SiRepeatIcon,
    SiRotateCcwIcon,
    SiVolume2Icon,
    SiVolumeXIcon,
  ],
  template: `
    <div
      scMediaPlayer
      #player="scMediaPlayer"
      aria-label="Audio: Carefree"
      class="grid w-full max-w-md gap-3"
      [metadata]="{ title: 'Carefree', artist: 'Kevin MacLeod' }"
    >
      <audio
        scMediaPlayerMedia
        src="/media/carefree.mp3"
        preload="metadata"
      ></audio>
      <div class="flex items-center gap-3">
        <img
          ngSrc="/media/carefree.jpg"
          priority
          width="48"
          height="48"
          alt=""
          class="rounded-md"
        />
        <div>
          <p class="text-sm font-medium">Carefree</p>
          <p class="text-muted-foreground text-xs">Kevin MacLeod</p>
        </div>
      </div>
      <div scMediaPlayerControls>
        <button scMediaPlayerPlay>
          @if (player.paused()) {
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
        <time scMediaPlayerTime></time>
        <input scMediaPlayerSeek aria-label="Seek" />
        <time scMediaPlayerTime="remaining"></time>
        <button scMediaPlayerMute>
          @if (player.muted()) {
            <svg siVolumeXIcon></svg>
          } @else {
            <svg siVolume2Icon></svg>
          }
          <span class="sr-only">Mute</span>
        </button>
        <input scMediaPlayerVolume aria-label="Volume" />
        <button scMediaPlayerLoop>
          <svg siRepeatIcon></svg>
          <span class="sr-only">Loop</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AudioMediaPlayerDemo {}
