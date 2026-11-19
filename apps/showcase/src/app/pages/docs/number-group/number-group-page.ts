import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicNumberGroupDemoContainer from './demos/basic-number-group-demo-container';
import DisabledNumberGroupDemoContainer from './demos/disabled-number-group-demo-container';
import { NumberGroupUsageDemoContainer } from './demos/number-group-usage-demo-container';
import PriceNumberGroupDemoContainer from './demos/price-number-group-demo-container';
import QuantityNumberGroupDemoContainer from './demos/quantity-number-group-demo-container';
import RtlNumberGroupDemoContainer from './demos/rtl-number-group-demo-container';
import ScrubbingNumberGroupDemoContainer from './demos/scrubbing-number-group-demo-container';
import SignalFormsNumberGroupDemoContainer from './demos/signal-forms-number-group-demo-container';
import StackedNumberGroupDemoContainer from './demos/stacked-number-group-demo-container';
import StepsNumberGroupDemoContainer from './demos/steps-number-group-demo-container';
import WithoutLabelNumberGroupDemoContainer from './demos/without-label-number-group-demo-container';

@Component({
  selector: 'app-number-group-page',
  imports: [
    PartsTable,
    Anatomy,
    BasicNumberGroupDemoContainer,
    ScrubbingNumberGroupDemoContainer,
    StepsNumberGroupDemoContainer,
    StackedNumberGroupDemoContainer,
    QuantityNumberGroupDemoContainer,
    SignalFormsNumberGroupDemoContainer,
    PriceNumberGroupDemoContainer,
    RtlNumberGroupDemoContainer,
    DisabledNumberGroupDemoContainer,
    WithoutLabelNumberGroupDemoContainer,
    NumberGroupUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Number Group</h1>
        <p class="text-muted-foreground">
          A number input with its buttons, as Base UI's NumberField: typed and
          read in the locale (currencies, percents, units), stepped with the
          keyboard, held buttons, the wheel or by dragging its label, and a
          Signal Forms control. In a scField, as any input.
        </p>
        <app-component-badges path="number-group" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-number-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A scField holds the label, the group and the descriptions. The group
          joins the input and its buttons and holds the value — a Signal Forms
          control. A scrub area round the label changes the value by dragging:
          it reaches the group through the field.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-basic-number-group-demo-container />
        <app-scrubbing-number-group-demo-container />
        <app-steps-number-group-demo-container />
        <app-stacked-number-group-demo-container />
        <app-quantity-number-group-demo-container />
        <app-price-number-group-demo-container />
        <app-signal-forms-number-group-demo-container />
        <app-disabled-number-group-demo-container />
        <app-without-label-number-group-demo-container />
        <app-rtl-number-group-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes class, merged over the style (cn: a later class wins).
          The label, descriptions and errors are the scField&apos;s the group is
          in, as for any input.
        </p>
        <app-parts-table label="Number Group parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NumberGroupPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScField, ScNumberGroup, ScNumberInput,',
      '  ScNumberIncrement, ScNumberDecrement,',
      '  ScNumberScrubArea, ScNumberScrubAreaCursor, ScLabel,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scField>',
      '  <div scNumberScrubArea>  <!-- optional: drag to change -->',
      '    <label scLabel>…</label>',
      '    <span scNumberScrubAreaCursor>…</span>',
      '  </div>',
      '  <div scNumberGroup [formField]="…">',
      '    <button scNumberDecrement>…</button>',
      '    <input scNumberInput />',
      '    <button scNumberIncrement>…</button>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScNumberGroup',
      selector: 'div[scNumberGroup]',
      description:
        "The input and its buttons, joined, one focus ring round them; it holds the value and its rules: [(value)] (a number, or null); min, max; step (1), smallStep (0.1, with Alt), largeStep (10, with Shift or Page Up / Down); snapOnStep; format (Intl.NumberFormat options: currencies, percents, units; in LOCALE_ID); allowWheelScrub; disabled. A Signal Forms control ([formField]: min, max, required, disabled from the schema); with a name, a hidden input submits the plain number. variant: 'split' (decrement, input, increment, as written) or 'stacked' (the input, then increment over decrement). exportAs scNumberGroup.",
    },
    {
      name: 'ScNumberInput',
      selector: 'input[scNumberInput]',
      description:
        'The text field, a spin button: typed text read in the locale, written formatted on Enter or leaving, within the bounds. ↑ ↓ step, Page Up / Down by largeStep, Home / End to the min / max. Named by the field’s label.',
    },
    {
      name: 'ScNumberIncrement, ScNumberDecrement',
      selector: 'button[scNumberIncrement], button[scNumberDecrement]',
      description:
        'Step up / down, repeatedly while held; not in the Tab order, the new value announced; aria-disabled at the bound. Write the icon and name it.',
    },
    {
      name: 'ScNumberScrubArea',
      selector: '[scNumberScrubArea]',
      description:
        "Drag on it to change the value: round the label, in the same scField as the group (it reaches it through the field). orientation ('horizontal'), one step per pixelSensitivity (2) pixels; with a mouse, the pointer is locked.",
    },
    {
      name: 'ScNumberScrubAreaCursor',
      selector: '[scNumberScrubAreaCursor]',
      description:
        'Stands in for the locked pointer while scrubbing: write an icon in it, inside the scrub area.',
    },
  ];
}
