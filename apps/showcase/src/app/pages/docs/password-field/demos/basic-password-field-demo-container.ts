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
import { ScLabel } from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldInputGroup,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: \`
    <div scPasswordField [(value)]="password" class="space-y-2">
      <label scLabel>Password</label>
      <div scPasswordFieldInputGroup>
        <input scPasswordFieldInput placeholder="Enter password" />
        <button scPasswordFieldToggle></button>
      </div>
    </div>

    <p class="text-muted-foreground mt-4 text-sm">
      Value: {{ password() || '(empty)' }}
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPasswordFieldDemo {
  readonly password = signal<string>('');
}`;
}
