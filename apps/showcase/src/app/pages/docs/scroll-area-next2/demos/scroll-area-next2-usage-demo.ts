import { Component, ViewEncapsulation } from '@angular/core';
import { ScScrollAreaNext2, ScSeparator } from '@semantic-components/ui';

@Component({
  selector: 'app-scroll-area-next2-usage-demo',
  imports: [ScScrollAreaNext2, ScSeparator],
  template: `
    <div scScrollAreaNext2 class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <p class="mb-4 text-sm leading-none font-medium">Tags</p>
        @for (tag of tags; track tag) {
          <div class="text-sm">{{ tag }}</div>
          <div scSeparator class="my-2"></div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollAreaNext2UsageDemo {
  protected readonly tags = Array.from(
    { length: 50 },
    (_, i) => `v1.2.0-beta.${50 - i}`,
  );
}
