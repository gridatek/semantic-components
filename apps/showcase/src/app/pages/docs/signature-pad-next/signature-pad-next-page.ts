import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ExportSignaturePadNextDemoContainer } from './demos/export-signature-pad-next-demo-container';
import { FormSignaturePadNextDemoContainer } from './demos/form-signature-pad-next-demo-container';
import { PenSignaturePadNextDemoContainer } from './demos/pen-signature-pad-next-demo-container';
import { ReadonlySignaturePadNextDemoContainer } from './demos/readonly-signature-pad-next-demo-container';
import { RtlSignaturePadNextDemoContainer } from './demos/rtl-signature-pad-next-demo-container';
import { SignaturePadNextUsageDemoContainer } from './demos/signature-pad-next-usage-demo-container';
import { TypeSignaturePadNextDemoContainer } from './demos/type-signature-pad-next-demo-container';

@Component({
  selector: 'app-signature-pad-next-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    SignaturePadNextUsageDemoContainer,
    FormSignaturePadNextDemoContainer,
    PenSignaturePadNextDemoContainer,
    ExportSignaturePadNextDemoContainer,
    ReadonlySignaturePadNextDemoContainer,
    TypeSignaturePadNextDemoContainer,
    RtlSignaturePadNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Signature Pad Next</h1>
        <p class="text-muted-foreground">
          Sign with a pen, a mouse or a finger: one part, ink that follows the
          pen, the strokes as a value to store and draw again — and exported,
          trimmed to the ink.
        </p>
        <app-component-badges path="signature-pad-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-signature-pad-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One part: the pad. Your buttons call it (<code scTypeset>undo()</code
          >, <code scTypeset>clear()</code>); your controls set its pen.
          Anything inside it — a line, "Sign here" in your words — shows under
          the ink.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The value</h2>
        <p>
          <code scTypeset>{{ valueType }}</code>
          — or <code scTypeset>null</code> before any stroke. Plain JSON: store
          it, give it back, and the pad draws it again fitted to its size. Each
          stroke keeps its colour and width; its points carry the pressure — a
          pen&apos;s, or a mouse&apos;s and a finger&apos;s speed (faster,
          thinner).
        </p>
        <p>
          <code scTypeset>signatureToSvg(value)</code>
          and
          <code scTypeset>signatureToBlob(value)</code>
          export it, trimmed to the ink: functions on the value, so a stored
          signature exports without a pad.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The pad is an image of the signature: name it (aria-label or
            aria-labelledby). In a field, its errors are read with it; once
            touched and invalid, it is marked so.
          </li>
          <li>
            Focused: <kbd scKbd>Ctrl + Z</kbd> takes the last stroke back,
            <kbd scKbd>Delete</kbd> clears it.
          </li>
          <li>
            Drawing needs a pointer. Offer a way to sign with a keyboard — a
            typed name, as a second field (see Type instead).
          </li>
          <li>
            The ink is the text&apos;s colour by default (<code scTypeset
              >currentColor</code
            >), so it reads in dark mode; exported, it is black.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-form-signature-pad-next-demo-container />
        <app-pen-signature-pad-next-demo-container />
        <app-export-signature-pad-next-demo-container />
        <app-readonly-signature-pad-next-demo-container />
        <app-type-signature-pad-next-demo-container />
        <app-rtl-signature-pad-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          The pad takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Signature Pad Next parts" [parts]="parts" />
        <app-api-table label="ScSignaturePadNext inputs" [inputs]="inputs" />
        <app-api-table label="Export options" [inputs]="options" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SignaturePadNextPage {
  private readonly valueType =
    '{ width, height, strokes: [{ points: [x, y, pressure][], color, width }] }';

  private readonly anatomy = {
    imports:
      "import { ScSignaturePadNext, signatureToBlob, signatureToSvg } from '@semantic-components/ui';",
    markup: [
      '<div scSignaturePadNext #pad="scSignaturePadNext" [formField]="…" aria-label="Signature"></div>',
      '<button scButton (click)="pad.undo()" [disabled]="!pad.canUndo()">Undo</button>',
      '<button scButton (click)="pad.clear()" [disabled]="pad.empty()">Clear</button>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScSignaturePadNext',
      selector: 'div[scSignaturePadNext]',
      description:
        'Where you sign, in the style’s textarea look: an image you name, focusable; a Signal Forms control (value, disabled, readonly). Your content shows under the ink. exportAs scSignaturePadNext: empty(), canUndo(), undo(), clear().',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'ScSignatureNext | null',
      default: 'null',
      description: 'The strokes: two-way, or a [formField].',
    },
    {
      name: 'penColor',
      type: 'string',
      default: "'currentColor'",
      description: 'The next strokes’ colour.',
    },
    {
      name: 'penWidth',
      type: 'number',
      default: '3',
      description: 'The next strokes’ width, at an even pressure.',
    },
    {
      name: 'disabled, readonly',
      type: 'boolean',
      default: 'false',
      description: 'From the field, or set; no drawing.',
    },
  ];

  private readonly options: ApiInput[] = [
    {
      name: 'padding',
      type: 'number',
      default: '8',
      description: 'Space round the ink (both functions).',
    },
    {
      name: 'type',
      type: 'string',
      default: "'image/png'",
      description: 'signatureToBlob: PNG is transparent, others on white.',
    },
    {
      name: 'quality',
      type: 'number',
      default: '—',
      description: 'signatureToBlob: 0 to 1, for JPEG and WebP.',
    },
    {
      name: 'scale',
      type: 'number',
      default: '2',
      description: 'signatureToBlob: pixels per signature pixel.',
    },
  ];
}
