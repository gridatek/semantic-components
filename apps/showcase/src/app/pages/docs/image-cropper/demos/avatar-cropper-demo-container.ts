import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarCropperDemo } from './avatar-cropper-demo';

@Component({
  selector: 'app-avatar-cropper-demo-container',
  imports: [DemoContainer, AvatarCropperDemo],
  template: `
    <app-demo-container
      title="Circle Crop / Avatar"
      demoUrl="/demos/image-cropper/avatar-cropper-demo"
      [code]="code"
    >
      <app-avatar-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarCropperDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScImageCropper,
  ScImageCropperCanvas,
  ScImageCropperDragRegion,
  ScImageCropperGrid,
  ScImageCropperHandle,
  ScImageCropperImage,
  ScImageCropperOverlay,
  ScImageCropperPreview,
  ScImageCropperSelection,
  ScImageCropperZoomIn,
  ScImageCropperZoomOut,
  ScImageCropperZoomSlider,
} from '@semantic-components/ui-lab';
import { SiZoomInIcon, SiZoomOutIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-avatar-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperCanvas,
    ScImageCropperImage,
    ScImageCropperOverlay,
    ScImageCropperSelection,
    ScImageCropperDragRegion,
    ScImageCropperHandle,
    ScImageCropperGrid,
    ScImageCropperZoomIn,
    ScImageCropperZoomOut,
    ScImageCropperZoomSlider,
    ScImageCropperPreview,
    ScButton,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: \`
    <div
      scImageCropper
      [aspectRatio]="1"
      [containerHeight]="250"
      cropShape="circle"
      class="space-y-4"
    >
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

      <div class="flex gap-8">
        <div class="flex flex-1 items-center gap-2">
          <button
            scButton
            scImageCropperZoomOut
            variant="outline"
            size="icon"
            aria-label="Zoom out"
          >
            <svg siZoomOutIcon class="size-4"></svg>
          </button>

          <div scImageCropperZoomSlider class="flex-1"></div>

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
      </div>

      <div class="space-y-4">
        <p class="text-sm font-medium">Preview:</p>
        <div class="flex flex-wrap gap-4">
          <div>
            <div class="text-muted-foreground text-xs">Large (100x100)</div>
            <div
              scImageCropperPreview
              [width]="100"
              [height]="100"
              class="rounded-full"
            ></div>
          </div>
          <div>
            <div class="text-muted-foreground text-xs">Medium (64x64)</div>
            <div
              scImageCropperPreview
              [width]="64"
              [height]="64"
              class="rounded-full"
            ></div>
          </div>
          <div>
            <div class="text-muted-foreground text-xs">Small (40x40)</div>
            <div
              scImageCropperPreview
              [width]="40"
              [height]="40"
              class="rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );
}`;
}
