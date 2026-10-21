import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ArticleLightboxNextDemoContainer } from './demos/article-lightbox-next-demo-container';
import { ControlledLightboxNextDemoContainer } from './demos/controlled-lightbox-next-demo-container';
import { GalleryLightboxNextDemoContainer } from './demos/gallery-lightbox-next-demo-container';
import { ZoomLightboxNextDemoContainer } from './demos/zoom-lightbox-next-demo-container';

@Component({
  selector: 'app-lightbox-next-page',
  imports: [
    GalleryLightboxNextDemoContainer,
    ZoomLightboxNextDemoContainer,
    ArticleLightboxNextDemoContainer,
    ControlledLightboxNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Lightbox Next</h1>
        <p class="text-muted-foreground">
          The lightbox, rebuilt: your gallery of links, opened in the native
          dialog — the thumbnail growing into the photo — with zoom, pan, swipes
          and the keys.
        </p>
        <app-component-badges path="lightbox-next" />
        <p class="text-muted-foreground text-xs">
          Photos from
          <a href="https://unsplash.com" class="underline underline-offset-4"
            >Unsplash</a
          >
          by Paul Jarvis, Jerry Adney, Go Wild, Austin Neill, Luke Chesser,
          Nicholas Swanson and Alexander Shustov.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Gallery</h2>
        <p class="text-muted-foreground">
          A grid of links to the full photos — links still, without the
          lightbox. Opened, the thumbnail grows into the photo; ← → or a swipe
          to change, + − 0 to zoom, Escape or a swipe down to close.
        </p>
        <app-gallery-lightbox-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Zoom</h2>
        <p class="text-muted-foreground">
          One photo: the wheel, a double-click or a pinch zooms where you point;
          drag to pan.
        </p>
        <app-zoom-lightbox-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In an article</h2>
        <p class="text-muted-foreground">
          One image in the text, opened in place — no thumbnails, no counter
          needed.
        </p>
        <app-article-lightbox-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Controlled</h2>
        <p class="text-muted-foreground">
          Open and the index are two-way — here from outside; it stops at the
          ends (no loop).
        </p>
        <app-controlled-lightbox-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class LightboxNextPage {}
