import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCropperArea,
  ScImageCropper,
  ScImageCropperCanvas,
  ScImageCropperImage,
  ScImageCropperOverlay,
  ScImageCropperSelection,
  ScImageCropperDragRegion,
  ScImageCropperHandle,
  ScImageCropperGrid,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-info-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperCanvas,
    ScImageCropperImage,
    ScImageCropperOverlay,
    ScImageCropperSelection,
    ScImageCropperDragRegion,
    ScImageCropperHandle,
    ScImageCropperGrid,
  ],
  template: `
    <div class="space-y-4">
      <div scImageCropper [(cropArea)]="cropArea" [containerHeight]="300">
        <div scImageCropperCanvas class="overflow-hidden rounded-lg border">
          <img scImageCropperImage [src]="imageSrc()" alt="Image to crop" />
          <div scImageCropperOverlay></div>
          <div scImageCropperSelection>
            <div scImageCropperDragRegion></div>
            <div scImageCropperHandle position="top-left"></div>
            <div scImageCropperHandle position="top-right"></div>
            <div scImageCropperHandle position="bottom-left"></div>
            <div scImageCropperHandle position="bottom-right"></div>
            <div scImageCropperHandle position="top"></div>
            <div scImageCropperHandle position="right"></div>
            <div scImageCropperHandle position="bottom"></div>
            <div scImageCropperHandle position="left"></div>
            <div scImageCropperGrid [columns]="3" [rows]="3"></div>
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
export class InfoCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly cropArea = signal<ScImageCropperArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
}
