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

  protected readonly code = `<label sc-label for="country-combobox" class="mb-2">Select a country</label>
<sc-combobox
  [(ngModel)]="selectedCountry"
  [items]="countries"
  [grouped]="true"
  [inputId]="'country-combobox'"
  (selectionChange)="onCountryChange($event)"
  placeholder="Search countries..."
/>`;
}
