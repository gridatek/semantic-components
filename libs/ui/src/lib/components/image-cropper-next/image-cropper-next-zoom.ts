import {
  Directive,
  ElementRef,
  LOCALE_ID,
  computed,
  effect,
  inject,
} from '@angular/core';
import { bindInput, ɵwarnIfUnnamed } from '../../utils';
import { ScSlider } from '../slider/slider';
import { ScImageCropperNext } from './image-cropper-next';

/**
 * The zoom, as a slider: your `input`, in the style's slider look — from 1
 * (the largest crop) to the most the cropper allows, read out as a
 * percentage in the locale. Name it (`aria-label`).
 */
@Directive({
  selector: 'input[scImageCropperNextZoom]',
  hostDirectives: [{ directive: ScSlider, inputs: ['class'] }],
  host: {
    '[attr.aria-valuetext]': 'text()',
    '(input)': 'onInput()',
  },
})
export class ScImageCropperNextZoom {
  private readonly cropper = inject(ScImageCropperNext);
  private readonly slider = inject(ScSlider, { self: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly percent = new Intl.NumberFormat(inject(LOCALE_ID), {
    style: 'percent',
    maximumFractionDigits: 0,
  });

  private readonly text = computed(() =>
    this.percent.format(this.cropper.zoom()),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageCropperNextZoom');
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
