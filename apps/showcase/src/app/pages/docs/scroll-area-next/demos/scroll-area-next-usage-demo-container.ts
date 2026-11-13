import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ScrollAreaNextUsageDemo } from './scroll-area-next-usage-demo';

@Component({
  selector: 'app-scroll-area-next-usage-demo-container',
  imports: [UsageCode, ScrollAreaNextUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-scroll-area-next-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollAreaNextUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollAreaNext,
  ScScrollAreaNextScrollbar,
  ScScrollAreaNextThumb,
  ScScrollAreaNextViewport,
  ScScrollAreaNextViewportContent,
  ScSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-scroll-area-next-usage-demo',
  imports: [
    ScFrame,
    ScScrollAreaNext,
    ScScrollAreaNextViewportContent,
    ScScrollAreaNextScrollbar,
    ScScrollAreaNextThumb,
    ScScrollAreaNextViewport,
    ScSeparator,
  ],
  template: \`
    <div scScrollAreaNext scFrame class="h-72 w-48">
      <div scScrollAreaNextViewport>
        <div scScrollAreaNextViewportContent class="p-4">
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollAreaNextUsageDemo {
  protected readonly tags = Array.from(
    { length: 50 },
    (_, i) => \`v1.2.0-beta.\${50 - i}\`,
  );
}`;
}
