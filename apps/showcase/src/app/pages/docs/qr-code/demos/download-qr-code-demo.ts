import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScQrCode,
  ScQrCodeDownload,
} from '@semantic-components/ui-lab/qr-code';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-download-qr-code-demo',
  imports: [ScQrCode, ScQrCodeDownload, SiDownloadIcon],
  template: `
    <div class="flex flex-col items-center gap-4">
      <svg
        scQrCode
        #qr="scQrCode"
        [value]="'https://angular.dev'"
        aria-label="QR Code for angular.dev"
      ></svg>
      <div class="flex gap-2">
        <button scQrCodeDownload [for]="qr" [filename]="'angular-qr'">
          <svg siDownloadIcon></svg>
          PNG
        </button>
        <button
          scQrCodeDownload
          [for]="qr"
          [filename]="'angular-qr'"
          format="svg"
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
