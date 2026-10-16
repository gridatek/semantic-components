import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledAudioPlayerNextDemo } from './controlled-audio-player-next-demo';

@Component({
  selector: 'app-controlled-audio-player-next-demo-container',
  imports: [DemoContainer, ControlledAudioPlayerNextDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/audio-player-next/controlled-audio-player-next-demo"
    >
      <app-controlled-audio-player-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledAudioPlayerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';
import {
  ScAudioPlayerNext,
  ScAudioPlayerNextMedia,
  ScAudioPlayerNextSeek,
} from '@semantic-components/ui-lab';

/** Its state is yours, two ways: the track, played, paused, timed and repeated from outside. */
@Component({
  selector: 'app-controlled-audio-player-next-demo',
  imports: [
    ScButton,
    ScRadioGroup,
    ScRadioField,
    ScRadio,
    FormField,
    ScAudioPlayerNext,
    ScAudioPlayerNextMedia,
    ScAudioPlayerNextSeek,
  ],
  template: \`
    <div
      scAudioPlayerNext
      #player="scAudioPlayerNext"
      aria-label="Player"
      [tracks]="songs"
      [(track)]="track"
      [(paused)]="paused"
      [(currentTime)]="time"
      [repeat]="settings().repeat"
      (repeatChange)="settings.set({ repeat: $event })"
      class="w-full max-w-sm space-y-4"
    >
      <audio scAudioPlayerNextMedia preload="metadata"></audio>

      <div class="flex items-center gap-3">
        <button scButton class="w-20" (click)="paused.set(!paused())">
          {{ paused() ? 'Play' : 'Pause' }}
        </button>
        <p class="text-muted-foreground text-sm tabular-nums">
          {{ songs[track()].title }} · {{ player.formatTime(time()) }}
        </p>
      </div>

      <input
        scAudioPlayerNextSeek
        aria-label="Seek"
        [attr.aria-valuetext]="
          player.formatTime(time()) +
          ' of ' +
          player.formatTime(player.duration())
        "
      />

      <ol aria-label="Playlist" class="space-y-1">
        @for (song of songs; track song.src; let i = $index) {
          <li>
            <button
              scButton
              variant="ghost"
              size="sm"
              class="w-full justify-start"
              [attr.aria-current]="i === track() || null"
              (click)="track.set(i)"
            >
              {{ i + 1 }}. {{ song.title }}
            </button>
          </li>
        }
      </ol>

      <div class="flex items-center gap-4 text-sm">
        <span id="repeat-label" class="text-muted-foreground">Repeat:</span>
        <div
          scRadioGroup
          orientation="horizontal"
          aria-labelledby="repeat-label"
        >
          @for (mode of modes; track mode) {
            <label scRadioField>
              <input
                type="radio"
                scRadio
                [value]="mode"
                [formField]="settingsForm.repeat"
              />
              {{ mode }}
            </label>
          }
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledAudioPlayerNextDemo {
  readonly songs = [
    { src: '/media/carefree.mp3', title: 'Carefree' },
    { src: '/media/sneaky-snitch.mp3', title: 'Sneaky Snitch' },
    { src: '/media/gymnopedie-no-1.mp3', title: 'Gymnopédie No. 1' },
  ];
  readonly modes = ['off', 'all', 'one'] as const;

  readonly track = signal(0);
  readonly paused = signal(true);
  readonly time = signal(0);
  readonly settings = signal<{ repeat: 'off' | 'all' | 'one' }>({
    repeat: 'off',
  });
  readonly settingsForm = form(this.settings);
}`;
}
