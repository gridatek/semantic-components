import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ShowDefaultPasswordFieldDemo } from './show-default-password-field-demo';

@Component({
  selector: 'app-show-default-password-field-demo-container',
  imports: [DemoContainer, ShowDefaultPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Show by Default"
      demoUrl="/demos/password-field/show-default-password-field-demo"
      [code]="code"
    >
      <app-show-default-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShowDefaultPasswordFieldDemoContainer {
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
  selector: 'app-show-default-password-field-demo',
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
        [(value)]="apiKey"
        [showByDefault]="true"
        class="space-y-2"
      >
        <label scLabel>API Key</label>
        <div scInputGroup>
          <input scPasswordFieldInput placeholder="sk-..." />
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
export class ShowDefaultPasswordFieldDemo {
  readonly apiKey = signal<string>('sk-1234567890abcdef');
}`;
}
