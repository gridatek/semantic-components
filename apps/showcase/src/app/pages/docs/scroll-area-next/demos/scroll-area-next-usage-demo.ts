import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollAreaNext,
  ScScrollAreaNextContent,
  ScScrollAreaNextScrollbar,
  ScScrollAreaNextThumb,
  ScScrollAreaNextViewport,
  ScSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-scroll-area-next-usage-demo',
  imports: [
    ScFrame,
    ScScrollAreaNext,
    ScScrollAreaNextContent,
    ScScrollAreaNextScrollbar,
    ScScrollAreaNextThumb,
    ScScrollAreaNextViewport,
    ScSeparator,
  ],
  template: `
    <div scScrollAreaNext scFrame class="h-72 w-48">
      <div scScrollAreaNextViewport>
        <div scScrollAreaNextContent class="p-4">
          <p class="mb-4 text-sm leading-none font-medium">Tags</p>
          @for (tag of tags; track tag) {
            <div class="text-sm">{{ tag }}</div>
            <div scSeparator class="my-2"></div>
          }
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
export class ScrollAreaNextUsageDemo {
  protected readonly tags = Array.from(
    { length: 50 },
    (_, i) => `v1.2.0-beta.${50 - i}`,
  );
}
