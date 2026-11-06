import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandleNext,
  ScResizableHandleNextGrip,
  ScResizablePanelGroupNext,
  ScResizablePanelNext,
} from '@semantic-components/ui';

@Component({
  selector: 'app-resizable-next-usage-demo',
  imports: [
    ScFrame,
    ScResizableHandleNext,
    ScResizableHandleNextGrip,
    ScResizablePanelGroupNext,
    ScResizablePanelNext,
  ],
  template: `
    <div scResizablePanelGroupNext scFrame class="max-w-sm">
      <div scResizablePanelNext [defaultSize]="50">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </div>
      <div scResizableHandleNext aria-label="Resize One">
        <div scResizableHandleNextGrip></div>
      </div>
      <div scResizablePanelNext [defaultSize]="50">
        <div scResizablePanelGroupNext orientation="vertical">
          <div scResizablePanelNext [defaultSize]="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </div>
          <div scResizableHandleNext aria-label="Resize Two">
            <div scResizableHandleNextGrip></div>
          </div>
          <div scResizablePanelNext [defaultSize]="75">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ResizableNextUsageDemo {}
