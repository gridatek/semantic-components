import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicImageCropperDemo } from './basic-image-cropper-demo';

@Component({
  selector: 'app-basic-image-cropper-demo-container',
  imports: [DemoContainer, BasicImageCropperDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/image-cropper/basic-image-cropper-demo"
      [code]="code"
    >
      <app-basic-image-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicImageCropperDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCropArea,
  ScCropResult,
  ScImageCropper,
  ScImageCropperContainer,
  ScImageCropperControls,
  ScImageCropperZoomIn,
  ScImageCropperZoomOut,
} from '@semantic-components/ui-lab';
import { ScButton, ScSlider } from '@semantic-components/ui';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperContainer,
    ScImageCropperControls,
    ScImageCropperZoomIn,
    ScImageCropperZoomOut,
    ScButton,
    ScSlider,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: \`
    <div
      scImageCropper
      [src]="imageSrc()"
      [(cropArea)]="cropArea"
      [containerHeight]="300"
      class="space-y-4"
    >
      <div
        scImageCropperContainer
        #container="scImageCropperContainer"
        class="overflow-hidden rounded-lg border"
      >
        <div
          class="relative overflow-hidden bg-black/90 select-none"
          [style.height.px]="container.cropper.containerHeight()"
        >
          <div
            class="absolute inset-0 flex items-center justify-center"
            [style.transform]="container.imageTransform()"
          >
            <img
              #cropImageEl
              [src]="container.cropper.src()"
              class="max-w-none"
              [style.width.px]="container.scaledImageWidth()"
              [style.height.px]="container.scaledImageHeight()"
              (load)="container.onImageLoad()"
              draggable="false"
              alt="Image to crop"
            />
          </div>

          <div class="pointer-events-none absolute inset-0">
            <svg class="h-full w-full">
              <defs>
                <mask id="cropMask">
                  <rect width="100%" height="100%" fill="white" />
                  <rect
                    [attr.x]="container.cropper.cropArea().x"
                    [attr.y]="container.cropper.cropArea().y"
                    [attr.width]="container.cropper.cropArea().width"
                    [attr.height]="container.cropper.cropArea().height"
                    fill="black"
                  />
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="rgba(0,0,0,0.5)"
                mask="url(#cropMask)"
              />
            </svg>
          </div>

          <div
            class="absolute cursor-move border-2 border-white"
            [style.left.px]="container.cropper.cropArea().x"
            [style.top.px]="container.cropper.cropArea().y"
            [style.width.px]="container.cropper.cropArea().width"
            [style.height.px]="container.cropper.cropArea().height"
            (mousedown)="container.onCropAreaMouseDown(\$event)"
            (touchstart)="container.onCropAreaTouchStart(\$event)"
            (mousemove)="container.onMouseMove(\$event)"
            (touchmove)="container.onTouchMove(\$event)"
          >
            @if (container.cropper.showGrid()) {
              <div class="pointer-events-none absolute inset-0">
                <div
                  class="absolute top-0 bottom-0 left-1/3 w-px bg-white/30"
                ></div>
                <div
                  class="absolute top-0 bottom-0 left-2/3 w-px bg-white/30"
                ></div>
                <div
                  class="absolute top-1/3 right-0 left-0 h-px bg-white/30"
                ></div>
                <div
                  class="absolute top-2/3 right-0 left-0 h-px bg-white/30"
                ></div>
              </div>
            }

            @if (!container.cropper.disabled()) {
              <div
                class="absolute -top-1.5 -left-1.5 z-10 size-3 cursor-nw-resize border border-gray-400 bg-white"
                (mousedown)="container.onHandleMouseDown(\$event, 'nw')"
                (touchstart)="container.onHandleTouchStart(\$event, 'nw')"
              ></div>
              <div
                class="absolute -top-1.5 -right-1.5 z-10 size-3 cursor-ne-resize border border-gray-400 bg-white"
                (mousedown)="container.onHandleMouseDown(\$event, 'ne')"
                (touchstart)="container.onHandleTouchStart(\$event, 'ne')"
              ></div>
              <div
                class="absolute -bottom-1.5 -left-1.5 z-10 size-3 cursor-sw-resize border border-gray-400 bg-white"
                (mousedown)="container.onHandleMouseDown(\$event, 'sw')"
                (touchstart)="container.onHandleTouchStart(\$event, 'sw')"
              ></div>
              <div
                class="absolute -right-1.5 -bottom-1.5 z-10 size-3 cursor-se-resize border border-gray-400 bg-white"
                (mousedown)="container.onHandleMouseDown(\$event, 'se')"
                (touchstart)="container.onHandleTouchStart(\$event, 'se')"
              ></div>

              <div
                class="absolute -top-1.5 left-1/2 z-10 h-3 w-6 -translate-x-1/2 cursor-n-resize border border-gray-400 bg-white"
                (mousedown)="container.onHandleMouseDown(\$event, 'n')"
                (touchstart)="container.onHandleTouchStart(\$event, 'n')"
              ></div>
              <div
                class="absolute -bottom-1.5 left-1/2 z-10 h-3 w-6 -translate-x-1/2 cursor-s-resize border border-gray-400 bg-white"
                (mousedown)="container.onHandleMouseDown(\$event, 's')"
                (touchstart)="container.onHandleTouchStart(\$event, 's')"
              ></div>
              <div
                class="absolute top-1/2 -left-1.5 z-10 h-6 w-3 -translate-y-1/2 cursor-w-resize border border-gray-400 bg-white"
                (mousedown)="container.onHandleMouseDown(\$event, 'w')"
                (touchstart)="container.onHandleTouchStart(\$event, 'w')"
              ></div>
              <div
                class="absolute top-1/2 -right-1.5 z-10 h-6 w-3 -translate-y-1/2 cursor-e-resize border border-gray-400 bg-white"
                (mousedown)="container.onHandleMouseDown(\$event, 'e')"
                (touchstart)="container.onHandleTouchStart(\$event, 'e')"
              ></div>
            }
          </div>
        </div>

        <canvas #cropCanvasEl class="hidden"></canvas>
      </div>

      <div class="flex items-center gap-2">
        <button
          scButton
          scImageCropperZoomOut
          variant="outline"
          size="icon"
          aria-label="Zoom out"
        >
          <svg siZoomOutIcon class="size-4"></svg>
        </button>

        <input
          scSlider
          scImageCropperControls
          #controls="scImageCropperControls"
        />
        <span class="text-muted-foreground min-w-[50px] text-center text-sm">
          {{ controls.zoomPercentage() }}
        </span>

        <button
          scButton
          scImageCropperZoomIn
          variant="outline"
          size="icon"
          aria-label="Zoom in"
        >
          <svg siZoomInIcon class="size-4"></svg>
        </button>
      </div>

      <div class="flex gap-4">
        <button
          type="button"
          class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
          (click)="cropImage(container)"
        >
          Crop Image
        </button>
        <button
          type="button"
          class="hover:bg-accent rounded-md border px-4 py-2"
          (click)="container.resetCropArea()"
        >
          Reset
        </button>
      </div>

      @if (croppedImage()) {
        <div class="space-y-2">
          <p class="text-sm font-medium">Cropped Result:</p>
          <img
            [src]="croppedImage()"
            class="max-w-xs rounded-md border"
            alt="Cropped result"
          />
        </div>
      }
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicImageCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );

  readonly cropArea = signal<ScCropArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
  readonly croppedImage = signal<string | null>(null);

  async cropImage(
    container: InstanceType<typeof ScImageCropperContainer>,
  ): Promise<void> {
    try {
      const result: ScCropResult = await container.crop();
      this.croppedImage.set(result.dataUrl);
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  }
}`;
}
