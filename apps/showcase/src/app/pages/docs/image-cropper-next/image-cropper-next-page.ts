import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AvatarImageCropperNextDemoContainer } from './demos/avatar-image-cropper-next-demo-container';
import { BoxImageCropperNextDemoContainer } from './demos/box-image-cropper-next-demo-container';
import { CoverImageCropperNextDemoContainer } from './demos/cover-image-cropper-next-demo-container';

@Component({
  selector: 'app-image-cropper-next-page',
  imports: [
    BoxImageCropperNextDemoContainer,
    AvatarImageCropperNextDemoContainer,
    CoverImageCropperNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Image Cropper Next</h1>
        <p class="text-muted-foreground">
          The image cropper, rebuilt: one set of parts for both ways to crop — a
          box you resize over the image, or a frame the image moves under — with
          the keyboard, pinch and wheel, and the crop as a file.
        </p>
        <app-component-badges path="image-cropper-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Crop box</h2>
        <p class="text-muted-foreground">
          Handles in the selection make it a box resized over the image. The
          slider and the zoom buttons share one
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">zoom</code>.
          Focused, the arrows move the crop and Alt + arrows resize it.
        </p>
        <app-box-image-cropper-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Avatar</h2>
        <p class="text-muted-foreground">
          A circle with handles: resize it, zoom with the wheel, a pinch or the
          slider, and drag around it to move the image.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">crop()</code>
          makes it a 256 px PNG, its corners transparent.
        </p>
        <app-avatar-image-cropper-next-demo-container />
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
        <app-cover-image-cropper-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ImageCropperNextPage {}
