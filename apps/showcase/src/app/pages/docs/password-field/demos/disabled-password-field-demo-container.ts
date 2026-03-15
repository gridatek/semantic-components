import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledPasswordFieldDemo } from './disabled-password-field-demo';

@Component({
  selector: 'app-disabled-password-field-demo-container',
  imports: [DemoContainer, DisabledPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/password-field/disabled-password-field-demo"
      [code]="code"
    >
      <app-disabled-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisabledPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
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
  selector: 'app-disabled-password-field-demo',
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
    <div class="w-full max-w-sm">
      <div
        scPasswordField
        #passwordField="scPasswordField"
        [value]="'********'"
        [disabled]="true"
        class="space-y-2"
      >
        <label scLabel>Password (Disabled)</label>
        <div scInputGroup>
          <input scPasswordFieldInput />
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPasswordFieldDemo {}`;
}
