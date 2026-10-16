import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSignaturePadNextDemoContainer } from './demos/basic-signature-pad-next-demo-container';
import { ExportSignaturePadNextDemoContainer } from './demos/export-signature-pad-next-demo-container';
import { FormSignaturePadNextDemoContainer } from './demos/form-signature-pad-next-demo-container';
import { PensSignaturePadNextDemoContainer } from './demos/pens-signature-pad-next-demo-container';
import { TypeSignaturePadNextDemoContainer } from './demos/type-signature-pad-next-demo-container';

@Component({
  selector: 'app-signature-pad-next-page',
  imports: [
    BasicSignaturePadNextDemoContainer,
    PensSignaturePadNextDemoContainer,
    TypeSignaturePadNextDemoContainer,
    FormSignaturePadNextDemoContainer,
    ExportSignaturePadNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Signature Pad Next</h1>
        <p class="text-muted-foreground">
          The signature pad, rebuilt: ink that follows the pen, a signature
          drawn or typed, its value plain data to store and draw again, and
          exports trimmed to the ink.
        </p>
        <app-component-badges path="signature-pad-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          Sign with a mouse, a finger or a pen: the ink follows its speed, or
          the pen's pressure. Undo, redo, clear — or, focused, Ctrl+Z,
          Ctrl+Shift+Z and Delete.
        </p>
        <app-basic-signature-pad-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Pens</h2>
        <p class="text-muted-foreground">
          The pen's colour and width — two-way, here picked with buttons.
        </p>
        <app-pens-signature-pad-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Draw or type</h2>
        <p class="text-muted-foreground">
          Without a pointer, type your name: the text is the signature, in the
          input's font. One pad, two ways in.
        </p>
        <app-type-signature-pad-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Form</h2>
        <p class="text-muted-foreground">
          A [formField]: required() in the schema; left unsigned, the field
          shows its error.
        </p>
        <app-form-signature-pad-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Export</h2>
        <p class="text-muted-foreground">
          The value is data — drawn again here, read-only and smaller. Exported,
          the image is trimmed to the ink: PNG or SVG.
        </p>
        <app-export-signature-pad-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SignaturePadNextPage {}
