import { computed, Directive, InjectionToken, signal } from '@angular/core';

export const SC_VIDEO_PLAYER = new InjectionToken<ScVideoPlayer>(
  'SC_VIDEO_PLAYER',
);

@Directive({
  selector: '[sc-video-player]',
  exportAs: 'scVideoPlayer',
  providers: [{ provide: SC_VIDEO_PLAYER, useExisting: ScVideoPlayer }],
  host: {
    'data-slot': 'video-player',
  },
})
export class ScVideoPlayer {
  // Video element reference
  readonly videoElement = signal<HTMLVideoElement | null>(null);

  // Playback state
  readonly isPlaying = signal(false);
  readonly isBuffering = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  readonly buffered = signal(0);

  // Volume state
  readonly volume = signal(1);
  readonly isMuted = signal(false);

  // UI state
  readonly isFullscreen = signal(false);
  readonly showControls = signal(true);
  readonly playbackRate = signal(1);

  // Computed
  readonly progressPercent = computed(() => {
    const duration = this.duration();
    if (duration === 0) return 0;
    return (this.currentTime() / duration) * 100;
  });

  readonly bufferedPercent = computed(() => {
    const duration = this.duration();
    if (duration === 0) return 0;
    return (this.buffered() / duration) * 100;
  });

  // Methods
  play(): void {
    this.videoElement()?.play();
  }

  pause(): void {
    this.videoElement()?.pause();
  }

  togglePlay(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  skip(seconds: number): void {
    const video = this.videoElement();
    if (!video) return;
    video.currentTime = Math.max(
      0,
      Math.min(video.duration, video.currentTime + seconds),
    );
  }

  setVolume(value: number): void {
    const video = this.videoElement();
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    this.volume.set(value);
    this.isMuted.set(value === 0);
  }

  toggleMute(): void {
    const video = this.videoElement();
    if (!video) return;

    if (this.isMuted()) {
      video.muted = false;
      const vol = this.volume() || 0.5;
      video.volume = vol;
      this.isMuted.set(false);
    } else {
      video.muted = true;
      this.isMuted.set(true);
    }
  }

  setPlaybackRate(rate: number): void {
    const video = this.videoElement();
    if (!video) return;
    video.playbackRate = rate;
    this.playbackRate.set(rate);
  }

  seek(percent: number): void {
    const video = this.videoElement();
    if (!video) return;
    video.currentTime = (percent / 100) * video.duration;
  }

  toggleFullscreen(): void {
    const container = this.videoElement()?.parentElement;
    if (!container) return;

    if (this.isFullscreen()) {
      document.exitFullscreen?.();
    } else {
      container.requestFullscreen?.();
    }
  }

  togglePiP(): void {
    const video = this.videoElement();
    if (!video) return;

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture?.();
    } else {
      video.requestPictureInPicture?.();
    }
  }

  formatTime(seconds: number): string {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
