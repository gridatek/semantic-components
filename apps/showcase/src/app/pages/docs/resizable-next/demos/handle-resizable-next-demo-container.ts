import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HandleResizableNextDemo } from './handle-resizable-next-demo';

@Component({
  selector: 'app-handle-resizable-next-demo-container',
  imports: [DemoContainer, HandleResizableNextDemo],
  template: `
    <app-demo-container
      title="Handle"
      demoUrl="/demos/resizable-next/handle-resizable-next-demo"
      [code]="code"
    >
      <app-handle-resizable-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleResizableNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandleNext,
  ScResizableHandleNextGrip,
  ScResizablePanelGroupNext,
  ScResizablePanelNext,
} from '@semantic-components/ui';

/** A grip on the handle: a scResizableHandleNextGrip inside it. */
@Component({
  selector: 'app-handle-resizable-next-demo',
  imports: [
    ScFrame,
    ScResizableHandleNext,
    ScResizableHandleNextGrip,
    ScResizablePanelGroupNext,
    ScResizablePanelNext,
  ],
  template: \`
    <div scResizablePanelGroupNext scFrame class="min-h-[200px] max-w-sm">
      <div scResizablePanelNext [defaultSize]="25">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </div>
      <div scResizableHandleNext aria-label="Resize Sidebar">
        <div scResizableHandleNextGrip></div>
      </div>
      <div scResizablePanelNext [defaultSize]="75">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleResizableNextDemo {}`;
}
