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

  protected readonly code = `<sc-combobox
  [(ngModel)]="selectedFruit"
  [items]="fruits"
  (selectionChange)="onFruitChange($event)"
  label="Choose a fruit"
  placeholder="Type to search..."
/>`;
}
