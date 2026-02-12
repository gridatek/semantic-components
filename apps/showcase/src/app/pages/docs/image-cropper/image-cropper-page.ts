import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicImageCropperDemoContainer } from './demos/basic-image-cropper-demo-container';
import { AspectRatioImageCropperDemoContainer } from './demos/aspect-ratio-image-cropper-demo-container';
import { AvatarImageCropperDemoContainer } from './demos/avatar-image-cropper-demo-container';
import { UploadImageCropperDemoContainer } from './demos/upload-image-cropper-demo-container';
import { InfoImageCropperDemoContainer } from './demos/info-image-cropper-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-image-cropper-page',
  imports: [
    BasicImageCropperDemoContainer,
    AspectRatioImageCropperDemoContainer,
    AvatarImageCropperDemoContainer,
    UploadImageCropperDemoContainer,
    InfoImageCropperDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">ImageCropper</h1>
        <p class="text-muted-foreground">
          An interactive image cropping component with drag, resize, zoom, and
          aspect ratio controls.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-image-cropper-demo-container />
        <app-aspect-ratio-image-cropper-demo-container />
        <app-avatar-image-cropper-demo-container />
        <app-upload-image-cropper-demo-container />
        <app-info-image-cropper-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageCropperPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'image-cropper')!
    .status;
}
