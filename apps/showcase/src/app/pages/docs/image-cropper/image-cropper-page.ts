import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicCropperXDemoContainer } from './demos/basic-cropper-demo-container';
import { AspectRatioCropperXDemoContainer } from './demos/aspect-ratio-cropper-demo-container';
import { AvatarCropperXDemoContainer } from './demos/avatar-cropper-demo-container';
import { UploadCropperXDemoContainer } from './demos/upload-cropper-demo-container';
import { InfoCropperXDemoContainer } from './demos/info-cropper-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-image-cropper-page',
  imports: [
    BasicCropperXDemoContainer,
    AspectRatioCropperXDemoContainer,
    AvatarCropperXDemoContainer,
    UploadCropperXDemoContainer,
    InfoCropperXDemoContainer,
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
        <app-basic-cropper-demo-container />
        <app-aspect-ratio-cropper-demo-container />
        <app-avatar-cropper-demo-container />
        <app-upload-cropper-demo-container />
        <app-info-cropper-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageCropperPage {}
