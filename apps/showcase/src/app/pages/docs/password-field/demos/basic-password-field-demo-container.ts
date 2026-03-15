import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicPasswordFieldDemo } from './basic-password-field-demo';

@Component({
  selector: 'app-basic-password-field-demo-container',
  imports: [DemoContainer, BasicPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/password-field/basic-password-field-demo"
      [code]="code"
    >
      <app-basic-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPasswordFieldDemoContainer {
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
  ScPasswordFieldToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: \`
    <div class="w-full max-w-sm space-y-4">
      <div
        scPasswordField
        #passwordField="scPasswordField"
        [(value)]="password"
        class="space-y-2"
      >
        <label scLabel>Password</label>
        <div scInputGroup>
          <input scPasswordFieldInput placeholder="Enter password" />
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
      </div>

      <p class="text-muted-foreground text-sm">
        Value: {{ password() || '(empty)' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPasswordFieldDemo {
  readonly password = signal<string>('');
}`;
}
