import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScResizableHandle,
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-nested-resizable-demo',
  imports: [ScResizableHandle, ScResizablePanel, ScResizablePanelGroup],
  template: `
    <div
      scResizablePanelGroup
      direction="horizontal"
      class="min-h-[300px] max-w-lg rounded-lg border"
    >
      <div scResizablePanel [defaultSize]="30">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </div>
      <div scResizableHandle></div>
      <div scResizablePanel [defaultSize]="70">
        <div scResizablePanelGroup direction="vertical" class="h-full">
          <div scResizablePanel [defaultSize]="40">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Top</span>
            </div>
          </div>
          <div scResizableHandle></div>
          <div scResizablePanel [defaultSize]="60">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Bottom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedResizableDemo {}
