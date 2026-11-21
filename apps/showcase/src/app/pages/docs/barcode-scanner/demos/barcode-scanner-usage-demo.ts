import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScBarcodeScanner,
  ScBarcodeScannerOverlay,
  ScBarcodeScannerToggle,
  ScBarcodeScannerVideo,
} from '@semantic-components/ui/barcode-scanner';
import { SiCameraIcon, SiCameraOffIcon } from '@semantic-icons/lucide-icons';

/** The camera, each code outlined where it is; each new one comes out of (detected) — here, said in a live region. */
@Component({
  selector: 'app-barcode-scanner-usage-demo',
  imports: [
    ScBarcodeScanner,
    ScBarcodeScannerVideo,
    ScBarcodeScannerOverlay,
    ScBarcodeScannerToggle,
    ScFrame,
    SiCameraIcon,
    SiCameraOffIcon,
  ],
  template: `
    <div
      scBarcodeScanner
      #scanner="scBarcodeScanner"
      (detected)="last.set($event.rawValue)"
      class="w-full max-w-md space-y-3"
    >
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
      <div class="flex items-center gap-3">
        <button scBarcodeScannerToggle>
          @if (scanner.active()) {
            <svg siCameraOffIcon></svg>
            Stop
          } @else {
            <svg siCameraIcon></svg>
            Scan
          }
        </button>
        <p
          class="text-muted-foreground min-w-0 truncate text-sm"
          aria-live="polite"
        >
          {{ last() ? 'Read: ' + last() : 'Point the camera at a code.' }}
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BarcodeScannerUsageDemo {
  private readonly last = signal('');
}
