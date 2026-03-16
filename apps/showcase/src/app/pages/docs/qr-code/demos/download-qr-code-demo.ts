import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode, ScQrCodeDownload } from '@semantic-components/ui-lab';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-download-qr-code-demo',
  imports: [ScQrCode, ScQrCodeDownload, SiDownloadIcon],
  template: `
    <div class="inline-flex flex-col items-center gap-3">
      <div
        scQrCode
        #qr="scQrCode"
        [value]="'https://example.com/download'"
        [size]="200"
      ></div>
      <button scQrCodeDownload [for]="qr" [filename]="'my-qr-code'">
        <svg siDownloadIcon class="size-4"></svg>
        Save QR Code
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadQrCodeDemo {}
