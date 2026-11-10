import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ResizableUsageDemo } from './resizable-usage-demo';

@Component({
  selector: 'app-resizable-usage-demo-container',
  imports: [UsageCode, ResizableUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-resizable-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ResizableUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandle,
  ScResizableHandleGrip,
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-resizable-usage-demo',
  imports: [
    ScFrame,
    ScResizableHandle,
    ScResizableHandleGrip,
    ScResizablePanelGroup,
    ScResizablePanel,
  ],
  template: \`
    <div scResizablePanelGroup scFrame class="max-w-sm">
      <div scResizablePanel [defaultSize]="50">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </div>
      <div scResizableHandle aria-label="Resize One">
        <div scResizableHandleGrip></div>
      </div>
      <div scResizablePanel [defaultSize]="50">
        <div scResizablePanelGroup orientation="vertical">
          <div scResizablePanel [defaultSize]="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </div>
          <div scResizableHandle aria-label="Resize Two">
            <div scResizableHandleGrip></div>
          </div>
          <div scResizablePanel [defaultSize]="75">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ResizableUsageDemo {}`;
}
