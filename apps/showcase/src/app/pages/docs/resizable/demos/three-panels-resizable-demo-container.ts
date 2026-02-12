import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ThreePanelsResizableDemo } from './three-panels-resizable-demo';

@Component({
  selector: 'app-three-panels-resizable-demo-container',
  imports: [DemoContainer, ThreePanelsResizableDemo],
  template: `
    <app-demo-container title="Three Panels" [code]="code">
      <app-three-panels-resizable-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreePanelsResizableDemoContainer {
  readonly code = `import {
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
  selector: 'app-three-panels-resizable-demo',
  imports: [ScResizableHandle, ScResizablePanel, ScResizablePanelGroup],
  template: \`
    <div
      sc-resizable-panel-group
      direction="horizontal"
      class="min-h-[200px] max-w-lg rounded-lg border"
    >
      <div sc-resizable-panel [defaultSize]="25" [minSize]="15">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Left</span>
        </div>
      </div>
      <div sc-resizable-handle [withHandle]="true"></div>
      <div sc-resizable-panel [defaultSize]="50">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Center</span>
        </div>
      </div>
      <div sc-resizable-handle [withHandle]="true"></div>
      <div sc-resizable-panel [defaultSize]="25" [minSize]="15">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Right</span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreePanelsResizableDemo {}`;
}
