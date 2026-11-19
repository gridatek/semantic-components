import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
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
    PartsTable,
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
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Textarea</h1>
        <p class="text-muted-foreground">
          A text field of several lines, growing with its text. In the look of
          the app&apos;s style.
        </p>
        <app-component-badges path="textarea" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-textarea-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A directive on your textarea. In a field it is named, described and
          marked invalid by the field; a [formField] for Signal Forms.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
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
        <h2 scTypeset appToc>Examples</h2>
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
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Textarea parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TextareaPage {
  private readonly anatomy = {
    imports: "import { ScTextarea } from '@semantic-components/ui';",
    markup: '<textarea scTextarea [formField]="…"></textarea>',
  };

  private readonly parts = [
    {
      name: 'ScTextarea',
      selector: 'textarea[scTextarea]',
      description:
        "A textarea in the style's look; in a field, its id, description and invalid state from the field; a [formField]; disabled.",
    },
  ];
}
