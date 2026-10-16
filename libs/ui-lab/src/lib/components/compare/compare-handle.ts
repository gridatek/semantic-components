import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScCompare } from './compare';

/**
 * The divider, and its slider: focusable, named by you ("Before and after"),
 * your icon inside. Arrows move it (Shift, Page Up / Down: by 10), Home and
 * End to the ends. Write its `aria-valuetext` if a percentage isn't clear.
 */
@Directive({
  selector: '[scCompareHandle]',
  host: {
    'data-slot': 'compare-handle',
    role: 'slider',
    tabindex: '0',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-orientation]': 'compare.orientation()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScCompareHandle {
  protected readonly compare = inject(ScCompare);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly value = computed(() =>
    Math.round(this.compare.position()),
  );

  protected readonly class = computed(() =>
    cn(
      'absolute z-10 flex items-center justify-center outline-none',
      // The line, through the whole compare.
      'before:absolute before:bg-white before:shadow-[0_0_4px_rgb(0_0_0/0.4)]',
      // The knob: your icon in it.
      'after:absolute after:size-9 after:rounded-full after:border after:border-black/10 after:bg-white after:shadow-md',
      '*:relative *:z-10 *:shrink-0 *:text-neutral-800 [&_svg]:size-4',
      'focus-visible:after:ring-3 focus-visible:after:ring-ring',
      this.compare.orientation() === 'vertical'
        ? 'inset-x-0 top-(--sc-compare-position) h-0 before:inset-x-0 before:h-0.5 before:-translate-y-1/2'
        : 'inset-y-0 start-(--sc-compare-position) w-0 before:inset-y-0 before:w-0.5 before:-translate-x-1/2 rtl:before:translate-x-1/2',
      this.compare.handleOnly() &&
        !this.compare.hover() &&
        (this.compare.orientation() === 'vertical'
          ? 'cursor-ns-resize'
          : 'cursor-ew-resize'),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scCompareHandle');
  }

  protected onKeydown(event: KeyboardEvent): void {
    const big = event.shiftKey ? 10 : 1;
    // Towards the after (right, or left in RTL; down when vertical) is more.
    const forward = this.compare.rtl() ? 'ArrowLeft' : 'ArrowRight';
    const back = this.compare.rtl() ? 'ArrowRight' : 'ArrowLeft';
    const position = this.compare.position();
    const steps: Record<string, number> = {
      [forward]: position + big,
      [back]: position - big,
      ArrowDown: position + big,
      ArrowUp: position - big,
      PageDown: position + 10,
      PageUp: position - 10,
      Home: 0,
      End: 100,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    this.compare.setPosition(steps[event.key]);
  }
}
