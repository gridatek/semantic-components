import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_VIDEO_PLAYER } from './video-player';
import type { ScVideoSource, ScVideoTrack } from './video-player-types';

@Component({
  selector: 'video[sc-video-player-video]',
  template: `
    @for (source of sources(); track source.src) {
      <source [src]="source.src" [type]="source.type || 'video/mp4'" />
    }
    @if (src()) {
      <source [src]="src()" type="video/mp4" />
    }
    @for (track of tracks(); track track.src) {
      <track
        [src]="track.src"
        [kind]="track.kind"
        [srclang]="track.srclang"
        [label]="track.label"
        [default]="track.default"
      />
    }
  `,
  host: {
    '[class]': 'class()',
    '[poster]': 'poster()',
    '[autoplay]': 'autoplay()',
    '[loop]': 'loop()',
    '[muted]': 'muted()',
    '[playsInline]': 'playsInline()',
    '(timeupdate)': 'onTimeUpdate()',
    '(loadedmetadata)': 'onLoadedMetadata()',
    '(ended)': 'ended.emit()',
    '(play)': 'onPlay()',
    '(pause)': 'onPause()',
    '(waiting)': 'player.isBuffering.set(true)',
    '(canplay)': 'player.isBuffering.set(false)',
    '(volumechange)': 'onVolumeChange()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerVideo {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  private readonly elementRef = inject(ElementRef<HTMLVideoElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly src = input<string>('');
  readonly sources = input<ScVideoSource[]>([]);
  readonly tracks = input<ScVideoTrack[]>([]);
  readonly poster = input<string>('');
  readonly autoplay = input<boolean>(false);
  readonly loop = input<boolean>(false);
  readonly muted = input<boolean>(false);
  readonly playsInline = input<boolean>(true);
  readonly aspectRatio = input<string>('16/9');
  readonly classInput = input<string>('', { alias: 'class' });

  // Outputs
  readonly ended = output<void>();
  readonly timeUpdate = output<number>();

  protected readonly class = computed(() =>
    cn(
      'w-full h-full object-contain',
      `aspect-[${this.aspectRatio()}]`,
      this.classInput(),
    ),
  );

  constructor() {
    afterNextRender(() => {
      const video = this.elementRef.nativeElement;
      this.player.videoElement.set(video);
    });

    this.destroyRef.onDestroy(() => {
      this.player.videoElement.set(null);
    });
  }

  protected onTimeUpdate(): void {
    const video = this.elementRef.nativeElement;
    this.player.currentTime.set(video.currentTime);
    this.timeUpdate.emit(video.currentTime);

    // Update buffered
    if (video.buffered.length > 0) {
      this.player.buffered.set(video.buffered.end(video.buffered.length - 1));
    }
  }

  protected onLoadedMetadata(): void {
    const video = this.elementRef.nativeElement;
    this.player.duration.set(video.duration);
    video.volume = this.player.volume();
    video.playbackRate = this.player.playbackRate();
  }

  protected onPlay(): void {
    this.player.isPlaying.set(true);
  }

  protected onPause(): void {
    this.player.isPlaying.set(false);
  }

  protected onVolumeChange(): void {
    const video = this.elementRef.nativeElement;
    this.player.isMuted.set(video.muted);
    if (!video.muted) {
      this.player.volume.set(video.volume);
    }
  }
}
