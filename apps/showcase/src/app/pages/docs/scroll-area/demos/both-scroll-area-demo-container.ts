import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BothScrollAreaDemo } from './both-scroll-area-demo';

@Component({
  selector: 'app-both-scroll-area-demo-container',
  imports: [DemoContainer, BothScrollAreaDemo],
  template: `
    <app-demo-container
      title="Both scrollbars"
      demoUrl="/demos/scroll-area/both-scroll-area-demo"
      [code]="code"
    >
      <app-both-scroll-area-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BothScrollAreaDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollArea,
  ScScrollAreaCorner,
  ScScrollAreaScrollbar,
  ScScrollAreaThumb,
  ScScrollAreaViewport,
  ScScrollAreaViewportContent,
} from '@semantic-components/ui';

/** Content wider and taller than the box: a scrollbar each way, the corner where they meet. */
@Component({
  selector: 'app-both-scroll-area-demo',
  imports: [
    ScFrame,
    ScScrollArea,
    ScScrollAreaViewportContent,
    ScScrollAreaCorner,
    ScScrollAreaScrollbar,
    ScScrollAreaThumb,
    ScScrollAreaViewport,
  ],
  template: \`
    <div scScrollArea scFrame class="h-64 w-80 max-w-full">
      <div scScrollAreaViewport>
        <div
          scScrollAreaViewportContent
          class="grid w-max grid-cols-10 gap-3 p-4"
        >
          @for (cell of cells; track cell) {
            <div
              class="bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-md text-sm"
            >
              {{ cell }}
            </div>
          }
        </div>
      </div>
      <div scScrollAreaScrollbar>
        <div scScrollAreaThumb></div>
      </div>
      <div scScrollAreaScrollbar orientation="horizontal">
        <div scScrollAreaThumb></div>
      </div>
      <div scScrollAreaCorner></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BothScrollAreaDemo {
  private readonly cells = Array.from({ length: 100 }, (_, i) => i + 1);
}`;
}
