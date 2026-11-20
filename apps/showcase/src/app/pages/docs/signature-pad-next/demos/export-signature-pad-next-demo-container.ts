import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ExportSignaturePadNextDemo } from './export-signature-pad-next-demo';

@Component({
  selector: 'app-export-signature-pad-next-demo-container',
  imports: [DemoContainer, ExportSignaturePadNextDemo],
  template: `
    <app-demo-container
      title="Export"
      [code]="code"
      demoUrl="/demos/signature-pad-next/export-signature-pad-next-demo"
    >
      <app-export-signature-pad-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ExportSignaturePadNextDemoContainer {
  private readonly code = `import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  type ScSignatureNext,
  ScSignaturePadNext,
  signatureToBlob,
  signatureToSvg,
} from '@semantic-components/ui';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';

/** Exported from the value, trimmed to the ink: a PNG (transparent) or an SVG, downloaded. */
@Component({
  selector: 'app-export-signature-pad-next-demo',
  imports: [ScButton, ScFrame, ScSignaturePadNext, SiDownloadIcon],
  template: \`
    <div class="w-full max-w-md space-y-2">
      <div
        scSignaturePadNext
        #pad="scSignaturePadNext"
        aria-label="Signature"
        [(value)]="signature"
      ></div>
      <div class="flex flex-wrap gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="pad.empty()"
          (click)="png()"
        >
          <svg siDownloadIcon></svg>
          PNG
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="pad.empty()"
          (click)="svg()"
        >
          <svg siDownloadIcon></svg>
          SVG
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          class="ms-auto"
          [disabled]="pad.empty()"
          (click)="pad.clear()"
        >
          Clear
        </button>
      </div>
      @if (preview(); as preview) {
        <div scFrame size="sm" class="flex h-20 items-center bg-white p-1">
          <img
            [src]="preview"
            alt="The signature, as exported"
            class="max-h-full"
          />
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ExportSignaturePadNextDemo {
  private readonly document = inject(DOCUMENT);
  private readonly signature = signal<ScSignatureNext | null>(null);
  private readonly preview = signal<string | null>(null);

  private async png(): Promise<void> {
    const signature = this.signature();
    const blob = signature ? await signatureToBlob(signature) : null;
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const previous = this.preview();
    if (previous) URL.revokeObjectURL(previous);
    this.preview.set(url);
    this.download(url, 'signature.png');
  }

  private svg(): void {
    const signature = this.signature();
    if (!signature) return;
    const blob = new Blob([signatureToSvg(signature)], {
      type: 'image/svg+xml',
    });
    const url = URL.createObjectURL(blob);
    this.download(url, 'signature.svg');
    URL.revokeObjectURL(url);
  }

  private download(url: string, name: string): void {
    const link = this.document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
  }
}`;
}
