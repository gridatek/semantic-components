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
import { ControlledSliderDemoContainer } from './demos/controlled-slider-demo-container';
import { CustomColorSliderDemoContainer } from './demos/custom-color-slider-demo-container';
import { DisabledSliderDemoContainer } from './demos/disabled-slider-demo-container';
import { FormSliderDemoContainer } from './demos/form-slider-demo-container';
import { RtlSliderDemoContainer } from './demos/rtl-slider-demo-container';
import { SliderUsageDemoContainer } from './demos/slider-usage-demo-container';
import { VerticalSliderDemoContainer } from './demos/vertical-slider-demo-container';

@Component({
  selector: 'app-slider-page',
  imports: [
    Anatomy,
    SliderUsageDemoContainer,
    ControlledSliderDemoContainer,
    DisabledSliderDemoContainer,
    VerticalSliderDemoContainer,
    FormSliderDemoContainer,
    CustomColorSliderDemoContainer,
    RtlSliderDemoContainer,
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
        <h1 scHeading>Slider</h1>
        <p class="text-muted-foreground">
          A native range input, its track and thumb in the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="slider" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-slider-usage-demo-container />
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
        <app-controlled-slider-demo-container />
        <app-disabled-slider-demo-container />
        <app-vertical-slider-demo-container />
        <app-form-slider-demo-container />
        <app-custom-color-slider-demo-container />
        <app-rtl-slider-demo-container />
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
          aria-label="Slider parts"
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
export default class SliderPage {
  protected readonly anatomy = {
    imports: "import { ScSlider } from '@semantic-components/ui';",
    markup: ['<input scSlider [formField]="…" aria-label="…" />'].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScSlider',
      selector: 'input[scSlider]',
      description:
        "A native range in the preset's look (track, range, thumb): value (two-way, or a [formField]); min, max, step; orientation ('horizontal', 'vertical'); invalid once touched.",
    },
  ];
}
