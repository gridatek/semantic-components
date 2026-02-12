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
  ScSignaturePadColorButton,
  ScSignaturePadWidthButton,
} from '@semantic-components/ui-lab';
import { SiUndoIcon, SiTrash2Icon } from '@semantic-icons/lucide-icons';

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
    <div sc-signature-pad class="space-y-3">
      <div sc-signature-pad-toolbar>
        <button sc-signature-pad-pen-color [color]="'#000000'">
          <span
            class="size-4 rounded-full border border-border transition-transform data-[active]:scale-110"
            [attr.data-active]="'#000000'"
            style="background-color: #000000"
          ></span>
        </button>
        <button sc-signature-pad-pen-color [color]="'#1d4ed8'">
          <span
            class="size-4 rounded-full border border-border transition-transform"
            style="background-color: #1d4ed8"
          ></span>
        </button>
        <button sc-signature-pad-pen-color [color]="'#dc2626'">
          <span
            class="size-4 rounded-full border border-border transition-transform"
            style="background-color: #dc2626"
          ></span>
        </button>
        <button sc-signature-pad-pen-color [color]="'#16a34a'">
          <span
            class="size-4 rounded-full border border-border transition-transform"
            style="background-color: #16a34a"
          ></span>
        </button>
      </div>

      <div class="relative inline-block">
        <canvas sc-signature-pad-canvas [width]="400" [height]="200"></canvas>

        <div sc-signature-pad-controls>
          <button sc-signature-pad-undo>
            <svg si-undo-icon class="size-4"></svg>
          </button>
          <button sc-signature-pad-clear>
            <svg si-trash-2-icon class="size-4"></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsSignaturePadDemo {}
