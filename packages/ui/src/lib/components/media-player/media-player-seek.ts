import { Directionality } from '@angular/cdk/bidi';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { bindInput } from '../../utils/bind-input/bind-input';
import { ScSlider } from '../slider/slider';
import { ScMediaPlayer } from './media-player';

/**
 * Seeks: your `input`, a slider over the media's seconds — its track shows
 * what has loaded and where each chapter starts. In the controls, a row of its
 * own (a small video's: at the bottom edge). Its value reads as the time
 * ("0:15"); write your words in `aria-valuetext`. ← / → five seconds, Page Up /
 * Page Down ten. Name it ("Seek").
 */
@Directive({
  selector: 'input[scMediaPlayerSeek]',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'media-player-seek',
    '[attr.aria-valuetext]': 'valueText()',
    '[style.--sc-media-player-track]': 'track()',
    '[style.--primary]': "player.kind() === 'video' ? 'white' : null",
    '[style.--muted]': "player.kind() === 'video' ? 'transparent' : null",
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'player.preview.set(null)',
  },
})
export class ScMediaPlayerSeek {
  private readonly player = inject(ScMediaPlayer);
  private readonly slider = inject(ScSlider);
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly directionality = inject(Directionality);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaValueText = input<string | null>(null, {
    alias: 'aria-valuetext',
  });

  private readonly valueText = computed(
    () =>
      this.ariaValueText() ?? this.player.formatTime(this.player.currentTime()),
  );

  /**
   * The track, as layers: chapter gaps, the part played, what has loaded,
   * the rest — on Chrome's track and Firefox's (its progress then unpainted).
   */
  private readonly track = computed(() => {
    const duration = this.player.duration();
    const video = this.player.kind() === 'video';
    const to =
      this.directionality.valueSignal() === 'rtl' ? 'to left' : 'to right';
    const gap = video ? 'rgb(0 0 0 / 0.7)' : 'var(--background)';
    const loaded = video
      ? 'rgb(255 255 255 / 0.4)'
      : 'color-mix(in oklab, var(--foreground) 25%, transparent)';
    const rest = video ? 'rgb(255 255 255 / 0.2)' : 'var(--muted)';
    const percent = (seconds: number) =>
      duration ? Math.min(100, (seconds / duration) * 100) : 0;
    const gaps = this.player
      .chapters()
      .slice(1)
      .map((chapter) => {
        const at = percent(chapter.start);
        return `linear-gradient(${to}, transparent calc(${at}% - 1px), ${gap} calc(${at}% - 1px) calc(${at}% + 1px), transparent calc(${at}% + 1px))`;
      });
    const buffered = percent(this.player.buffered());
    return [
      ...gaps,
      `linear-gradient(${to}, var(--primary) var(--sc-slider-fill), transparent var(--sc-slider-fill))`,
      `linear-gradient(${to}, ${loaded} ${buffered}%, transparent ${buffered}%)`,
      `linear-gradient(${rest}, ${rest})`,
    ].join(', ');
  });

  private readonly class = computed(() =>
    cn(
      'relative z-10',
      '[&::-webkit-slider-runnable-track]:bg-(image:--sc-media-player-track)! [&::-moz-range-track]:bg-(image:--sc-media-player-track)! [&::-moz-range-progress]:bg-transparent!',
      this.player.kind() === 'video'
        ? // A row of its own: above the buttons; a small player's, at its bottom edge.
          'order-first basis-full @max-xl/media:order-last'
        : 'min-w-24 flex-1',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerSeek');
    bindInput(this.slider.min, 0);
    bindInput(this.slider.step, 0.1);
    bindInput(
      this.slider.max,
      computed(() => this.player.duration() || 0),
    );
    bindInput(this.slider.classInput, this.class);
    effect(() => {
      const time = this.player.currentTime();
      untracked(() => this.slider.value.set(time));
    });
    this.slider.value.subscribe((value) => {
      if (Math.abs(value - this.player.currentTime()) > 0.2) {
        this.player.seekTo(value);
      }
    });
    this.player.ɵseek.set(this.element);

    // Before the slider's own keys (a capture listener runs first): steps of
    // seconds, not of its 0.1 s step.
    const onKeydown = (event: KeyboardEvent) => this.onKeydown(event);
    this.element.addEventListener('keydown', onKeydown, { capture: true });
    inject(DestroyRef).onDestroy(() => {
      this.element.removeEventListener('keydown', onKeydown, { capture: true });
      if (this.player.ɵseek() === this.element) this.player.ɵseek.set(null);
    });
  }

  private onKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const forward = this.directionality.valueSignal() === 'rtl' ? -1 : 1;
    const steps: Record<string, number> = {
      ArrowRight: 5 * forward,
      ArrowLeft: -5 * forward,
      ArrowUp: 5,
      ArrowDown: -5,
      PageUp: 10,
      PageDown: -10,
    };
    const step = steps[event.key];
    if (step === undefined) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    this.player.seekBy(step);
  }

  private onPointerMove(event: PointerEvent): void {
    const rect = this.element.getBoundingClientRect();
    if (!rect.width) return;
    let at = (event.clientX - rect.left) / rect.width;
    if (this.directionality.valueSignal() === 'rtl') at = 1 - at;
    at = Math.min(1, Math.max(0, at));
    this.player.preview.set({ time: at * this.player.duration(), at });
  }
}
