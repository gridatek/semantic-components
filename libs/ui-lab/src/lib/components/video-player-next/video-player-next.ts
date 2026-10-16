import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';

/** A captions or subtitles track of the video. */
export interface ScVideoPlayerNextTrack {
  /** Its place among the video's text tracks. */
  readonly id: string;
  readonly label: string;
  readonly language: string;
}

/** A chapter, from the video's `<track kind="chapters">`. */
export interface ScVideoPlayerNextChapter {
  readonly title: string;
  readonly start: number;
  readonly end: number;
}

/** How long the pointer may rest before the controls hide, while playing. */
const IDLE_AFTER = 2500;

/**
 * A video player around your `video[scVideoPlayerNextMedia]`: its state, two
 * ways — paused, time, volume, muted, rate, captions — and what it reads
 * (duration, buffered, waiting…). Put your controls in it. Focused inside,
 * keys control it: Space or K play, J / L ±10 s, ← / → ±5 s, ↑ / ↓ volume, M
 * mute, F fullscreen, C captions, 0–9 jump. Name it ("Video: A day").
 */
@Directive({
  selector: '[scVideoPlayerNext]',
  exportAs: 'scVideoPlayerNext',
  host: {
    'data-slot': 'video-player',
    role: 'group',
    tabindex: '0',
    '[attr.data-idle]': 'idle() || null',
    '[attr.data-paused]': 'paused() || null',
    '[attr.data-fullscreen]': 'fullscreen() || null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(pointermove)': 'wake()',
    '(pointerdown)': 'wake()',
    '(focusin)': 'wake()',
  },
})
export class ScVideoPlayerNext {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly paused = model(true);
  readonly currentTime = model(0);
  readonly volume = model(1);
  readonly muted = model(false);
  readonly playbackRate = model(1);
  /** The captions shown: a track's id, or none. */
  readonly captions = model<string | null>(null);
  /** For the system's media controls (lock screen, media keys). */
  readonly metadata = input<MediaMetadataInit>();

  /** The video: set by `video[scVideoPlayerNextMedia]`. */
  readonly ɵmedia = signal<HTMLVideoElement | null>(null);

  readonly duration = signal(0);
  /** How far it has loaded, in seconds. */
  readonly buffered = signal(0);
  readonly waiting = signal(false);
  readonly ended = signal(false);
  readonly fullscreen = signal(false);
  readonly pictureInPicture = signal(false);
  /** Playing, untouched for a while: the controls hide. */
  readonly idle = signal(false);
  readonly tracks = signal<readonly ScVideoPlayerNextTrack[]>([]);
  readonly chapters = signal<readonly ScVideoPlayerNextChapter[]>([]);
  /** The captions to show now. */
  readonly cues = signal<readonly string[]>([]);
  /** Where the pointer is on the seek bar: its time and place (percent). */
  readonly preview = signal<{ time: number; at: number } | null>(null);

  /** The chapter playing. */
  readonly chapter = computed(() => this.chapterAt(this.currentTime()));

  protected readonly class = computed(() =>
    cn(
      'group/video relative isolate block overflow-hidden rounded-lg bg-black text-white outline-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      'data-idle:cursor-none',
      this.classInput(),
    ),
  );

  private idleTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly durationFormat = new Intl.DurationFormat(this.locale, {
    style: 'digital',
    hoursDisplay: 'auto',
  });

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerNext');
    const destroyRef = inject(DestroyRef);

    // The state, into the video (the video's events bring it back).
    effect(() => {
      const media = this.ɵmedia();
      const paused = this.paused();
      if (!media) return;
      this.synced.paused = paused;
      if (media.paused === paused) return;
      if (paused) media.pause();
      else media.play().catch(() => this.paused.set(true));
    });
    effect(() => {
      const media = this.ɵmedia();
      const time = this.currentTime();
      if (!media) return;
      this.synced.currentTime = time;
      if (Math.abs(media.currentTime - time) > 0.25) media.currentTime = time;
    });
    effect(() => {
      const media = this.ɵmedia();
      if (!media) return;
      media.volume = this.synced.volume = this.volume();
      media.muted = this.synced.muted = this.muted();
      media.playbackRate = this.synced.playbackRate = this.playbackRate();
    });
    // Captions: the chosen track's cues, shown by us (above the controls).
    effect(() => {
      const media = this.ɵmedia();
      const chosen = this.captions();
      this.tracks();
      if (!media) return;
      untracked(() => this.showCaptions(media, chosen));
    });
    // Playing: the controls hide when the pointer rests.
    effect(() => {
      if (this.paused()) {
        clearTimeout(this.idleTimer);
        this.idle.set(false);
      } else {
        untracked(() => this.wake());
      }
    });
    // The system's media controls.
    effect(() => {
      const metadata = this.metadata();
      const playing = !this.paused();
      untracked(() => this.mediaSession(metadata, playing));
    });

