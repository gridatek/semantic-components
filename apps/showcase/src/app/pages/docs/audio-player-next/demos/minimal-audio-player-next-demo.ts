import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAudioPlayerNext,
  ScAudioPlayerNextMedia,
  ScAudioPlayerNextPlay,
  ScAudioPlayerNextTime,
  ScAudioPlayerNextWaveform,
} from '@semantic-components/ui-lab';
import { SiPauseIcon, SiPlayIcon } from '@semantic-icons/lucide-icons';

/** One file, one line — like a voice message: play, the waveform, the time left. */
@Component({
  selector: 'app-minimal-audio-player-next-demo',
  imports: [
    ScAudioPlayerNext,
    ScAudioPlayerNextMedia,
    ScAudioPlayerNextPlay,
    ScAudioPlayerNextWaveform,
    ScAudioPlayerNextTime,
    SiPlayIcon,
    SiPauseIcon,
  ],
  template: `
    <div
      scAudioPlayerNext
      #player="scAudioPlayerNext"
      aria-label="Gymnopédie No. 1"
      class="bg-muted flex w-full max-w-sm items-center gap-3 rounded-full p-2 pe-4"
    >
      <audio
        scAudioPlayerNextMedia
        src="/media/gymnopedie-no-1.mp3"
        preload="metadata"
      ></audio>
      <button scAudioPlayerNextPlay class="shrink-0 rounded-full">
        @if (player.paused()) {
          <svg siPlayIcon></svg>
          <span class="sr-only">Play</span>
        } @else {
          <svg siPauseIcon></svg>
          <span class="sr-only">Pause</span>
        }
      </button>
      <div
        scAudioPlayerNextWaveform
        [bars]="40"
        aria-label="Seek"
        [attr.aria-valuetext]="
          player.formatTime(player.currentTime()) +
          ' of ' +
          player.formatTime(player.duration())
        "
        class="h-8"
      ></div>
      <time scAudioPlayerNextTime="remaining"></time>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalAudioPlayerNextDemo {}
