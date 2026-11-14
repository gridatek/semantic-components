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
import { CheckboxFieldDemoContainer } from './demos/checkbox-field-demo-container';
import { ChoiceCardFieldDemoContainer } from './demos/choice-card-field-demo-container';
import { ErrorFieldDemoContainer } from './demos/error-field-demo-container';
import { FieldUsageDemoContainer } from './demos/field-usage-demo-container';
import { FieldsetFieldDemoContainer } from './demos/fieldset-field-demo-container';
import { GroupFieldDemoContainer } from './demos/group-field-demo-container';
import { InputFieldDemoContainer } from './demos/input-field-demo-container';
import { RadioFieldDemoContainer } from './demos/radio-field-demo-container';
import { ResponsiveFieldDemoContainer } from './demos/responsive-field-demo-container';
import { RtlFieldDemoContainer } from './demos/rtl-field-demo-container';
import { SelectFieldDemoContainer } from './demos/select-field-demo-container';
import { SeparatorFieldDemoContainer } from './demos/separator-field-demo-container';
import { SliderFieldDemoContainer } from './demos/slider-field-demo-container';
import { SwitchFieldDemoContainer } from './demos/switch-field-demo-container';
import { TextareaFieldDemoContainer } from './demos/textarea-field-demo-container';

@Component({
  selector: 'app-field-page',
  imports: [
    Anatomy,
    FieldUsageDemoContainer,
    InputFieldDemoContainer,
    TextareaFieldDemoContainer,
    SelectFieldDemoContainer,
    SliderFieldDemoContainer,
    FieldsetFieldDemoContainer,
    CheckboxFieldDemoContainer,
    RadioFieldDemoContainer,
    SwitchFieldDemoContainer,
    ChoiceCardFieldDemoContainer,
    GroupFieldDemoContainer,
    ResponsiveFieldDemoContainer,
    ErrorFieldDemoContainer,
    SeparatorFieldDemoContainer,
    RtlFieldDemoContainer,
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
        <h1 scHeading>Field</h1>
        <p class="text-muted-foreground">
          A control with its label, description and errors; fields in groups and
          fieldsets. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="field" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-field-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element. A field links its label,
          its description and its errors to its control by itself. Horizontal,
          around a checkbox, a radio or a switch, it lays them out itself: the
          control at the start (written first) or the end (written last), the
          description under the label. A label can be the field (the whole line
          clicks) or hold one (a choice card).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A field names its control by its label (for) and describes it by its
            description and errors (aria-describedby); invalid, the control is
            aria-invalid.
          </li>
          <li>
            A fieldset groups fields under its legend; a field of several
            controls is a group (role=&quot;group&quot;), named by its label.
          </li>
          <li>
            Errors are shown once the control is touched, read as they appear
            (role=&quot;alert&quot;).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-input-field-demo-container />
        <app-textarea-field-demo-container />
        <app-select-field-demo-container />
        <app-slider-field-demo-container />
        <app-fieldset-field-demo-container />
        <app-checkbox-field-demo-container />
        <app-radio-field-demo-container />
        <app-switch-field-demo-container />
        <app-choice-card-field-demo-container />
        <app-group-field-demo-container />
        <app-responsive-field-demo-container />
        <app-error-field-demo-container />
        <app-separator-field-demo-container />
        <app-rtl-field-demo-container />
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
          aria-label="Field parts"
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
export default class FieldPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScFieldset, ScLegend, ScFieldGroup, ScField, ScFieldContentWrapper, ScFieldTitle,',
      '  ScFieldDescription, ScFieldErrors, ScFieldSeparator, ScLabel,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<fieldset scFieldset>',
      '  <legend scLegend>…</legend>',
      '  <p scFieldDescription>…</p>',
      '  <div scFieldGroup>',
      '    <div scField orientation="…">',
      '      <label scLabel>…</label>',
      '      <input scInput … />',
      '      <p scFieldDescription>…</p>',
      '      <div scFieldErrors></div>',
      '    </div>',
      '    <div scFieldSeparator>…</div>',
      '  </div>',
      '</fieldset>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScFieldset, ScLegend',
      selector: 'fieldset[scFieldset], legend[scLegend]',
      description: "Fields under a legend; variant ('legend', 'label').",
    },
    {
      name: 'ScFieldGroup',
      selector: '[scFieldGroup]',
      description: 'Fields stacked; the container a responsive field reads.',
    },
    {
      name: 'ScField',
      selector: 'div[scField], label[scField]',
      description:
        "A control with its label, description and errors, linked; orientation ('vertical', 'horizontal', 'responsive'; horizontal around a checkbox, radio or switch, a grid: the control at the start or the end, the description under the label); on a label, the label's text, dimmed with a disabled control; data-invalid, data-disabled.",
    },
    {
      name: 'ScFieldContentWrapper, ScFieldTitle',
      selector: '[scFieldContentWrapper], [scFieldTitle]',
      description:
        'A label (or title) and its description together, beside a control.',
    },
    {
      name: 'ScFieldDescription, ScFieldErrors',
      selector: '[scFieldDescription], [scFieldErrors]',
      description:
        'Read with the control (aria-describedby); its errors once it is touched, from Signal Forms.',
    },
    {
      name: 'ScFieldSeparator',
      selector: '[scFieldSeparator]',
      description: 'A line between fields, with optional text on it.',
    },
  ];
}
