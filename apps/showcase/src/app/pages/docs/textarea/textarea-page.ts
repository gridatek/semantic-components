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
import { ButtonTextareaDemoContainer } from './demos/button-textarea-demo-container';
import { DisabledTextareaDemoContainer } from './demos/disabled-textarea-demo-container';
import { FieldTextareaDemoContainer } from './demos/field-textarea-demo-container';
import { FormTextareaDemoContainer } from './demos/form-textarea-demo-container';
import { InvalidTextareaDemoContainer } from './demos/invalid-textarea-demo-container';
import { MaxlengthTextareaDemoContainer } from './demos/maxlength-textarea-demo-container';
import { RowsTextareaDemoContainer } from './demos/rows-textarea-demo-container';
import { RtlTextareaDemoContainer } from './demos/rtl-textarea-demo-container';
import { TextareaUsageDemoContainer } from './demos/textarea-usage-demo-container';

@Component({
  selector: 'app-textarea-page',
  imports: [
    Anatomy,
    TextareaUsageDemoContainer,
    FieldTextareaDemoContainer,
    DisabledTextareaDemoContainer,
    InvalidTextareaDemoContainer,
    ButtonTextareaDemoContainer,
    FormTextareaDemoContainer,
    MaxlengthTextareaDemoContainer,
    RowsTextareaDemoContainer,
    RtlTextareaDemoContainer,
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
        <h1 scHeading>Textarea</h1>
        <p class="text-muted-foreground">
          A text field of several lines, growing with its text. In the look of
          the app&apos;s preset.
        </p>
        <app-component-badges path="textarea" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-textarea-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A directive on your textarea. In a field it is named, described and
          marked invalid by the field; a [formField] for Signal Forms.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Name it: a label (in a field, linked by itself) or aria-label.
          </li>
          <li>
            In a field, its description and errors are read with it
            (aria-describedby); invalid once touched (aria-invalid).
          </li>
          <li>
            It grows with its text (field-sizing: content), from its rows or
            min-height.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-field-textarea-demo-container />
        <app-disabled-textarea-demo-container />
        <app-invalid-textarea-demo-container />
        <app-button-textarea-demo-container />
        <app-form-textarea-demo-container />
        <app-maxlength-textarea-demo-container />
        <app-rows-textarea-demo-container />
        <app-rtl-textarea-demo-container />
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
          aria-label="Textarea parts"
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
export default class TextareaPage {
  protected readonly anatomy = {
    imports: "import { ScTextarea } from '@semantic-components/ui';",
    markup: '<textarea scTextarea [formField]="…"></textarea>',
  };

  protected readonly parts = [
    {
      name: 'ScTextarea',
      selector: 'textarea[scTextarea]',
      description:
        "A textarea in the preset's look; in a field, its id, description and invalid state from the field; a [formField]; disabled.",
    },
  ];
}
