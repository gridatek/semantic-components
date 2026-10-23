import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScVideoPlayer,
  ScVideoPlayerMedia,
} from '@semantic-components/ui';

/** Its state is yours, two ways: chapters as a list that jumps, and the player played, paused and timed from outside. */
@Component({
  selector: 'app-controlled-video-player-demo',
  imports: [ScButton, ScVideoPlayer, ScVideoPlayerMedia],
  template: `
    <div
      scVideoPlayer
      #player="scVideoPlayer"
      aria-label="Video: Sintel, the trailer"
      [(paused)]="paused"
      [(currentTime)]="time"
      class="aspect-video w-full max-w-md"
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
    </div>

    <div class="w-56 space-y-3 text-sm">
      <button scButton (click)="paused.set(!paused())">
        {{ paused() ? 'Play' : 'Pause' }}
      </button>
      <p class="text-muted-foreground tabular-nums">
        {{ player.formatTime(time()) }} — {{ paused() ? 'paused' : 'playing' }}
      </p>
      <nav aria-label="Chapters">
        <ol class="space-y-1">
          @for (chapter of player.chapters(); track chapter.start) {
            <li>
              <button
                scButton
                variant="ghost"
                size="sm"
                class="w-full justify-between"
                [attr.aria-current]="chapter === player.chapter() || null"
                (click)="time.set(chapter.start)"
              >
                {{ chapter.title }}
                <span class="text-muted-foreground tabular-nums">{{
                  player.formatTime(chapter.start)
                }}</span>
              </button>
            </li>
          }
        </ol>
      </nav>
    </div>
  `,
  host: { class: 'flex w-full flex-wrap justify-center gap-6' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledVideoPlayerDemo {
  readonly paused = signal(true);
  readonly time = signal(0);
}
