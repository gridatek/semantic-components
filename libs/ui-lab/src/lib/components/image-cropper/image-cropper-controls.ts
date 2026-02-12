import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[sc-image-cropper-controls]',
  template: `
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="inline-flex size-8 items-center justify-center rounded-md border bg-background hover:bg-accent disabled:opacity-50"
        [disabled]="cropper.zoom() <= 0.1"
        (click)="cropper.zoomOut()"
        aria-label="Zoom out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="size-4"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 11h6" />
        </svg>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="size-4"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
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
