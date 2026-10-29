import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicPasswordFieldDemoContainer } from './demos/basic-password-field-demo-container';
import { CapsLockPasswordFieldDemoContainer } from './demos/caps-lock-password-field-demo-container';
import { DisabledPasswordFieldDemoContainer } from './demos/disabled-password-field-demo-container';
import { FormPasswordFieldDemoContainer } from './demos/form-password-field-demo-container';
import { GeneratePasswordFieldDemoContainer } from './demos/generate-password-field-demo-container';
import { RequirementsPasswordFieldDemoContainer } from './demos/requirements-password-field-demo-container';
import { RtlPasswordFieldDemoContainer } from './demos/rtl-password-field-demo-container';
import { StrengthPasswordFieldDemoContainer } from './demos/strength-password-field-demo-container';
import { VisiblePasswordFieldDemoContainer } from './demos/visible-password-field-demo-container';

@Component({
  selector: 'app-password-field-page',
  imports: [
    BasicPasswordFieldDemoContainer,
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

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-password-field-demo-container />
        <app-visible-password-field-demo-container />
        <app-disabled-password-field-demo-container />
        <app-form-password-field-demo-container />
        <app-caps-lock-password-field-demo-container />
        <app-strength-password-field-demo-container />
        <app-requirements-password-field-demo-container />
        <app-generate-password-field-demo-container />
        <app-rtl-password-field-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PasswordFieldPage {}
