import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandleNext,
  ScResizablePanelGroupNext,
  ScResizablePanelNext,
} from '@semantic-components/ui';

/** orientation="vertical": stacked panels; a plain handle, no grip. */
@Component({
  selector: 'app-vertical-resizable-next-demo',
  imports: [
    ScFrame,
    ScResizableHandleNext,
    ScResizablePanelGroupNext,
    ScResizablePanelNext,
  ],
  template: `
    <div
      scResizablePanelGroupNext
      orientation="vertical"
      scFrame
      class="min-h-[200px] max-w-sm"
    >
      <div scResizablePanelNext [defaultSize]="25">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Header</span>
        </div>
      </div>
      <div scResizableHandleNext aria-label="Resize Header"></div>
      <div scResizablePanelNext [defaultSize]="75">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalResizableNextDemo {}
