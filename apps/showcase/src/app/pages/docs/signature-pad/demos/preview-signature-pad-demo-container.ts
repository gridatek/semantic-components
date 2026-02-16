import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PreviewSignaturePadDemo } from './preview-signature-pad-demo';

@Component({
  selector: 'app-preview-signature-pad-demo-container',
  imports: [DemoContainer, PreviewSignaturePadDemo],
  template: `
    <app-demo-container title="With Preview" [code]="code">
      <app-preview-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewSignaturePadDemoContainer {
  readonly code = `import {
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
  template: \`
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
            <svg si-undo-icon class="size-4"></svg>
          </button>
          <button scSignaturePadClear>
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewSignaturePadDemo {
  readonly previewSignature = signal<string>('');
}`;
}
