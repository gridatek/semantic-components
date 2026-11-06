import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlResizableDemo } from './rtl-resizable-demo';

@Component({
  selector: 'app-rtl-resizable-demo-container',
  imports: [DemoContainer, RtlResizableDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/resizable/rtl-resizable-demo"
      [code]="code"
    >
      <app-rtl-resizable-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlResizableDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandle,
  ScResizableHandleGrip,
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui';

/** In a right-to-left page: the first panel at the right; the arrows and a drag follow. */
@Component({
  selector: 'app-rtl-resizable-demo',
  imports: [
    ScFrame,
    ScResizableHandle,
    ScResizableHandleGrip,
    ScResizablePanelGroup,
    ScResizablePanel,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scResizablePanelGroup scFrame class="max-w-sm">
        <div scResizablePanel [defaultSize]="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">واحد</span>
          </div>
        </div>
        <div scResizableHandle aria-label="Resize واحد">
          <div scResizableHandleGrip></div>
        </div>
        <div scResizablePanel [defaultSize]="50">
          <div scResizablePanelGroup orientation="vertical">
            <div scResizablePanel [defaultSize]="25">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">اثنان</span>
              </div>
            </div>
            <div scResizableHandle aria-label="Resize اثنان">
              <div scResizableHandleGrip></div>
            </div>
            <div scResizablePanel [defaultSize]="75">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">ثلاثة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlResizableDemo {}`;
}
