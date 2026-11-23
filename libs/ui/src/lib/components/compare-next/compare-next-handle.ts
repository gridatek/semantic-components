import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { ScCompareNext } from './compare-next';

/**
 * The divider's slider: a line and a knob — your icon inside. Name it
 * ("Before and after"); it reads the position as a percentage in the app's
 * language, or your `aria-valuetext` ("30% before"). Arrows move it their
 * way (as the text reads), Shift ten steps, Page Up / Page Down ten percent,
 * Home / End to the ends.
 */
@Directive({
  selector: '[scCompareNextHandle]',
  host: {
    'data-slot': 'compare-handle',
    role: 'slider',
    tabindex: '0',
    '[attr.aria-valuemin]': 'compare.bounds()',
    '[attr.aria-valuemax]': '100 - compare.bounds()',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-valuetext]': 'valueText()',
    '[attr.aria-orientation]': 'compare.orientation()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScCompareNextHandle {
  private readonly compare = inject(ScCompareNext);
  private readonly styles = injectStyle().compare;
  private readonly percent = new Intl.NumberFormat(inject(LOCALE_ID), {
    style: 'percent',
    maximumFractionDigits: 0,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaValueText = input<string | null>(null, {
    alias: 'aria-valuetext',
  });

  private readonly value = computed(() => Math.round(this.compare.position()));
  private readonly valueText = computed(
    () => this.ariaValueText() ?? this.percent.format(this.value() / 100),
  );

  private readonly class = computed(() => {
    const vertical = this.compare.orientation() === 'vertical';
    return cn(
      'absolute z-10 flex items-center justify-center outline-none',
      // The line: light over photos, with a shadow on light ones.
      'before:absolute before:bg-white before:shadow-[0_0_4px_rgb(0_0_0/0.4)]',
      // The knob: the theme's colours, the style's corners.
      'after:absolute after:size-9 after:border after:bg-background after:shadow-md',
      this.styles.knob,
      '*:relative *:z-10 *:shrink-0 *:text-foreground [&_svg]:size-4',
      'focus-visible:after:ring-3 focus-visible:after:ring-ring/50',
      vertical
        ? 'inset-x-0 top-(--sc-compare-position) h-0 before:inset-x-0 before:h-0.5 before:-translate-y-1/2'
        : 'inset-y-0 start-(--sc-compare-position) w-0 before:inset-y-0 before:w-0.5 before:-translate-x-1/2 rtl:before:translate-x-1/2',
      // Moved by the keys: it glides there (not under reduced motion).
      this.compare.gliding()
        ? 'transition-[inset-inline-start,top] duration-150 ease-out motion-reduce:transition-none'
        : '',
      this.compare.handleOnly() !== false &&
        !this.compare.hover() &&
        (vertical ? 'cursor-ns-resize' : 'cursor-ew-resize'),
      this.classInput(),
    );
  });

  constructor() {
    ɵwarnIfUnnamed('scCompareNextHandle');
  }

  private onKeydown(event: KeyboardEvent): void {
    const vertical = this.compare.orientation() === 'vertical';
    const step = this.compare.step() * (event.shiftKey ? 10 : 1);
    const position = this.compare.position();
    // Forward: towards the end — as the text reads; down, when vertical.
    const forward = vertical
      ? 'ArrowDown'
      : this.compare.rtl()
        ? 'ArrowLeft'
        : 'ArrowRight';
    const back = vertical
      ? 'ArrowUp'
      : this.compare.rtl()
        ? 'ArrowRight'
        : 'ArrowLeft';
    const steps: Record<string, number> = {
      [forward]: position + step,
      [back]: position - step,
      // Page Up: ten percent up the slider — towards the end across, up when vertical.
      PageUp: position + (vertical ? -10 : 10),
      PageDown: position + (vertical ? 10 : -10),
      Home: 0,
      End: 100,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    this.compare.setPosition(steps[event.key], true);
  }
}
