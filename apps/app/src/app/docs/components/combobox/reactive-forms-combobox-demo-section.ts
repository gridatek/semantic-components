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

  protected readonly code = `<form class="space-y-4" [formGroup]="demoForm">
  <div>
    <label sc-label for="language-combobox" class="mb-2">Select your favorite programming language</label>
    <sc-combobox
      [items]="programmingLanguages"
      [inputId]="'language-combobox'"
      placeholder="Choose a language..."
      formControlName="language"
    />
  </div>

  <div>
    <label sc-label for="frameworks-combobox" class="mb-2">Select frameworks</label>
    <sc-combobox
      [items]="frameworks"
      [multiple]="true"
      [inputId]="'frameworks-combobox'"
      placeholder="Choose frameworks..."
      formControlName="frameworks"
    />
  </div>

  <div class="mt-4 p-4 bg-gray-50 rounded">
    <h3 class="font-semibold text-gray-700 mb-2">Form Values:</h3>
    <pre class="text-sm">{{ demoForm.value | json }}</pre>
  </div>
</form>`;
}
