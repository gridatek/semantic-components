import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScCombobox, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-combobox-demo',
  imports: [FormsModule, ScCombobox, ScLabel],
  template: `
    <label class="mb-2" sc-label for="fruit-combobox">Choose a fruit</label>
    <sc-combobox
      [(ngModel)]="selectedFruit"
      [items]="fruits"
      [inputId]="'fruit-combobox'"
      (selectionChange)="onFruitChange($event)"
      placeholder="Type to search..."
    />
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
