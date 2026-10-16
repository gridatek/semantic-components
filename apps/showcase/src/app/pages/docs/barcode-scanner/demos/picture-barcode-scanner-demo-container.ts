import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PictureBarcodeScannerDemo } from './picture-barcode-scanner-demo';

@Component({
  selector: 'app-picture-barcode-scanner-demo-container',
  imports: [DemoContainer, PictureBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="From a picture"
      [code]="code"
      demoUrl="/demos/barcode-scanner/picture-barcode-scanner-demo"
    >
      <app-picture-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PictureBarcodeScannerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScLabel } from '@semantic-components/ui';
import {
  type ScBarcode,
  ScBarcodeScanner,
  ScBarcodeScannerFile,
} from '@semantic-components/ui-lab';

/** No camera needed: a picture — your file, or one of these — is read the same way. The way for anyone who cannot aim a camera. */
@Component({
  selector: 'app-picture-barcode-scanner-demo',
  imports: [ScBarcodeScanner, ScBarcodeScannerFile, ScButton, ScLabel],
  template: \`
    <div
      scBarcodeScanner
      #scanner="scBarcodeScanner"
      (detected)="found($event)"
      class="w-full max-w-md space-y-4"
    >
      <div class="space-y-2">
        <label scLabel for="barcode-picture">A picture of a code</label>
        <input id="barcode-picture" type="file" scBarcodeScannerFile />
      </div>
      <div class="grid grid-cols-2 gap-3">
        @for (sample of samples; track sample.src) {
          <button
            scButton
            variant="outline"
            class="h-auto flex-col gap-2 p-2"
            (click)="try(scanner, sample.src)"
          >
            <img
              [src]="sample.src"
              alt=""
              class="h-24 w-full rounded object-contain"
            />
            {{ sample.label }}
          </button>
        }
      </div>
      <div class="bg-muted space-y-1 rounded-md p-3 text-sm" aria-live="polite">
        @for (code of codes(); track $index) {
          <p>
            <span class="text-muted-foreground">{{ code.format }}</span>
            {{ code.rawValue }}
          </p>
        } @empty {
          <p class="text-muted-foreground">Nothing read yet.</p>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class PictureBarcodeScannerDemo {
  readonly samples = [
    { src: '/images/barcode-qr.png', label: 'A QR code' },
    { src: '/images/barcode-ean13.png', label: 'A product label' },
  ];
  readonly codes = signal<readonly ScBarcode[]>([]);

  found(code: ScBarcode): void {
    this.codes.update((codes) => [code, ...codes].slice(0, 3));
  }

  async try(scanner: ScBarcodeScanner, src: string): Promise<void> {
    await scanner.scan(await (await fetch(src)).blob());
  }
}`;
}
