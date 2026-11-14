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
  }
}
