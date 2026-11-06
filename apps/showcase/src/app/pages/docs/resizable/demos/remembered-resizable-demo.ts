import { Component, ViewEncapsulation, effect, signal } from '@angular/core';
import {
  ScFrame,
  ScResizableHandle,
  ScResizableHandleGrip,
  ScResizablePanel,
  ScResizablePanelGroup,
} from '@semantic-components/ui';

const KEY = 'resizable-demo-layout';

/** [(layout)]: the sizes in %, saved in localStorage and read again on the next visit. */
@Component({
  selector: 'app-remembered-resizable-demo',
  imports: [
    ScFrame,
    ScResizableHandle,
    ScResizableHandleGrip,
    ScResizablePanelGroup,
    ScResizablePanel,
  ],
  template: `
    <div
      scResizablePanelGroup
      [(layout)]="layout"
      scFrame
      class="min-h-[200px] max-w-md"
    >
      <div scResizablePanel [minSize]="20">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </div>
      <div scResizableHandle aria-label="Resize One">
        <div scResizableHandleGrip></div>
      </div>
      <div scResizablePanel [minSize]="20">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </div>
      <div scResizableHandle aria-label="Resize Two">
        <div scResizableHandleGrip></div>
      </div>
      <div scResizablePanel [minSize]="20">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Three</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RememberedResizableDemo {
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
}
