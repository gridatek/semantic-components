import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DownloadQrCodeDemo } from './download-qr-code-demo';

@Component({
  selector: 'app-download-qr-code-demo-container',
  imports: [DemoContainer, DownloadQrCodeDemo],
  template: `
    <app-demo-container
      title="Download"
      demoUrl="/demos/qr-code/download-qr-code-demo"
      [code]="code"
    >
      <app-download-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode, ScQrCodeDownload } from '@semantic-components/ui-lab';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-download-qr-code-demo',
  imports: [ScQrCode, ScQrCodeDownload, SiDownloadIcon],
  template: \`
    <div class="inline-flex flex-col items-center gap-3">
      <div
        scQrCode
        #qr="scQrCode"
        [value]="'https://example.com/download'"
      ></div>
      <button
        scQrCodeDownload
        [for]="qr"
        [filename]="'my-qr-code'"
        class="hover:bg-accent focus:ring-ring inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors focus:ring-2 focus:outline-none"
      >
        <svg siDownloadIcon class="size-4"></svg>
        Save QR Code
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadQrCodeDemo {}`;
}
