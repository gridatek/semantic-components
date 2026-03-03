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
} from '@semantic-components/code';
import { ScCopyToClipboard } from '@semantic-components/ui';
import { ScHeading } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicPasswordFieldDemoContainer from './demos/basic-password-field-demo-container';
import DisabledPasswordFieldDemoContainer from './demos/disabled-password-field-demo-container';
import FullPasswordFieldDemoContainer from './demos/full-password-field-demo-container';
import NewPasswordFieldDemoContainer from './demos/new-password-field-demo-container';
import RequirementsPasswordFieldDemoContainer from './demos/requirements-password-field-demo-container';
import ShowDefaultPasswordFieldDemoContainer from './demos/show-default-password-field-demo-container';
import StrengthPasswordFieldDemoContainer from './demos/strength-password-field-demo-container';

@Component({
  selector: 'app-password-field-page',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    BasicPasswordFieldDemoContainer,
    ShowDefaultPasswordFieldDemoContainer,
    DisabledPasswordFieldDemoContainer,
    NewPasswordFieldDemoContainer,
    StrengthPasswordFieldDemoContainer,
    RequirementsPasswordFieldDemoContainer,
    FullPasswordFieldDemoContainer,
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
        <h2 scHeading toc>Usage</h2>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button
              type="button"
              [scCopyToClipboard]="usageCode"
              #copy="scCopyToClipboard"
              class="hover:bg-accent hover:text-accent-foreground inline-flex size-9 items-center justify-center rounded-md"
              aria-label="Copy to clipboard"
            >
              @if (copy.copied()) {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <svg siCopyIcon class="size-4"></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
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
      <label scLabel for="password">Password</label>
      <div scPasswordField [(value)]="password">
        <div scPasswordFieldInputGroup>
          <input
            scPasswordFieldInput
            id="password"
            placeholder="Enter password"
          />
          <button scPasswordFieldToggle></button>
        </div>
      </div>
    </div>
  \`,
})
export class MyComponent {
  readonly password = signal<string>('');
}`;
}
