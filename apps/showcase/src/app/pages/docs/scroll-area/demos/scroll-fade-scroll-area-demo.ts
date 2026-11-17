import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollArea,
  ScScrollAreaScrollbar,
  ScScrollAreaThumb,
  ScScrollAreaViewport,
  ScScrollAreaViewportContent,
} from '@semantic-components/ui';

/** The text fades out at an edge it continues past: a mask from the viewport's --sc-scroll-area-overflow-y-start / -end. */
@Component({
  selector: 'app-scroll-fade-scroll-area-demo',
  imports: [
    ScFrame,
    ScScrollArea,
    ScScrollAreaViewportContent,
    ScScrollAreaScrollbar,
    ScScrollAreaThumb,
    ScScrollAreaViewport,
  ],
  template: `
    <div scScrollArea scFrame class="h-48 w-96 max-w-full">
      <div
        scScrollAreaViewport
        class="mask-linear-[to_bottom,transparent_0,black_min(40px,var(--sc-scroll-area-overflow-y-start)),black_calc(100%_-_min(40px,var(--sc-scroll-area-overflow-y-end,40px))),transparent_100%] mask-no-repeat"
      >
        <div
          scScrollAreaViewportContent
          class="flex flex-col gap-4 px-4 py-2 text-sm"
        >
          <p>
            Vernacular architecture is building done outside any academic
            tradition, and without professional guidance. It is not a particular
            architectural movement or style, but rather a broad category,
            encompassing a wide range and variety of building types, with
            differing methods of construction, from around the world, both
            historical and extant and classical and modern.
          </p>
          <p>
            This type of architecture usually serves immediate, local needs, is
            constrained by the materials available in its particular region and
            reflects local traditions and cultural practices. The study of
            vernacular architecture does not examine formally schooled
            architects, but instead that of the design skills and tradition of
            local builders, who were rarely given any attribution for the work.
          </p>
        </div>
      </div>
      <div scScrollAreaScrollbar>
        <div scScrollAreaThumb></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollFadeScrollAreaDemo {}
