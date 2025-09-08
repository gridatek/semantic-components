import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { GroupedComboboxDemo } from './grouped-combobox-demo';

@Component({
  selector: 'app-grouped-combobox-demo-section',
  imports: [GroupedComboboxDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-grouped-combobox-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedComboboxDemoSection {
  readonly title = input<string>('Grouped Combobox');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<sc-combobox
  [(ngModel)]="selectedCountry"
  [items]="countries"
  [grouped]="true"
  (selectionChange)="onCountryChange($event)"
  label="Select a country"
  placeholder="Search countries..."
/>`;
}
