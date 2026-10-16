import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlsBarcodeScannerNextDemo } from './controls-barcode-scanner-next-demo';

@Component({
  selector: 'app-controls-barcode-scanner-next-demo-container',
  imports: [DemoContainer, ControlsBarcodeScannerNextDemo],
  template: `
    <app-demo-container
      title="Controls"
      [code]="code"
      demoUrl="/demos/barcode-scanner-next/controls-barcode-scanner-next-demo"
    >
      <app-controls-barcode-scanner-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlsBarcodeScannerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBarcodeScannerNext,
  ScBarcodeScannerNextFinder,
  ScBarcodeScannerNextOverlay,
  ScBarcodeScannerNextSwitchCamera,
  ScBarcodeScannerNextToggle,
  ScBarcodeScannerNextTorch,
  ScBarcodeScannerNextVideo,
} from '@semantic-components/ui-lab';
import {
  SiCameraIcon,
  SiCameraOffIcon,
  SiFlashlightIcon,
  SiSwitchCameraIcon,
} from '@semantic-icons/lucide-icons';

/** The light and the other camera, where the device has them; the state, to say why it does not scan. */
@Component({
  selector: 'app-controls-barcode-scanner-next-demo',
  imports: [
    ScBarcodeScannerNext,
    ScBarcodeScannerNextVideo,
    ScBarcodeScannerNextOverlay,
    ScBarcodeScannerNextFinder,
    ScBarcodeScannerNextToggle,
    ScBarcodeScannerNextTorch,
    ScBarcodeScannerNextSwitchCamera,
    SiCameraIcon,
    SiCameraOffIcon,
    SiFlashlightIcon,
    SiSwitchCameraIcon,
  ],
  template: \`
    <div
      scBarcodeScannerNext
      #scanner="scBarcodeScannerNext"
      class="w-full max-w-md space-y-3"
    >
      <div class="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
        <video scBarcodeScannerNextVideo></video>
        <svg scBarcodeScannerNextOverlay></svg>
        <div scBarcodeScannerNextFinder></div>
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
        <button scBarcodeScannerNextToggle>
          @if (scanner.active()) {
            <svg siCameraOffIcon></svg>
            Stop
          } @else {
            <svg siCameraIcon></svg>
            Scan
          }
        </button>
        <button scBarcodeScannerNextTorch>
          <svg siFlashlightIcon></svg>
          <span class="sr-only">Light</span>
        </button>
        <button scBarcodeScannerNextSwitchCamera>
          <svg siSwitchCameraIcon></svg>
          <span class="sr-only">Switch camera</span>
        </button>
        <span class="text-muted-foreground ms-auto text-sm"
          >State: {{ scanner.state() }}</span
        >
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlsBarcodeScannerNextDemo {}`;
}
