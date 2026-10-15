import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AudioPlayerDemo } from './audio-player-demo';

@Component({
  selector: 'app-audio-player-demo-container',
  imports: [DemoContainer, AudioPlayerDemo],
  template: `
    <app-demo-container
      title="Demo Audio Player"
      demoUrl="/demos/audio-player/audio-player-demo"
      [code]="code"
    >
      <app-audio-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AudioPlayerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  template: \`
    <div scAudioPlayer #player="scAudioPlayer" [tracks]="tracks">
      <!-- Cover -->
      <div scAudioPlayerCover></div>

      <!-- Track Info -->
      <div scAudioPlayerTrackInfo unknownLabel="Unknown track"></div>

      <!-- Progress -->
      <div scAudioPlayerProgress seekLabel="Seek"></div>

      <!-- Controls -->
      <div scAudioPlayerControls>
        <button scAudioPlayerShuffle>
          <svg siShuffleIcon></svg>
        </button>
        <button scAudioPlayerPrevious aria-label="Previous track">
          <svg siSkipBackIcon></svg>
        </button>
        <button scAudioPlayerPlay>
          @if (player.isPlaying()) {
            <svg siPauseIcon></svg>
          } @else {
            <svg siPlayIcon></svg>
          }
        </button>
        <button scAudioPlayerNext aria-label="Next track">
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
      <div
        scAudioPlayerVolume
        muteLabel="Mute"
        unmuteLabel="Unmute"
        volumeLabel="Volume"
        maxVolumeLabel="Max volume"
      ></div>
    </div>
  \`,
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
}`;
}
