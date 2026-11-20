import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScQrCode,
  qrCodeToBlob,
  qrCodeToSvg,
} from '@semantic-components/ui/qr-code';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';

/** A file from the value, with the functions: qrCodeToBlob (PNG) and qrCodeToSvg — black on white, for print, at the size asked. */
@Component({
  selector: 'app-download-qr-code-demo',
  imports: [ScButton, ScQrCode, SiDownloadIcon],
  template: `
    <div class="flex flex-col items-center gap-4">
      <svg scQrCode [value]="value" aria-label="QR code for angular.dev"></svg>
      <div class="flex gap-2">
        <button scButton variant="outline" (click)="png()">
          <svg siDownloadIcon></svg>
          PNG
        </button>
        <button scButton variant="outline" (click)="svg()">
          <svg siDownloadIcon></svg>
          SVG
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DownloadQrCodeDemo {
  private readonly document = inject(DOCUMENT);
  private readonly value = 'https://angular.dev';

  private async png(): Promise<void> {
    this.save(await qrCodeToBlob(this.value, { size: 1024 }), 'qr-code.png');
  }

  private svg(): void {
    const svg = qrCodeToSvg(this.value, { size: 512 });
    this.save(new Blob([svg], { type: 'image/svg+xml' }), 'qr-code.svg');
  }

  private save(blob: Blob, name: string): void {
    const url = URL.createObjectURL(blob);
    const link = this.document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    // Time for the download to start before the file goes.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
