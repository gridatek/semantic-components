import {
  Directive,
  LOCALE_ID,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';

/** A track of the playlist: yours, with at least its file. */
export interface ScAudioPlayerTrack {
  readonly src: string;
}

/** Back to the start of the track, not the one before, past this time. */
const RESTART_AFTER = 3;

/**
 * An audio player around your `audio[scAudioPlayerMedia]`: its state, two
 * ways — paused, time, volume, muted, rate, and for a playlist (`tracks`) the
 * track, shuffle and repeat — and what it reads (duration, waiting…). Put your
 * controls in it. Focused inside, keys control it: Space or K play, J / L
 * ±10 s, ← / → ±5 s, ↑ / ↓ volume, M mute, N / P next / previous track, 0–9
 * jump. Name it ("Player").
 */
@Directive({
  selector: '[scAudioPlayer]',
  exportAs: 'scAudioPlayer',
  host: {
    'data-slot': 'audio-player',
    role: 'group',
    '[attr.data-paused]': 'paused() || null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScAudioPlayer<T extends ScAudioPlayerTrack = ScAudioPlayerTrack> {
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The playlist. Without one, the audio plays its own `src`. */
  readonly tracks = input<readonly T[]>([]);

  readonly paused = model(true);
  readonly currentTime = model(0);
  readonly volume = model(1);
  readonly muted = model(false);
  readonly playbackRate = model(1);
  /** The track playing: its place in `tracks`. */
  readonly track = model(0);
  /** The playlist in a random order: each track once. */
  readonly shuffle = model(false);
  /** At the end: stop (`off`), start the playlist again (`all`) or the track (`one`). */
  readonly repeat = model<'off' | 'all' | 'one'>('off');
  /** For the system's media controls (lock screen, media keys). */
  readonly metadata = input<MediaMetadataInit>();

  /** The audio: set by `audio[scAudioPlayerMedia]`. */
  readonly ɵmedia = signal<HTMLAudioElement | null>(null);

  readonly duration = signal(0);
  /** How far it has loaded, in seconds. */
  readonly buffered = signal(0);
  readonly waiting = signal(false);
  readonly ended = signal(false);

  /** The track playing, from `tracks`. */
  readonly current = computed<T | undefined>(() => this.tracks()[this.track()]);

  /** The order the tracks play in: theirs, or shuffled. */
  private readonly order = signal<readonly number[]>([]);

  /** The track after this one, if any (with `repeat: 'all'`, round again). */
  readonly upcoming = computed(() => this.after(1));

  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly durationFormat = new Intl.DurationFormat(this.locale, {
    style: 'digital',
    hoursDisplay: 'auto',
  });

  /** The file the audio was last given. */
  private src: string | null = null;

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayer');

    // The order: shuffled from the track playing on, or the playlist's.
    effect(() => {
      const count = this.tracks().length;
      const shuffle = this.shuffle();
      untracked(() => this.order.set(this.makeOrder(count, shuffle)));
    });

    // The track, into the audio: a new file, from its start.
    effect(() => {
      const media = this.ɵmedia();
      const src = this.current()?.src;
      if (!media || src === undefined || src === this.src) return;
      this.src = src;
      media.src = src;
      untracked(() => {
        this.synced.currentTime = 0;
        this.currentTime.set(0);
        this.duration.set(0);
      });
    });
    // The state, into the audio (the audio's events bring it back).
    effect(() => {
      const media = this.ɵmedia();
      const paused = this.paused();
      // A new track plays on if the last one was playing.
      this.current();
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
    // The system's media controls.
    effect(() => {
      const metadata = this.metadata();
      const playing = !this.paused();
      untracked(() => this.mediaSession(metadata, playing));
    });
  }

  toggle(): void {
    this.paused.update((paused) => !paused);
  }

  /** Jumps to `seconds`, within the track. */
  seekTo(seconds: number): void {
    this.currentTime.set(Math.min(Math.max(0, seconds), this.liveDuration()));
  }

  seekBy(seconds: number): void {
    this.seekTo(this.currentTime() + seconds);
  }

  /** Changes the volume by `amount` (0–1); a change unmutes. */
  volumeBy(amount: number): void {
    this.volume.set(Math.min(1, Math.max(0, this.volume() + amount)));
    this.muted.set(false);
  }

  /** Plays the track at `index` in `tracks`, from its start. */
  play(index: number): void {
    if (index === this.track()) this.seekTo(0);
    this.track.set(index);
    this.paused.set(false);
  }

  /** The next track, if any. */
  nextTrack(): void {
    const next = this.upcoming();
    if (next !== null) this.track.set(next);
  }

  /** The track's start, or — near it — the one before. */
  previousTrack(): void {
    const previous = this.after(-1);
    if (this.currentTime() > RESTART_AFTER || previous === null) {
      this.seekTo(0);
    } else {
      this.track.set(previous);
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

  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    // Fields and sliders keep their keys; buttons keep Space and Enter.
    if (
      target.closest(
        'input, textarea, select, [contenteditable], [role="slider"]',
      )
    ) {
      return;
    }
    if (
      target.closest('button, a') &&
      (event.key === ' ' || event.key === 'Enter')
    ) {
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const duration = this.liveDuration();
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
      n: () => this.nextTrack(),
      p: () => this.previousTrack(),
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
  }

  /** The audio's state, into the player: called by `scAudioPlayerMedia`. */
  ɵsync(media: HTMLAudioElement): void {
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

  /** The track ended: the same again, the next, or stop. */
  ɵended(media: HTMLAudioElement): void {
    if (this.repeat() === 'one') {
      media.currentTime = 0;
      void media.play().catch(() => undefined);
      return;
    }
    const next = this.upcoming();
    if (next === null) return;
    this.track.set(next);
    this.paused.set(false);
  }

  /**
   * The last values taken from the audio, or sent to it. A model that
   * differs is a change on its way to the audio: left alone until sent.
   */
  private readonly synced = {
    paused: true,
    currentTime: 0,
    volume: 1,
    muted: false,
    playbackRate: 1,
  };

  private take<K extends keyof ScAudioPlayer['synced']>(
    key: K,
    model: {
      (): ScAudioPlayer['synced'][K];
      set(value: ScAudioPlayer['synced'][K]): void;
    },
    value: ScAudioPlayer['synced'][K],
  ): void {
    if (model() !== this.synced[key]) return;
    this.synced[key] = value;
    model.set(value);
  }

  /**
   * The audio's duration now: a file without a duration header is
   * estimated, then corrected, sometimes without an event.
   */
  private liveDuration(): number {
    const duration = this.ɵmedia()?.duration;
    return duration && Number.isFinite(duration) ? duration : this.duration();
  }

  /** The track `step` places away in the order, or null past an end. */
  private after(step: number): number | null {
    const order = this.order();
    if (!order.length) return null;
    const at = order.indexOf(this.track());
    let next = at + step;
    if (next < 0 || next >= order.length) {
      if (this.repeat() !== 'all') return null;
      next = (next + order.length) % order.length;
    }
    return order[next] ?? null;
  }

  /** 0…count-1, or shuffled with the track playing first. */
  private makeOrder(count: number, shuffle: boolean): number[] {
    const order = Array.from({ length: count }, (_, i) => i);
    if (!shuffle) return order;
    const rest = order.filter((i) => i !== this.track());
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    return count ? [this.track(), ...rest] : [];
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
    const hasTracks = this.tracks().length > 1;
    session.setActionHandler(
      'previoustrack',
      hasTracks ? () => this.previousTrack() : null,
    );
    session.setActionHandler(
      'nexttrack',
      hasTracks ? () => this.nextTrack() : null,
    );
  }
}
