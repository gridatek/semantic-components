import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCropperArea,
  ScCropper,
  ScCropperCanvas,
  ScCropperImage,
  ScCropperOverlay,
  ScCropperSelection,
  ScCropperDragRegion,
  ScCropperHandle,
  ScCropperGrid,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-info-cropper-x-demo',
  imports: [
    ScCropper,
    ScCropperCanvas,
    ScCropperImage,
    ScCropperOverlay,
    ScCropperSelection,
    ScCropperDragRegion,
    ScCropperHandle,
    ScCropperGrid,
  ],
  template: `
    <div class="space-y-4">
      <div scCropper [(cropArea)]="cropArea" [containerHeight]="300">
        <div scCropperCanvas class="overflow-hidden rounded-lg border">
          <img scCropperImage [src]="imageSrc()" alt="Image to crop" />
          <div scCropperOverlay></div>
          <div scCropperSelection>
            <div scCropperDragRegion></div>
            <div scCropperHandle position="top-left"></div>
            <div scCropperHandle position="top-right"></div>
            <div scCropperHandle position="bottom-left"></div>
            <div scCropperHandle position="bottom-right"></div>
            <div scCropperHandle position="top"></div>
            <div scCropperHandle position="right"></div>
            <div scCropperHandle position="bottom"></div>
            <div scCropperHandle position="left"></div>
            <div scCropperGrid [columns]="3" [rows]="3"></div>
          </div>
        </div>
      </div>

      <div class="bg-muted/50 rounded-md border p-4">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-muted-foreground">X:</span>
            <span class="ml-2 font-mono">{{ cropArea().x.toFixed(0) }}px</span>
          </div>
          <div>
            <span class="text-muted-foreground">Y:</span>
            <span class="ml-2 font-mono">{{ cropArea().y.toFixed(0) }}px</span>
          </div>
          <div>
            <span class="text-muted-foreground">Width:</span>
            <span class="ml-2 font-mono">
              {{ cropArea().width.toFixed(0) }}px
            </span>
          </div>
          <div>
            <span class="text-muted-foreground">Height:</span>
            <span class="ml-2 font-mono">
              {{ cropArea().height.toFixed(0) }}px
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCropperXDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly cropArea = signal<ScCropperArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
}
