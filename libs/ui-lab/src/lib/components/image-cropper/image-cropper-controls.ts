import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';
import { cn, ScButton, ScSlider } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[scImageCropperControls]',
  imports: [SiZoomOutIcon, SiZoomInIcon, ScSlider, ScButton],
  template: `
    <div class="flex items-center gap-2">
      <button
        scButton
        variant="outline"
        size="icon"
        [disabled]="cropper.zoom() <= 0.1"
        (click)="cropper.zoomOut()"
        aria-label="Zoom out"
      >
        <svg siZoomOutIcon class="size-4"></svg>
      </button>

      <div class="flex min-w-[120px] items-center gap-2">
        <input
          scSlider
          min="0.1"
          max="3"
          step="0.1"
          [value]="cropper.zoom()"
          (input)="onZoomChange($event)"
        />
      </div>

      <button
        scButton
        variant="outline"
        size="icon"
        [disabled]="cropper.zoom() >= 3"
        (click)="cropper.zoomIn()"
        aria-label="Zoom in"
      >
        <svg siZoomInIcon class="size-4"></svg>
      </button>

      <span class="text-muted-foreground min-w-[50px] text-center text-sm">
        {{ (cropper.zoom() * 100).toFixed(0) }}%
      </span>
    </div>
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
    cn('flex items-center gap-4 py-2', this.classInput()),
  );

  onZoomChange(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.cropper.setZoom(value);
  }
}
