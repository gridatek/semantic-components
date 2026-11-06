import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CollapsibleResizableNextDemo } from './collapsible-resizable-next-demo';

@Component({
  selector: 'app-collapsible-resizable-next-demo-container',
  imports: [DemoContainer, CollapsibleResizableNextDemo],
  template: `
    <app-demo-container
      title="Collapsible"
      demoUrl="/demos/resizable-next/collapsible-resizable-next-demo"
      [code]="code"
    >
      <app-collapsible-resizable-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleResizableNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandleNext,
  ScResizableHandleNextGrip,
  ScResizablePanelGroupNext,
  ScResizablePanelNext,
} from '@semantic-components/ui';

/** collapsible: dragged below half its minimum, or Enter on its handle, the sidebar shuts; Enter or a drag opens it again. */
@Component({
  selector: 'app-collapsible-resizable-next-demo',
  imports: [
    ScFrame,
    ScResizableHandleNext,
    ScResizableHandleNextGrip,
    ScResizablePanelGroupNext,
    ScResizablePanelNext,
  ],
  template: \`
    <div scResizablePanelGroupNext scFrame class="min-h-[200px] max-w-md">
      <div
        scResizablePanelNext
        [defaultSize]="30"
        [minSize]="20"
        [maxSize]="50"
        collapsible
      >
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </div>
      <div scResizableHandleNext aria-label="Resize Sidebar">
        <div scResizableHandleNextGrip></div>
      </div>
      <div scResizablePanelNext>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleResizableNextDemo {}`;
}
