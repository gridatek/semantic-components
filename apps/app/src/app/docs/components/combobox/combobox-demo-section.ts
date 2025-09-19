import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ComboboxDemo } from './combobox-demo';

@Component({
  selector: 'app-combobox-demo-section',
  imports: [PreviewCodeTabs, ComboboxDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-combobox-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxDemoSection {
  readonly title = input<string>('');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ScCombobox, ScComboboxItem } from '@semantic-components/ui';

@Component({
  selector: 'app-combobox-demo',
  imports: [ScCombobox, ReactiveFormsModule],
  template: \`
    <div class="space-y-8">
      <!-- Basic combobox -->
      <sc-combobox
        [items]="fruits"
        label="Basic Fruit Selector"
        placeholder="Select a fruit..."
        helperText="Choose your favorite fruit"
      />

      <!-- With form control -->
      <sc-combobox
        [items]="countries"
        [formControl]="countryControl"
        label="Country"
        placeholder="Select country..."
      />

      <!-- Current form value -->
      <div class="p-4 bg-muted rounded-md">
        <h4 class="font-medium mb-2">Selected Country:</h4>
        <code>{{ countryControl.value || 'None' }}</code>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxDemo {
  countryControl = new FormControl('');

  fruits: ScComboboxItem[] = [
    { id: 'apple', label: 'Apple', subtitle: 'Sweet red fruit' },
    { id: 'banana', label: 'Banana', subtitle: 'Yellow tropical fruit' },
    { id: 'cherry', label: 'Cherry', subtitle: 'Small red fruit' },
    { id: 'date', label: 'Date', subtitle: 'Sweet brown fruit' },
  ];

  countries: ScComboboxItem[] = [
    { id: 'US', label: 'United States', subtitle: 'North America' },
    { id: 'GB', label: 'United Kingdom', subtitle: 'Europe' },
    { id: 'CA', label: 'Canada', subtitle: 'North America' },
    { id: 'AU', label: 'Australia', subtitle: 'Oceania' },
    { id: 'DE', label: 'Germany', subtitle: 'Europe' },
    { id: 'FR', label: 'France', subtitle: 'Europe' },
  ];
}`;
}
