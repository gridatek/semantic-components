import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScResizableHandle,
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-ide-layout-resizable-demo',
  imports: [ScResizableHandle, ScResizablePanel, ScResizablePanelGroup],
  template: `
    <div
      scResizablePanelGroup
      direction="horizontal"
      class="min-h-[400px] w-full max-w-4xl rounded-lg border"
    >
      <div scResizablePanel [defaultSize]="20" [minSize]="15" [maxSize]="30">
        <div class="bg-muted/30 flex h-full flex-col">
          <div class="border-b p-2 text-sm font-medium">Explorer</div>
          <div class="text-muted-foreground flex-1 p-2 text-sm">
            <div class="space-y-1">
              <div>src/</div>
              <div class="pl-2">app/</div>
              <div class="pl-4">components/</div>
              <div class="pl-4">pages/</div>
            </div>
          </div>
        </div>
      </div>
      <div scResizableHandle></div>
      <div scResizablePanel [defaultSize]="60">
        <div scResizablePanelGroup direction="vertical" class="h-full">
          <div scResizablePanel [defaultSize]="70">
            <div class="flex h-full flex-col">
              <div class="border-b p-2 text-sm font-medium">Editor</div>
              <div class="text-muted-foreground flex-1 p-4 font-mono text-sm">
                // Your code here...
              </div>
            </div>
          </div>
          <div scResizableHandle></div>
          <div scResizablePanel [defaultSize]="30" [minSize]="15">
            <div class="bg-muted/30 flex h-full flex-col">
              <div class="border-b p-2 text-sm font-medium">Terminal</div>
              <div class="text-muted-foreground flex-1 p-2 font-mono text-sm">
                $ _
              </div>
            </div>
          </div>
        </div>
      </div>
      <div scResizableHandle></div>
      <div scResizablePanel [defaultSize]="20" [minSize]="15" [maxSize]="30">
        <div class="bg-muted/30 flex h-full flex-col">
          <div class="border-b p-2 text-sm font-medium">Outline</div>
          <div class="text-muted-foreground flex-1 p-2 text-sm">
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeLayoutResizableDemo {}
