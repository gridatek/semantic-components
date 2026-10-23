import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBarcodeScanner,
  ScBarcodeScannerFinder,
  ScBarcodeScannerOverlay,
  ScBarcodeScannerToggle,
  ScBarcodeScannerVideo,
} from '@semantic-components/ui';
import { SiCameraIcon, SiCameraOffIcon } from '@semantic-icons/lucide-icons';

/** The camera, each code outlined where it is; each new one comes out of (detected) — here, said in a live region. */
@Component({
  selector: 'app-camera-barcode-scanner-demo',
  imports: [
    ScBarcodeScanner,
    ScBarcodeScannerVideo,
    ScBarcodeScannerOverlay,
    ScBarcodeScannerFinder,
    ScBarcodeScannerToggle,
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
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CameraBarcodeScannerDemo {
  readonly last = signal('');
}
