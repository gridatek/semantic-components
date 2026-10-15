import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAudioPlayer,
  ScAudioPlayerControls,
  ScAudioPlayerCover,
  ScAudioPlayerNext,
  ScAudioPlayerPlay,
  ScAudioPlayerPrevious,
  ScAudioPlayerProgress,
  ScAudioPlayerRepeat,
  ScAudioPlayerShuffle,
  ScAudioPlayerTrackInfo,
  ScAudioPlayerVolume,
  ScAudioTrack,
} from '@semantic-components/ui-lab';
import {
  SiPauseIcon,
  SiPlayIcon,
  SiRepeat1Icon,
  SiRepeatIcon,
  SiShuffleIcon,
  SiSkipBackIcon,
  SiSkipForwardIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-audio-player-demo',
  imports: [
    ScAudioPlayer,
    ScAudioPlayerCover,
    ScAudioPlayerTrackInfo,
    ScAudioPlayerProgress,
    ScAudioPlayerControls,
    ScAudioPlayerPlay,
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
    <div scAudioPlayer #player="scAudioPlayer" [tracks]="tracks">
      <!-- Cover -->
      <div scAudioPlayerCover></div>

      <!-- Track Info -->
      <div scAudioPlayerTrackInfo unknownLabel="Unknown track"></div>

      <!-- Progress -->
      <div scAudioPlayerProgress seekLabel="Seek"></div>

      <!-- Controls -->
      <div scAudioPlayerControls>
        <button scAudioPlayerShuffle aria-label="Shuffle">
          <svg siShuffleIcon></svg>
        </button>
        <button scAudioPlayerPrevious aria-label="Previous track">
          <svg siSkipBackIcon></svg>
        </button>
        <button
          scAudioPlayerPlay
          [attr.aria-label]="player.isPlaying() ? 'Pause' : 'Play'"
        >
          @if (player.isPlaying()) {
            <svg siPauseIcon></svg>
          } @else {
            <svg siPlayIcon></svg>
          }
        </button>
        <button scAudioPlayerNext aria-label="Next track">
          <svg siSkipForwardIcon></svg>
        </button>
        <button
          scAudioPlayerRepeat
          [attr.aria-label]="'Repeat: ' + player.repeat()"
        >
          @if (player.repeat() === 'one') {
            <svg siRepeat1Icon></svg>
          } @else {
            <svg siRepeatIcon></svg>
          }
        </button>
      </div>

      <!-- Volume -->
      <div
        scAudioPlayerVolume
        muteLabel="Mute"
        unmuteLabel="Unmute"
        volumeLabel="Volume"
        maxVolumeLabel="Max volume"
      ></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
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
