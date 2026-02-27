import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScVideoPlayer,
  ScVideoPlayerVideo,
  ScVideoPlayerControls,
  ScVideoPlayerPlay,
  ScVideoPlayerProgress,
  ScVideoPlayerVolume,
  ScVideoPlayerTime,
  ScVideoPlayerSkip,
  ScVideoPlayerSpeed,
  ScVideoPlayerFullscreen,
  ScVideoPlayerPip,
  ScVideoPlayerBigPlay,
  ScVideoPlayerBuffering,
  ScVideoPlayerSpacer,
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
    ScVideoPlayerPlay,
    ScVideoPlayerProgress,
    ScVideoPlayerVolume,
    ScVideoPlayerTime,
    ScVideoPlayerSkip,
    ScVideoPlayerSpeed,
    ScVideoPlayerFullscreen,
    ScVideoPlayerPip,
    ScVideoPlayerBigPlay,
    ScVideoPlayerBuffering,
    ScVideoPlayerSpacer,
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
      class="relative max-w-2xl overflow-hidden rounded-lg bg-black"
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
          <svg siPlayIcon></svg>
        </button>
      }

      <!-- Controls -->
      <div scVideoPlayerControls>
        <div scVideoPlayerProgress></div>

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

          <div scVideoPlayerSpacer></div>

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
