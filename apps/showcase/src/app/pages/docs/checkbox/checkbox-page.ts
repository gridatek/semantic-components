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
import { CheckboxUsageDemoContainer } from './demos/checkbox-usage-demo-container';
import { CustomMarkCheckboxDemoContainer } from './demos/custom-mark-checkbox-demo-container';
import { CustomThemeCheckboxDemoContainer } from './demos/custom-theme-checkbox-demo-container';
import { DescriptionCheckboxDemoContainer } from './demos/description-checkbox-demo-container';
import { DisabledCheckboxDemoContainer } from './demos/disabled-checkbox-demo-container';
import { FormCheckboxDemoContainer } from './demos/form-checkbox-demo-container';
import { GroupCheckboxDemoContainer } from './demos/group-checkbox-demo-container';
import { IndeterminateCheckboxDemoContainer } from './demos/indeterminate-checkbox-demo-container';
import { InvalidCheckboxDemoContainer } from './demos/invalid-checkbox-demo-container';
import { RtlCheckboxDemoContainer } from './demos/rtl-checkbox-demo-container';
import { SignalFormsCheckboxDemoContainer } from './demos/signal-forms-checkbox-demo-container';
import { TableCheckboxDemoContainer } from './demos/table-checkbox-demo-container';

@Component({
  selector: 'app-checkbox-page',
  imports: [
    Anatomy,
    CheckboxUsageDemoContainer,
    DescriptionCheckboxDemoContainer,
    GroupCheckboxDemoContainer,
    DisabledCheckboxDemoContainer,
    InvalidCheckboxDemoContainer,
    TableCheckboxDemoContainer,
    IndeterminateCheckboxDemoContainer,
    SignalFormsCheckboxDemoContainer,
    FormCheckboxDemoContainer,
    CustomThemeCheckboxDemoContainer,
    CustomMarkCheckboxDemoContainer,
    RtlCheckboxDemoContainer,
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
        <h1 scHeading>Checkbox</h1>
        <p class="text-muted-foreground">
          A native checkbox that draws itself, in the look of the app&apos;s
          preset.
        </p>
        <app-component-badges path="checkbox" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-checkbox-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A native checkbox input that draws its own box and mark: alone (a
          table row), or in a checkbox field beside its text. A [formField] or
          [(checked)] binds it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A native checkbox: Tab reaches it, Space toggles it; its box and
            mark are its own (CSS), nothing extra for screen readers.
          </li>
          <li>
            Name it by its text: a label round both (label scCheckboxField), or
            a scLabel in a div field; a checkbox with no text (a table row) by
            aria-label.
          </li>
          <li>
            Indeterminate is announced as mixed; a description is read with its
            checkbox; invalid once touched (aria-invalid, from Signal Forms).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-description-checkbox-demo-container />
        <app-group-checkbox-demo-container />
        <app-disabled-checkbox-demo-container />
        <app-invalid-checkbox-demo-container />
        <app-table-checkbox-demo-container />
        <app-indeterminate-checkbox-demo-container />
        <app-signal-forms-checkbox-demo-container />
        <app-form-checkbox-demo-container />
        <app-custom-theme-checkbox-demo-container />
        <app-custom-mark-checkbox-demo-container />
        <app-rtl-checkbox-demo-container />
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
          aria-label="Checkbox parts"
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
export default class CheckboxPage {
  protected readonly anatomy = {
    imports:
      "import { ScCheckbox, ScCheckboxField } from '@semantic-components/ui';",
    markup: [
      '<label scCheckboxField>',
      '  <input scCheckbox [formField]="…" />',
      '  …',
      '</label>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCheckboxField',
      selector: 'label[scCheckboxField], div[scCheckboxField]',
      description:
        "A checkbox beside its text (a label), or its label and description (a div); the preset's label look, normal weight. Optional.",
    },
    {
      name: 'ScCheckbox',
      selector: 'input[scCheckbox]',
      description:
        "A native checkbox in the preset's look, its check or minus drawn by itself: checked (two-way, or a [formField]); indeterminate; invalid once touched.",
    },
  ];
}
