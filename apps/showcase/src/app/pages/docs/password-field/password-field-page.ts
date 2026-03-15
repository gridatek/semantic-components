import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicPasswordFieldDemoContainer from './demos/basic-password-field-demo-container';
import DisabledPasswordFieldDemoContainer from './demos/disabled-password-field-demo-container';
import FullPasswordFieldDemoContainer from './demos/full-password-field-demo-container';
import NewPasswordFieldDemoContainer from './demos/new-password-field-demo-container';
import { PasswordFieldUsageDemoContainer } from './demos/password-field-usage-demo-container';
import RequirementsPasswordFieldDemoContainer from './demos/requirements-password-field-demo-container';
import ShowDefaultPasswordFieldDemoContainer from './demos/show-default-password-field-demo-container';
import StrengthPasswordFieldDemoContainer from './demos/strength-password-field-demo-container';

@Component({
  selector: 'app-password-field-page',
  imports: [
    BasicPasswordFieldDemoContainer,
    ShowDefaultPasswordFieldDemoContainer,
    DisabledPasswordFieldDemoContainer,
    NewPasswordFieldDemoContainer,
    StrengthPasswordFieldDemoContainer,
    RequirementsPasswordFieldDemoContainer,
    FullPasswordFieldDemoContainer,
    PasswordFieldUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Password Field</h1>
        <p class="text-muted-foreground">
          A composable password input component with visibility toggle.
        </p>
        <app-component-badges path="password-field" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-password-field-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-password-field-demo-container />
        <app-show-default-password-field-demo-container />
        <app-disabled-password-field-demo-container />
        <app-new-password-field-demo-container />
        <app-strength-password-field-demo-container />
        <app-requirements-password-field-demo-container />
        <app-full-password-field-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PasswordFieldPage {}
