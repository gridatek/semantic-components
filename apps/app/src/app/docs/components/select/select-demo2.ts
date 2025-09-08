import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ScOptionComponent, ScSelectComponent } from '@semantic-components/ui';

@Component({
  selector: 'app-select-demo2',
  imports: [ScSelectComponent, ScOptionComponent, ReactiveFormsModule],
  template: `
    <div class="max-w-md mx-auto mt-8 p-6">
      <h2 class="text-2xl font-bold mb-6">Custom Select Example</h2>

      <!-- Basic Usage -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Favorite Fruit</label>
        <sc-select2 (selectionChange)="onSelectionChange($event)" placeholder="Select a fruit">
          <sc-option2 value="apple">Apple</sc-option2>
          <sc-option2 value="banana">Banana</sc-option2>
          <sc-option2 value="blueberry">Blueberry</sc-option2>
          <sc-option2 value="grapes">Grapes</sc-option2>
          <sc-option2 value="pineapple">Pineapple</sc-option2>
        </sc-select2>
      </div>

      <!-- Reactive Forms Usage -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">With Reactive Forms</label>
        <sc-select2 [formControl]="colorControl" placeholder="Select a color">
          <sc-option2 value="red">Red</sc-option2>
          <sc-option2 value="green">Green</sc-option2>
          <sc-option2 value="blue">Blue</sc-option2>
          <sc-option2 value="yellow">Yellow</sc-option2>
        </sc-select2>
      </div>

      <!-- Display Selected Values -->
      <div class="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 class="font-medium mb-2">Selected Values:</h3>
        <p>Fruit: {{ selectedFruit || 'None' }}</p>
        <p>Color: {{ colorControl.value || 'None' }}</p>
      </div>
    </div>
  `,
  host: {
    class: 'block w-[180px]',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo2 {
  selectedFruit: string = '';
  colorControl = new FormControl('');

  onSelectionChange(value: string) {
    this.selectedFruit = value;
  }
}
