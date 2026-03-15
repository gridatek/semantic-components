import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StrengthPasswordFieldDemo } from './strength-password-field-demo';

@Component({
  selector: 'app-strength-password-field-demo-container',
  imports: [DemoContainer, StrengthPasswordFieldDemo],
  template: `
    <app-demo-container
      title="With Strength Indicator"
      demoUrl="/demos/password-field/strength-password-field-demo"
      [code]="code"
    >
      <app-strength-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StrengthPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldStrength,
  ScPasswordFieldToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-strength-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScPasswordFieldStrength,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div
        scPasswordField
        #passwordField="scPasswordField"
        [(value)]="password"
        class="space-y-2"
      >
        <label scLabel>Password</label>
        <div scInputGroup>
          <input
            scPasswordFieldInput
            placeholder="Enter password"
            autocomplete="new-password"
          />
          <div scInputGroupAddon align="inline-end">
            <button scPasswordFieldToggle>
              @if (passwordField.visible()) {
                <svg siEyeOffIcon></svg>
              } @else {
                <svg siEyeIcon></svg>
              }
              <span class="sr-only">Toggle password visibility</span>
            </button>
          </div>
        </div>
        <div scPasswordFieldStrength></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthPasswordFieldDemo {
  readonly password = signal<string>('');
}`;
}
