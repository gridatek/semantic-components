import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
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
import { ReadOnlyRadioGroupDemoContainer } from './demos/read-only-radio-group-demo-container';
import { RtlRadioGroupDemoContainer } from './demos/rtl-radio-group-demo-container';

@Component({
  selector: 'app-radio-group-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    RadioGroupUsageDemoContainer,
    DescriptionRadioGroupDemoContainer,
    ChoiceCardRadioGroupDemoContainer,
    FieldsetRadioGroupDemoContainer,
    DisabledRadioGroupDemoContainer,
    ReadOnlyRadioGroupDemoContainer,
    InvalidRadioGroupDemoContainer,
    HorizontalRadioGroupDemoContainer,
    FormRadioGroupDemoContainer,
    CustomThemeRadioGroupDemoContainer,
    RtlRadioGroupDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Radio Group</h1>
        <p class="text-muted-foreground">
          One choice among several, as native radios. In the look of the
          app&apos;s style.
        </p>
        <app-component-badges path="radio-group" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-radio-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Native radio inputs that draw their own circle and dot, each with its
          value, in a group that holds the choice — a [formField] or [(value)]
          on the group. Each radio is in a horizontal field beside its text —
          the field is the label, a label is inside the field, or the field is
          inside a label (a choice card: the whole card clicks).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Native radios: one <kbd scKbd>Tab</kbd> stop for the group, the
            arrows move the choice (mirrored right to left),
            <kbd scKbd>Space</kbd> picks.
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
        <h2 scTypeset appToc>Why the group holds the choice</h2>
        <p>
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
        <h2 scTypeset appToc>Examples</h2>
        <app-description-radio-group-demo-container />
        <app-choice-card-radio-group-demo-container />
        <app-fieldset-radio-group-demo-container />
        <app-disabled-radio-group-demo-container />
        <app-read-only-radio-group-demo-container />
        <app-invalid-radio-group-demo-container />
        <app-horizontal-radio-group-demo-container />
        <app-form-radio-group-demo-container />
        <app-custom-theme-radio-group-demo-container />
        <app-rtl-radio-group-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Radio Group parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RadioGroupPage {
  private readonly anatomy = {
    imports:
      "import { ScField, ScFieldContentWrapper, ScFieldDescription, ScFieldTitle, ScLabel, ScRadio, ScRadioGroup } from '@semantic-components/ui';",
    markup: [
      '<div scRadioGroup [formField]="…" aria-label="…">',
      '  <!-- The field is the label: the radio and its text -->',
      '  <label scField orientation="horizontal">',
      '    <input scRadio value="…" />',
      '    …',
      '  </label>',
      '',
      '  <!-- A label inside the field, with a description -->',
      '  <div scField orientation="horizontal">',
      '    <input scRadio value="…" />',
      '    <label scLabel>…</label>',
      '    <p scFieldDescription>…</p>',
      '  </div>',
      '',
      '  <!-- The field inside a label: a choice card, the whole card clicks -->',
      '  <label scLabel>',
      '    <div scField orientation="horizontal">',
      '      <input scRadio value="…" />',
      '      <div scFieldContentWrapper>',
      '        <div scFieldTitle>…</div>',
      '        <p scFieldDescription>…</p>',
      '      </div>',
      '    </div>',
      '  </label>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScRadioGroup',
      selector: 'div[scRadioGroup]',
      description:
        "role=\"radiogroup\"; the choice: value (a [formField], or two-way); orientation ('vertical', 'horizontal'); disabled; readonly (aria-readonly: the choice takes focus, the arrows move it, but it doesn't change). Checks the radio whose value matches, names its radios alike; invalid once touched.",
    },
    {
      name: 'ScRadio',
      selector: 'input[scRadio]',
      description:
        "A native radio (its own type) in the style's look, its dot when checked: value (its option, any type); disabled.",
    },
  ];
}
