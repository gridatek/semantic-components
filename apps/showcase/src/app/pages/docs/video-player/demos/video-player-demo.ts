import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScVideoPlayer,
  ScVideoPlayerVideo,
  ScVideoPlayerControls,
  ScVideoPlayerPlayButton,
  ScVideoPlayerProgress,
  ScVideoPlayerVolume,
  ScVideoPlayerTime,
  ScVideoPlayerSkipButton,
  ScVideoPlayerSpeedButton,
  ScVideoPlayerFullscreenButton,
  ScVideoPlayerPipButton,
  ScVideoPlayerBigPlayButton,
  ScVideoPlayerBuffering,
} from '@semantic-components/ui-lab';
import {
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
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-video-player-demo',
  imports: [
    ScVideoPlayer,
    ScVideoPlayerVideo,
    ScVideoPlayerControls,
    ScVideoPlayerPlayButton,
    ScVideoPlayerProgress,
    ScVideoPlayerVolume,
    ScVideoPlayerTime,
    ScVideoPlayerSkipButton,
    ScVideoPlayerSpeedButton,
    ScVideoPlayerFullscreenButton,
    ScVideoPlayerPipButton,
    ScVideoPlayerBigPlayButton,
    ScVideoPlayerBuffering,
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
      #player="scVideoPlayer"
      class="relative bg-black rounded-lg overflow-hidden max-w-2xl"
    >
      <!-- Buffering Indicator -->
      <div scVideoPlayerBuffering>
        <svg siLoaderIcon></svg>
      </div>

      <!-- Video -->
      <video
        scVideoPlayerVideo
        [src]="sampleVideo"
        [poster]="samplePoster"
      ></video>

      <!-- Big Play Button -->
      @if (!player.isPlaying() && !player.isBuffering()) {
        <button scVideoPlayerBigPlay>
          <div
            class="size-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <svg siPlayIcon></svg>
          </div>
        </button>
      }

      <!-- Controls -->
      <div scVideoPlayerControls>
        <div scVideoPlayerProgress class="mb-2"></div>

        <div class="flex items-center gap-2">
          <!-- Play/Pause -->
          <button scVideoPlayerPlay>
            @if (player.isPlaying()) {
              <svg siPauseIcon></svg>
            } @else {
              <svg siPlayIcon></svg>
            }
          </button>

          <!-- Skip Back -->
          <button
            scVideoPlayerSkip
            [seconds]="-10"
            ariaLabel="Skip back 10 seconds"
          >
            <svg siRotateCcwIcon></svg>
          </button>

          <!-- Skip Forward -->
          <button
            scVideoPlayerSkip
            [seconds]="10"
            ariaLabel="Skip forward 10 seconds"
          >
            <svg siRotateCwIcon></svg>
          </button>

          <!-- Volume -->
          <div scVideoPlayerVolume>
            @if (player.isMuted() || player.volume() === 0) {
              <svg volume-icon siVolumeXIcon></svg>
            } @else {
              <svg volume-icon siVolume2Icon></svg>
            }
          </div>

          <!-- Time -->
          <span scVideoPlayerTime class="ml-2"></span>

          <!-- Spacer -->
          <div class="flex-1"></div>

          <!-- Playback Speed -->
          <div scVideoPlayerSpeed></div>

          <!-- Picture in Picture -->
          <button scVideoPlayerPip>
            <svg siPictureInPicture2Icon></svg>
          </button>

          <!-- Fullscreen -->
          <button scVideoPlayerFullscreen>
            @if (player.isFullscreen()) {
              <svg siMinimizeIcon></svg>
            } @else {
              <svg siMaximizeIcon></svg>
            }
          </button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerDemo {
  readonly sampleVideo =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  readonly samplePoster = 'https://picsum.photos/1280/720?random=1';
}
