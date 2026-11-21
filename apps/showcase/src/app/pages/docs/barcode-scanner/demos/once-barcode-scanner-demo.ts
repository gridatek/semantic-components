import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScField, ScFrame, ScInput, ScLabel } from '@semantic-components/ui';
import {
  type ScBarcode,
  ScBarcodeScanner,
  ScBarcodeScannerOverlay,
  ScBarcodeScannerToggle,
  ScBarcodeScannerVideo,
} from '@semantic-components/ui/barcode-scanner';
import { SiScanLineIcon } from '@semantic-icons/lucide-icons';

/** Into a form: the first code fills the field, and the camera stops — turned off in (detected). */
@Component({
  selector: 'app-once-barcode-scanner-demo',
  imports: [
    ScBarcodeScanner,
    ScBarcodeScannerVideo,
    ScBarcodeScannerOverlay,
    ScBarcodeScannerToggle,
    ScField,
    ScFrame,
    ScLabel,
    ScInput,
    FormField,
    SiScanLineIcon,
  ],
  template: `
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
          <button scBarcodeScannerToggle variant="outline">
            <svg siScanLineIcon></svg>
            {{ scanning() ? 'Cancel' : 'Scan' }}
          </button>
        </div>
      </div>
      @if (scanning()) {
        <div scFrame class="relative aspect-4/3 overflow-hidden bg-black">
          <video scBarcodeScannerVideo></video>
          <svg scBarcodeScannerOverlay></svg>
          @switch (scanner.state()) {
            @case ('idle') {
              <p
                class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white"
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class OnceBarcodeScannerDemo {
  private readonly scanning = signal(false);
  private readonly model = signal({ code: '' });
  private readonly productForm = form(this.model);

  private fill(code: ScBarcode): void {
    this.model.set({ code: code.rawValue });
    this.scanning.set(false);
  }
}
