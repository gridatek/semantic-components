import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
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
    ScKbd,
    PartsTable,
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
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Slider</h1>
        <p class="text-muted-foreground">
          A native range input, its track and thumb in the look of the
          app&apos;s style.
        </p>
        <app-component-badges path="slider" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-slider-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A native range input: the browser draws its track and thumb, the
          preset styles them. A [formField] or [(value)] binds it; a label or
          aria-label names it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A native range: <kbd scKbd>Tab</kbd> reaches it; the arrows move it
            by its step, Page Up and <kbd scKbd>Page Down</kbd> by more,
            <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> to its ends (mirrored
            right to left).
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
        <h2 scTypeset appToc>Examples</h2>
        <app-controlled-slider-demo-container />
        <app-disabled-slider-demo-container />
        <app-vertical-slider-demo-container />
        <app-form-slider-demo-container />
        <app-custom-color-slider-demo-container />
        <app-rtl-slider-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Slider parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SliderPage {
  private readonly anatomy = {
    imports: "import { ScSlider } from '@semantic-components/ui';",
    markup: ['<input scSlider [formField]="…" aria-label="…" />'].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScSlider',
      selector: 'input[scSlider]',
      description:
        "A native range in the style's look (track, range, thumb): value (two-way, or a [formField]); min, max, step; orientation ('horizontal', 'vertical'); invalid once touched.",
    },
  ];
}
