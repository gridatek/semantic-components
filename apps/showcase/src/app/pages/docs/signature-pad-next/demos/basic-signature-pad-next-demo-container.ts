import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSignaturePadNextDemo } from './basic-signature-pad-next-demo';

@Component({
  selector: 'app-basic-signature-pad-next-demo-container',
  imports: [DemoContainer, BasicSignaturePadNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/signature-pad-next/basic-signature-pad-next-demo"
    >
      <app-basic-signature-pad-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSignaturePadNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSignaturePadNext,
  ScSignaturePadNextClear,
  ScSignaturePadNextLine,
  ScSignaturePadNextRedo,
  ScSignaturePadNextSurface,
  ScSignaturePadNextUndo,
} from '@semantic-components/ui-lab';
import { SiRedo2Icon, SiUndo2Icon } from '@semantic-icons/lucide-icons';

/** Sign with a mouse, a finger or a pen: the ink follows its speed, or the pen's pressure. Undo, redo, clear — or, focused, Ctrl+Z, Ctrl+Shift+Z and Delete. */
@Component({
  selector: 'app-basic-signature-pad-next-demo',
  imports: [
    ScSignaturePadNext,
    ScSignaturePadNextSurface,
    ScSignaturePadNextLine,
    ScSignaturePadNextUndo,
    ScSignaturePadNextRedo,
    ScSignaturePadNextClear,
    SiUndo2Icon,
    SiRedo2Icon,
  ],
  template: \`
    <div scSignaturePadNext class="w-full max-w-md space-y-2">
      <div scSignaturePadNextSurface aria-label="Signature">
        <div scSignaturePadNextLine>× Sign here</div>
      </div>
      <div class="flex items-center gap-1">
        <button scSignaturePadNextUndo>
          <svg siUndo2Icon></svg>
          <span class="sr-only">Undo</span>
        </button>
        <button scSignaturePadNextRedo>
          <svg siRedo2Icon></svg>
          <span class="sr-only">Redo</span>
        </button>
        <button scSignaturePadNextClear size="sm" class="ms-auto">Clear</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSignaturePadNextDemo {}`;
}
