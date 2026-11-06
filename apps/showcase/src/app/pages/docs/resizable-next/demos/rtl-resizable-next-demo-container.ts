import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlResizableNextDemo } from './rtl-resizable-next-demo';

@Component({
  selector: 'app-rtl-resizable-next-demo-container',
  imports: [DemoContainer, RtlResizableNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/resizable-next/rtl-resizable-next-demo"
      [code]="code"
    >
      <app-rtl-resizable-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlResizableNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScResizableHandleNext,
  ScResizableHandleNextGrip,
  ScResizablePanelGroupNext,
  ScResizablePanelNext,
} from '@semantic-components/ui';

/** In a right-to-left page: the first panel at the right; the arrows and a drag follow. */
@Component({
  selector: 'app-rtl-resizable-next-demo',
  imports: [
    ScFrame,
    ScResizableHandleNext,
    ScResizableHandleNextGrip,
    ScResizablePanelGroupNext,
    ScResizablePanelNext,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scResizablePanelGroupNext scFrame class="max-w-sm">
        <div scResizablePanelNext [defaultSize]="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">واحد</span>
          </div>
        </div>
        <div scResizableHandleNext aria-label="Resize واحد">
          <div scResizableHandleNextGrip></div>
        </div>
        <div scResizablePanelNext [defaultSize]="50">
          <div scResizablePanelGroupNext orientation="vertical">
            <div scResizablePanelNext [defaultSize]="25">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">اثنان</span>
              </div>
            </div>
            <div scResizableHandleNext aria-label="Resize اثنان">
              <div scResizableHandleNextGrip></div>
            </div>
            <div scResizablePanelNext [defaultSize]="75">
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
export class RtlResizableNextDemo {}`;
}
