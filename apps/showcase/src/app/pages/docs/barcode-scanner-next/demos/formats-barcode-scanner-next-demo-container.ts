import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsBarcodeScannerNextDemo } from './formats-barcode-scanner-next-demo';

@Component({
  selector: 'app-formats-barcode-scanner-next-demo-container',
  imports: [DemoContainer, FormatsBarcodeScannerNextDemo],
  template: `
    <app-demo-container
      title="Formats"
      [code]="code"
      demoUrl="/demos/barcode-scanner-next/formats-barcode-scanner-next-demo"
    >
      <app-formats-barcode-scanner-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsBarcodeScannerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';
import {
  type ScBarcodeFormat,
  ScBarcodeScannerNext,
  ScBarcodeScannerNextFinder,
  ScBarcodeScannerNextOverlay,
  ScBarcodeScannerNextToggle,
  ScBarcodeScannerNextVideo,
} from '@semantic-components/ui-lab';
import { SiCameraIcon, SiCameraOffIcon } from '@semantic-icons/lucide-icons';

/** Only the formats you ask for — QR codes, or products (EAN, UPC); none asked, all the browser reads. */
@Component({
  selector: 'app-formats-barcode-scanner-next-demo',
  imports: [
    ScBarcodeScannerNext,
    ScBarcodeScannerNextVideo,
    ScBarcodeScannerNextOverlay,
    ScBarcodeScannerNextFinder,
    ScBarcodeScannerNextToggle,
    ScRadioGroup,
    ScRadioField,
    ScRadio,
    FormField,
    SiCameraIcon,
    SiCameraOffIcon,
  ],
  template: \`
    <div class="flex items-center gap-4 text-sm">
      <span id="formats-label" class="text-muted-foreground">Read:</span>
      <div
        scRadioGroup
        orientation="horizontal"
        aria-labelledby="formats-label"
      >
        @for (kind of kinds; track kind.id) {
          <label scRadioField>
            <input
              type="radio"
              scRadio
              [value]="kind.id"
              [formField]="settingsForm.kind"
            />
            {{ kind.label }}
          </label>
        }
      </div>
    </div>
    <div
      scBarcodeScannerNext
      #scanner="scBarcodeScannerNext"
      [formats]="formats()"
      (detected)="last.set($event.format + ': ' + $event.rawValue)"
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
      <div class="flex items-center gap-3">
        <button scBarcodeScannerNextToggle>
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
          {{ last() || 'Nothing read yet.' }}
        </p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsBarcodeScannerNextDemo {
  readonly kinds = [
    { id: 'qr', label: 'QR codes' },
    { id: 'products', label: 'Products' },
  ] as const;
  readonly settings = signal<{ kind: 'qr' | 'products' }>({ kind: 'qr' });
  readonly settingsForm = form(this.settings);
  readonly formats = computed<ScBarcodeFormat[]>(() =>
    this.settings().kind === 'qr'
      ? ['qr_code']
      : ['ean_13', 'ean_8', 'upc_a', 'upc_e'],
  );
  readonly last = signal('');
}`;
}
