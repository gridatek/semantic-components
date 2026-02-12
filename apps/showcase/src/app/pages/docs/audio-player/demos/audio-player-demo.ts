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
      sc-audio-player
      #player="scAudioPlayer"
      [tracks]="tracks"
      class="flex flex-col gap-3 p-4 bg-card border rounded-lg max-w-md"
    >
      <!-- Cover -->
      <div
        sc-audio-player-cover
        class="w-full aspect-square max-w-[200px] mx-auto"
      ></div>

      <!-- Track Info -->
      <div sc-audio-player-info class="text-center"></div>

      <!-- Progress -->
      <div sc-audio-player-progress></div>

      <!-- Controls -->
      <div class="flex items-center justify-center gap-2">
        <button sc-audio-player-shuffle>
          <svg si-shuffle-icon></svg>
        </button>
        <button sc-audio-player-previous>
          <svg si-skip-back-icon></svg>
        </button>
        <button sc-audio-player-play-button>
          @if (player.isPlaying()) {
            <svg si-pause-icon></svg>
          } @else {
            <svg si-play-icon></svg>
          }
        </button>
        <button sc-audio-player-next>
          <svg si-skip-forward-icon></svg>
        </button>
        <button sc-audio-player-repeat>
          @if (player.repeat() === 'one') {
            <svg si-repeat-1-icon></svg>
          } @else {
            <svg si-repeat-icon></svg>
          }
        </button>
      </div>

      <!-- Volume -->
      <div sc-audio-player-volume class="justify-center"></div>
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
