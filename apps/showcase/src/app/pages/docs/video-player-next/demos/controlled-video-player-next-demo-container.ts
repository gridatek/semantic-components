import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledVideoPlayerNextDemo } from './controlled-video-player-next-demo';

@Component({
  selector: 'app-controlled-video-player-next-demo-container',
  imports: [DemoContainer, ControlledVideoPlayerNextDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/video-player-next/controlled-video-player-next-demo"
    >
      <app-controlled-video-player-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledVideoPlayerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScVideoPlayerNext,
  ScVideoPlayerNextMedia,
} from '@semantic-components/ui-lab';

/** Its state is yours, two ways: chapters as a list that jumps, and the player played, paused and timed from outside. */
@Component({
  selector: 'app-controlled-video-player-next-demo',
  imports: [ScButton, ScVideoPlayerNext, ScVideoPlayerNextMedia],
  template: \`
    <div
      scVideoPlayerNext
      #player="scVideoPlayerNext"
      aria-label="Video: Sintel, the trailer"
      [(paused)]="paused"
      [(currentTime)]="time"
      class="aspect-video w-full max-w-md"
    >
      <video
        scVideoPlayerNextMedia
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
  \`,
  host: { class: 'flex w-full flex-wrap justify-center gap-6' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledVideoPlayerNextDemo {
  readonly paused = signal(true);
  readonly time = signal(0);
}`;
}
