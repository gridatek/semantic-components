import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalResizableDemo } from './vertical-resizable-demo';

@Component({
  selector: 'app-vertical-resizable-demo-container',
  imports: [DemoContainer, VerticalResizableDemo],
  template: `
    <app-demo-container title="Vertical" [code]="code">
      <app-vertical-resizable-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalResizableDemoContainer {
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
  selector: 'app-vertical-resizable-demo',
  imports: [ScResizableHandle, ScResizablePanel, ScResizablePanelGroup],
  template: \`
    <div
      sc-resizable-panel-group
      direction="vertical"
      class="min-h-[300px] max-w-md rounded-lg border"
    >
      <div sc-resizable-panel [defaultSize]="30">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Header</span>
        </div>
      </div>
      <div sc-resizable-handle></div>
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
export class VerticalResizableDemo {}`;
}
