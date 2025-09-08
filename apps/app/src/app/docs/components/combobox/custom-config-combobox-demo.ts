import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScCombobox } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-config-combobox-demo',
  imports: [FormsModule, ScCombobox],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <sc-combobox
          [(ngModel)]="customConfig1"
          [items]="fruits"
          [showToggleButton]="false"
          label="Without toggle button"
          placeholder="Type to search..."
        />
      </div>
      <div>
        <sc-combobox
          [(ngModel)]="customConfig2"
          [items]="fruits"
          [showStatus]="false"
          label="Without status display"
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
