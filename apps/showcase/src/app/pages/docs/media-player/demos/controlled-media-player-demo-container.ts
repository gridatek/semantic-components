import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledMediaPlayerDemo } from './controlled-media-player-demo';

@Component({
  selector: 'app-controlled-media-player-demo-container',
  imports: [DemoContainer, ControlledMediaPlayerDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/media-player/controlled-media-player-demo"
    >
      <app-controlled-media-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledMediaPlayerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMediaPlayer,
  ScMediaPlayerMedia,
} from '@semantic-components/ui';

/** State two ways: [(paused)] and [(currentTime)] from outside — a play button and the chapters, read from the video. */
@Component({
  selector: 'app-controlled-media-player-demo',
  imports: [ScButton, ScMediaPlayer, ScMediaPlayerMedia],
  template: \`
    <div
      scMediaPlayer
      #player="scMediaPlayer"
      aria-label="Video: Sintel, the trailer"
      class="aspect-video w-full max-w-md"
      [(paused)]="paused"
      [(currentTime)]="time"
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
  \`,
  host: { class: 'flex w-full flex-wrap justify-center gap-6' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledMediaPlayerDemo {
  private readonly paused = signal(true);
  private readonly time = signal(0);
}`;
}
