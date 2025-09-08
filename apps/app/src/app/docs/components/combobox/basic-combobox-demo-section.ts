import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { BasicComboboxDemo } from './basic-combobox-demo';

@Component({
  selector: 'app-basic-combobox-demo-section',
  imports: [BasicComboboxDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-basic-combobox-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComboboxDemoSection {
  readonly title = input<string>('Basic Combobox');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<label sc-label for="fruit-combobox" class="mb-2">Choose a fruit</label>
<sc-combobox
  [(ngModel)]="selectedFruit"
  [items]="fruits"
  [inputId]="'fruit-combobox'"
  (selectionChange)="onFruitChange($event)"
  placeholder="Type to search..."
/>`;
}
