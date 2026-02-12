import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarImageCropperDemo } from './avatar-image-cropper-demo';

@Component({
  selector: 'app-avatar-image-cropper-demo-container',
  imports: [DemoContainer, AvatarImageCropperDemo],
  template: `
    <app-demo-container
      title="Square Crop (Avatar)"
      demoUrl="/demos/image-cropper/avatar-image-cropper-demo"
      [code]="code"
    >
      <app-avatar-image-cropper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImageCropperDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScImageCropper,
  ScImageCropperContainer,
  ScImageCropperControls,
  ScImageCropperPreview,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-avatar-image-cropper-demo',
  imports: [
    ScImageCropper,
    ScImageCropperContainer,
    ScImageCropperControls,
    ScImageCropperPreview,
  ],
  template: \`
    <div
      sc-image-cropper
      [src]="imageSrc()"
      [aspectRatio]="1"
      [containerHeight]="250"
      class="space-y-4"
    >
      <div
        sc-image-cropper-container
        class="rounded-lg overflow-hidden border"
      ></div>

      <div class="flex gap-8">
        <div class="flex-1">
          <div sc-image-cropper-controls></div>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-medium">Preview:</p>
          <div class="space-y-3">
            <div class="text-xs text-muted-foreground">Large (100x100)</div>
            <div
              sc-image-cropper-preview
              [width]="100"
              [height]="100"
              class="rounded-full overflow-hidden"
            ></div>

            <div class="text-xs text-muted-foreground">Medium (64x64)</div>
            <div
              sc-image-cropper-preview
              [width]="64"
              [height]="64"
              class="rounded-full overflow-hidden"
            ></div>

            <div class="text-xs text-muted-foreground">Small (40x40)</div>
            <div
              sc-image-cropper-preview
              [width]="40"
              [height]="40"
              class="rounded-full overflow-hidden"
            ></div>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImageCropperDemo {
  readonly imageSrc = signal(
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  );
}`;
}
