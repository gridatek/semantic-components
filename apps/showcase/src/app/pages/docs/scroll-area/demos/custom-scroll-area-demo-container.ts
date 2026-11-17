import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomScrollAreaDemo } from './custom-scroll-area-demo';

@Component({
  selector: 'app-custom-scroll-area-demo-container',
  imports: [DemoContainer, CustomScrollAreaDemo],
  template: `
    <app-demo-container
      title="Your own scrollbar"
      demoUrl="/demos/scroll-area/custom-scroll-area-demo"
      [code]="code"
    >
      <app-custom-scroll-area-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomScrollAreaDemoContainer {
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

/**
 * Your own scrollbar, in your look: it replaces the default. Thinner, the
 * thumb in the primary colour, shown while the pointer is over the box or it
 * scrolls (\`data-hovering\`, \`data-scrolling\`).
 */
@Component({
  selector: 'app-custom-scroll-area-demo',
  imports: [
    ScFrame,
    ScScrollArea,
    ScScrollAreaScrollbar,
    ScScrollAreaThumb,
    ScScrollAreaViewport,
    ScScrollAreaViewportContent,
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
      <div
        scScrollAreaScrollbar
        class="w-1.5 opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100"
      >
        <div scScrollAreaThumb class="bg-primary"></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomScrollAreaDemo {
  protected readonly tags = Array.from(
    { length: 50 },
    (_, i) => \`v1.2.0-beta.\${50 - i}\`,
  );
}`;
}
