import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMediaPlayer,
  ScMediaPlayerControls,
  ScMediaPlayerMedia,
  ScMediaPlayerPlay,
  ScMediaPlayerSeek,
  ScMediaPlayerTime,
} from '@semantic-components/ui';
import {
  SiCircleAlertIcon,
  SiPauseIcon,
  SiPlayIcon,
} from '@semantic-icons/lucide-icons';

/** A file that won’t play: player.error(), your message and a way out — here, the right file. */
@Component({
  selector: 'app-error-media-player-demo',
  imports: [
    ScButton,
    ScMediaPlayer,
    ScMediaPlayerControls,
    ScMediaPlayerMedia,
    ScMediaPlayerPlay,
    ScMediaPlayerSeek,
    ScMediaPlayerTime,
    SiCircleAlertIcon,
    SiPauseIcon,
    SiPlayIcon,
  ],
  template: `
    <div
      scMediaPlayer
      #player="scMediaPlayer"
      aria-label="Video: Sintel, the trailer"
      class="aspect-video w-full max-w-xl"
    >
      <video scMediaPlayerMedia [src]="src()" preload="metadata"></video>
      @if (player.error()) {
        <div
          role="alert"
          class="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-black/80 p-4 text-center"
        >
          <svg siCircleAlertIcon class="size-8"></svg>
          <p class="text-sm">This video could not be played.</p>
          <button
            scButton
            variant="secondary"
            size="sm"
            (click)="src.set('/media/sintel-trailer.mp4')"
          >
            Try again
          </button>
        </div>
      }
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
        <time scMediaPlayerTime="duration"></time>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ErrorMediaPlayerDemo {
  /** Not a video: it fails to play (without a request). */
  private readonly src = signal('data:video/mp4;base64,AAAA');
}
