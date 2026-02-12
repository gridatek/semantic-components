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
      sc-video-player
      #player="scVideoPlayer"
      class="relative bg-black rounded-lg overflow-hidden max-w-2xl"
    >
      <!-- Buffering Indicator -->
      <div sc-video-player-buffering>
        <svg si-loader-icon></svg>
      </div>

      <!-- Video -->
      <video
        sc-video-player-video
        [src]="sampleVideo"
        [poster]="samplePoster"
      ></video>

      <!-- Big Play Button -->
      @if (!player.isPlaying() && !player.isBuffering()) {
        <button sc-video-player-big-play>
          <div
            class="size-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <svg si-play-icon></svg>
          </div>
        </button>
      }

      <!-- Controls -->
      <div sc-video-player-controls>
        <div sc-video-player-progress class="mb-2"></div>

        <div class="flex items-center gap-2">
          <!-- Play/Pause -->
          <button sc-video-player-play>
            @if (player.isPlaying()) {
              <svg si-pause-icon></svg>
            } @else {
              <svg si-play-icon></svg>
            }
          </button>

          <!-- Skip Back -->
          <button
            sc-video-player-skip
            [seconds]="-10"
            ariaLabel="Skip back 10 seconds"
          >
            <svg si-rotate-ccw-icon></svg>
          </button>

          <!-- Skip Forward -->
          <button
            sc-video-player-skip
            [seconds]="10"
            ariaLabel="Skip forward 10 seconds"
          >
            <svg si-rotate-cw-icon></svg>
          </button>

          <!-- Volume -->
          <div sc-video-player-volume>
            @if (player.isMuted() || player.volume() === 0) {
              <svg volume-icon si-volume-x-icon></svg>
            } @else {
              <svg volume-icon si-volume-2-icon></svg>
            }
          </div>

          <!-- Time -->
          <span sc-video-player-time class="ml-2"></span>

          <!-- Spacer -->
          <div class="flex-1"></div>

          <!-- Playback Speed -->
          <div sc-video-player-speed></div>

          <!-- Picture in Picture -->
          <button sc-video-player-pip>
            <svg si-picture-in-picture-2-icon></svg>
          </button>

          <!-- Fullscreen -->
          <button sc-video-player-fullscreen>
            @if (player.isFullscreen()) {
              <svg si-minimize-icon></svg>
            } @else {
              <svg si-maximize-icon></svg>
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
