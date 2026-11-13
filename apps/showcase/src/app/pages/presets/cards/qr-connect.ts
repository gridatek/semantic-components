import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScFrame,
} from '@semantic-components/ui';
import { ScQrCode } from '@semantic-components/ui/qr-code';

/** A code to scan, what it does, and a button to dismiss it. */
@Component({
  selector: 'app-preview-qr-connect',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScFrame,
    ScQrCode,
  ],
  template: `
    <div scCard>
      <div scCardBody class="flex justify-center pt-6">
        <div scFrame class="bg-white p-4">
          <svg
            scQrCode
            value="https://github.com/gridatek/semantic-components"
            [quietZone]="0"
            class="size-40 text-black"
            aria-label="Connect device QR code"
          ></svg>
        </div>
      </div>
      <div scCardHeader class="text-center">
        <h2 scCardTitle>Scan to connect your mobile device</h2>
        <p scCardDescription>
          Open the Ledger mobile app and scan this code to link your device.
        </p>
      </div>
      <div scCardFooter>
        <button scButton variant="secondary" class="w-full">Got it</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewQrConnect {}
