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
import { CapsLockPasswordFieldDemoContainer } from './demos/caps-lock-password-field-demo-container';
import { DisabledPasswordFieldDemoContainer } from './demos/disabled-password-field-demo-container';
import { FormPasswordFieldDemoContainer } from './demos/form-password-field-demo-container';
import { GeneratePasswordFieldDemoContainer } from './demos/generate-password-field-demo-container';
import { PasswordFieldUsageDemoContainer } from './demos/password-field-usage-demo-container';
import { RequirementsPasswordFieldDemoContainer } from './demos/requirements-password-field-demo-container';
import { RtlPasswordFieldDemoContainer } from './demos/rtl-password-field-demo-container';
import { StrengthPasswordFieldDemoContainer } from './demos/strength-password-field-demo-container';
import { VisiblePasswordFieldDemoContainer } from './demos/visible-password-field-demo-container';

@Component({
  selector: 'app-password-field-page',
  imports: [
    Anatomy,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    PasswordFieldUsageDemoContainer,
    VisiblePasswordFieldDemoContainer,
    DisabledPasswordFieldDemoContainer,
    FormPasswordFieldDemoContainer,
    CapsLockPasswordFieldDemoContainer,
    StrengthPasswordFieldDemoContainer,
    RequirementsPasswordFieldDemoContainer,
    GeneratePasswordFieldDemoContainer,
    RtlPasswordFieldDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Password Field</h1>
        <p class="text-muted-foreground">
          A password field: its label, the input and a button to show or hide
          the password — the caret stays in the input — on your Signal Form. A
          warning while Caps Lock is on, a strength meter, the rules met or not,
          a strong password generated: each a part to add.
        </p>
        <app-component-badges path="password-field" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-password-field-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          The field holds its label, the group (the input and the toggle) and
          its descriptions. A Caps Lock warning, a strength meter, the rules and
          a generate button are parts you add.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-visible-password-field-demo-container />
        <app-disabled-password-field-demo-container />
        <app-form-password-field-demo-container />
        <app-caps-lock-password-field-demo-container />
        <app-strength-password-field-demo-container />
        <app-requirements-password-field-demo-container />
        <app-generate-password-field-demo-container />
        <app-rtl-password-field-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes class, merged over its own (cn: a later class wins).
          The field is a scField underneath: label, descriptions and Signal
          Forms work as in any field.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Password Field parts"
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
export default class PasswordFieldPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScPasswordField, ScPasswordGroup, ScPasswordInput, ScPasswordToggle,',
      '  ScPasswordCapsLock, ScPasswordStrength, ScPasswordStrengthLabel,',
      '  ScPasswordRequirements, ScPasswordRequirement, ScPasswordGenerate,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scPasswordField #password="scPasswordField">',
      '  <label scLabel>…</label>',
      '  <div scPasswordGroup>',
      '    <input scPasswordInput [formField]="…" />',
      '    <button scPasswordToggle>…</button>',
      '  </div>',
      '  <p scPasswordCapsLock>…</p>',
      '  <div scPasswordStrength [score]="…" aria-label="…">',
      '    <span scPasswordStrengthLabel>…</span>',
      '  </div>',
      '  <ul scPasswordRequirements>',
      '    <li scPasswordRequirement [met]="…">…</li>',
      '  </ul>',
      '  <button scPasswordGenerate>…</button>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScPasswordField',
      selector: 'div[scPasswordField]',
      description:
        'The field: [(visible)] (the password shown or not), Caps Lock while it is on. A scField: its label and descriptions tied to the input. exportAs scPasswordField: visible().',
    },
    {
      name: 'ScPasswordGroup',
      selector: 'div[scPasswordGroup]',
      description:
        'The box round the input and the toggle: one border, one focus ring.',
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
        'Your warning, shown while Caps Lock is on and the input has the focus; a polite live region.',
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
        'Your rules, read with the input (aria-describedby); each met or not (met, data-met), the state in words for screen readers.',
    },
    {
      name: 'ScPasswordGenerate',
      selector: 'button[scPasswordGenerate]',
      description:
        "Fills the input with a strong password from the browser's secure randomness: length (16); lower, upper, digits, symbols (each on); look-alikes left out. variant ('outline'), size ('sm'); your icon and name.",
    },
  ];
}
