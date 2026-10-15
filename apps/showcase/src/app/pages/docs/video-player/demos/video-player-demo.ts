import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import {
  ScVideoPlayer,
  ScVideoPlayerBigPlay,
  ScVideoPlayerBufferingIndicator,
  ScVideoPlayerControls,
  ScVideoPlayerFullscreen,
  ScVideoPlayerMute,
  ScVideoPlayerPip,
  ScVideoPlayerPlayPause,
  ScVideoPlayerProgress,
  ScVideoPlayerSeek,
  ScVideoPlayerSkip,
  ScVideoPlayerSpacer,
  ScVideoPlayerSpeedOption,
  ScVideoPlayerTime,
  ScVideoPlayerToolbar,
  ScVideoPlayerVolume,
  ScVideoPlayerVolumeSlider,
} from '@semantic-components/ui-lab';
import {
  SiLoaderIcon,
  SiMaximizeIcon,
  SiMinimizeIcon,
  SiPauseIcon,
  SiPictureInPicture2Icon,
  SiPlayIcon,
  SiRotateCcwIcon,
  SiRotateCwIcon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-video-player-demo',
  imports: [
    ScButton,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScVideoPlayerSeek,
    ScVideoPlayerMute,
    ScVideoPlayerVolumeSlider,
    ScVideoPlayerSpeedOption,
    ScVideoPlayer,
    ScVideoPlayerControls,
    ScVideoPlayerPlayPause,
    ScVideoPlayerProgress,
    ScVideoPlayerVolume,
    ScVideoPlayerTime,
    ScVideoPlayerSkip,
    ScVideoPlayerFullscreen,
    ScVideoPlayerPip,
    ScVideoPlayerBigPlay,
    ScVideoPlayerBufferingIndicator,
    ScVideoPlayerSpacer,
    ScVideoPlayerToolbar,
    SiPlayIcon,
    SiPauseIcon,
    SiVolumeXIcon,
    SiVolume2Icon,
    SiMaximizeIcon,
    SiMinimizeIcon,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiPictureInPicture2Icon,
    SiLoaderIcon,
  ],
  template: `
    <div
      scVideoPlayer
      aria-label="Video player"
      #player="scVideoPlayer"
      [src]="sampleVideo"
      [poster]="samplePoster"
    >
      <svg scVideoPlayerBufferingIndicator siLoaderIcon></svg>

      <button scVideoPlayerBigPlay>
        <svg siPlayIcon></svg>
        <span class="sr-only">Play video</span>
      </button>

      <!-- Controls -->
      <div scVideoPlayerControls>
        <div scVideoPlayerProgress>
          <input scVideoPlayerSeek aria-label="Video progress" />
        </div>

        <div scVideoPlayerToolbar>
          <!-- Play/Pause -->
          <button scVideoPlayerPlayPause>
            @if (player.isPlaying()) {
              <svg siPauseIcon></svg>
            } @else {
              <svg siPlayIcon></svg>
            }
            <span class="sr-only">{{
              player.isPlaying() ? 'Pause' : 'Play'
            }}</span>
          </button>

          <!-- Skip Back -->
          <button scVideoPlayerSkip [seconds]="-10">
            <svg siRotateCcwIcon></svg>
            <span class="sr-only">Skip back 10 seconds</span>
          </button>

          <!-- Skip Forward -->
          <button scVideoPlayerSkip [seconds]="10">
            <svg siRotateCwIcon></svg>
            <span class="sr-only">Skip forward 10 seconds</span>
          </button>

          <!-- Volume -->
          <div scVideoPlayerVolume>
            <button scVideoPlayerMute>
              @if (player.isMuted() || player.volume() === 0) {
                <svg siVolumeXIcon></svg>
              } @else {
                <svg siVolume2Icon></svg>
              }
              <span class="sr-only">Mute</span>
            </button>
            <input scVideoPlayerVolumeSlider aria-label="Volume" />
          </div>

          <!-- Time -->
          <span scVideoPlayerTime class="ml-2"></span>

          <div scVideoPlayerSpacer></div>

          <!-- Playback Speed -->
          <div scPopoverProvider side="top" align="center">
            <button
              scButton
              scPopoverTrigger
              variant="ghost"
              size="icon"
              class="text-foreground"
              aria-label="Playback speed"
            >
              <span class="text-xs font-medium"
                >{{ player.playbackRate() }}×</span
              >
            </button>
            <ng-template scPopoverPortal>
              <div
                scPopover
                aria-label="Playback speed"
                class="w-auto min-w-20 gap-0 p-1"
              >
                @for (speed of speeds; track speed) {
                  <button [scVideoPlayerSpeedOption]="speed">
                    {{ speed }}×
                  </button>
                }
              </div>
            </ng-template>
          </div>

          <!-- Picture in Picture -->
          <button scVideoPlayerPip>
            <svg siPictureInPicture2Icon></svg>
            <span class="sr-only">Picture in picture</span>
          </button>

          <!-- Fullscreen -->
          <button scVideoPlayerFullscreen>
            @if (player.isFullscreen()) {
              <svg siMinimizeIcon></svg>
            } @else {
              <svg siMaximizeIcon></svg>
            }
            <span class="sr-only">{{
              player.isFullscreen() ? 'Exit fullscreen' : 'Enter fullscreen'
            }}</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerDemo {
  readonly speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  readonly sampleVideo =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  readonly samplePoster = 'https://picsum.photos/1280/720?random=1';
}
