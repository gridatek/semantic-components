import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalResizableDemo } from './vertical-resizable-demo';

@Component({
  selector: 'app-vertical-resizable-demo-container',
  imports: [DemoContainer, VerticalResizableDemo],
  template: `
    <app-demo-container
      title="Vertical"
      demoUrl="/demos/resizable/vertical-resizable-demo"
      [code]="code"
    >
      <app-vertical-resizable-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalResizableDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandle,
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui';

/** orientation="vertical": stacked panels; a plain handle, no grip. */
@Component({
  selector: 'app-vertical-resizable-demo',
  imports: [
    ScFrame,
    ScResizableHandle,
    ScResizablePanelGroup,
    ScResizablePanel,
  ],
  template: \`
    <div
      scResizablePanelGroup
      orientation="vertical"
      scFrame
      class="min-h-[200px] max-w-sm"
    >
      <div scResizablePanel [defaultSize]="25">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Header</span>
        </div>
      </div>
      <div scResizableHandle aria-label="Resize Header"></div>
      <div scResizablePanel [defaultSize]="75">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalResizableDemo {}`;
}
