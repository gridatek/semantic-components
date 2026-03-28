import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicPasswordDemoContainer from './demos/basic-password-demo-container';
import DisabledPasswordDemoContainer from './demos/disabled-password-demo-container';
import NewPasswordDemoContainer from './demos/new-password-demo-container';
import { PasswordUsageDemoContainer } from './demos/password-usage-demo-container';
import ShowDefaultPasswordDemoContainer from './demos/show-default-password-demo-container';

@Component({
  selector: 'app-password-page',
  imports: [
    BasicPasswordDemoContainer,
    ShowDefaultPasswordDemoContainer,
    DisabledPasswordDemoContainer,
    NewPasswordDemoContainer,
    PasswordUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Password</h1>
        <p class="text-muted-foreground">
          A composable password input component with visibility toggle.
        </p>
        <app-component-badges path="password" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-password-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-password-demo-container />
        <app-show-default-password-demo-container />
        <app-disabled-password-demo-container />
        <app-new-password-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PasswordPage {}
