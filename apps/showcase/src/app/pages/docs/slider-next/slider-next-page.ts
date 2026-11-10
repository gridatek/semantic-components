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
import { ControlledSliderNextDemoContainer } from './demos/controlled-slider-next-demo-container';
import { CustomColorSliderNextDemoContainer } from './demos/custom-color-slider-next-demo-container';
import { DisabledSliderNextDemoContainer } from './demos/disabled-slider-next-demo-container';
import { FormSliderNextDemoContainer } from './demos/form-slider-next-demo-container';
import { RtlSliderNextDemoContainer } from './demos/rtl-slider-next-demo-container';
import { SliderNextUsageDemoContainer } from './demos/slider-next-usage-demo-container';
import { VerticalSliderNextDemoContainer } from './demos/vertical-slider-next-demo-container';

@Component({
  selector: 'app-slider-next-page',
  imports: [
    Anatomy,
    SliderNextUsageDemoContainer,
    ControlledSliderNextDemoContainer,
    DisabledSliderNextDemoContainer,
    VerticalSliderNextDemoContainer,
    FormSliderNextDemoContainer,
    CustomColorSliderNextDemoContainer,
    RtlSliderNextDemoContainer,
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
        <h1 scHeading>Slider Next</h1>
        <p class="text-muted-foreground">
          A native range input, its track and thumb in the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="slider-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-slider-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A native range input: the browser draws its track and thumb, the
          preset styles them. A [formField] or [(value)] binds it; a label or
          aria-label names it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A native range: Tab reaches it; the arrows move it by its step, Page
            Up and Page Down by more, Home and End to its ends (mirrored right
            to left).
          </li>
          <li>
            Name it: a label (scLabel in a field, or for) or aria-label.
            Vertical, it says so (aria-orientation).
          </li>
          <li>
            A description is read with it; invalid once touched (aria-invalid,
            from Signal Forms).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-controlled-slider-next-demo-container />
        <app-disabled-slider-next-demo-container />
        <app-vertical-slider-next-demo-container />
        <app-form-slider-next-demo-container />
        <app-custom-color-slider-next-demo-container />
        <app-rtl-slider-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Slider Next parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
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
export default class SliderNextPage {
  protected readonly anatomy = {
    imports: "import { ScSliderNext } from '@semantic-components/ui';",
    markup: [
      '<input type="range" scSliderNext [formField]="…" aria-label="…" />',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScSliderNext',
      selector: 'input[type="range"][scSliderNext]',
      description:
        "A native range in the preset's look (track, range, thumb): value (two-way, or a [formField]); min, max, step; orientation ('horizontal', 'vertical'); invalid once touched.",
    },
  ];
}
