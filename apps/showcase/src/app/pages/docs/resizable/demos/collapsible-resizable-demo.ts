import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandle,
  ScResizableHandleGrip,
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui';

/** collapsible: dragged below half its minimum, or Enter on its handle, the sidebar shuts; Enter or a drag opens it again. */
@Component({
  selector: 'app-collapsible-resizable-demo',
  imports: [
    ScFrame,
    ScResizableHandle,
    ScResizableHandleGrip,
    ScResizablePanelGroup,
    ScResizablePanel,
  ],
  template: `
    <div scResizablePanelGroup scFrame class="min-h-[200px] max-w-md">
      <div
        scResizablePanel
        [defaultSize]="30"
        [minSize]="20"
        [maxSize]="50"
        collapsible
      >
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </div>
      <div scResizableHandle aria-label="Resize Sidebar">
        <div scResizableHandleGrip></div>
      </div>
      <div scResizablePanel>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleResizableDemo {}
