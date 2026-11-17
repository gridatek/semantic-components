import { Component, ViewEncapsulation } from '@angular/core';

/**
 * A plain box that scrolls: no directive. With scrollbar.css imported, its
 * scrollbar is the preset's — as every scrollbar of the page.
 */
@Component({
  selector: 'app-scrollbars-usage-demo',
  template: `
    <div
      tabindex="0"
      role="region"
      aria-label="Tags"
      class="h-72 w-48 overflow-auto rounded-md border p-4"
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
export class ScrollbarsUsageDemo {
  private readonly tags = Array.from(
    { length: 50 },
    (_, i) => `v1.2.0-beta.${50 - i}`,
  );
}
