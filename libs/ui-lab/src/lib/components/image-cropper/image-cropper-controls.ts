import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn, ScSlider } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[scImageCropperControls]',
  exportAs: 'scImageCropperControls',
  imports: [ScSlider],
  template: `
    <input
      scSlider
      [min]="0.1"
      [max]="3"
      [step]="0.1"
      [value]="cropper.zoom()"
      (input)="onZoomChange($event)"
    />
    <span class="text-muted-foreground min-w-[50px] text-center text-sm">
      {{ zoomPercentage() }}
    </span>
  `,
  host: {
    'data-slot': 'image-cropper-controls',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperControls {
  readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-2', this.classInput()),
  );

  readonly zoomPercentage = computed(
    () => `${(this.cropper.zoom() * 100).toFixed(0)}%`,
  );

  onZoomChange(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.cropper.setZoom(value);
  }
}
