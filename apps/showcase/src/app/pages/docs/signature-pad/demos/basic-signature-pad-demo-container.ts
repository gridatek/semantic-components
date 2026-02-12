import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSignaturePadDemo } from './basic-signature-pad-demo';

@Component({
  selector: 'app-basic-signature-pad-demo-container',
  imports: [DemoContainer, BasicSignaturePadDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSignaturePadDemoContainer {
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
  selector: 'app-basic-signature-pad-demo',
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
    <div class="space-y-3">
      <div sc-signature-pad #pad="scSignaturePad" class="relative inline-block">
        <canvas
          sc-signature-pad-canvas
          [(value)]="signature"
          [width]="400"
          [height]="200"
          (signatureChange)="onSignatureChange($event)"
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

      <div class="flex gap-2">
        <button
          (click)="exportSignature(pad)"
          class="px-4 py-2 text-sm border rounded-md hover:bg-accent"
        >
          Export as PNG
        </button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSignaturePadDemo {
  readonly signature = signal('');

  onSignatureChange(dataUrl: string): void {
    console.log('Signature changed:', dataUrl ? 'Has signature' : 'Empty');
  }

  exportSignature(pad: ScSignaturePad): void {
    const dataUrl = pad.toDataURL('image/png');
    if (!dataUrl || dataUrl === 'data:,') {
      alert('Please sign first!');
      return;
    }

    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = dataUrl;
    link.click();
  }
}`;
}
