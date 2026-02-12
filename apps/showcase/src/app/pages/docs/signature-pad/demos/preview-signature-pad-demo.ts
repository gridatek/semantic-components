import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSignaturePad,
  ScSignaturePadCanvas,
  ScSignaturePadControls,
  ScSignaturePadUndoButton,
  ScSignaturePadClearButton,
} from '@semantic-components/ui-lab';
import { SiUndoIcon, SiTrash2Icon } from '@semantic-icons/lucide-icons';

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
      <div sc-signature-pad class="relative inline-block">
        <canvas
          sc-signature-pad-canvas
          [width]="400"
          [height]="200"
          (signatureChange)="previewSignature.set($event)"
        ></canvas>

        <div sc-signature-pad-controls>
          <button sc-signature-pad-undo>
            <svg si-undo-icon class="size-4"></svg>
          </button>
          <button sc-signature-pad-clear>
            <svg si-trash-2-icon class="size-4"></svg>
          </button>
        </div>
      </div>

      @if (previewSignature()) {
        <div>
          <p class="text-sm font-medium mb-2">Preview:</p>
          <img
            [src]="previewSignature()"
            alt="Signature preview"
            class="border rounded-lg max-w-[200px]"
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
