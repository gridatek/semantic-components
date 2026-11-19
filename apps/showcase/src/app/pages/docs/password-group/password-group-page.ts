import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CapsLockPasswordGroupDemoContainer } from './demos/caps-lock-password-group-demo-container';
import { DisabledPasswordGroupDemoContainer } from './demos/disabled-password-group-demo-container';
import { FormPasswordGroupDemoContainer } from './demos/form-password-group-demo-container';
import { GeneratePasswordGroupDemoContainer } from './demos/generate-password-group-demo-container';
import { PasswordGroupUsageDemoContainer } from './demos/password-group-usage-demo-container';
import { RequirementsPasswordGroupDemoContainer } from './demos/requirements-password-group-demo-container';
import { RtlPasswordGroupDemoContainer } from './demos/rtl-password-group-demo-container';
import { StrengthPasswordGroupDemoContainer } from './demos/strength-password-group-demo-container';
import { VisiblePasswordGroupDemoContainer } from './demos/visible-password-group-demo-container';

@Component({
  selector: 'app-password-group-page',
  imports: [
    PartsTable,
    Anatomy,
    PasswordGroupUsageDemoContainer,
    VisiblePasswordGroupDemoContainer,
    DisabledPasswordGroupDemoContainer,
    FormPasswordGroupDemoContainer,
    CapsLockPasswordGroupDemoContainer,
    StrengthPasswordGroupDemoContainer,
    RequirementsPasswordGroupDemoContainer,
    GeneratePasswordGroupDemoContainer,
    RtlPasswordGroupDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Password Group</h1>
        <p class="text-muted-foreground">
          A password input in its box, with a button to show or hide the
          password — the caret stays in the input — and one to generate a strong
          one, on your Signal Form. In a scField, as any input: its label and
          descriptions. A warning while Caps Lock is on, a strength meter, the
          rules met or not: each a part to add.
        </p>
        <app-component-badges path="password-group" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-password-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A scField holds the label, the group (the input and its buttons) and
          the descriptions. The group holds the state (the password shown or
          not); a generate button goes in it, beside the toggle. A Caps Lock
          warning, a strength meter and the rules are parts you add to the
          field.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-visible-password-group-demo-container />
        <app-disabled-password-group-demo-container />
        <app-form-password-group-demo-container />
        <app-caps-lock-password-group-demo-container />
        <app-strength-password-group-demo-container />
        <app-requirements-password-group-demo-container />
        <app-generate-password-group-demo-container />
        <app-rtl-password-group-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes class, merged over its own (cn: a later class wins).
          The label, descriptions and errors are the scField&apos;s it is in, as
          for any input.
        </p>
        <app-parts-table label="Password Group parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PasswordGroupPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScField, ScLabel, ScPasswordGroup, ScPasswordInput, ScPasswordToggle,',
      '  ScPasswordCapsLock, ScPasswordStrength, ScPasswordStrengthLabel,',
      '  ScPasswordRequirements, ScPasswordRequirement, ScPasswordGenerate,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scField>',
      '  <label scLabel>…</label>',
      '  <div scPasswordGroup #password="scPasswordGroup">',
      '    <input scPasswordInput [formField]="…" />',
      '    <button scPasswordGenerate>…</button>',
      '    <button scPasswordToggle>…</button>',
      '  </div>',
      '  <p scPasswordCapsLock>…</p>',
      '  <div scPasswordStrength [score]="…" aria-label="…">',
      '    <span scPasswordStrengthLabel>…</span>',
      '  </div>',
      '  <ul scPasswordRequirements>',
      '    <li scPasswordRequirement [met]="…">…</li>',
      '  </ul>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScPasswordGroup',
      selector: 'div[scPasswordGroup]',
      description:
        'The box round the input and its buttons: one border, one focus ring. Holds [(visible)] (the password shown or not). exportAs scPasswordGroup: visible(), toggle().',
    },
    {
      name: 'ScPasswordInput',
      selector: 'input[scPasswordInput]',
      description:
        "The password: hidden, or text while visible; never spellchecked, capitalised or corrected. autocomplete ('current-password', 'new-password', 'off'), ignorePasswordManagers; its state from your Signal Form ([formField]).",
    },
    {
      name: 'ScPasswordToggle',
      selector: 'button[scPasswordToggle]',
      description:
        "Shows or hides the password; a click leaves the caret in the input. Its icon and name follow the state (Show / Hide password) — not aria-pressed. variant ('ghost'), size ('icon-sm').",
    },
    {
      name: 'ScPasswordCapsLock',
      selector: '[scPasswordCapsLock]',
      description:
        'Your warning, shown while Caps Lock is on and the field’s input has the focus — anywhere in the scField; a polite live region.',
    },
    {
      name: 'ScPasswordStrength, ScPasswordStrengthLabel',
      selector: 'div[scPasswordStrength], [scPasswordStrengthLabel]',
      description:
        'score (0–4) as four segments, a meter: name it; the label is its value in your words (aria-valuetext).',
    },
    {
      name: 'ScPasswordRequirements, ScPasswordRequirement',
      selector: 'ul[scPasswordRequirements], li[scPasswordRequirement]',
      description:
        'Your rules, in the scField: read with its input (aria-describedby); each met or not (met, data-met), the state in words for screen readers.',
    },
    {
      name: 'ScPasswordGenerate',
      selector: 'button[scPasswordGenerate]',
      description:
        "Fills the input with a strong password from the browser's secure randomness: length (16); lower, upper, digits, symbols (each on); look-alikes left out — and shows it. In the group, beside the toggle: variant ('ghost'), size ('icon-sm'); your icon and its name.",
    },
  ];
}
