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
import { ChoiceCardRadioGroupDemoContainer } from './demos/choice-card-radio-group-demo-container';
import { CustomThemeRadioGroupDemoContainer } from './demos/custom-theme-radio-group-demo-container';
import { DescriptionRadioGroupDemoContainer } from './demos/description-radio-group-demo-container';
import { DisabledRadioGroupDemoContainer } from './demos/disabled-radio-group-demo-container';
import { FieldsetRadioGroupDemoContainer } from './demos/fieldset-radio-group-demo-container';
import { FormRadioGroupDemoContainer } from './demos/form-radio-group-demo-container';
import { HorizontalRadioGroupDemoContainer } from './demos/horizontal-radio-group-demo-container';
import { InvalidRadioGroupDemoContainer } from './demos/invalid-radio-group-demo-container';
import { RadioGroupUsageDemoContainer } from './demos/radio-group-usage-demo-container';
import { RtlRadioGroupDemoContainer } from './demos/rtl-radio-group-demo-container';

@Component({
  selector: 'app-radio-group-page',
  imports: [
    Anatomy,
    RadioGroupUsageDemoContainer,
    DescriptionRadioGroupDemoContainer,
    ChoiceCardRadioGroupDemoContainer,
    FieldsetRadioGroupDemoContainer,
    DisabledRadioGroupDemoContainer,
    InvalidRadioGroupDemoContainer,
    HorizontalRadioGroupDemoContainer,
    FormRadioGroupDemoContainer,
    CustomThemeRadioGroupDemoContainer,
    RtlRadioGroupDemoContainer,
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
        <h1 scHeading>Radio Group</h1>
        <p class="text-muted-foreground">
          One choice among several, as native radios. In the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="radio-group" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-radio-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Native radio inputs in your labels, each with its value; the group
          holds the choice — a [formField] or [(value)] on the group. A radio
          field puts a radio beside its text.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Native radios: one Tab stop for the group, the arrows move the
            choice (mirrored right to left), Space picks.
          </li>
          <li>
            Name the group (a fieldset&apos;s legend, or aria-label on the
            group); each radio by its label.
          </li>
          <li>
            A description is read with its radio; invalid once touched
            (aria-invalid, from Signal Forms).
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Why the group holds the choice</h2>
        <p class="text-muted-foreground">
          Signal Forms can also bind each native radio itself — a [formField] on
          each, the Angular way. That still works, but each radio then needs
          type="radio" in your template: Angular types a native input&apos;s
          [formField] by the type it sees there, so without it a field typed as
          a union (&apos;off&apos; | &apos;all&apos; | &apos;one&apos;)
          doesn&apos;t compile. On the group, the field is typed by the
          group&apos;s value — any type, no type attribute, one [formField] — as
          Base UI and shadcn, where the group holds the value.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-description-radio-group-demo-container />
        <app-choice-card-radio-group-demo-container />
        <app-fieldset-radio-group-demo-container />
        <app-disabled-radio-group-demo-container />
        <app-invalid-radio-group-demo-container />
        <app-horizontal-radio-group-demo-container />
        <app-form-radio-group-demo-container />
        <app-custom-theme-radio-group-demo-container />
        <app-rtl-radio-group-demo-container />
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
          aria-label="Radio Group parts"
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
export default class RadioGroupPage {
  protected readonly anatomy = {
    imports:
      "import { ScRadioGroup, ScRadio, ScField } from '@semantic-components/ui';",
    markup: [
      '<div scRadioGroup [formField]="…" aria-label="…">',
      '  <label scField orientation="horizontal">',
      '    <input scRadio value="…" />',
      '    …',
      '  </label>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScRadioGroup',
      selector: 'div[scRadioGroup]',
      description:
        "role=\"radiogroup\"; the choice: value (a [formField], or two-way); orientation ('vertical', 'horizontal'); disabled. Checks the radio whose value matches, names its radios alike; invalid once touched.",
    },
    {
      name: 'ScRadio',
      selector: 'input[scRadio]',
      description:
        "A native radio (its own type) in the preset's look, its dot when checked: value (its option, any type); disabled.",
    },
  ];
}
