import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { InputPhoneReactiveFormsDemo } from './input-phone-reactive-forms-demo';

@Component({
  selector: 'app-input-phone-reactive-forms-section',
  imports: [PreviewCodeTabs, InputPhoneReactiveFormsDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-input-phone-reactive-forms-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneReactiveFormsSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ScInputPhone } from '@semantic-components/ui';

@Component({
  selector: 'app-input-phone-reactive-forms-demo',
  imports: [ScInputPhone, ReactiveFormsModule],
  template: \`
    <sc-input-phone
      [formControl]="phoneControl"
      label="Phone Number"
      placeholder="Enter your phone number"
    ></sc-input-phone>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneReactiveFormsDemo {
  phoneControl = new FormControl('');
}`;
}
