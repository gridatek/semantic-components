import { Component, ViewEncapsulation } from '@angular/core';
import { ScQrCode, ScQrCodeDownload } from '@semantic-components/qr-code';
import { ScButton } from '@semantic-components/ui';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-download-qr-code-demo',
  imports: [ScQrCode, ScQrCodeDownload, ScButton, SiDownloadIcon],
  template: `
    <div class="flex flex-col items-center gap-4">
      <svg
        scQrCode
        #qr="scQrCode"
        [value]="'https://angular.dev'"
        aria-label="QR Code for angular.dev"
      ></svg>
      <div class="flex gap-2">
        <button
          scButton
          scQrCodeDownload
          [for]="qr"
          [filename]="'angular-qr'"
          variant="outline"
        >
          <svg siDownloadIcon></svg>
          PNG
        </button>
        <button
          scButton
          scQrCodeDownload
          [for]="qr"
          [filename]="'angular-qr'"
          format="svg"
          variant="outline"
        >
          <svg siDownloadIcon></svg>
          SVG
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DownloadQrCodeDemo {}
