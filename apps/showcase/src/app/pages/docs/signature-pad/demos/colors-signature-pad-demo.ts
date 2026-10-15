import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadCanvas,
  ScSignaturePadClearButton,
  ScSignaturePadColorButton,
  ScSignaturePadControls,
  ScSignaturePadToolbar,
  ScSignaturePadUndoButton,
  ScSignaturePadWidthButton,
} from '@semantic-components/ui-lab';
import { SiTrash2Icon, SiUndoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-colors-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadCanvas,
    ScSignaturePadControls,
    ScSignaturePadUndoButton,
    ScSignaturePadClearButton,
    ScSignaturePadToolbar,
    ScSignaturePadColorButton,
    SiUndoIcon,
    SiTrash2Icon,
  ],
  template: `
    <div scSignaturePad class="w-full space-y-3">
      <div scSignaturePadToolbar>
        <button
          scSignaturePadPenColor
          aria-label="Pen color Black"
          [color]="'#000000'"
        >
          <span
            class="border-border size-4 rounded-full border transition-transform data-active:scale-110"
            [attr.data-active]="'#000000'"
            style="background-color: #000000"
          ></span>
        </button>
        <button
          scSignaturePadPenColor
          aria-label="Pen color Blue"
          [color]="'#1d4ed8'"
        >
          <span
            class="border-border size-4 rounded-full border transition-transform"
            style="background-color: #1d4ed8"
          ></span>
        </button>
        <button
          scSignaturePadPenColor
          aria-label="Pen color Red"
          [color]="'#dc2626'"
        >
          <span
            class="border-border size-4 rounded-full border transition-transform"
            style="background-color: #dc2626"
          ></span>
        </button>
        <button
          scSignaturePadPenColor
          aria-label="Pen color Green"
          [color]="'#16a34a'"
        >
          <span
            class="border-border size-4 rounded-full border transition-transform"
            style="background-color: #16a34a"
          ></span>
        </button>
      </div>

      <div class="relative">
        <canvas
          scSignaturePadCanvas
          aria-label="Signature"
          class="h-[200px]"
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
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ColorsSignaturePadDemo {}
