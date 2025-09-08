import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScCombobox, ScField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-combobox-demo',
  imports: [FormsModule, ScCombobox, ScField, ScLabel],
  template: `
    <sc-field>
      <label sc-label>Choose a fruit</label>
      <sc-combobox
        [(ngModel)]="selectedFruit"
        [items]="fruits"
        (selectionChange)="onFruitChange($event)"
        placeholder="Type to search..."
      />
    </sc-field>
    <p class="mt-4 text-sm text-gray-600">
      Selected value in parent:
      <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedFruit || 'None' }}</code>
    </p>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComboboxDemo {
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
  selectedFruit: string = '';

  onFruitChange(value: string) {
    console.log('Fruit selected:', value);
  }
}
