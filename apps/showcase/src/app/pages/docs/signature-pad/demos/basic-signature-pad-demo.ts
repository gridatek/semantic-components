import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadClear,
  ScSignaturePadLine,
  ScSignaturePadRedo,
  ScSignaturePadSurface,
  ScSignaturePadUndo,
} from '@semantic-components/ui-lab';
import { SiRedo2Icon, SiUndo2Icon } from '@semantic-icons/lucide-icons';

/** Sign with a mouse, a finger or a pen: the ink follows its speed, or the pen's pressure. Undo, redo, clear — or, focused, Ctrl+Z, Ctrl+Shift+Z and Delete. */
@Component({
  selector: 'app-basic-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadSurface,
    ScSignaturePadLine,
    ScSignaturePadUndo,
    ScSignaturePadRedo,
    ScSignaturePadClear,
    SiUndo2Icon,
    SiRedo2Icon,
  ],
  template: `
    <div scSignaturePad class="w-full max-w-md space-y-2">
      <div scSignaturePadSurface aria-label="Signature">
        <div scSignaturePadLine>× Sign here</div>
      </div>
      <div class="flex items-center gap-1">
        <button scSignaturePadUndo>
          <svg siUndo2Icon></svg>
          <span class="sr-only">Undo</span>
        </button>
        <button scSignaturePadRedo>
          <svg siRedo2Icon></svg>
          <span class="sr-only">Redo</span>
        </button>
        <button scSignaturePadClear size="sm" class="ms-auto">Clear</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSignaturePadDemo {}
