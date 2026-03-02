import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
  selector: 'app-preview-signature-pad-demo',
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
      <div scSignaturePad class="relative inline-block">
        <canvas
          scSignaturePadCanvas
          [width]="400"
          [height]="200"
          (signatureChange)="previewSignature.set($event)"
        ></canvas>

        <div scSignaturePadControls>
          <button scSignaturePadUndo>
            <svg siUndoIcon class="size-4"></svg>
          </button>
          <button scSignaturePadClear>
            <svg siTrash2Icon class="size-4"></svg>
          </button>
        </div>
      </div>

      @if (previewSignature()) {
        <div>
          <p class="mb-2 text-sm font-medium">Preview:</p>
          <img
            [src]="previewSignature()"
            alt="Signature preview"
            class="max-w-[200px] rounded-lg border"
          />
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewSignaturePadDemo {
  readonly previewSignature = signal<string>('');
}
