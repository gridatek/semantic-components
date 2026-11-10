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
import { ChoiceCardSwitchDemoContainer } from './demos/choice-card-switch-demo-container';
import { DescriptionSwitchDemoContainer } from './demos/description-switch-demo-container';
import { DisabledSwitchDemoContainer } from './demos/disabled-switch-demo-container';
import { InvalidSwitchDemoContainer } from './demos/invalid-switch-demo-container';
import { PlacementSwitchDemoContainer } from './demos/placement-switch-demo-container';
import { RtlSwitchDemoContainer } from './demos/rtl-switch-demo-container';
import { SignalFormsSwitchDemoContainer } from './demos/signal-forms-switch-demo-container';
import { SizesSwitchDemoContainer } from './demos/sizes-switch-demo-container';
import { StateSwitchDemoContainer } from './demos/state-switch-demo-container';
import { SwitchUsageDemoContainer } from './demos/switch-usage-demo-container';

@Component({
  selector: 'app-switch-page',
  imports: [
    Anatomy,
    SwitchUsageDemoContainer,
    DescriptionSwitchDemoContainer,
    ChoiceCardSwitchDemoContainer,
    DisabledSwitchDemoContainer,
    InvalidSwitchDemoContainer,
    SizesSwitchDemoContainer,
    PlacementSwitchDemoContainer,
    StateSwitchDemoContainer,
    SignalFormsSwitchDemoContainer,
    RtlSwitchDemoContainer,
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
        <h1 scHeading>Switch</h1>
        <p class="text-muted-foreground">
          A native checkbox shown as a switch, drawn by itself, in the look of
          the app&apos;s preset.
        </p>
        <app-component-badges path="switch" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-switch-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A native checkbox with role="switch" that draws its track and thumb:
          alone, or in a switch field beside its text. A [formField] or
          [(checked)] binds it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A native checkbox with role="switch": announced as a switch, on or
            off; Tab reaches it, Space toggles it.
          </li>
          <li>
            Name it by its text: a label round both (label scSwitchField), or a
            scLabel in a div field; a switch with no text by aria-label. Its
            name stays the same as it toggles.
          </li>
          <li>
            A description is read with its switch; invalid once touched
            (aria-invalid, from Signal Forms).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-description-switch-demo-container />
        <app-choice-card-switch-demo-container />
        <app-disabled-switch-demo-container />
        <app-invalid-switch-demo-container />
        <app-sizes-switch-demo-container />
        <app-placement-switch-demo-container />
        <app-state-switch-demo-container />
        <app-signal-forms-switch-demo-container />
        <app-rtl-switch-demo-container />
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
          aria-label="Switch parts"
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
export default class SwitchPage {
  protected readonly anatomy = {
    imports:
      "import { ScSwitch, ScSwitchField } from '@semantic-components/ui';",
    markup: [
      '<label scSwitchField>',
      '  <input type="checkbox" scSwitch [formField]="…" />',
      '  …',
      '</label>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScSwitchField',
      selector: 'label[scSwitchField], div[scSwitchField]',
      description:
        "A switch beside its text (a label), or its label and description (a div): the switch first, at the start; last, at the end. The preset's label look, normal weight. Optional.",
    },
    {
      name: 'ScSwitch',
      selector: 'input[type="checkbox"][scSwitch]',
      description:
        "A native checkbox with role=\"switch\", its track and thumb drawn by itself in the preset's look: checked (two-way, or a [formField]); size ('default', 'sm'); invalid once touched.",
    },
  ];
}
