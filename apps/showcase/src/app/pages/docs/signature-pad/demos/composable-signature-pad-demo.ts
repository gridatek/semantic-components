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
  selector: 'app-composable-signature-pad-demo',
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
    <div class="space-y-3">
      <div scSignaturePad class="relative inline-block">
        <canvas
          scSignaturePadCanvas
          [(value)]="signature"
          [width]="400"
          [height]="200"
          (signatureChange)="onSignatureChange($event)"
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

      <div class="text-muted-foreground text-sm">
        Signature status:
        {{ signature() ? 'Signed' : 'Empty' }}
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposableSignaturePadDemo {
  readonly signature = signal('');

  onSignatureChange(dataUrl: string): void {
    console.log('Signature changed:', dataUrl ? 'Has signature' : 'Empty');
  }
}
