import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollAreaNext,
  ScScrollAreaNextContent,
  ScScrollAreaNextScrollbar,
  ScScrollAreaNextThumb,
  ScScrollAreaNextViewport,
} from '@semantic-components/ui';

/** The text fades out at an edge it continues past: a mask from the viewport's --scroll-area-overflow-y-start / -end. */
@Component({
  selector: 'app-scroll-fade-scroll-area-next-demo',
  imports: [
    ScFrame,
    ScScrollAreaNext,
    ScScrollAreaNextContent,
    ScScrollAreaNextScrollbar,
    ScScrollAreaNextThumb,
    ScScrollAreaNextViewport,
  ],
  template: `
    <div scScrollAreaNext scFrame class="h-48 w-96 max-w-full">
      <div
        scScrollAreaNextViewport
        class="mask-linear-[to_bottom,transparent_0,black_min(40px,var(--scroll-area-overflow-y-start)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-y-end,40px))),transparent_100%] mask-no-repeat"
      >
        <div
          scScrollAreaNextContent
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
      <div scScrollAreaNextScrollbar>
        <div scScrollAreaNextThumb></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollFadeScrollAreaNextDemo {}
