import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AvatarImageCropperDemoContainer } from './demos/avatar-image-cropper-demo-container';
import { BoxImageCropperDemoContainer } from './demos/box-image-cropper-demo-container';
import { CoverImageCropperDemoContainer } from './demos/cover-image-cropper-demo-container';

@Component({
  selector: 'app-image-cropper-page',
  imports: [
    BoxImageCropperDemoContainer,
    AvatarImageCropperDemoContainer,
    CoverImageCropperDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Image Cropper</h1>
        <p class="text-muted-foreground">
          Crop an image, put together from parts — both ways: a box you resize
          over the image, or a frame the image moves under — with the keyboard,
          pinch and wheel, and the crop as a file.
        </p>
        <app-component-badges path="image-cropper" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Crop box</h2>
        <p class="text-muted-foreground">
          Handles in the selection make it a box resized over the image. The
          slider and the zoom buttons share one
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">zoom</code>.
          Focused, the arrows move the crop and Alt + arrows resize it.
        </p>
        <app-box-image-cropper-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Avatar</h2>
        <p class="text-muted-foreground">
          A circle with handles: resize it, zoom with the wheel, a pinch or the
          slider, and drag around it to move the image.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">crop()</code>
          makes it a 256 px PNG, its corners transparent.
        </p>
        <app-avatar-image-cropper-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Cover</h2>
        <p class="text-muted-foreground">
          Without handles, the selection is a frame that stays put and the image
          moves under it: drag, wheel or pinch — or, focused, the arrows and + /
          −. Its grid is yours too: four columns and two rows here (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >columns</code
          >, <code class="bg-muted rounded px-1.5 py-0.5 text-sm">rows</code>),
          its lines restyled from its class (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >*:border-amber-400</code
          >).
        </p>
        <app-cover-image-cropper-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ImageCropperPage {}
