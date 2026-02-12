import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
  ScCopyButton,
} from '@semantic-components/ui-lab';
import BasicPasswordFieldDemoContainer from './demos/basic-password-field-demo-container';
import ShowDefaultPasswordFieldDemoContainer from './demos/show-default-password-field-demo-container';
import DisabledPasswordFieldDemoContainer from './demos/disabled-password-field-demo-container';
import NewPasswordFieldDemoContainer from './demos/new-password-field-demo-container';
import StrengthPasswordFieldDemoContainer from './demos/strength-password-field-demo-container';
import RequirementsPasswordFieldDemoContainer from './demos/requirements-password-field-demo-container';
import FullPasswordFieldDemoContainer from './demos/full-password-field-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-password-field-page',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyButton,
    BasicPasswordFieldDemoContainer,
    ShowDefaultPasswordFieldDemoContainer,
    DisabledPasswordFieldDemoContainer,
    NewPasswordFieldDemoContainer,
    StrengthPasswordFieldDemoContainer,
    RequirementsPasswordFieldDemoContainer,
    FullPasswordFieldDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Password Field</h1>
        <p class="text-muted-foreground">
          A composable password input component with visibility toggle.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>angular-ts</span>
            <button sc-copy-button [value]="usageCode"></button>
          </div>
          <div
            sc-code-viewer-content
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
export default class PasswordFieldPage {
  readonly componentStatus = COMPONENTS.find(
    (c) => c.path === 'password-field',
  )!.status;
  readonly usageCode = `import {
  ScPasswordField,
  ScPasswordFieldInputGroup,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
    TocHeading,
  ],
  template: \`
    <div class="space-y-2">
      <label sc-label for="password">Password</label>
      <div sc-password-field [(value)]="password">
        <div sc-password-field-input-group>
          <input
            sc-password-field-input
            id="password"
            placeholder="Enter password"
          />
          <button sc-password-field-toggle></button>
        </div>
      </div>
    </div>
  \`,
})
export class MyComponent {
  readonly password = signal<string>('');
}`;
}
