import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ColorsQrCodeDemoContainer } from './demos/colors-qr-code-demo-container';
import { DownloadQrCodeDemoContainer } from './demos/download-qr-code-demo-container';
import { ErrorCorrectionQrCodeDemoContainer } from './demos/error-correction-qr-code-demo-container';
import { LiveQrCodeDemoContainer } from './demos/live-qr-code-demo-container';
import { MarginQrCodeDemoContainer } from './demos/margin-qr-code-demo-container';
import { QrCodeUsageDemoContainer } from './demos/qr-code-usage-demo-container';
import { RtlQrCodeDemoContainer } from './demos/rtl-qr-code-demo-container';
import { SizesQrCodeDemoContainer } from './demos/sizes-qr-code-demo-container';
import { UseCasesQrCodeDemoContainer } from './demos/use-cases-qr-code-demo-container';

@Component({
  selector: 'app-qr-code-page',
  imports: [
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    QrCodeUsageDemoContainer,
    SizesQrCodeDemoContainer,
    ColorsQrCodeDemoContainer,
    ErrorCorrectionQrCodeDemoContainer,
    MarginQrCodeDemoContainer,
    LiveQrCodeDemoContainer,
    DownloadQrCodeDemoContainer,
    UseCasesQrCodeDemoContainer,
    RtlQrCodeDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>QR Code</h1>
        <p class="text-muted-foreground">
          A QR code drawn as one SVG path, named for where it leads — and, from
          the same value, a file to download or print.
        </p>
        <app-component-badges path="qr-code" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="qr-code"
          library="uqr"
          href="https://github.com/unjs/uqr"
          names="ScQrCode, qrCodeToSvg, qrCodeToBlob"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-qr-code-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One part, on your
          <code scTypeset>svg</code>. A file comes from the value, with a
          function: no component needed — an email or a printed page can have
          one too.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Colours</h2>
        <p>
          Dark on white, in both themes: many scanners can&apos;t read a code
          inverted, so it doesn&apos;t follow dark mode. Recolour it with
          classes — the text colour for the dark modules, the background for the
          rest — keeping dark on light and strong contrast. A file is black on
          white unless you pass
          <code scTypeset>color</code> and <code scTypeset>background</code>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            It is an image: name it (aria-label) for where it leads — "QR code
            for angular.dev".
          </li>
          <li>
            Put the same link or text beside it, for whoever can&apos;t scan.
          </li>
          <li>
            A value too long to encode draws nothing; say so from
            <code scTypeset>error()</code>.
          </li>
          <li>It is never mirrored right to left.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-sizes-qr-code-demo-container />
        <app-colors-qr-code-demo-container />
        <app-error-correction-qr-code-demo-container />
        <app-margin-qr-code-demo-container />
        <app-live-qr-code-demo-container />
        <app-download-qr-code-demo-container />
        <app-use-cases-qr-code-demo-container />
        <app-rtl-qr-code-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          The code takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins).
        </p>
        <app-parts-table label="QR Code parts" [parts]="parts" />
        <app-api-table label="ScQrCode inputs" [inputs]="inputs" />
        <app-api-table label="Export options" [inputs]="options" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class QrCodePage {
  private readonly anatomy = {
    imports:
      "import { ScQrCode, qrCodeToBlob, qrCodeToSvg } from '@semantic-components/ui/qr-code';",
    markup:
      '<svg scQrCode value="https://angular.dev" aria-label="QR code for angular.dev"></svg>',
  };

  private readonly parts = [
    {
      name: 'ScQrCode',
      selector: 'svg[scQrCode]',
      description:
        'The code as one SVG path, role img: name it. Dark on white (bg-white text-black), size-52; recoloured and sized by class. exportAs scQrCode: error().',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'string',
      default: 'required',
      description: 'What it encodes: a URL, mailto:, tel:, WIFI:…',
    },
    {
      name: 'errorCorrection',
      type: "'L' | 'M' | 'Q' | 'H'",
      default: "'M'",
      description: 'How much can be damaged and still read: 7, 15, 25, 30 %.',
    },
    {
      name: 'margin',
      type: 'number',
      default: '4',
      description: 'The quiet zone round it, in modules.',
    },
  ];

  private readonly options: ApiInput[] = [
    {
      name: 'errorCorrection, margin',
      type: 'as the code’s',
      default: "'M', 4",
      description: 'qrCodeToSvg and qrCodeToBlob.',
    },
    {
      name: 'color, background',
      type: 'string',
      default: "'#000000', '#ffffff'",
      description: 'The dark modules’ colour, and the rest’s.',
    },
    {
      name: 'size',
      type: 'number',
      default: '1024',
      description: 'Its width in pixels, whole pixels a module.',
    },
    {
      name: 'type, quality',
      type: 'string, number',
      default: "'image/png'",
      description: 'qrCodeToBlob: the image type, and JPEG or WebP quality.',
    },
  ];
}
