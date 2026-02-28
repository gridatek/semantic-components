import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn, ScSlider } from '@semantic-components/ui';
import { SC_CROPPER } from './cropper';

@Component({
  selector: '[scCropperZoomSlider]',
  imports: [ScSlider],
  template: `
    <input
      #sliderEl
      scSlider
      [min]="0.1"
      [max]="3"
      [step]="0.1"
      [value]="cropper.zoom()"
      (input)="onInput($event)"
    />
    <span class="text-muted-foreground min-w-[50px] text-center text-sm">
      {{ zoomPercentage() }}
    </span>
  `,
  host: {
    'data-slot': 'cropper-zoom-slider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCropperZoomSlider {
  protected readonly cropper = inject(SC_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-2', this.classInput()),
  );

  protected readonly zoomPercentage = computed(
    () => `${(this.cropper.zoom() * 100).toFixed(0)}%`,
  );

  private readonly sliderEl =
    viewChild<ElementRef<HTMLInputElement>>('sliderEl');

  constructor() {
    effect(() => {
      const zoom = this.cropper.zoom();
      const el = this.sliderEl()?.nativeElement;
      if (!el) return;

      el.value = String(zoom);
      const min = parseFloat(el.min) || 0;
      const max = parseFloat(el.max) || 100;
      const percent = ((zoom - min) / (max - min)) * 100;
      el.style.setProperty('--fill-percent', `${percent}%`);
    });
  }

  protected onInput(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.cropper.setZoom(value);
  }
}
