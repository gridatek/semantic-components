import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';

/**
 * A plain box that scrolls: no directive. With scrollbar.css imported, its
 * scrollbar is the style's — as every scrollbar of the page.
 */
@Component({
  selector: 'app-scrollbar-usage-demo',
  imports: [ScFrame],
  template: `
    <div
      tabindex="0"
      role="region"
      aria-label="Tags"
      scFrame
      class="h-72 w-48 overflow-auto p-4"
    >
      <p class="mb-4 text-sm leading-none font-medium">Tags</p>
      @for (tag of tags; track tag) {
        <div class="border-b py-2 text-sm">{{ tag }}</div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollbarUsageDemo {
  private readonly tags = Array.from(
    { length: 50 },
    (_, i) => `v1.2.0-beta.${50 - i}`,
  );
}
