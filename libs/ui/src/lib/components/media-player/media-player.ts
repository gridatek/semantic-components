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
import { cn } from 'cn';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';

/** What the player plays: from its `scMediaPlayerMedia` element. */
export type ScMediaPlayerKind = 'video' | 'audio';

/** A captions or subtitles track. */
export interface ScMediaPlayerTrack {
  /** Its place among the media's text tracks. */
  readonly id: string;
  readonly label: string;
  readonly language: string;
}

/** A chapter, from a `<track kind="chapters">`. */
export interface ScMediaPlayerChapter {
  readonly title: string;
  readonly start: number;
  readonly end: number;
}

/** Where the pointer is on the seek bar: its time, and its place (0–1). */
export interface ScMediaPlayerPreviewPoint {
  readonly time: number;
  readonly at: number;
}

/** How long the pointer may rest before the controls hide, while playing. */
const IDLE_AFTER = 2500;

/** The speeds `<` and `>` step through. */
const RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

/**
 * A media player around your `video[scMediaPlayerMedia]` or
 * `audio[scMediaPlayerMedia]`: its state, two ways — paused, time, volume,
 * muted, rate, loop, captions — and what it reads (duration, buffered,
 * waiting, error…). Put your controls in it. A container
 * (`@container/media`): its parts fit themselves to its width. Focused inside,
 * keys control it. Name it ("Video: Sintel").
 */
@Directive({
  selector: '[scMediaPlayer]',
  exportAs: 'scMediaPlayer',
  host: {
    'data-slot': 'media-player',
    role: 'group',
    tabindex: '0',
    '[attr.data-kind]': 'kind()',
    '[attr.data-idle]': 'idle() || null',
    '[attr.data-paused]': 'paused() || null',
    '[attr.data-started]': 'started() || null',
    '[attr.data-ended]': 'ended() || null',
    '[attr.data-waiting]': 'waiting() || null',
    '[attr.data-fullscreen]': 'fullscreen() || null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(pointermove)': 'wake()',
    '(pointerdown)': 'onPointerDown($event)',
    '(focusin)': 'wake()',
  },
})
export class ScMediaPlayer {
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
  readonly loop = model(false);
  /** The captions shown: a track's id, or none. */
  readonly captions = model<string | null>(null);
  /** For the system's media controls (lock screen, media keys). */
  readonly metadata = input<MediaMetadataInit>();

  /** Video or audio: set by `scMediaPlayerMedia` as it is made (the server knows it too). */
  readonly kind = signal<ScMediaPlayerKind>('video');
  /** The media element: set by `scMediaPlayerMedia` once in the browser. */
  readonly ɵmedia = signal<HTMLMediaElement | null>(null);
  /** The seek slider: set by `scMediaPlayerSeek`, for the preview to follow. */
  readonly ɵseek = signal<HTMLElement | null>(null);
  /** How many plays sit over the video (not in the controls). */
  readonly ɵcenterPlays = signal(0);

  readonly duration = signal(0);
  /** How far it has loaded, in seconds. */
  readonly buffered = signal(0);
  readonly waiting = signal(false);
  readonly ended = signal(false);
  /** The media's error, if it failed to load or play. */
  readonly error = signal<MediaError | null>(null);
  /** Played at least once. */
  readonly started = signal(false);
  readonly fullscreen = signal(false);
  readonly pictureInPicture = signal(false);
  /** Playing, untouched for a while: the controls hide. */
  readonly idle = signal(false);
  readonly tracks = signal<readonly ScMediaPlayerTrack[]>([]);
  readonly chapters = signal<readonly ScMediaPlayerChapter[]>([]);
  /** The captions to show now. */
  readonly cues = signal<readonly string[]>([]);
  /** Where the pointer is on the seek bar. */
  readonly preview = signal<ScMediaPlayerPreviewPoint | null>(null);

  /** The chapter playing. */
  readonly chapter = computed(() => this.chapterAt(this.currentTime()));
  /** A play over the video: the controls wait for the first play, and the bar's play steps aside on a small player. */
  readonly hasCenterPlay = computed(
    () => this.kind() === 'video' && this.ɵcenterPlays() > 0,
  );

  private readonly class = computed(() =>
    cn(
      'group/media @container/media relative isolate block outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      this.kind() === 'video'
        ? 'overflow-hidden rounded-lg bg-black text-white data-idle:cursor-none'
        : 'rounded-lg border bg-card p-3 text-card-foreground',
      this.classInput(),
    ),
  );

