import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAudioPlayer,
  ScAudioPlayerCover,
  ScAudioPlayerInfo,
  ScAudioPlayerProgress,
  ScAudioPlayerPlayButton,
  ScAudioPlayerPrevious,
  ScAudioPlayerNext,
  ScAudioPlayerShuffle,
  ScAudioPlayerRepeat,
  ScAudioPlayerVolume,
  ScAudioTrack,
} from '@semantic-components/ui-lab';
import {
  SiPlayIcon,
  SiPauseIcon,
  SiSkipBackIcon,
  SiSkipForwardIcon,
  SiRepeatIcon,
  SiRepeat1Icon,
  SiShuffleIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-audio-player-demo',
  imports: [
    ScAudioPlayer,
    ScAudioPlayerCover,
    ScAudioPlayerInfo,
    ScAudioPlayerProgress,
    ScAudioPlayerPlayButton,
    ScAudioPlayerPrevious,
    ScAudioPlayerNext,
    ScAudioPlayerShuffle,
    ScAudioPlayerRepeat,
    ScAudioPlayerVolume,
    SiPlayIcon,
    SiPauseIcon,
    SiSkipBackIcon,
    SiSkipForwardIcon,
    SiRepeatIcon,
    SiRepeat1Icon,
    SiShuffleIcon,
  ],
  template: `
    <div
      scAudioPlayer
      #player="scAudioPlayer"
      [tracks]="tracks"
      class="flex flex-col gap-3 p-4 bg-card border rounded-lg max-w-md"
    >
      <!-- Cover -->
      <div
        scAudioPlayerCover
        class="w-full aspect-square max-w-[200px] mx-auto"
      ></div>

      <!-- Track Info -->
      <div scAudioPlayerInfo class="text-center"></div>

      <!-- Progress -->
      <div scAudioPlayerProgress></div>

      <!-- Controls -->
      <div class="flex items-center justify-center gap-2">
        <button scAudioPlayerShuffle>
          <svg siShuffleIcon></svg>
        </button>
        <button scAudioPlayerPrevious>
          <svg siSkipBackIcon></svg>
        </button>
        <button scAudioPlayerPlayButton>
          @if (player.isPlaying()) {
            <svg siPauseIcon></svg>
          } @else {
            <svg siPlayIcon></svg>
          }
        </button>
        <button scAudioPlayerNext>
          <svg siSkipForwardIcon></svg>
        </button>
        <button scAudioPlayerRepeat>
          @if (player.repeat() === 'one') {
            <svg siRepeat1Icon></svg>
          } @else {
            <svg siRepeatIcon></svg>
          }
        </button>
      </div>

      <!-- Volume -->
      <div scAudioPlayerVolume class="justify-center"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerDemo {
  readonly tracks: ScAudioTrack[] = [
    {
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'SoundHelix Song 1',
      artist: 'T. Schürger',
      cover: 'https://picsum.photos/200/200?random=1',
    },
    {
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      title: 'SoundHelix Song 2',
      artist: 'T. Schürger',
      cover: 'https://picsum.photos/200/200?random=2',
    },
    {
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      title: 'SoundHelix Song 3',
      artist: 'T. Schürger',
      cover: 'https://picsum.photos/200/200?random=3',
    },
  ];
}
