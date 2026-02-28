import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AvatarCropperDemoContainer } from './demos/avatar-cropper-demo-container';
import { FullFeaturedCropperDemoContainer } from './demos/full-featured-cropper-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-image-cropper-page',
  imports: [
    AvatarCropperDemoContainer,
    FullFeaturedCropperDemoContainer,
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
        <app-full-featured-cropper-demo-container />
        <app-avatar-cropper-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageCropperPage {}
