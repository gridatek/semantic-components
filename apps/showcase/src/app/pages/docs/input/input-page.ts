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
import { BadgeInputDemoContainer } from './demos/badge-input-demo-container';
import { BasicInputDemoContainer } from './demos/basic-input-demo-container';
import { ControlGroupInputDemoContainer } from './demos/control-group-input-demo-container';
import { DisabledInputDemoContainer } from './demos/disabled-input-demo-container';
import { FieldGroupInputDemoContainer } from './demos/field-group-input-demo-container';
import { FieldInputDemoContainer } from './demos/field-input-demo-container';
import { FileInputDemoContainer } from './demos/file-input-demo-container';
import { FormInputDemoContainer } from './demos/form-input-demo-container';
import { GridInputDemoContainer } from './demos/grid-input-demo-container';
import { InlineInputDemoContainer } from './demos/inline-input-demo-container';
import { InputGroupInputDemoContainer } from './demos/input-group-input-demo-container';
import { InputUsageDemoContainer } from './demos/input-usage-demo-container';
import { InvalidInputDemoContainer } from './demos/invalid-input-demo-container';
import { RequiredInputDemoContainer } from './demos/required-input-demo-container';
import { RtlInputDemoContainer } from './demos/rtl-input-demo-container';

@Component({
  selector: 'app-input-page',
  imports: [
    Anatomy,
    InputUsageDemoContainer,
    BasicInputDemoContainer,
    FieldInputDemoContainer,
    FieldGroupInputDemoContainer,
    DisabledInputDemoContainer,
    InvalidInputDemoContainer,
    FileInputDemoContainer,
    InlineInputDemoContainer,
    GridInputDemoContainer,
    RequiredInputDemoContainer,
    BadgeInputDemoContainer,
    InputGroupInputDemoContainer,
    ControlGroupInputDemoContainer,
    FormInputDemoContainer,
    RtlInputDemoContainer,
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
        <h1 scHeading>Input</h1>
        <p class="text-muted-foreground">
          A native text field, in the look of the app&apos;s preset. In a Field
          it takes the field&apos;s label and description; with Signal Forms it
          shows itself invalid once touched. For a longer text, use a Textarea;
          for a choice among options, a Select.
        </p>
        <app-component-badges path="input" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One part, on a native
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">input</code>. It
          needs a name: a label — in a Field, the field links them — or
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">aria-label</code
          >; in development it warns without one. A placeholder is not a name.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Forms</h2>
        <p class="text-muted-foreground">
          With
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">[formField]</code
          >, the form owns its state: its constraints (
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">required</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">disabled</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">email</code>…)
          are declared in the form&apos;s schema, not on the input, and the
          input is marked invalid (
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >aria-invalid</code
          >) once the field is touched — the Invalid and Required examples.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-input-demo-container />
        <app-field-input-demo-container />
        <app-field-group-input-demo-container />
        <app-disabled-input-demo-container />
        <app-invalid-input-demo-container />
        <app-file-input-demo-container />
        <app-inline-input-demo-container />
        <app-grid-input-demo-container />
        <app-required-input-demo-container />
        <app-badge-input-demo-container />
        <app-input-group-input-demo-container />
        <app-control-group-input-demo-container />
        <app-form-input-demo-container />
        <app-rtl-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">ScInput</code>
          is a directive on a native
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >input[scInput]</code
          >: its classes are the app&apos;s preset&apos;s (
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >provideScConfig(&#123; preset &#125;)</code
          >, nova by default). Every native attribute (
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">type</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">placeholder</code
          >,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >autocomplete</code
          >…) is the input&apos;s own.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScInput inputs"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Input</th>
                <th scTableHeaderCell>Type</th>
                <th scTableHeaderCell>Default</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (input of inputs; track input.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.name }}</code>
                  </td>
                  <td scTableCell class="whitespace-normal">
                    <code class="font-mono text-sm">{{ input.type }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.default }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ input.description }}
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
export default class InputPage {
  protected readonly anatomy = {
    imports: "import { ScInput } from '@semantic-components/ui';",
    markup: [
      '<div scField>',
      '  <label scLabel>Label</label>',
      '  <input scInput />',
      '  <p scFieldDescription>Description</p>',
      '</div>',
    ].join('\n'),
  };

  protected readonly inputs = [
    {
      name: 'id',
      type: 'string',
      default: 'the field’s, or generated',
      description: 'In a field, the field’s id: its label points to it.',
    },
    {
      name: 'aria-describedby',
      type: 'string',
      default: 'the field’s description',
      description: 'In a field, its description and errors.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'Without a form. With [formField], declare disabled() in the schema.',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Classes merged over the preset (cn: a later class wins).',
    },
  ];
}
