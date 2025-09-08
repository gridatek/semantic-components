import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { MultiSelectComboboxDemo } from './multi-select-combobox-demo';

@Component({
  selector: 'app-multi-select-combobox-demo-section',
  imports: [MultiSelectComboboxDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-multi-select-combobox-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComboboxDemoSection {
  readonly title = input<string>('Multi-select Combobox');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<sc-combobox
  [(ngModel)]="selectedTechnologies"
  [items]="technologies"
  [multiple]="true"
  (selectionChange)="onTechnologiesChange($event)"
  label="Select technologies"
  placeholder="Add technologies..."
/>`;
}
