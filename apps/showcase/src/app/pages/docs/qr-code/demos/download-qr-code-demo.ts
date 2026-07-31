import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScQrCode, ScQrCodeDownload } from '@semantic-components/ui-lab';
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
      <button
        scButton
        scQrCodeDownload
        [for]="qr"
        [filename]="'angular-qr'"
        variant="outline"
      >
        <svg siDownloadIcon class="size-4"></svg>
        Download PNG
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DownloadQrCodeDemo {}
