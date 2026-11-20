import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AspectRatioFrameDemoContainer } from './demos/aspect-ratio-frame-demo-container';
import { FrameUsageDemoContainer } from './demos/frame-usage-demo-container';
import { TableFrameDemoContainer } from './demos/table-frame-demo-container';

@Component({
  selector: 'app-frame-page',
  imports: [
    ApiTable,
    Anatomy,
    FrameUsageDemoContainer,
    AspectRatioFrameDemoContainer,
    TableFrameDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Frame</h1>
        <p class="text-muted-foreground">
          A frame round a box, in the app&apos;s style: the style&apos;s card
          radius, ring and shadow — for an aspect ratio, a table, any box that
          isn&apos;t a card.
        </p>
        <app-component-badges path="frame" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-frame-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          One directive, beside another part or on a plain box. Only the look:
          clipping is the box&apos;s (the aspect ratio clips, the table&apos;s
          container scrolls; on a plain box with an image, add
          <code scTypeset>overflow-hidden</code>).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-aspect-ratio-frame-demo-container />
        <app-table-frame-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <h3 class="font-heading text-base font-medium">
          ScFrame —
          <code scTypeset>[scFrame]</code>
        </h3>
        <p>
          The style&apos;s frame: the style&apos;s card radius, ring and shadow
          — square in lyra and sera,
          <code scTypeset>4xl</code> in luma.
        </p>
        <app-api-table label="ScFrame inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FramePage {
  private readonly inputs: readonly ApiInput[] = [
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Classes merged over the style (cn: a later class wins).',
    },
  ];

  private readonly anatomy = {
    imports: "import { ScFrame } from '@semantic-components/ui';",
    markup: '<div scFrame>…</div>',
  };
}
