import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollArea,
  ScScrollAreaScrollbar,
  ScScrollAreaThumb,
  ScScrollAreaViewport,
  ScScrollAreaViewportContent,
  ScSeparator,
} from '@semantic-components/ui';

/** In a right-to-left page: the scrollbar at the end — the left. */
@Component({
  selector: 'app-rtl-scroll-area-demo',
  imports: [
    Dir,
    ScFrame,
    ScScrollArea,
    ScScrollAreaViewportContent,
    ScScrollAreaScrollbar,
    ScScrollAreaThumb,
    ScScrollAreaViewport,
    ScSeparator,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <div scScrollArea scFrame class="h-72 w-48">
        <div scScrollAreaViewport>
          <div scScrollAreaViewportContent class="p-4">
            <p class="mb-4 text-sm leading-none font-medium">العلامات</p>
            @for (tag of tags; track tag) {
              <div class="text-sm">{{ tag }}</div>
              <div scSeparator class="my-2"></div>
            }
          </div>
        </div>
        <div scScrollAreaScrollbar>
          <div scScrollAreaThumb></div>
        </div>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlScrollAreaDemo {
  private readonly tags = Array.from(
    { length: 50 },
    (_, i) => `v1.2.0-beta.${50 - i}`,
  );
}
