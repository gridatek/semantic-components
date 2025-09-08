import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScCombobox, ScField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-config-combobox-demo',
  imports: [FormsModule, ScCombobox, ScField, ScLabel],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <sc-field>
        <label sc-label>Without toggle button</label>
        <sc-combobox
          [(ngModel)]="customConfig1"
          [items]="fruits"
          [showToggleButton]="false"
          placeholder="Type to search..."
        />
      </sc-field>
      <sc-field>
        <label sc-label>Without status display</label>
        <sc-combobox
          [(ngModel)]="customConfig2"
          [items]="fruits"
          [showStatus]="false"
          placeholder="Type to search..."
        />
      </sc-field>
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
