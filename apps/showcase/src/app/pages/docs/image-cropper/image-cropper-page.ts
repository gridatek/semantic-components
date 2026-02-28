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
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-image-cropper-page',
  imports: [
    BasicImageCropperDemoContainer,
    AspectRatioImageCropperDemoContainer,
    AvatarImageCropperDemoContainer,
    UploadImageCropperDemoContainer,
    InfoImageCropperDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Image Cropper</h1>
        <p class="text-muted-foreground">
          An interactive image cropping component with drag, resize, zoom, and
          aspect ratio controls.
        </p>
        <app-component-badges path="image-cropper" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
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
export default class ImageCropperPage {}
