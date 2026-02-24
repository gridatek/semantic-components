import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[scImageCropperControls]',
  imports: [SiZoomOutIcon, SiZoomInIcon],
  template: `
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="inline-flex size-8 items-center justify-center rounded-md border bg-background hover:bg-accent disabled:opacity-50"
        [disabled]="cropper.zoom() <= 0.1"
        (click)="cropper.zoomOut()"
        aria-label="Zoom out"
      >
        <svg siZoomOutIcon class="size-4"></svg>
      </button>

      <div class="flex items-center gap-2 min-w-[120px]">
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          [value]="cropper.zoom()"
          (input)="onZoomChange($event)"
          class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <button
        type="button"
        class="inline-flex size-8 items-center justify-center rounded-md border bg-background hover:bg-accent disabled:opacity-50"
        [disabled]="cropper.zoom() >= 3"
        (click)="cropper.zoomIn()"
        aria-label="Zoom in"
      >
        <svg siZoomInIcon class="size-4"></svg>
      </button>

      <span class="text-sm text-muted-foreground min-w-[50px] text-center">
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
