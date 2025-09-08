import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScCombobox, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-config-combobox-demo',
  imports: [FormsModule, ScCombobox, ScLabel],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="mb-2" sc-label for="no-toggle-combobox">Without toggle button</label>
        <sc-combobox
          [(ngModel)]="customConfig1"
          [items]="fruits"
          [showToggleButton]="false"
          [inputId]="'no-toggle-combobox'"
          placeholder="Type to search..."
        />
      </div>
      <div>
        <label class="mb-2" sc-label for="no-status-combobox">Without status display</label>
        <sc-combobox
          [(ngModel)]="customConfig2"
          [items]="fruits"
          [showStatus]="false"
          [inputId]="'no-status-combobox'"
          placeholder="Type to search..."
        />
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomConfigComboboxDemo {
  fruits: string[] = [
    'Apple',
    'Banana',
    'Cherry',
    'Dragon Fruit',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Orange',
    'Papaya',
    'Quince',
    'Raspberry',
  ];

  customConfig1: string = '';
  customConfig2: string = '';
}
