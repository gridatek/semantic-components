import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCodeDownload } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-download-qr-code-demo',
  imports: [ScQrCodeDownload],
  template: `
    <sc-qr-code-download
      [value]="'https://example.com/download'"
      [size]="200"
      [filename]="'my-qr-code'"
      [downloadLabel]="'Save QR Code'"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadQrCodeDemo {}
