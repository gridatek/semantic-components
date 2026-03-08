import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScSlider, cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[scImageCropperZoomSlider]',
  imports: [ScSlider],
  template: `
    <input
      scSlider
      aria-label="Zoom level"
      [min]="0.1"
      [max]="3"
      [step]="0.1"
      [value]="cropper.zoom()"
      (valueChange)="cropper.setZoom($event)"
    />
    <span class="text-muted-foreground min-w-[50px] text-center text-sm">
      {{ zoomPercentage() }}
    </span>
  `,
  host: {
    'data-slot': 'image-cropper-zoom-slider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperZoomSlider {
  protected readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-2', this.classInput()),
  );

  protected readonly zoomPercentage = computed(
    () => `${(this.cropper.zoom() * 100).toFixed(0)}%`,
  );
}
