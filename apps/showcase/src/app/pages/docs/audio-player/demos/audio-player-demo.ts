import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAudioPlayer,
  ScAudioPlayerArtist,
  ScAudioPlayerControls,
  ScAudioPlayerCover,
  ScAudioPlayerCoverImage,
  ScAudioPlayerCurrentTime,
  ScAudioPlayerDuration,
  ScAudioPlayerMaxVolume,
  ScAudioPlayerMute,
  ScAudioPlayerNext,
  ScAudioPlayerPlay,
  ScAudioPlayerPrevious,
  ScAudioPlayerProgress,
  ScAudioPlayerRepeat,
  ScAudioPlayerSeek,
  ScAudioPlayerSeekBar,
  ScAudioPlayerShuffle,
  ScAudioPlayerTitle,
  ScAudioPlayerTrackInfo,
  ScAudioPlayerVolume,
  ScAudioPlayerVolumeSlider,
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
  SiVolume1Icon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-audio-player-demo',
  imports: [
    SiVolumeXIcon,
    SiVolume1Icon,
    SiVolume2Icon,
    ScAudioPlayerCoverImage,
    ScAudioPlayerTitle,
    ScAudioPlayerArtist,
    ScAudioPlayerCurrentTime,
    ScAudioPlayerSeekBar,
    ScAudioPlayerSeek,
    ScAudioPlayerDuration,
    ScAudioPlayerMute,
    ScAudioPlayerVolumeSlider,
    ScAudioPlayerMaxVolume,
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
      <div scAudioPlayerCover>
        <img scAudioPlayerCoverImage alt="" />
      </div>

      <!-- Track Info -->
      <div scAudioPlayerTrackInfo>
        <p scAudioPlayerTitle>
          {{ player.currentTrack()?.title || 'Unknown track' }}
        </p>
        @if (player.currentTrack()?.artist; as artist) {
          <p scAudioPlayerArtist>{{ artist }}</p>
        }
      </div>

      <!-- Progress -->
      <div scAudioPlayerProgress>
        <span scAudioPlayerCurrentTime class="text-end"></span>
        <div scAudioPlayerSeekBar>
          <input scAudioPlayerSeek aria-label="Seek" />
        </div>
        <span scAudioPlayerDuration></span>
      </div>

      <!-- Controls -->
      <div scAudioPlayerControls>
        <button scAudioPlayerShuffle>
          <svg siShuffleIcon></svg>
          <span class="sr-only">Shuffle</span>
        </button>
        <button scAudioPlayerPrevious>
          <svg siSkipBackIcon></svg>
          <span class="sr-only">Previous track</span>
        </button>
        <button scAudioPlayerPlay>
          @if (player.isPlaying()) {
            <svg siPauseIcon></svg>
          } @else {
            <svg siPlayIcon></svg>
          }
          <span class="sr-only">{{
            player.isPlaying() ? 'Pause' : 'Play'
          }}</span>
        </button>
        <button scAudioPlayerNext>
          <svg siSkipForwardIcon></svg>
          <span class="sr-only">Next track</span>
        </button>
        <button scAudioPlayerRepeat>
          @if (player.repeat() === 'one') {
            <svg siRepeat1Icon></svg>
          } @else {
            <svg siRepeatIcon></svg>
          }
          <span class="sr-only">{{ 'Repeat: ' + player.repeat() }}</span>
        </button>
      </div>

      <!-- Volume -->
      <div scAudioPlayerVolume>
        <button scAudioPlayerMute>
          @if (player.isMuted() || player.volume() === 0) {
            <svg siVolumeXIcon></svg>
          } @else {
            <svg siVolume1Icon></svg>
          }
          <span class="sr-only">Mute</span>
        </button>
        <input scAudioPlayerVolumeSlider aria-label="Volume" class="w-24" />
        <button scAudioPlayerMaxVolume>
          <svg siVolume2Icon></svg>
          <span class="sr-only">Full volume</span>
        </button>
      </div>
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
