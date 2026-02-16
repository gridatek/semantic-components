import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NewPasswordFieldDemo } from './new-password-field-demo';

@Component({
  selector: 'app-new-password-field-demo-container',
  imports: [DemoContainer, NewPasswordFieldDemo],
  template: `
    <app-demo-container
      title="New Password"
      demoUrl="/demos/password-field/new-password-field-demo"
      [code]="code"
    >
      <app-new-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPasswordField,
  ScPasswordFieldInputGroup,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-new-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: \`
    <div class="space-y-4">
      <div scPasswordField [(value)]="newPassword" class="space-y-2">
        <label scLabel>New Password</label>
        <div scPasswordFieldInputGroup>
          <input
            scPasswordFieldInput
            placeholder="Enter new password"
            autocomplete="new-password"
          />
          <button scPasswordFieldToggle></button>
        </div>
        <p class="text-sm text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>

      <div scPasswordField [(value)]="confirmPassword" class="space-y-2">
        <label scLabel>Confirm Password</label>
        <div scPasswordFieldInputGroup>
          <input
            scPasswordFieldInput
            placeholder="Confirm new password"
            autocomplete="new-password"
          />
          <button scPasswordFieldToggle></button>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPasswordFieldDemo {
  readonly newPassword = signal<string>('');
  readonly confirmPassword = signal<string>('');
}`;
}
