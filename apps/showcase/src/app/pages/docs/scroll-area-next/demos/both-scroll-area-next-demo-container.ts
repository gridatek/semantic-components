import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BothScrollAreaNextDemo } from './both-scroll-area-next-demo';

@Component({
  selector: 'app-both-scroll-area-next-demo-container',
  imports: [DemoContainer, BothScrollAreaNextDemo],
  template: `
    <app-demo-container
      title="Both scrollbars"
      demoUrl="/demos/scroll-area-next/both-scroll-area-next-demo"
      [code]="code"
    >
      <app-both-scroll-area-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BothScrollAreaNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollAreaNext,
  ScScrollAreaNextContent,
  ScScrollAreaNextCorner,
  ScScrollAreaNextScrollbar,
  ScScrollAreaNextThumb,
  ScScrollAreaNextViewport,
} from '@semantic-components/ui';

/** Content wider and taller than the box: a scrollbar each way, the corner where they meet. */
@Component({
  selector: 'app-both-scroll-area-next-demo',
  imports: [
    ScFrame,
    ScScrollAreaNext,
    ScScrollAreaNextContent,
    ScScrollAreaNextCorner,
    ScScrollAreaNextScrollbar,
    ScScrollAreaNextThumb,
    ScScrollAreaNextViewport,
  ],
  template: \`
    <div scScrollAreaNext scFrame class="h-64 w-80 max-w-full">
      <div scScrollAreaNextViewport>
        <div scScrollAreaNextContent class="grid w-max grid-cols-10 gap-3 p-4">
          @for (cell of cells; track cell) {
            <div
              class="bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-md text-sm"
            >
              {{ cell }}
            </div>
          }
        </div>
      </div>
      <div scScrollAreaNextScrollbar>
        <div scScrollAreaNextThumb></div>
      </div>
      <div scScrollAreaNextScrollbar orientation="horizontal">
        <div scScrollAreaNextThumb></div>
      </div>
      <div scScrollAreaNextCorner></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BothScrollAreaNextDemo {
  protected readonly cells = Array.from({ length: 100 }, (_, i) => i + 1);
}`;
}
