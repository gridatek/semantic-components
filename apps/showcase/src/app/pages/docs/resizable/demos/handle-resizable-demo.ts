import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandle,
  ScResizableHandleGrip,
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui';

/** A grip on the handle: a scResizableHandleGrip inside it. */
@Component({
  selector: 'app-handle-resizable-demo',
  imports: [
    ScFrame,
    ScResizableHandle,
    ScResizableHandleGrip,
    ScResizablePanelGroup,
    ScResizablePanel,
  ],
  template: `
    <div scResizablePanelGroup scFrame class="min-h-[200px] max-w-sm">
      <div scResizablePanel [defaultSize]="25">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </div>
      <div scResizableHandle aria-label="Resize Sidebar">
        <div scResizableHandleGrip></div>
      </div>
      <div scResizablePanel [defaultSize]="75">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HandleResizableDemo {}
