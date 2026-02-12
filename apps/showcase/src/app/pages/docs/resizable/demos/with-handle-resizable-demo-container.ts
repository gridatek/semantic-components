import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithHandleResizableDemo } from './with-handle-resizable-demo';

@Component({
  selector: 'app-with-handle-resizable-demo-container',
  imports: [DemoContainer, WithHandleResizableDemo],
  template: `
    <app-demo-container title="With Handle" [code]="code">
      <app-with-handle-resizable-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithHandleResizableDemoContainer {
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
  selector: 'app-with-handle-resizable-demo',
  imports: [ScResizableHandle, ScResizablePanel, ScResizablePanelGroup],
  template: \`
    <div
      sc-resizable-panel-group
      direction="horizontal"
      class="min-h-[200px] max-w-md rounded-lg border"
    >
      <div sc-resizable-panel [defaultSize]="30">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Sidebar</span>
        </div>
      </div>
      <div sc-resizable-handle [withHandle]="true"></div>
      <div sc-resizable-panel [defaultSize]="70">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithHandleResizableDemo {}`;
}
