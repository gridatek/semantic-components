import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RememberedResizableNextDemo } from './remembered-resizable-next-demo';

@Component({
  selector: 'app-remembered-resizable-next-demo-container',
  imports: [DemoContainer, RememberedResizableNextDemo],
  template: `
    <app-demo-container
      title="Remembered layout"
      demoUrl="/demos/resizable-next/remembered-resizable-next-demo"
      [code]="code"
    >
      <app-remembered-resizable-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RememberedResizableNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, effect, signal } from '@angular/core';
import {
  ScFrame,
  ScResizableHandleNext,
  ScResizableHandleNextGrip,
  ScResizablePanelGroupNext,
  ScResizablePanelNext,
} from '@semantic-components/ui';

const KEY = 'resizable-next-demo-layout';

/** [(layout)]: the sizes in %, saved in localStorage and read again on the next visit. */
@Component({
  selector: 'app-remembered-resizable-next-demo',
  imports: [
    ScFrame,
    ScResizableHandleNext,
    ScResizableHandleNextGrip,
    ScResizablePanelGroupNext,
    ScResizablePanelNext,
  ],
  template: \`
    <div
      scResizablePanelGroupNext
      [(layout)]="layout"
      scFrame
      class="min-h-[200px] max-w-md"
    >
      <div scResizablePanelNext [minSize]="20">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </div>
      <div scResizableHandleNext aria-label="Resize One">
        <div scResizableHandleNextGrip></div>
      </div>
      <div scResizablePanelNext [minSize]="20">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </div>
      <div scResizableHandleNext aria-label="Resize Two">
        <div scResizableHandleNextGrip></div>
      </div>
      <div scResizablePanelNext [minSize]="20">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Three</span>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RememberedResizableNextDemo {
  protected readonly layout = signal<readonly number[]>(this.read());

  constructor() {
    effect(() => {
      const layout = this.layout();
      try {
        localStorage.setItem(KEY, JSON.stringify(layout));
      } catch {
        // No storage (a private window, the server): not remembered.
      }
    });
  }

  private read(): readonly number[] {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }
}`;
}
