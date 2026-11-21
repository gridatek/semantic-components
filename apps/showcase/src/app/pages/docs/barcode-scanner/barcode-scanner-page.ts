import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { DocCode } from '../../../components/doc-code/doc-code';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BarcodeScannerUsageDemoContainer } from './demos/barcode-scanner-usage-demo-container';
import { FormatsBarcodeScannerDemoContainer } from './demos/formats-barcode-scanner-demo-container';
import { OnceBarcodeScannerDemoContainer } from './demos/once-barcode-scanner-demo-container';
import { PictureBarcodeScannerDemoContainer } from './demos/picture-barcode-scanner-demo-container';
import { RtlBarcodeScannerDemoContainer } from './demos/rtl-barcode-scanner-demo-container';

@Component({
  selector: 'app-barcode-scanner-page',
  imports: [
    ScLink,
    ScTypeset,
    Anatomy,
    ApiTable,
    DocCode,
    PartsTable,
    TocHeading,
    ComponentBadges,
    BarcodeScannerUsageDemoContainer,
    OnceBarcodeScannerDemoContainer,
    FormatsBarcodeScannerDemoContainer,
    PictureBarcodeScannerDemoContainer,
    RtlBarcodeScannerDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Barcode Scanner</h1>
        <p class="text-muted-foreground">
          Reads barcodes and QR codes from the camera or a picture, each code
          outlined where it is; on the standard BarcodeDetector, polyfilled by
          the app where the browser has none.
        </p>
        <app-component-badges path="barcode-scanner" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-barcode-scanner-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The scanner holds your markup: a frame (its size, its corners) with
          the video and the outlines in it, the button that turns the camera on,
          a file input for a picture. What each state means is yours to say.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Reading</h2>
        <p>
          <code scTypeset>(detected)</code>
          gives each new code — its text, its format, its corners. The same code
          still in view, or back within 1.5 seconds, is not new. To scan once,
          turn the camera off there, or bind
          <code scTypeset>[(active)]</code>.
          <code scTypeset>scan(picture)</code>
          reads a file or an image the same way.
        </p>
        <p>
          <code scTypeset>state()</code>
          says where it is: idle, starting, scanning — or why not: denied (the
          camera refused), unavailable (none), unsupported (no BarcodeDetector).
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Browsers</h2>
        <p>
          It uses the browser&apos;s BarcodeDetector, which Chromium has on
          Android and macOS. Elsewhere the app adds one:
          <a scLink href="https://github.com/Sec-ant/barcode-detector"
            >barcode-detector</a
          >, on zxing-wasm, its decoder served with the app&apos;s assets —
          where the scanner is used, or in the app&apos;s polyfills.
        </p>
        <app-doc-code [code]="polyfill" language="typescript" />
        <app-doc-code [code]="asset" language="json" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Not everyone can aim a camera: offer a picture (a labelled
            <code scTypeset>scBarcodeScannerFile</code>), and a field to type
            the code.
          </li>
          <li>
            Say each code read in a live region; the video and the outlines are
            hidden from screen readers.
          </li>
          <li>
            The toggle&apos;s name follows the state — Scan, Stop — and says
            what a press does.
          </li>
          <li>
            Say what a state means where the video is: the camera refused, none
            to use, a browser that can&apos;t read codes.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-once-barcode-scanner-demo-container />
        <app-formats-barcode-scanner-demo-container />
        <app-picture-barcode-scanner-demo-container />
        <app-rtl-barcode-scanner-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins).
        </p>
        <app-parts-table label="Barcode Scanner parts" [parts]="parts" />
        <app-api-table label="ScBarcodeScanner inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BarcodeScannerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScBarcodeScanner,',
      '  ScBarcodeScannerFile,',
      '  ScBarcodeScannerOverlay,',
      '  ScBarcodeScannerToggle,',
      '  ScBarcodeScannerVideo,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scBarcodeScanner #scanner="scBarcodeScanner" (detected)="read($event)">',
      '  <div scFrame class="relative aspect-4/3 overflow-hidden">',
      '    <video scBarcodeScannerVideo></video>',
      '    <svg scBarcodeScannerOverlay></svg>',
      '  </div>',
      '  <button scBarcodeScannerToggle>…Scan or Stop, from scanner.active()…</button>',
      '  <input type="file" scBarcodeScannerFile />',
      '</div>',
    ].join('\n'),
  };

  private readonly polyfill = [
    '// polyfills.ts, or beside the scanner',
    "import { prepareZXingModule } from 'barcode-detector/polyfill';",
    '',
    'prepareZXingModule({',
    '  overrides: {',
    '    locateFile: (path: string, prefix: string) =>',
    "      path.endsWith('.wasm') ? `/zxing/${path}` : prefix + path,",
    '  },',
    '});',
  ].join('\n');

  private readonly asset = [
    '// angular.json: the decoder, in the assets',
    '{',
    '  "glob": "zxing_reader.wasm",',
    '  "input": "node_modules/zxing-wasm/dist/reader",',
    '  "output": "zxing"',
    '}',
  ].join('\n');

  private readonly parts = [
    {
      name: 'ScBarcodeScanner',
      selector: '[scBarcodeScanner]',
      description:
        'Reads codes from the camera (active) or a picture (scan()); data-state. exportAs scBarcodeScanner: state(), codes() (in the frame now), scan(picture).',
    },
    {
      name: 'ScBarcodeScannerVideo',
      selector: 'video[scBarcodeScannerVideo]',
      description:
        'The camera, the one at the back where there is one: it fills its frame (object-cover). Hidden from screen readers.',
    },
    {
      name: 'ScBarcodeScannerOverlay',
      selector: 'svg[scBarcodeScannerOverlay]',
      description:
        'Each code in the frame, outlined where it is, over the video. Its colour is the text colour; hidden from screen readers.',
    },
    {
      name: 'ScBarcodeScannerToggle',
      selector: 'button[scBarcodeScannerToggle]',
      description:
        'The camera on and off: the style’s button (variant, size). Disabled where the browser can’t read codes. Write its icon and name from active().',
    },
    {
      name: 'ScBarcodeScannerFile',
      selector: 'input[type=file][scBarcodeScannerFile]',
      description:
        'Reads the picture chosen: the style’s input, images only. Label it.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'active',
      type: 'boolean',
      default: 'false',
      description:
        'Two-way: the camera on, scanning. Off again when refused or missing.',
    },
    {
      name: 'formats',
      type: 'ScBarcodeFormat[]',
      default: '[]',
      description:
        "The ones to read ('qr_code', 'ean_13'…); none, all the browser reads.",
    },
    {
      name: '(detected)',
      type: 'ScBarcode',
      default: '—',
      description: 'Each new code: rawValue, format, cornerPoints.',
    },
  ];
}
