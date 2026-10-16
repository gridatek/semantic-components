import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScAudioPlayer,
  ScAudioPlayerMedia,
  ScAudioPlayerMute,
  ScAudioPlayerNextTrack,
  ScAudioPlayerPlay,
  ScAudioPlayerPreviousTrack,
  ScAudioPlayerRepeat,
  ScAudioPlayerShuffle,
  ScAudioPlayerTime,
  ScAudioPlayerVolume,
  ScAudioPlayerWaveform,
} from '@semantic-components/ui-lab';
import {
  SiPauseIcon,
  SiPlayIcon,
  SiRepeat1Icon,
  SiRepeatIcon,
  SiShuffleIcon,
  SiSkipBackIcon,
  SiSkipForwardIcon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';

interface Song {
  readonly src: string;
  readonly title: string;
  readonly artist: string;
  readonly cover: string;
}

/** A playlist: its cover and names, the waveform, shuffle and repeat, the volume — and the keys, once focused. */
@Component({
  selector: 'app-player-audio-player-demo',
  imports: [
    NgOptimizedImage,
    ScAudioPlayer,
    ScAudioPlayerMedia,
    ScAudioPlayerWaveform,
    ScAudioPlayerTime,
    ScAudioPlayerPlay,
    ScAudioPlayerPreviousTrack,
    ScAudioPlayerNextTrack,
    ScAudioPlayerShuffle,
    ScAudioPlayerRepeat,
    ScAudioPlayerMute,
    ScAudioPlayerVolume,
    SiPlayIcon,
    SiPauseIcon,
    SiSkipBackIcon,
    SiSkipForwardIcon,
    SiShuffleIcon,
    SiRepeatIcon,
    SiRepeat1Icon,
    SiVolume2Icon,
    SiVolumeXIcon,
  ],
  template: `
    <div
      scAudioPlayer
      #player="scAudioPlayer"
      aria-label="Player"
      [tracks]="songs"
      [(track)]="track"
      [metadata]="metadata()"
      class="bg-card w-full max-w-sm space-y-4 rounded-xl border p-4"
    >
      <audio scAudioPlayerMedia preload="metadata"></audio>

      <div class="flex items-center gap-3">
        <img
          [ngSrc]="song().cover"
          width="64"
          height="64"
          alt=""
          class="size-16 rounded-md"
        />
        <div class="min-w-0">
          <p class="truncate font-medium">{{ song().title }}</p>
          <p class="text-muted-foreground truncate text-sm">
            {{ song().artist }}
          </p>
        </div>
      </div>

      <div class="space-y-1">
        <div
          scAudioPlayerWaveform
          aria-label="Seek"
          [attr.aria-valuetext]="
            player.formatTime(player.currentTime()) +
            ' of ' +
            player.formatTime(player.duration())
          "
        ></div>
        <div class="flex justify-between">
          <time scAudioPlayerTime="current"></time>
          <time scAudioPlayerTime="remaining"></time>
        </div>
      </div>

      <div class="flex items-center justify-center gap-2">
        <button scAudioPlayerShuffle>
          <svg siShuffleIcon></svg>
          <span class="sr-only">Shuffle</span>
        </button>
        <button scAudioPlayerPreviousTrack>
          <svg siSkipBackIcon></svg>
          <span class="sr-only">Previous track</span>
        </button>
        <button scAudioPlayerPlay class="rounded-full">
          @if (player.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          }
        </button>
        <button scAudioPlayerNextTrack>
          <svg siSkipForwardIcon></svg>
          <span class="sr-only">Next track</span>
        </button>
        <button scAudioPlayerRepeat>
          @if (player.repeat() === 'one') {
            <svg siRepeat1Icon></svg>
          } @else {
            <svg siRepeatIcon></svg>
          }
          <span class="sr-only">Repeat: {{ player.repeat() }}</span>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button scAudioPlayerMute size="icon-sm">
          @if (player.muted()) {
            <svg siVolumeXIcon></svg>
          } @else {
            <svg siVolume2Icon></svg>
          }
          <span class="sr-only">Mute</span>
        </button>
        <input scAudioPlayerVolume aria-label="Volume" />
      </div>

      <ol aria-label="Playlist" class="space-y-1 border-t pt-3">
        @for (item of songs; track item.src; let i = $index) {
          <li>
            <button
              type="button"
              class="hover:bg-muted aria-current:bg-muted flex w-full items-center gap-3 rounded-md p-1.5 text-start text-sm"
              [attr.aria-current]="i === track() || null"
              (click)="player.play(i)"
            >
              <img
                [ngSrc]="item.cover"
                width="32"
                height="32"
                alt=""
                class="size-8 rounded"
              />
              <span class="flex-1 truncate">{{ item.title }}</span>
              <span class="text-muted-foreground text-xs">{{
                item.artist
              }}</span>
            </button>
          </li>
        }
      </ol>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PlayerAudioPlayerDemo {
  readonly songs: readonly Song[] = [
    {
      src: '/media/carefree.mp3',
      title: 'Carefree',
      artist: 'Kevin MacLeod',
      cover: '/media/carefree.jpg',
    },
    {
      src: '/media/sneaky-snitch.mp3',
      title: 'Sneaky Snitch',
      artist: 'Kevin MacLeod',
      cover: '/media/sneaky-snitch.jpg',
    },
    {
      src: '/media/gymnopedie-no-1.mp3',
      title: 'Gymnopédie No. 1',
      artist: 'Kevin MacLeod',
      cover: '/media/gymnopedie-no-1.jpg',
    },
  ];

  readonly track = signal(0);
  readonly song = computed(() => this.songs[this.track()]);
  readonly metadata = computed(() => ({
    title: this.song().title,
    artist: this.song().artist,
    artwork: [{ src: this.song().cover, sizes: '400x400', type: 'image/jpeg' }],
  }));
}
