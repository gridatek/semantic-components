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
import { CheckboxGroupUsageDemoContainer } from './demos/checkbox-group-usage-demo-container';
import { DisabledCheckboxGroupDemoContainer } from './demos/disabled-checkbox-group-demo-container';
import { FormCheckboxGroupDemoContainer } from './demos/form-checkbox-group-demo-container';
import { NestedParentCheckboxGroupDemoContainer } from './demos/nested-parent-checkbox-group-demo-container';
import { ParentCheckboxGroupDemoContainer } from './demos/parent-checkbox-group-demo-container';
import { RtlCheckboxGroupDemoContainer } from './demos/rtl-checkbox-group-demo-container';

@Component({
  selector: 'app-checkbox-group-page',
  imports: [
    Anatomy,
    CheckboxGroupUsageDemoContainer,
    ParentCheckboxGroupDemoContainer,
    NestedParentCheckboxGroupDemoContainer,
    FormCheckboxGroupDemoContainer,
    DisabledCheckboxGroupDemoContainer,
    RtlCheckboxGroupDemoContainer,
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
        <h1 scHeading>Checkbox Group</h1>
        <p class="text-muted-foreground">
          Checkboxes sharing one value — the ticked ones — with an optional
          parent checkbox that ticks them all.
        </p>
        <app-component-badges path="checkbox-group" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-checkbox-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A group round your checkboxes, each with its value; the group holds
          the ticked ones — a [formField] or [(value)] on the group. A parent
          checkbox ticks all of allValues.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Native checkboxes: each a Tab stop, Space ticks it; a parent is
            announced as mixed when only some are ticked.
          </li>
          <li>
            Name the group: a fieldset&apos;s legend round it, aria-labelledby
            or aria-label; each checkbox by its label.
          </li>
          <li>Invalid once touched (aria-invalid on its checkboxes).</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-parent-checkbox-group-demo-container />
        <app-nested-parent-checkbox-group-demo-container />
        <app-form-checkbox-group-demo-container />
        <app-disabled-checkbox-group-demo-container />
        <app-rtl-checkbox-group-demo-container />
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
          aria-label="Checkbox Group parts"
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
export default class CheckboxGroupPage {
  protected readonly anatomy = {
    imports:
      "import { ScCheckbox, ScCheckboxGroup, ScField } from '@semantic-components/ui';",
    markup: [
      '<div scCheckboxGroup [formField]="…" [allValues]="…" aria-label="…">',
      '  <label scField orientation="horizontal"><input scCheckbox parent /> …</label>',
      '  <label scField orientation="horizontal"><input scCheckbox value="…" /> …</label>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCheckboxGroup',
      selector: 'div[scCheckboxGroup]',
      description:
        'role="group"; value: the ticked checkboxes\' values, an array (a [formField], or two-way); allValues, for a parent checkbox; disabled. Invalid once touched (focus leaving it).',
    },
    {
      name: 'ScCheckbox',
      selector: 'input[scCheckbox]',
      description:
        "In a group: value, its option (any type), ticked in the group's value; or parent, ticking all of allValues or none (mixed when only some are).",
    },
  ];
}
