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
  selector: 'app-small-signature-pad-demo',
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
    <div scSignaturePad class="relative w-full max-w-xs">
      <canvas scSignaturePadCanvas class="h-[100px]"></canvas>

      <div scSignaturePadControls>
        <button scSignaturePadUndo>
          <svg siUndoIcon class="size-4"></svg>
        </button>
        <button scSignaturePadClear>
          <svg siTrash2Icon class="size-4"></svg>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SmallSignaturePadDemo {}
