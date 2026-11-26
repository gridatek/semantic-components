import { Directive, ElementRef, computed, effect, inject } from '@angular/core';
import { bindInput, injectDisplayLocale, ɵwarnIfUnnamed } from '../../utils';
import { ScSlider } from '../slider/slider';
import { ScImageCropper } from './image-cropper';

/**
 * The zoom, as a slider: your `input`, in the style's slider look — from 1
 * (the largest crop) to the most the cropper allows, read out as a
 * percentage in the locale. Name it (`aria-label`).
 */
@Directive({
  selector: 'input[scImageCropperZoom]',
  hostDirectives: [{ directive: ScSlider, inputs: ['class'] }],
  host: {
    '[attr.aria-valuetext]': 'text()',
    '(input)': 'onInput()',
  },
})
export class ScImageCropperZoom {
  private readonly cropper = inject(ScImageCropper);
  private readonly slider = inject(ScSlider, { self: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  /** What it shows: the locale, in the user's numbering system. */
  private readonly displayLocale = injectDisplayLocale();
  private readonly percent = computed(
    () =>
      new Intl.NumberFormat(this.displayLocale(), {
        style: 'percent',
        maximumFractionDigits: 0,
      }),
  );

  private readonly text = computed(() =>
    this.percent().format(this.cropper.zoom()),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperZoom');
    bindInput(this.slider.min, 1);
    bindInput(
      this.slider.max,
      computed(() => this.cropper.mostZoom()),
    );
    // A tenth an arrow.
    bindInput(this.slider.step, 0.1);
    bindInput(
      this.slider.disabled,
      computed(() => this.cropper.disabled() || !this.cropper.ready()),
    );
    effect(() => this.slider.value.set(this.cropper.zoom()));
  }

  private onInput(): void {
    this.cropper.setZoom(this.element.valueAsNumber);
  }
}
