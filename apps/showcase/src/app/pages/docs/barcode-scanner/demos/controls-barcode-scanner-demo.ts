import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBarcodeScanner,
  ScBarcodeScannerFinder,
  ScBarcodeScannerOverlay,
  ScBarcodeScannerSwitchCamera,
  ScBarcodeScannerToggle,
  ScBarcodeScannerTorch,
  ScBarcodeScannerVideo,
} from '@semantic-components/ui';
import {
  SiCameraIcon,
  SiCameraOffIcon,
  SiFlashlightIcon,
  SiSwitchCameraIcon,
} from '@semantic-icons/lucide-icons';

/** The light and the other camera, where the device has them; the state, to say why it does not scan. */
@Component({
  selector: 'app-controls-barcode-scanner-demo',
  imports: [
    ScBarcodeScanner,
    ScBarcodeScannerVideo,
    ScBarcodeScannerOverlay,
    ScBarcodeScannerFinder,
    ScBarcodeScannerToggle,
    ScBarcodeScannerTorch,
    ScBarcodeScannerSwitchCamera,
    SiCameraIcon,
    SiCameraOffIcon,
    SiFlashlightIcon,
    SiSwitchCameraIcon,
  ],
  template: `
    <div
      scBarcodeScanner
      #scanner="scBarcodeScanner"
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
      <div class="flex items-center gap-2">
        <button scBarcodeScannerToggle>
          @if (scanner.active()) {
            <svg siCameraOffIcon></svg>
            Stop
          } @else {
            <svg siCameraIcon></svg>
            Scan
          }
        </button>
        <button scBarcodeScannerTorch>
          <svg siFlashlightIcon></svg>
          <span class="sr-only">Light</span>
        </button>
        <button scBarcodeScannerSwitchCamera>
          <svg siSwitchCameraIcon></svg>
          <span class="sr-only">Switch camera</span>
        </button>
        <span class="text-muted-foreground ms-auto text-sm"
          >State: {{ scanner.state() }}</span
        >
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlsBarcodeScannerDemo {}
