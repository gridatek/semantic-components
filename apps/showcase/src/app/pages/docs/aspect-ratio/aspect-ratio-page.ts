import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AspectRatioUsageDemoContainer } from './demos/aspect-ratio-usage-demo-container';
import { PortraitAspectRatioDemoContainer } from './demos/portrait-aspect-ratio-demo-container';
import { ResponsiveAspectRatioDemoContainer } from './demos/responsive-aspect-ratio-demo-container';
import { RtlAspectRatioDemoContainer } from './demos/rtl-aspect-ratio-demo-container';
import { SquareAspectRatioDemoContainer } from './demos/square-aspect-ratio-demo-container';
import { VideoAspectRatioDemoContainer } from './demos/video-aspect-ratio-demo-container';

@Component({
  selector: 'app-aspect-ratio-page',
  imports: [
    Anatomy,
    AspectRatioUsageDemoContainer,
    SquareAspectRatioDemoContainer,
    PortraitAspectRatioDemoContainer,
    VideoAspectRatioDemoContainer,
    ResponsiveAspectRatioDemoContainer,
    RtlAspectRatioDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Aspect Ratio</h1>
        <p class="text-muted-foreground">
          Keeps its content to a ratio of width to height — a photo, a video, a
          map — whatever its width.
        </p>
        <app-component-badges path="aspect-ratio" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-aspect-ratio-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive, on your element; its content fills it (an image with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">fill</code>, a
          video with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">size-full</code
          >).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Notes</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Its width is yours — a class (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >w-full max-w-sm</code
            >) or its parent&apos;s; the height follows.
          </li>
          <li>
            The ratio goes through a CSS variable,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">--ratio</code>,
            not an inline style: a class can still change it, by breakpoint
            (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >max-sm:aspect-square</code
            >).
          </li>
          <li>
            It is
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">relative</code
            >: what fills it can be placed inside it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-square-aspect-ratio-demo-container />
        <app-portrait-aspect-ratio-demo-container />
        <app-video-aspect-ratio-demo-container />
        <app-responsive-aspect-ratio-demo-container />
        <app-rtl-aspect-ratio-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <h3 class="font-heading text-base font-medium">
          ScAspectRatio —
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >[scAspectRatio]</code
          >
        </h3>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScAspectRatio inputs"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Input</th>
                <th scTableHeaderCell>Type</th>
                <th scTableHeaderCell>Default</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (input of inputs; track input.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.type }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.default }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ input.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AspectRatioPage {
  protected readonly anatomy = {
    imports: "import { ScAspectRatio } from '@semantic-components/ui';",
    markup: [
      '<div scAspectRatio [ratio]="16 / 9" class="w-full max-w-sm">',
      '  <img ngSrc="…" fill alt="…" />',
      '</div>',
    ].join('\n'),
  };

  protected readonly inputs = [
    {
      name: 'ratio',
      type: 'number',
      default: '1',
      description: 'Width over height: 16 / 9, 1, 9 / 16. Set as --ratio.',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description:
        'Classes merged over its own (cn: a later class wins) — its width, or another ratio by breakpoint.',
    },
  ];
}
