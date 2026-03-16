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
    <div class="flex flex-col items-center gap-4">
      <div scQrCode #qr="scQrCode" [value]="'https://angular.dev'"></div>
      <button
        scQrCodeDownload
        [for]="qr"
        [filename]="'angular-qr'"
        class="hover:bg-accent focus:ring-ring inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors focus:ring-2 focus:outline-none"
      >
        <svg siDownloadIcon class="size-4"></svg>
        Download PNG
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadQrCodeDemo {}