    const onFullscreen = () =>
      this.fullscreen.set(this.document.fullscreenElement === this.element);
    this.document.addEventListener('fullscreenchange', onFullscreen);
    destroyRef.onDestroy(() => {
      this.document.removeEventListener('fullscreenchange', onFullscreen);
      clearTimeout(this.idleTimer);
    });
  }

  toggle(): void {
    this.paused.update((paused) => !paused);
  }

  /** Jumps to `seconds`, within the video. */
  seekTo(seconds: number): void {
    this.currentTime.set(Math.min(Math.max(0, seconds), this.duration()));
  }

  seekBy(seconds: number): void {
    this.seekTo(this.currentTime() + seconds);
  }

  /** Changes the volume by `amount` (0–1); a change unmutes. */
  volumeBy(amount: number): void {
    this.volume.set(Math.min(1, Math.max(0, this.volume() + amount)));
    this.muted.set(false);
  }

  /** Captions on (the first track, or the last one shown) or off. */
  toggleCaptions(): void {
    this.captions.update((id) =>
      id !== null ? null : (this.lastCaptions ?? this.tracks()[0]?.id ?? null),
    );
  }

  toggleFullscreen(): void {
    if (this.document.fullscreenElement) {
      void this.document.exitFullscreen();
    } else {
      void this.element.requestFullscreen();
    }
  }

  togglePictureInPicture(): void {
    const media = this.ɵmedia();
    if (!media) return;
    if (this.document.pictureInPictureElement) {
      void this.document.exitPictureInPicture();
    } else {
      void media.requestPictureInPicture();
    }
  }

  /** A time, written in the app's language: "1:05", "1:02:05". */
  formatTime(seconds: number): string {
    const total = Math.max(0, Math.floor(seconds || 0));
    return this.durationFormat.format({
      hours: Math.floor(total / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
    });
  }

  /** The chapter at `seconds`, if any. */
  chapterAt(seconds: number): ScVideoPlayerNextChapter | null {
    return (
      this.chapters().find((c) => seconds >= c.start && seconds < c.end) ?? null
    );
  }

  /** Shows the controls again, and hides them after a rest (while playing). */
  protected wake(): void {
    this.idle.set(false);
    clearTimeout(this.idleTimer);
    if (this.paused()) return;
    this.idleTimer = setTimeout(() => {
      // Not while the controls have focus.
      const focused = this.document.activeElement;
      const inControls = focused?.closest(
        '[data-slot="video-player-controls"]',
      );
      if (!this.paused() && !inControls) this.idle.set(true);
    }, IDLE_AFTER);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    // Fields keep their keys; buttons keep Space and Enter.
    if (target.closest('input, textarea, select, [contenteditable]')) return;
    if (
      target.closest('button, a') &&
      (event.key === ' ' || event.key === 'Enter')
    ) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const duration = this.duration();
    const actions: Record<string, () => void> = {
      ' ': () => this.toggle(),
      k: () => this.toggle(),
      j: () => this.seekBy(-10),
      l: () => this.seekBy(10),
      ArrowLeft: () => this.seekBy(-5),
      ArrowRight: () => this.seekBy(5),
      ArrowUp: () => this.volumeBy(0.1),
      ArrowDown: () => this.volumeBy(-0.1),
      m: () => this.muted.update((m) => !m),
      f: () => this.toggleFullscreen(),
      c: () => this.toggleCaptions(),
      Home: () => this.seekTo(0),
      End: () => this.seekTo(duration),
    };
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const action =
      actions[key] ??
      (/^[0-9]$/.test(key)
        ? () => this.seekTo((Number(key) / 10) * duration)
        : undefined);
    if (!action) return;
    event.preventDefault();
    action();
    this.wake();
  }

  /** The video's state, into the player: called by `scVideoPlayerNextMedia`. */
  ɵsync(media: HTMLVideoElement): void {
    this.take('paused', this.paused, media.paused);
    this.take('currentTime', this.currentTime, media.currentTime);
    this.take('volume', this.volume, media.volume);
    this.take('muted', this.muted, media.muted);
    this.take('playbackRate', this.playbackRate, media.playbackRate);
    this.duration.set(Number.isFinite(media.duration) ? media.duration : 0);
    this.ended.set(media.ended);
    const ranges = media.buffered;
    this.buffered.set(ranges.length ? ranges.end(ranges.length - 1) : 0);
  }

  /**
   * The last values taken from the video, or sent to it. A model that
   * differs is a change on its way to the video: left alone until sent.
   */
  private readonly synced = {
    paused: true,
    currentTime: 0,
    volume: 1,
    muted: false,
    playbackRate: 1,
  };

  private take<K extends keyof ScVideoPlayerNext['synced']>(
    key: K,
    model: {
      (): ScVideoPlayerNext['synced'][K];
      set(value: ScVideoPlayerNext['synced'][K]): void;
    },
    value: ScVideoPlayerNext['synced'][K],
  ): void {
    if (model() !== this.synced[key]) return;
    this.synced[key] = value;
    model.set(value);
  }

  /** The video's text tracks: captions and subtitles, and chapters. */
  ɵreadTracks(media: HTMLVideoElement): void {
    const tracks = Array.from(media.textTracks);
    this.tracks.set(
      tracks
        .map((track, i) => ({ track, id: String(i) }))
        .filter(
          ({ track }) =>
            track.kind === 'captions' || track.kind === 'subtitles',
        )
        .map(({ track, id }) => ({
          id,
          label: track.label,
          language: track.language,
        })),
    );
    const chapters = tracks.find((track) => track.kind === 'chapters');
    if (chapters) {
      // Hidden: loaded, not shown by the browser.
      chapters.mode = 'hidden';
      const read = () =>
        this.chapters.set(
          Array.from(chapters.cues ?? []).map((cue) => ({
            title: (cue as VTTCue).text,
            start: cue.startTime,
            end: cue.endTime,
          })),
        );
      read();
      // Its cues come once the file is loaded.
      media
        .querySelector('track[kind="chapters"]')
        ?.addEventListener('load', read, { once: true });
    }
  }

  private lastCaptions: string | null = null;

  private showCaptions(media: HTMLVideoElement, chosen: string | null): void {
    if (chosen !== null) this.lastCaptions = chosen;
    const tracks = Array.from(media.textTracks);
    tracks.forEach((track, i) => {
      if (track.kind !== 'captions' && track.kind !== 'subtitles') return;
      const shown = String(i) === chosen;
      track.mode = shown ? 'hidden' : 'disabled';
      track.oncuechange = shown
        ? () =>
            this.cues.set(
              Array.from(track.activeCues ?? []).map(
                (cue) => (cue as VTTCue).text,
              ),
            )
        : null;
    });
    if (chosen === null) this.cues.set([]);
  }

  private mediaSession(
    metadata: MediaMetadataInit | undefined,
    playing: boolean,
  ): void {
    const session = globalThis.navigator?.mediaSession;
    if (!session || !playing) return;
    if (metadata) session.metadata = new MediaMetadata(metadata);
    session.setActionHandler('play', () => this.paused.set(false));
    session.setActionHandler('pause', () => this.paused.set(true));
    session.setActionHandler('seekbackward', (d) =>
      this.seekBy(-(d.seekOffset ?? 10)),
    );
    session.setActionHandler('seekforward', (d) =>
      this.seekBy(d.seekOffset ?? 10),
    );
    session.setActionHandler('seekto', (d) => {
      if (d.seekTime !== undefined) this.seekTo(d.seekTime);
    });
  }
}
