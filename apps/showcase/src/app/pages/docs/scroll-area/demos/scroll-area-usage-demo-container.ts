import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ScrollAreaUsageDemo } from './scroll-area-usage-demo';

@Component({
  selector: 'app-scroll-area-usage-demo-container',
  imports: [UsageCode, ScrollAreaUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-scroll-area-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollAreaUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollArea,
  ScScrollAreaScrollbar,
  ScScrollAreaThumb,
  ScScrollAreaViewport,
  ScScrollAreaViewportContent,
  ScSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-scroll-area-usage-demo',
  imports: [
    ScFrame,
    ScScrollArea,
    ScScrollAreaViewportContent,
    ScScrollAreaScrollbar,
    ScScrollAreaThumb,
    ScScrollAreaViewport,
    ScSeparator,
  ],
  template: \`
    <div scScrollArea scFrame class="h-72 w-48">
      <div scScrollAreaViewport>
        <div scScrollAreaViewportContent class="p-4">
          <p class="mb-4 text-sm leading-none font-medium">Tags</p>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollAreaUsageDemo {
  protected readonly tags = Array.from(
    { length: 50 },
    (_, i) => \`v1.2.0-beta.\${50 - i}\`,
  );
}`;
}
