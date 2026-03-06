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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSignaturePadDemoContainer {
  readonly code = `import {
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
      <div scSignaturePad #pad="scSignaturePad" class="relative inline-block">
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

      <div class="flex gap-2">
        <button
          (click)="exportSignature(pad)"
          class="hover:bg-accent rounded-md border px-4 py-2 text-sm"
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
