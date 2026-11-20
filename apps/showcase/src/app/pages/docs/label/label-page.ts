import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ChoiceCardLabelDemoContainer } from './demos/choice-card-label-demo-container';
import { DescriptionLabelDemoContainer } from './demos/description-label-demo-container';
import { FieldLabelDemoContainer } from './demos/field-label-demo-container';
import { LabelTextLabelDemoContainer } from './demos/label-text-label-demo-container';
import { LabelUsageDemoContainer } from './demos/label-usage-demo-container';
import { RtlLabelDemoContainer } from './demos/rtl-label-demo-container';

@Component({
  selector: 'app-label-page',
  imports: [
    PartsTable,
    Anatomy,
    LabelUsageDemoContainer,
    FieldLabelDemoContainer,
    DescriptionLabelDemoContainer,
    ChoiceCardLabelDemoContainer,
    LabelTextLabelDemoContainer,
    RtlLabelDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Label</h1>
        <p class="text-muted-foreground">
          A control&apos;s name, shown beside it. In the look of the app&apos;s
          style.
        </p>
        <app-component-badges path="label" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-label-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A directive on your label; its text is yours. In a field it names the
          field&apos;s control by itself. It can also hold a field as its child
          (a horizontal scField with its control, title and description): a
          choice card, the whole card picks — bordered, tinted when checked.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A real label: a press on it focuses or toggles its control. In a
            field it is linked (for); around a control, by wrapping it.
          </li>
          <li>
            A field&apos;s group of controls (radios, checkboxes) is named by
            its label&apos;s id (&lt;field id&gt;-label), not by for.
          </li>
          <li>
            Text inside another label (a switch&apos;s): scLabelText, so there
            is never a label in a label.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-field-label-demo-container />
        <app-description-label-demo-container />
        <app-choice-card-label-demo-container />
        <app-label-text-label-demo-container />
        <app-rtl-label-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Label parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class LabelPage {
  private readonly anatomy = {
    imports:
      "import { ScField, ScFieldContentWrapper, ScFieldDescription, ScFieldTitle, ScLabel, ScLabelText } from '@semantic-components/ui';",
    markup: [
      '<!-- Beside its control, or in a field -->',
      '<label scLabel>…</label>',
      '',
      '<!-- A field as its child: a choice card, the whole card clicks -->',
      '<label scLabel>',
      '  <div scField orientation="horizontal">',
      '    <div scFieldContentWrapper>',
      '      <div scFieldTitle>…</div>',
      '      <p scFieldDescription>…</p>',
      '    </div>',
      '    <input scCheckbox />',
      '  </div>',
      '</label>',
      '',
      '<!-- Its text inside another label (a switch field’s) -->',
      '<label …>',
      '  <p scLabelText>…</p>',
      '</label>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScLabel',
      selector: 'label[scLabel]',
      description:
        "A label in the style's look; in a field (or around one: a choice card) the field's look too. for, id: from the field when it is in one.",
    },
    {
      name: 'ScLabelText',
      selector: '[scLabelText]',
      description:
        "A label's text inside another label (a switch's, a choice's).",
    },
  ];
}
