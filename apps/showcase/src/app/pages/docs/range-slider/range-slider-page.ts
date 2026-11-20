import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledRangeSliderDemoContainer } from './demos/disabled-range-slider-demo-container';
import { FormRangeSliderDemoContainer } from './demos/form-range-slider-demo-container';
import { LabelRangeSliderDemoContainer } from './demos/label-range-slider-demo-container';
import { RangeSliderUsageDemoContainer } from './demos/range-slider-usage-demo-container';
import { RtlRangeSliderDemoContainer } from './demos/rtl-range-slider-demo-container';
import { StepsRangeSliderDemoContainer } from './demos/steps-range-slider-demo-container';
import { TrimRangeSliderDemoContainer } from './demos/trim-range-slider-demo-container';
import { VerticalRangeSliderDemoContainer } from './demos/vertical-range-slider-demo-container';

@Component({
  selector: 'app-range-slider-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    RangeSliderUsageDemoContainer,
    LabelRangeSliderDemoContainer,
    StepsRangeSliderDemoContainer,
    TrimRangeSliderDemoContainer,
    VerticalRangeSliderDemoContainer,
    FormRangeSliderDemoContainer,
    DisabledRangeSliderDemoContainer,
    RtlRangeSliderDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Range Slider</h1>
        <p class="text-muted-foreground">
          A range on one track: two thumbs that never cross, in the look of the
          app&apos;s Slider. The value is the pair — one Signal Forms field.
        </p>
        <app-component-badges path="range-slider" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-range-slider-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A group holding the value and drawing the track; in it, a native range
          per thumb — the first is from, the second to. Each thumb is named by
          you; the group by its field&apos;s label. Its ends are the
          form&apos;s: min and max on each value of the pair, in the schema
          (applyEach).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Each thumb is a native range: <kbd scKbd>Tab</kbd> reaches it; the
            arrows move it by the step, <kbd scKbd>Page Up</kbd> and
            <kbd scKbd>Page Down</kbd> by more, <kbd scKbd>Home</kbd> and
            <kbd scKbd>End</kbd> to the ends (mirrored right to left). It stops
            at the other thumb.
          </li>
          <li>
            Name each thumb (aria-label: "Minimum price"); in a field, the group
            is named by its label. format reads the values out (aria-valuetext:
            "€200").
          </li>
          <li>
            A press on the track brings the nearer thumb; dragged into the
            other, a thumb pushes it along. With both on one spot, the direction
            of the drag chooses the thumb.
          </li>
          <li>
            A description is read with each thumb; invalid once touched
            (aria-invalid, from Signal Forms).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-label-range-slider-demo-container />
        <app-steps-range-slider-demo-container />
        <app-vertical-range-slider-demo-container />
        <app-form-range-slider-demo-container />
        <app-trim-range-slider-demo-container />
        <app-disabled-range-slider-demo-container />
        <app-rtl-range-slider-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Range Slider parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RangeSliderPage {
  private readonly anatomy = {
    imports:
      "import { ScRangeSlider, ScRangeSliderThumb } from '@semantic-components/ui';",
    markup: [
      '<div scRangeSlider [formField]="…" #range="scRangeSlider">',
      '  <input scRangeSliderThumb aria-label="…" />',
      '  <input scRangeSliderThumb aria-label="…" />',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScRangeSlider',
      selector: 'div[scRangeSlider]',
      description:
        "A group (named by its field's label) drawing the track and the range: value, the pair [from, to] (a [formField], or two-way); its ends: with a form, the schema's (applyEach: min and max on each value), without one min and max (0 and 100 by default); step; minStepsBetweenValues; orientation ('horizontal', 'vertical'); disabled; format (Intl.NumberFormat, in LOCALE_ID). exportAs scRangeSlider: formatted(), lowest(), highest().",
    },
    {
      name: 'ScRangeSliderThumb',
      selector: 'input[scRangeSliderThumb]',
      description:
        "A native range in the style's Slider thumb: the first is from, the second to. It stops at the other; its aria-valuetext from format.",
    },
  ];
}
