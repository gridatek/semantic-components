import {
  computed,
  DestroyRef,
  Component,
  inject,
  input,
  InjectionToken,
  model,
  output,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ScAudioPlayerAudio } from './audio-player-audio';

export interface ScAudioTrack {
  src: string;
  title?: string;
  artist?: string;
  cover?: string;
  duration?: number;
}

export const SC_AUDIO_PLAYER = new InjectionToken<ScAudioPlayer>(
  'SC_AUDIO_PLAYER',
);

@Component({
  selector: '[sc-audio-player]',
  imports: [ScAudioPlayerAudio],
  template: `
    <ng-content />
    <audio sc-audio-player-audio class="hidden"></audio>
  `,
  exportAs: 'scAudioPlayer',
  providers: [{ provide: SC_AUDIO_PLAYER, useExisting: ScAudioPlayer }],
  host: {
    'data-slot': 'audio-player',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayer {
  private readonly destroyRef = inject(DestroyRef);
  private audioElement = signal<HTMLAudioElement | null>(null);

  // Inputs
  readonly tracks = input<ScAudioTrack[]>([]);
  readonly autoplay = input<boolean>(false);

  // Models
  readonly currentIndex = model<number>(0);
  readonly volume = model<number>(1);
  readonly shuffle = model<boolean>(false);
  readonly repeat = model<'none' | 'one' | 'all'>('none');

  // Outputs
  readonly trackChange = output<ScAudioTrack>();
  readonly play = output<void>();
  readonly pause = output<void>();
  readonly ended = output<void>();

  // Internal state
  readonly isPlaying = signal(false);
  readonly isMuted = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  private previousVolume = 1;

  readonly currentTrack = computed(() => {
    const tracks = this.tracks();
    const index = this.currentIndex();
    return tracks[index] ?? null;
  });

  readonly progressPercent = computed(() => {
    const duration = this.duration();
    if (duration === 0) return 0;
    return (this.currentTime() / duration) * 100;
  });

  readonly canGoPrevious = computed(() => {
    return this.tracks().length > 1;
  });

  readonly canGoNext = computed(() => {
    return this.tracks().length > 1;
  });

  registerAudioElement(element: HTMLAudioElement): void {
    this.audioElement.set(element);
    element.volume = this.volume();

    if (this.autoplay()) {
      element.play().catch(() => {
        // Autoplay blocked by browser
      });
    }
  }

  togglePlay(): void {
    const audio = this.audioElement();
    if (!audio) return;
    if (this.isPlaying()) {
      audio.pause();
      this.pause.emit();
    } else {
      audio.play();
      this.play.emit();
    }
  }

  previous(): void {
    const tracks = this.tracks();
    if (tracks.length === 0) return;

    // If more than 3 seconds in, restart current track
    if (this.currentTime() > 3) {
      this.seek(0);
      return;
    }

    let newIndex: number;
    if (this.shuffle()) {
      newIndex = Math.floor(Math.random() * tracks.length);
    } else {
      newIndex = this.currentIndex() - 1;
      if (newIndex < 0) {
        newIndex = tracks.length - 1;
      }
    }

    this.currentIndex.set(newIndex);
    this.trackChange.emit(tracks[newIndex]);

    if (this.isPlaying()) {
      const audio = this.audioElement();
      if (audio) {
        setTimeout(() => audio.play(), 0);
      }
    }
  }

  next(): void {
    const tracks = this.tracks();
    if (tracks.length === 0) return;

    let newIndex: number;
    if (this.shuffle()) {
      newIndex = Math.floor(Math.random() * tracks.length);
    } else {
      newIndex = this.currentIndex() + 1;
      if (newIndex >= tracks.length) {
        newIndex = 0;
      }
    }

    this.currentIndex.set(newIndex);
    this.trackChange.emit(tracks[newIndex]);

    if (this.isPlaying()) {
      const audio = this.audioElement();
      if (audio) {
        setTimeout(() => audio.play(), 0);
      }
    }
  }

  seek(time: number): void {
    const audio = this.audioElement();
    if (!audio) return;
    audio.currentTime = time;
    this.currentTime.set(time);
  }

  toggleMute(): void {
    const audio = this.audioElement();
    if (!audio) return;
    if (this.isMuted()) {
      audio.volume = this.previousVolume;
      this.volume.set(this.previousVolume);
      this.isMuted.set(false);
    } else {
      this.previousVolume = this.volume();
      audio.volume = 0;
      this.volume.set(0);
      this.isMuted.set(true);
    }
  }

  cycleRepeat(): void {
    const current = this.repeat();
    if (current === 'none') {
      this.repeat.set('all');
    } else if (current === 'all') {
      this.repeat.set('one');
    } else {
      this.repeat.set('none');
    }
  }

  onTimeUpdate(): void {
    const audio = this.audioElement();
    if (!audio) return;
    this.currentTime.set(audio.currentTime);
  }

  onLoadedMetadata(): void {
    const audio = this.audioElement();
    if (!audio) return;
    this.duration.set(audio.duration);
  }

  onEnded(): void {
    this.ended.emit();

    const repeatMode = this.repeat();
    if (repeatMode === 'one') {
      this.seek(0);
      const audio = this.audioElement();
      if (audio) {
        audio.play();
      }
    } else if (
      repeatMode === 'all' ||
      this.currentIndex() < this.tracks().length - 1
    ) {
      this.next();
    }
  }

  setVolume(value: number): void {
    const audio = this.audioElement();
    if (!audio) return;
    audio.volume = value;
    this.volume.set(value);
    this.isMuted.set(value === 0);
  }

  formatTime(seconds: number): string {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
