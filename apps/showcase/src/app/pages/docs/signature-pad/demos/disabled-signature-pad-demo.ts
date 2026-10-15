import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadCanvas,
  ScSignaturePadClearButton,
  ScSignaturePadControls,
  ScSignaturePadUndoButton,
} from '@semantic-components/ui-lab';
import { SiTrash2Icon, SiUndoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadCanvas,
    ScSignaturePadControls,
    ScSignaturePadUndoButton,
    ScSignaturePadClearButton,
    SiUndoIcon,
    SiTrash2Icon,
  ],
  template: `
    <div scSignaturePad [disabled]="true" class="relative w-full">
      <canvas
        scSignaturePadCanvas
        aria-label="Signature"
        class="h-[150px]"
      ></canvas>

      <div scSignaturePadControls>
        <button scSignaturePadUndo aria-label="Undo last stroke">
          <svg siUndoIcon class="size-4"></svg>
        </button>
        <button scSignaturePadClear aria-label="Clear signature">
          <svg siTrash2Icon class="size-4"></svg>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSignaturePadDemo {}
