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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCodeDownload } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-download-qr-code-demo',
  imports: [ScQrCodeDownload],
  template: \`
    <sc-qr-code-download
      [value]="'https://example.com/download'"
      [size]="200"
      [filename]="'my-qr-code'"
      [downloadLabel]="'Save QR Code'"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadQrCodeDemo {}`;
}