  private idleTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly durationFormat = new Intl.DurationFormat(this.locale, {
    style: 'digital',
    hoursDisplay: 'auto',
  });

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayer');
    const destroyRef = inject(DestroyRef);

    // The state, into the media (its events bring it back).
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
      media.loop = this.loop();
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

  /** Jumps to `seconds`, within the media. */
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

  /** The next speed up (`1`) or down (`-1`): 0.25 to 2. */
  rateBy(direction: 1 | -1): void {
    const rate = this.playbackRate();
    const next =
      direction > 0
        ? RATES.find((r) => r > rate)
        : [...RATES].reverse().find((r) => r < rate);
    if (next !== undefined) this.playbackRate.set(next);
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
      void this.element.requestFullscreen?.();
    }
  }

  togglePictureInPicture(): void {
    const media = this.ɵmedia();
    if (!(media instanceof HTMLVideoElement)) return;
    if (this.document.pictureInPictureElement) {
      void this.document.exitPictureInPicture();
    } else {
      void media.requestPictureInPicture?.();
    }
  }

  /** Loads the media again: after an error. */
  reload(): void {
    const media = this.ɵmedia();
    if (!media) return;
    this.error.set(null);
    media.load();
  }

  /**
   * Playing: shows the controls if hidden, hides them if shown — what a tap
   * on the video does on a touch screen. Paused, they stay. `hidden`: whether
   * they were hidden when the tap began (its focus has woken them since).
   */
  toggleControls(hidden = this.idle()): void {
    if (this.paused()) return;
    if (hidden) {
      this.wake();
      return;
    }
    clearTimeout(this.idleTimer);
    this.idle.set(true);
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
  chapterAt(seconds: number): ScMediaPlayerChapter | null {
    return (
      this.chapters().find((c) => seconds >= c.start && seconds < c.end) ?? null
    );
  }

  /**
   * A mouse or a pen wakes the controls; a touch leaves it to what it lands
   * on — a tap on the video toggles them, a button takes focus (and wakes).
   */
  private onPointerDown(event: PointerEvent): void {
    if (event.pointerType !== 'touch') this.wake();
  }

  /** Shows the controls again, and hides them after a rest (while playing). */
  private wake(): void {
    this.idle.set(false);
    clearTimeout(this.idleTimer);
    if (this.paused() || this.kind() === 'audio') return;
    this.idleTimer = setTimeout(() => {
      // Not while the controls have focus.
      const focused = this.document.activeElement;
      const inControls = focused?.closest(
        '[data-slot="media-player-controls"]',
      );
      if (!this.paused() && !inControls) this.idle.set(true);
    }, IDLE_AFTER);
  }

  private onKeydown(event: KeyboardEvent): void {
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
      r: () => this.loop.update((l) => !l),
      '<': () => this.rateBy(-1),
      '>': () => this.rateBy(1),
      f: () => this.toggleFullscreen(),
      p: () => this.togglePictureInPicture(),
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

  /** The media's state, into the player: called by `scMediaPlayerMedia`. */
  ɵsync(media: HTMLMediaElement): void {
    this.take('paused', this.paused, media.paused);
    this.take('currentTime', this.currentTime, media.currentTime);
    this.take('volume', this.volume, media.volume);
    this.take('muted', this.muted, media.muted);
    this.take('playbackRate', this.playbackRate, media.playbackRate);
    this.duration.set(Number.isFinite(media.duration) ? media.duration : 0);
    this.ended.set(media.ended);
    if (!media.paused) this.started.set(true);
    const ranges = media.buffered;
    this.buffered.set(ranges.length ? ranges.end(ranges.length - 1) : 0);
  }

  /**
   * The last values taken from the media, or sent to it. A model that
   * differs is a change on its way to the media: left alone until sent.
   */
  private readonly synced = {
    paused: true,
    currentTime: 0,
    volume: 1,
    muted: false,
    playbackRate: 1,
  };

  private take<K extends keyof ScMediaPlayer['synced']>(
    key: K,
    model: {
      (): ScMediaPlayer['synced'][K];
      set(value: ScMediaPlayer['synced'][K]): void;
    },
    value: ScMediaPlayer['synced'][K],
  ): void {
    if (model() !== this.synced[key]) return;
    this.synced[key] = value;
    model.set(value);
  }

  /** The media's text tracks: captions and subtitles, and chapters. */
  ɵreadTracks(media: HTMLMediaElement): void {
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

  private showCaptions(media: HTMLMediaElement, chosen: string | null): void {
    if (chosen !== null) this.lastCaptions = chosen;
    Array.from(media.textTracks).forEach((track, i) => {
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
