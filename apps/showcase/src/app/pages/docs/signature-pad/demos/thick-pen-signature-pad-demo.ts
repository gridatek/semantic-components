import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadCanvas,
  ScSignaturePadControls,
  ScSignaturePadUndoButton,
  ScSignaturePadClearButton,
  ScSignaturePadToolbar,
  ScSignaturePadWidthButton,
} from '@semantic-components/ui-lab';
import { SiUndoIcon, SiTrash2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-thick-pen-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadCanvas,
    ScSignaturePadControls,
    ScSignaturePadUndoButton,
    ScSignaturePadClearButton,
    ScSignaturePadToolbar,
    ScSignaturePadWidthButton,
    SiUndoIcon,
    SiTrash2Icon,
  ],
  template: `
    <div scSignaturePad class="space-y-3">
      <div scSignaturePadToolbar>
        <button scSignaturePadPenWidth [width]="2">
          <span
            class="w-4 rounded-full bg-foreground transition-all"
            style="height: 2px"
          ></span>
        </button>
        <button scSignaturePadPenWidth [width]="4">
          <span
            class="w-4 rounded-full bg-foreground transition-all"
            style="height: 4px"
          ></span>
        </button>
        <button scSignaturePadPenWidth [width]="6">
          <span
            class="w-4 rounded-full bg-foreground transition-all"
            style="height: 6px"
          ></span>
        </button>
        <button scSignaturePadPenWidth [width]="8">
          <span
            class="w-4 rounded-full bg-foreground transition-all"
            style="height: 8px"
          ></span>
        </button>
      </div>

      <div class="relative inline-block">
        <canvas scSignaturePadCanvas [width]="400" [height]="200"></canvas>

        <div scSignaturePadControls>
          <button scSignaturePadUndo>
            <svg siUndoIcon class="size-4"></svg>
          </button>
          <button scSignaturePadClear>
            <svg siTrash2Icon class="size-4"></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThickPenSignaturePadDemo {}
