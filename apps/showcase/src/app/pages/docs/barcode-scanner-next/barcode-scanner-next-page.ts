import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CameraBarcodeScannerNextDemoContainer } from './demos/camera-barcode-scanner-next-demo-container';
import { ControlsBarcodeScannerNextDemoContainer } from './demos/controls-barcode-scanner-next-demo-container';
import { FormatsBarcodeScannerNextDemoContainer } from './demos/formats-barcode-scanner-next-demo-container';
import { OnceBarcodeScannerNextDemoContainer } from './demos/once-barcode-scanner-next-demo-container';
import { PictureBarcodeScannerNextDemoContainer } from './demos/picture-barcode-scanner-next-demo-container';

@Component({
  selector: 'app-barcode-scanner-next-page',
  imports: [
    CameraBarcodeScannerNextDemoContainer,
    OnceBarcodeScannerNextDemoContainer,
    FormatsBarcodeScannerNextDemoContainer,
    PictureBarcodeScannerNextDemoContainer,
    ControlsBarcodeScannerNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Barcode Scanner Next</h1>
        <p class="text-muted-foreground">
          The barcode scanner, rebuilt: the camera or a picture, each code
          outlined where it is, its states to explain — written against the
          standard BarcodeDetector, which this site adds where the browser has
          none.
        </p>
        <app-component-badges path="barcode-scanner-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Camera</h2>
        <p class="text-muted-foreground">
          The camera, each code outlined where it is; each new one comes out of
          (detected) — here, said in a live region.
        </p>
        <app-camera-barcode-scanner-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Scan once</h2>
        <p class="text-muted-foreground">
          Into a form: the first code fills the field, and the camera stops —
          turned off in (detected).
        </p>
        <app-once-barcode-scanner-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Formats</h2>
        <p class="text-muted-foreground">
          Only the formats you ask for — QR codes, or products (EAN, UPC); none
          asked, all the browser reads.
        </p>
        <app-formats-barcode-scanner-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>From a picture</h2>
        <p class="text-muted-foreground">
          No camera needed: a picture — your file, or one of these — is read the
          same way. The way for anyone who cannot aim a camera.
        </p>
        <app-picture-barcode-scanner-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Controls</h2>
        <p class="text-muted-foreground">
          The light and the other camera, where the device has them; the state,
          to say why it does not scan.
        </p>
        <app-controls-barcode-scanner-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BarcodeScannerNextPage {}
