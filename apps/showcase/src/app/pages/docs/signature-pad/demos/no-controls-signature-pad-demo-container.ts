import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoControlsSignaturePadDemo } from './no-controls-signature-pad-demo';

@Component({
  selector: 'app-no-controls-signature-pad-demo-container',
  imports: [DemoContainer, NoControlsSignaturePadDemo],
  template: `
    <app-demo-container title="Without Controls" [code]="code">
      <app-no-controls-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NoControlsSignaturePadDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadCanvas,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-controls-signature-pad-demo',
  imports: [ScSignaturePad, ScSignaturePadCanvas],
  template: \`
    <div class="w-full space-y-3">
      <div scSignaturePad #pad="scSignaturePad" class="relative">
        <canvas scSignaturePadCanvas class="h-[150px]"></canvas>
      </div>

      <div class="flex gap-2">
        <button
          (click)="pad.undo()"
          class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
        >
          Undo
        </button>
        <button
          (click)="pad.clear()"
          class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoControlsSignaturePadDemo {}`;
}
