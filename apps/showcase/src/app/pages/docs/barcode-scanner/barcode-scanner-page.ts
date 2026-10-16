import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CameraBarcodeScannerDemoContainer } from './demos/camera-barcode-scanner-demo-container';
import { ControlsBarcodeScannerDemoContainer } from './demos/controls-barcode-scanner-demo-container';
import { FormatsBarcodeScannerDemoContainer } from './demos/formats-barcode-scanner-demo-container';
import { OnceBarcodeScannerDemoContainer } from './demos/once-barcode-scanner-demo-container';
import { PictureBarcodeScannerDemoContainer } from './demos/picture-barcode-scanner-demo-container';

@Component({
  selector: 'app-barcode-scanner-page',
  imports: [
    CameraBarcodeScannerDemoContainer,
    OnceBarcodeScannerDemoContainer,
    FormatsBarcodeScannerDemoContainer,
    PictureBarcodeScannerDemoContainer,
    ControlsBarcodeScannerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Barcode Scanner</h1>
        <p class="text-muted-foreground">
          The camera or a picture, each code outlined where it is, its states to
          explain — written against the standard BarcodeDetector. Where the
          browser has none, this site adds it with
          <a
            href="https://github.com/Sec-ant/barcode-detector"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
          >
            barcode-detector</a
          >, a polyfill on
          <a
            href="https://github.com/Sec-ant/zxing-wasm"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
          >
            zxing-wasm</a
          >.
        </p>
        <app-component-badges path="barcode-scanner" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Camera</h2>
        <p class="text-muted-foreground">
          The camera, each code outlined where it is; each new one comes out of
          (detected) — here, said in a live region.
        </p>
        <app-camera-barcode-scanner-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Scan once</h2>
        <p class="text-muted-foreground">
          Into a form: the first code fills the field, and the camera stops —
          turned off in (detected).
        </p>
        <app-once-barcode-scanner-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Formats</h2>
        <p class="text-muted-foreground">
          Only the formats you ask for — QR codes, or products (EAN, UPC); none
          asked, all the browser reads.
        </p>
        <app-formats-barcode-scanner-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>From a picture</h2>
        <p class="text-muted-foreground">
          No camera needed: a picture — your file, or one of these — is read the
          same way. The way for anyone who cannot aim a camera.
        </p>
        <app-picture-barcode-scanner-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Controls</h2>
        <p class="text-muted-foreground">
          The light and the other camera, where the device has them; the state,
          to say why it does not scan.
        </p>
        <app-controls-barcode-scanner-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BarcodeScannerPage {}
