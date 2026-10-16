import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/** The lowest bar, in percent: silence still shows. */
const FLOOR = 8;

/**
 * The track drawn as bars — read from its file — the part played filled. A
 * slider: click or drag to seek, or the keys (← → 5 s, Page Up / Down 10 s,
 * Home, End). Name it, and write its `aria-valuetext` (`player.formatTime()`).
 */
@Component({
  selector: 'div[scAudioPlayerNextWaveform]',
  template: `
    <div class="flex h-full items-center gap-0.5" aria-hidden="true">
      @for (height of heights(); track $index) {
        <span
          class="bg-muted-foreground/30 min-w-px flex-1 rounded-full"
          [style.height.%]="height"
        ></span>
      }
    </div>
    <div
      class="absolute inset-0 flex items-center gap-0.5"
      [style.clip-path]="'inset(0 ' + (100 - played()) + '% 0 0)'"
      aria-hidden="true"
    >
      @for (height of heights(); track $index) {
        <span
          class="bg-primary min-w-px flex-1 rounded-full"
          [style.height.%]="height"
        ></span>
      }
    </div>
  `,
  host: {
    'data-slot': 'audio-player-waveform',
    role: 'slider',
    tabindex: '0',
    'aria-valuemin': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'now()',
    '[attr.data-loading]': '!peaks() || null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAudioPlayerNextWaveform {
  private readonly player = inject(ScAudioPlayerNext);

  /** How many bars. */
  readonly bars = input(64);
  readonly classInput = input<string>('', { alias: 'class' });

  /** Each bar's loudness, 0–1, once the file is read. */
  protected readonly peaks = signal<readonly number[] | null>(null);

  protected readonly heights = computed(() => {
    const peaks = this.peaks();
    return Array.from(
      { length: this.bars() },
      (_, i) => FLOOR + (peaks?.[i] ?? 0) * (100 - FLOOR),
    );
  });

  protected readonly played = computed(() => {
    const duration = this.player.duration();
    return duration ? (this.player.currentTime() / duration) * 100 : 0;
  });

  protected readonly max = computed(() => Math.round(this.player.duration()));
  protected readonly now = computed(() =>
    Math.round(this.player.currentTime()),
  );

  protected readonly class = computed(() =>
    cn(
      'relative block h-12 w-full cursor-pointer touch-none rounded-md outline-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerNextWaveform');
    // The file, read again for each track.
    effect((onCleanup) => {
      const src = this.player.current()?.src ?? this.player.ɵmedia()?.src;
      const bars = this.bars();
      this.peaks.set(null);
      if (!src) return;
      let stale = false;
      onCleanup(() => (stale = true));
      void this.read(src, bars).then((peaks) => {
        if (!stale) this.peaks.set(peaks);
      });
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    const steps: Record<string, number> = {
      ArrowLeft: -5,
      ArrowDown: -5,
      ArrowRight: 5,
      ArrowUp: 5,
      PageDown: -10,
      PageUp: 10,
    };
    if (event.key in steps) {
      this.player.seekBy(steps[event.key]);
    } else if (event.key === 'Home') {
      this.player.seekTo(0);
    } else if (event.key === 'End') {
      this.player.seekTo(this.player.duration());
    } else {
      return;
    }
    event.preventDefault();
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    this.seekAt(event);
  }

  protected onPointerMove(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) this.seekAt(event);
  }

  private seekAt(event: PointerEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const at = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );
    this.player.seekTo(at * this.player.duration());
  }

  /** The file's loudness, in `bars` parts, the loudest at 1. */
  private async read(src: string, bars: number): Promise<number[] | null> {
    try {
      const data = await (await fetch(src)).arrayBuffer();
      const audio = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(
        data,
      );
      const channels = Array.from({ length: audio.numberOfChannels }, (_, i) =>
        audio.getChannelData(i),
      );
      const size = Math.floor(audio.length / bars);
      const peaks = Array.from({ length: bars }, (_, bar) => {
        let peak = 0;
        for (const channel of channels) {
          for (let i = bar * size; i < (bar + 1) * size; i++) {
            peak = Math.max(peak, Math.abs(channel[i]));
          }
        }
        return peak;
      });
      const loudest = Math.max(...peaks) || 1;
      return peaks.map((peak) => peak / loudest);
    } catch {
      return null;
    }
  }
}
