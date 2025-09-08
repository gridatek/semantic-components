import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ReactiveFormsComboboxDemo } from './reactive-forms-combobox-demo';

@Component({
  selector: 'app-reactive-forms-combobox-demo-section',
  imports: [ReactiveFormsComboboxDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-reactive-forms-combobox-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsComboboxDemoSection {
  readonly title = input<string>('Reactive Forms Integration');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<form [formGroup]="demoForm">
  <sc-combobox
    [items]="programmingLanguages"
    label="Select your favorite programming language"
    placeholder="Choose a language..."
    formControlName="language"
  />

  <sc-combobox
    [items]="frameworks"
    [multiple]="true"
    label="Select frameworks"
    placeholder="Choose frameworks..."
    formControlName="frameworks"
  />
</form>`;
}
