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
import { CheckboxNextUsageDemoContainer } from './demos/checkbox-next-usage-demo-container';
import { CustomThemeCheckboxNextDemoContainer } from './demos/custom-theme-checkbox-next-demo-container';
import { DescriptionCheckboxNextDemoContainer } from './demos/description-checkbox-next-demo-container';
import { DisabledCheckboxNextDemoContainer } from './demos/disabled-checkbox-next-demo-container';
import { FormCheckboxNextDemoContainer } from './demos/form-checkbox-next-demo-container';
import { GroupCheckboxNextDemoContainer } from './demos/group-checkbox-next-demo-container';
import { IndeterminateCheckboxNextDemoContainer } from './demos/indeterminate-checkbox-next-demo-container';
import { InvalidCheckboxNextDemoContainer } from './demos/invalid-checkbox-next-demo-container';
import { RtlCheckboxNextDemoContainer } from './demos/rtl-checkbox-next-demo-container';
import { SignalFormsCheckboxNextDemoContainer } from './demos/signal-forms-checkbox-next-demo-container';
import { TableCheckboxNextDemoContainer } from './demos/table-checkbox-next-demo-container';

@Component({
  selector: 'app-checkbox-next-page',
  imports: [
    Anatomy,
    CheckboxNextUsageDemoContainer,
    DescriptionCheckboxNextDemoContainer,
    GroupCheckboxNextDemoContainer,
    DisabledCheckboxNextDemoContainer,
    InvalidCheckboxNextDemoContainer,
    TableCheckboxNextDemoContainer,
    IndeterminateCheckboxNextDemoContainer,
    SignalFormsCheckboxNextDemoContainer,
    FormCheckboxNextDemoContainer,
    CustomThemeCheckboxNextDemoContainer,
    RtlCheckboxNextDemoContainer,
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
        <h1 scHeading>Checkbox Next</h1>
        <p class="text-muted-foreground">
          A native checkbox that draws itself, in the look of the app&apos;s
          preset.
        </p>
        <app-component-badges path="checkbox-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-checkbox-next-usage-demo-container />
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
            Name it by its text: a label round both (label scCheckboxNextField),
            or a scLabel in a div field; a checkbox with no text (a table row)
            by aria-label.
          </li>
          <li>
            Indeterminate is announced as mixed; a description is read with its
            checkbox; invalid once touched (aria-invalid, from Signal Forms).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-description-checkbox-next-demo-container />
        <app-group-checkbox-next-demo-container />
        <app-disabled-checkbox-next-demo-container />
        <app-invalid-checkbox-next-demo-container />
        <app-table-checkbox-next-demo-container />
        <app-indeterminate-checkbox-next-demo-container />
        <app-signal-forms-checkbox-next-demo-container />
        <app-form-checkbox-next-demo-container />
        <app-custom-theme-checkbox-next-demo-container />
        <app-rtl-checkbox-next-demo-container />
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
          aria-label="Checkbox Next parts"
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
export default class CheckboxNextPage {
  protected readonly anatomy = {
    imports:
      "import { ScCheckboxNext, ScCheckboxNextField } from '@semantic-components/ui';",
    markup: [
      '<label scCheckboxNextField>',
      '  <input type="checkbox" scCheckboxNext [formField]="…" />',
      '  …',
      '</label>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCheckboxNextField',
      selector: 'label[scCheckboxNextField], div[scCheckboxNextField]',
      description:
        "A checkbox beside its text (a label), or its label and description (a div); the preset's label look, normal weight. Optional.",
    },
    {
      name: 'ScCheckboxNext',
      selector: 'input[type="checkbox"][scCheckboxNext]',
      description:
        "A native checkbox in the preset's look, its check or minus drawn by itself: checked (two-way, or a [formField]); indeterminate; invalid once touched.",
    },
  ];
}
