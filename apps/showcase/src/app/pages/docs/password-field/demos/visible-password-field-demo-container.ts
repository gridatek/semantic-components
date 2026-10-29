import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VisiblePasswordFieldDemo } from './visible-password-field-demo';

@Component({
  selector: 'app-visible-password-field-demo-container',
  imports: [DemoContainer, VisiblePasswordFieldDemo],
  template: `
    <app-demo-container
      title="Shown"
      demoUrl="/demos/password-field/visible-password-field-demo"
      [code]="code"
    >
      <app-visible-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VisiblePasswordFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-visible-password-field-demo',
  imports: [
    FormField,
    ScLabel,
    ScPasswordField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: \`
    <div
      scPasswordField
      #password="scPasswordField"
      [(visible)]="visible"
      class="w-full max-w-sm"
    >
      <label scLabel>API key</label>
      <div scPasswordGroup>
        <input
          scPasswordInput
          ignorePasswordManagers
          [formField]="settings.key"
        />
        <button scPasswordToggle>
          @if (password.visible()) {
            <svg siEyeOffIcon></svg>
          } @else {
            <svg siEyeIcon></svg>
          }
          <span class="sr-only">Show key</span>
        </button>
      </div>
    </div>
    <p class="text-muted-foreground text-sm">Shown: {{ visible() }}</p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class VisiblePasswordFieldDemo {
  readonly visible = signal(true);
  readonly settings = form(signal({ key: 'sk-4f9c2e7a1b8d' }));
}`;
}
