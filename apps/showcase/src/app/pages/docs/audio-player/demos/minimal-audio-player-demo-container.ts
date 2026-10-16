import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalAudioPlayerDemo } from './minimal-audio-player-demo';

@Component({
  selector: 'app-minimal-audio-player-demo-container',
  imports: [DemoContainer, MinimalAudioPlayerDemo],
  template: `
    <app-demo-container
      title="Minimal"
      [code]="code"
      demoUrl="/demos/audio-player/minimal-audio-player-demo"
    >
      <app-minimal-audio-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalAudioPlayerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAudioPlayer,
  ScAudioPlayerMedia,
  ScAudioPlayerPlay,
  ScAudioPlayerTime,
  ScAudioPlayerWaveform,
} from '@semantic-components/ui-lab';
import { SiPauseIcon, SiPlayIcon } from '@semantic-icons/lucide-icons';

/** One file, one line — like a voice message: play, the waveform, the time left. */
@Component({
  selector: 'app-minimal-audio-player-demo',
  imports: [
    ScAudioPlayer,
    ScAudioPlayerMedia,
    ScAudioPlayerPlay,
    ScAudioPlayerWaveform,
    ScAudioPlayerTime,
    SiPlayIcon,
    SiPauseIcon,
  ],
  template: \`
    <div
      scAudioPlayer
      #player="scAudioPlayer"
      aria-label="Gymnopédie No. 1"
      class="bg-muted flex w-full max-w-sm items-center gap-3 rounded-full p-2 pe-4"
    >
      <audio
        scAudioPlayerMedia
        src="/media/gymnopedie-no-1.mp3"
        preload="metadata"
      ></audio>
      <button scAudioPlayerPlay class="shrink-0 rounded-full">
        @if (player.paused()) {
          <svg siPlayIcon></svg>
          <span class="sr-only">Play</span>
        } @else {
          <svg siPauseIcon></svg>
          <span class="sr-only">Pause</span>
        }
      </button>
      <div
        scAudioPlayerWaveform
        [bars]="40"
        aria-label="Seek"
        [attr.aria-valuetext]="
          player.formatTime(player.currentTime()) +
          ' of ' +
          player.formatTime(player.duration())
        "
        class="h-8"
      ></div>
      <time scAudioPlayerTime="remaining"></time>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalAudioPlayerDemo {}`;
}
