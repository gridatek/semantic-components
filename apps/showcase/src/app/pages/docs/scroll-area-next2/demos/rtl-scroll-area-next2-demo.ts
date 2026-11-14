import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollAreaNext2,
  ScSeparator,
} from '@semantic-components/ui';

/** In a right-to-left page: the browser puts the scrollbar on the left. */
@Component({
  selector: 'app-rtl-scroll-area-next2-demo',
  imports: [Dir, ScFrame, ScScrollAreaNext2, ScSeparator],
  template: `
    <div dir="rtl" lang="ar">
      <div scScrollAreaNext2 scFrame class="h-72 w-48">
        <div class="p-4">
          <p class="mb-4 text-sm leading-none font-medium">العلامات</p>
          @for (tag of tags; track tag) {
            <div class="text-sm">{{ tag }}</div>
            <div scSeparator class="my-2"></div>
          }
        </div>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlScrollAreaNext2Demo {
  protected readonly tags = Array.from(
    { length: 50 },
    (_, i) => `v1.2.0-beta.${50 - i}`,
  );
}
