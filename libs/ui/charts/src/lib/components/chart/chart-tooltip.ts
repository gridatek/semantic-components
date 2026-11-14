import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScChartState } from './chart-state';
import { ScChartTooltipProvider } from './chart-tooltip-provider';

/**
 * The tooltip's box, in its provider's overlay: the preset's look. You write
 * what is in it from its state — `label()`, the category; `payload()`, an item
 * per series (Recharts' names) — with `scChartTooltipLabel` and
 * `scChartTooltipItem`. What it shows is what screen readers hear.
 */
@Directive({
  selector: 'div[scChartTooltip]',
  exportAs: 'scChartTooltip',
  host: {
    'data-slot': 'chart-tooltip',
    '[attr.data-side]': 'provider.placedSide()',
    // The series' colors: its overlay is outside the chart that sets them.
    '[style]': 'state.colors()',
    '[class]': 'class()',
  },
})
export class ScChartTooltip {
  protected readonly provider = inject(ScChartTooltipProvider);
  protected readonly state = inject(ScChartState);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly tooltipStyles = injectPreset().chart.tooltip;
  private readonly reducedMotion =
    !!this.host.ownerDocument.defaultView?.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;

  /** Where its overlay put it last, on the screen (its glide aside). */
  private placed: { x: number; y: number } | null = null;
  private glide: Animation | null = null;

  readonly classInput = input<string>('', { alias: 'class' });

  /** A category is pointed at: it shows. */
  readonly active = this.provider.active;
  /** The category's name, as in the data. */
  readonly label = this.provider.label;
  /** Each series' value at the category, with its name and colour. */
  readonly payload = this.provider.payload;

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.tooltipStyles, this.classInput()),
  );

  constructor() {
    // Its text, once written, to the provider's live region.
    afterRenderEffect(() => {
      this.label();
      this.payload();
      // As shown: innerText spaces its parts (textContent runs them on).
      this.provider.announcement.set(
        this.host.innerText.replace(/\s+/g, ' ').trim(),
      );
    });
    // Its glide, as Recharts': each time its overlay moves it (the CDK, at
    // once), it slides there from where it was seen — through flips too.
    afterRenderEffect(() => {
      this.provider.origin();
      this.provider.placedSide();
      this.glideFrom();
    });
  }

  /**
   * From where it was seen (its last place, and its glide on the way) to
   * where it is now. Not the first time: it appears where it goes.
   */
  private glideFrom(): void {
    const before = this.placed;
    if (!before) {
      // Its first place: once the overlay has put it there (a frame on).
      this.host.ownerDocument.defaultView?.requestAnimationFrame(
        () => (this.placed ??= this.place()),
      );
      return;
    }
    const [tx, ty] = this.translation();
    const now = this.place();
    this.placed = now;
    if (
      !this.provider.isAnimationActive() ||
      this.reducedMotion ||
      (before.x === now.x && before.y === now.y)
    )
      return;
    const from = `${before.x + tx - now.x}px ${before.y + ty - now.y}px`;
    this.glide?.cancel();
    this.glide = this.host.animate(
      [{ translate: from }, { translate: '0px 0px' }],
      {
        duration: this.provider.animationDuration(),
        easing: this.provider.animationEasing(),
      },
    );
  }

  /** Where its overlay put it, on the screen: its box, its glide aside. */
  private place(): { x: number; y: number } {
    const [tx, ty] = this.translation();
    const box = this.host.getBoundingClientRect();
    return { x: box.left - tx, y: box.top - ty };
  }

  /** How far its glide has it from its place right now (px). */
  private translation(): [number, number] {
    const value = getComputedStyle(this.host).translate;
    if (!value || value === 'none') return [0, 0];
    const [x = '0', y = '0'] = value.split(' ');
    return [parseFloat(x) || 0, parseFloat(y) || 0];
  }
}
