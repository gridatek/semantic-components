import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScOptionComponent, ScSelectComponent } from '@semantic-components/ui';

@Component({
  selector: 'app-select-demo2',
  imports: [ScSelectComponent, ScOptionComponent, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-md mx-auto space-y-8">
        <div class="bg-white p-6 rounded-xl shadow-sm">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Custom Select Component</h2>

          <!-- Basic Select -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Choose your favorite fruit
            </label>
            <sc-select [(ngModel)]="selectedFruit" placeholder="Select a fruit">
              <sc-option value="apple">🍎 Apple</sc-option>
              <sc-option value="banana">🍌 Banana</sc-option>
              <sc-option value="blueberry">🫐 Blueberry</sc-option>
              <sc-option value="grapes">🍇 Grapes</sc-option>
              <sc-option value="pineapple">🍍 Pineapple</sc-option>
              <sc-option value="strawberry">🍓 Strawberry</sc-option>
              <sc-option value="watermelon">🍉 Watermelon</sc-option>
            </sc-select>
          </div>

          <!-- Display selected value -->
          @if (selectedFruit) {
            <div class="mt-4 p-4 bg-blue-50 rounded-lg">
              <p class="text-sm text-blue-800">
                <strong>Selected fruit:</strong>
                {{ selectedFruit }}
              </p>
            </div>
          }

          <!-- Another example with different options -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select a country</label>
            <sc-select [(ngModel)]="selectedCountry" placeholder="Choose a country">
              <sc-option value="us">🇺🇸 United States</sc-option>
              <sc-option value="uk">🇬🇧 United Kingdom</sc-option>
              <sc-option value="ca">🇨🇦 Canada</sc-option>
              <sc-option value="au">🇦🇺 Australia</sc-option>
              <sc-option value="de">🇩🇪 Germany</sc-option>
              <sc-option value="fr">🇫🇷 France</sc-option>
              <sc-option value="jp">🇯🇵 Japan</sc-option>
            </sc-select>
          </div>
        </div>

        <!-- Features -->
        <div class="bg-white p-6 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Features</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Keyboard navigation (Arrow keys, Enter, Escape)
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Type-ahead search
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              ARIA accessibility attributes
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Angular Forms integration (ngModel, FormControl)
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Tailwind CSS styling
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              Click outside to close
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo2 {
  selectedFruit: string = '';
  selectedCountry: string = '';
}
