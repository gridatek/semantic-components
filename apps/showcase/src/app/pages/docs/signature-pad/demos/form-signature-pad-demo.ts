import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadCanvas,
  ScSignaturePadClearButton,
  ScSignaturePadControls,
  ScSignaturePadUndoButton,
} from '@semantic-components/ui-lab';
import { SiTrash2Icon, SiUndoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-form-signature-pad-demo',
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
    <div class="space-y-4">
      <div>
        <label class="mb-1 block text-sm font-medium">Full Name</label>
        <input
          type="text"
          class="w-full max-w-sm rounded-md border px-3 py-2"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium">Signature</label>
        <div scSignaturePad #pad="scSignaturePad" class="relative inline-block">
          <canvas scSignaturePadCanvas [width]="400" [height]="150"></canvas>

          <div scSignaturePadControls>
            <button scSignaturePadUndo>
              <svg siUndoIcon class="size-4"></svg>
            </button>
            <button scSignaturePadClear>
              <svg siTrash2Icon class="size-4"></svg>
            </button>
          </div>
        </div>

        @if (pad.isEmpty()) {
          <p class="text-muted-foreground mt-1 text-sm">Please sign above</p>
        } @else {
          <p class="mt-1 text-sm text-green-600">Signature captured</p>
        }
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSignaturePadDemo {}
