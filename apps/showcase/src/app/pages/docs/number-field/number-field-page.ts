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
import BasicNumberFieldDemoContainer from './demos/basic-number-field-demo-container';
import DisabledNumberFieldDemoContainer from './demos/disabled-number-field-demo-container';
import { NumberFieldUsageDemoContainer } from './demos/number-field-usage-demo-container';
import PriceNumberFieldDemoContainer from './demos/price-number-field-demo-container';
import QuantityNumberFieldDemoContainer from './demos/quantity-number-field-demo-container';
import ScrubbingNumberFieldDemoContainer from './demos/scrubbing-number-field-demo-container';
import SignalFormsNumberFieldDemoContainer from './demos/signal-forms-number-field-demo-container';
import StackedNumberFieldDemoContainer from './demos/stacked-number-field-demo-container';
import StepsNumberFieldDemoContainer from './demos/steps-number-field-demo-container';
import WithoutLabelNumberFieldDemoContainer from './demos/without-label-number-field-demo-container';

@Component({
  selector: 'app-number-field-page',
  imports: [
    Anatomy,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    BasicNumberFieldDemoContainer,
    ScrubbingNumberFieldDemoContainer,
    StepsNumberFieldDemoContainer,
    StackedNumberFieldDemoContainer,
    QuantityNumberFieldDemoContainer,
    SignalFormsNumberFieldDemoContainer,
    PriceNumberFieldDemoContainer,
    DisabledNumberFieldDemoContainer,
    WithoutLabelNumberFieldDemoContainer,
    NumberFieldUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Number Field</h1>
        <p class="text-muted-foreground">
          A number field assembled from parts, as Base UI's NumberField: typed
          and read in the locale (currencies, percents, units), stepped with the
          keyboard, held buttons, the wheel or by dragging its label, and a
          Signal Forms control.
        </p>
        <app-component-badges path="number-field" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-number-field-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          The field holds the value and is a field itself (its label,
          description and errors tied to the input). A group joins the input and
          its buttons; a scrub area (often the label) changes the value by
          dragging.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-number-field-demo-container />
        <app-scrubbing-number-field-demo-container />
        <app-steps-number-field-demo-container />
        <app-stacked-number-field-demo-container />
        <app-quantity-number-field-demo-container />
        <app-price-number-field-demo-container />
        <app-signal-forms-number-field-demo-container />
        <app-disabled-number-field-demo-container />
        <app-without-label-number-field-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes class, merged over the preset (cn: a later class
          wins). The field is a scField too: it takes its id, orientation and
          class.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Number Field parts"
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
export default class NumberFieldPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScNumberField, ScNumberFieldGroup, ScNumberFieldInput,',
      '  ScNumberFieldIncrement, ScNumberFieldDecrement,',
      '  ScNumberFieldScrubArea, ScNumberFieldScrubAreaCursor, ScLabel,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scNumberField [(value)]="…">',
      '  <label scLabel scNumberFieldScrubArea>…',
      '    <span scNumberFieldScrubAreaCursor>…</span>',
      '  </label>',
      '  <div scNumberFieldGroup>',
      '    <button scNumberFieldDecrement>…</button>',
      '    <input scNumberFieldInput />',
      '    <button scNumberFieldIncrement>…</button>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScNumberField',
      selector: 'div[scNumberField]',
      description:
        'The value and its rules: [(value)] (a number, or null); min, max; step (1), smallStep (0.1, with Alt), largeStep (10, with Shift or Page Up / Down); snapOnStep; format (Intl.NumberFormat options: currencies, percents, units; in LOCALE_ID); allowWheelScrub; disabled. A Signal Forms control ([formField]: min, max, required, disabled from the schema); with a name, a hidden input submits the plain number.',
    },
    {
      name: 'ScNumberFieldGroup',
      selector: 'div[scNumberFieldGroup]',
      description:
        "The input and its buttons, joined, one focus ring round them. variant: 'split' (decrement, input, increment, as written) or 'stacked' (the input, then increment over decrement).",
    },
    {
      name: 'ScNumberFieldInput',
      selector: 'input[scNumberFieldInput]',
      description:
        'The text field, a spin button: typed text read in the locale, written formatted on Enter or leaving, within the bounds. ↑ ↓ step, Page Up / Down by largeStep, Home / End to the min / max. Named by the field’s label.',
    },
    {
      name: 'ScNumberFieldIncrement, ScNumberFieldDecrement',
      selector:
        'button[scNumberFieldIncrement], button[scNumberFieldDecrement]',
      description:
        'Step up / down, repeatedly while held; not in the Tab order, the new value announced; aria-disabled at the bound. Write the icon and name it.',
    },
    {
      name: 'ScNumberFieldScrubArea',
      selector: '[scNumberFieldScrubArea]',
      description:
        "Drag on it to change the value: orientation ('horizontal'), one step per pixelSensitivity (2) pixels; with a mouse, the pointer is locked.",
    },
    {
      name: 'ScNumberFieldScrubAreaCursor',
      selector: '[scNumberFieldScrubAreaCursor]',
      description:
        'Stands in for the locked pointer while scrubbing: write an icon in it, inside the scrub area.',
    },
  ];
}
