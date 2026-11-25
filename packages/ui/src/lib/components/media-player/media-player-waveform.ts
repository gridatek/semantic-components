import { Directionality } from '@angular/cdk/bidi';
import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { ScMediaPlayer } from './media-player';

/** The lowest bar, in percent: silence still shows. */
const FLOOR = 8;

/**
 * The media drawn as bars — read from its file with Web Audio — the part
 * played filled: a seek bar for audio. A slider: click or drag to seek; ← / →
 * five seconds (as the text reads), Page Up / Page Down ten, Home, End. Its
 * value reads as the time ("0:15"); your words in `aria-valuetext`. Without
 * Web Audio (or a file it can't read), its bars are flat and it still seeks.
 * Name it ("Seek").
 */
@Component({
  selector: 'div[scMediaPlayerWaveform]',
  template: `
    <div class="flex h-full items-center gap-0.5" aria-hidden="true">
      @for (height of heights(); track $index) {
        <span [class]="barClass().rest" [style.height.%]="height"></span>
      }
    </div>
    <div
      class="absolute inset-0 flex items-center gap-0.5"
      [style.clip-path]="clip()"
      aria-hidden="true"
    >
      @for (height of heights(); track $index) {
        <span [class]="barClass().played" [style.height.%]="height"></span>
      }
    </div>
  `,
  host: {
    'data-slot': 'media-player-waveform',
    role: 'slider',
    tabindex: '0',
    'aria-valuemin': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'now()',
    '[attr.aria-valuetext]': 'valueText()',
    '[attr.data-loading]': '!peaks() || null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMediaPlayerWaveform {
  private readonly player = inject(ScMediaPlayer);
  private readonly directionality = inject(Directionality);
  private readonly styles = injectStyle().mediaPlayer;

  /** How many bars. */
  readonly bars = input(64);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaValueText = input<string | null>(null, {
    alias: 'aria-valuetext',
  });

  /** Each bar's loudness, 0–1, once the file is read. */
  private readonly peaks = signal<readonly number[] | null>(null);

  private readonly heights = computed(() => {
    const peaks = this.peaks();
    return Array.from(
      { length: this.bars() },
      (_, i) => FLOOR + (peaks?.[i] ?? 0) * (100 - FLOOR),
    );
  });

  private readonly rtl = computed(
    () => this.directionality.valueSignal() === 'rtl',
  );

  /** The played bars, shown up to the time — from the end the text starts at. */
  private readonly clip = computed(() => {
    const duration = this.player.duration();
    const rest =
      100 - (duration ? (this.player.currentTime() / duration) * 100 : 0);
    return this.rtl() ? `inset(0 0 0 ${rest}%)` : `inset(0 ${rest}% 0 0)`;
  });

  private readonly max = computed(() => Math.round(this.player.duration()));
  private readonly now = computed(() => Math.round(this.player.currentTime()));
  private readonly valueText = computed(
    () =>
      this.ariaValueText() ?? this.player.formatTime(this.player.currentTime()),
  );

  private readonly barClass = computed(() => {
    const video = this.player.kind() === 'video';
    return {
      rest: cn(
        'min-w-px flex-1',
        video ? 'bg-white/30' : 'bg-muted-foreground/30',
      ),
      played: cn('min-w-px flex-1', video ? 'bg-white' : 'bg-primary'),
    };
  });

  private readonly class = computed(() =>
    cn(
      'relative block h-12 w-full cursor-pointer touch-none outline-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      this.styles.waveform,
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerWaveform');
    // The file, read again whenever another one plays.
    effect((onCleanup) => {
      const src = this.player.src();
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

  private onKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const forward = this.rtl() ? -1 : 1;
    const steps: Record<string, number> = {
      ArrowLeft: -5 * forward,
      ArrowRight: 5 * forward,
      ArrowDown: -5,
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
    // Handled: not the player's keys too.
    event.stopPropagation();
  }

  private onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    this.seekAt(event);
  }

  private onPointerMove(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) this.seekAt(event);
  }

  private seekAt(event: PointerEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    let at = (event.clientX - rect.left) / rect.width;
    if (this.rtl()) at = 1 - at;
    this.player.seekTo(Math.min(1, Math.max(0, at)) * this.player.duration());
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
