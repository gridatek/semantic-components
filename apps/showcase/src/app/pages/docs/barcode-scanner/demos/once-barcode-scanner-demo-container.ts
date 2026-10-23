import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OnceBarcodeScannerDemo } from './once-barcode-scanner-demo';

@Component({
  selector: 'app-once-barcode-scanner-demo-container',
  imports: [DemoContainer, OnceBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="Scan once"
      [code]="code"
      demoUrl="/demos/barcode-scanner/once-barcode-scanner-demo"
    >
      <app-once-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OnceBarcodeScannerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScButton, ScField, ScInput, ScLabel, type ScBarcode, ScBarcodeScanner, ScBarcodeScannerFinder, ScBarcodeScannerOverlay, ScBarcodeScannerVideo } from '@semantic-components/ui';
import { SiScanLineIcon } from '@semantic-icons/lucide-icons';

/** Into a form: the first code fills the field, and the camera stops — turned off in (detected). */
@Component({
  selector: 'app-once-barcode-scanner-demo',
  imports: [
    ScBarcodeScanner,
    ScBarcodeScannerVideo,
    ScBarcodeScannerOverlay,
    ScBarcodeScannerFinder,
    ScButton,
    ScField,
    ScLabel,
    ScInput,
    FormField,
    SiScanLineIcon,
  ],
  template: \`
    <div
      scBarcodeScanner
      #scanner="scBarcodeScanner"
      [(active)]="scanning"
      (detected)="fill($event)"
      class="w-full max-w-md space-y-3"
    >
      <div scField>
        <label scLabel for="product-code">Product code</label>
        <div class="flex gap-2">
          <input id="product-code" scInput [formField]="productForm.code" />
          <button
            scButton
            variant="outline"
            [attr.aria-pressed]="scanning()"
            (click)="scanning.set(!scanning())"
          >
            <svg siScanLineIcon></svg>
            {{ scanning() ? 'Cancel' : 'Scan' }}
          </button>
        </div>
      </div>
      @if (scanning()) {
        <div class="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
          <video scBarcodeScannerVideo></video>
          <svg scBarcodeScannerOverlay></svg>
          <div scBarcodeScannerFinder></div>
          @switch (scanner.state()) {
            @case ('idle') {
              <p
                class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white/80"
              >
                The camera is off.
              </p>
            }
            @case ('denied') {
              <p
                class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white"
              >
                The camera was refused: allow it in your browser to scan.
              </p>
            }
            @case ('unavailable') {
              <p
                class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white"
              >
                No camera to use: scan a picture instead.
              </p>
            }
            @case ('unsupported') {
              <p
                class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white"
              >
                This browser cannot read barcodes.
              </p>
            }
          }
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class OnceBarcodeScannerDemo {
  readonly scanning = signal(false);
  readonly model = signal({ code: '' });
  readonly productForm = form(this.model);

  fill(code: ScBarcode): void {
    this.model.set({ code: code.rawValue });
    this.scanning.set(false);
  }
}`;
}
