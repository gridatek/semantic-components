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
  selector: 'app-ide-layout-resizable-demo',
  imports: [ScResizableHandle, ScResizablePanel, ScResizablePanelGroup],
  template: `
    <div
      sc-resizable-panel-group
      direction="horizontal"
      class="min-h-[400px] rounded-lg border"
    >
      <div sc-resizable-panel [defaultSize]="20" [minSize]="15" [maxSize]="30">
        <div class="flex h-full flex-col bg-muted/30">
          <div class="border-b p-2 text-sm font-medium">Explorer</div>
          <div class="flex-1 p-2 text-sm text-muted-foreground">
            <div class="space-y-1">
              <div>src/</div>
              <div class="pl-2">app/</div>
              <div class="pl-4">components/</div>
              <div class="pl-4">pages/</div>
            </div>
          </div>
        </div>
      </div>
      <div sc-resizable-handle></div>
      <div sc-resizable-panel [defaultSize]="60">
        <div sc-resizable-panel-group direction="vertical" class="h-full">
          <div sc-resizable-panel [defaultSize]="70">
            <div class="flex h-full flex-col">
              <div class="border-b p-2 text-sm font-medium">Editor</div>
              <div class="flex-1 p-4 font-mono text-sm text-muted-foreground">
                // Your code here...
              </div>
            </div>
          </div>
          <div sc-resizable-handle></div>
          <div sc-resizable-panel [defaultSize]="30" [minSize]="15">
            <div class="flex h-full flex-col bg-muted/30">
              <div class="border-b p-2 text-sm font-medium">Terminal</div>
              <div class="flex-1 p-2 font-mono text-sm text-muted-foreground">
                $ _
              </div>
            </div>
          </div>
        </div>
      </div>
      <div sc-resizable-handle></div>
      <div sc-resizable-panel [defaultSize]="20" [minSize]="15" [maxSize]="30">
        <div class="flex h-full flex-col bg-muted/30">
          <div class="border-b p-2 text-sm font-medium">Outline</div>
          <div class="flex-1 p-2 text-sm text-muted-foreground">
            <div class="space-y-1">
              <div>Functions</div>
              <div>Classes</div>
              <div>Variables</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeLayoutResizableDemo {}
