import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { BasicAutocompleteDemo } from './basic-autocomplete-demo';

@Component({
  selector: 'app-basic-autocomplete-demo-section',
  imports: [PreviewCodeTabs, BasicAutocompleteDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-basic-autocomplete-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAutocompleteDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScAutocomplete, ScField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-autocomplete-demo',
  imports: [FormsModule, ScAutocomplete, ScField, ScLabel],
  template: \`
    <div sc-field>
      <label sc-label>Choose a fruit</label>
      <sc-autocomplete
        [(ngModel)]="selectedFruit"
        [items]="fruits"
        (selectionChange)="onFruitChange($event)"
        placeholder="Type to search..."
      />
    </div>
    <p class="mt-4 text-sm text-gray-600">
      Selected value in parent:
      <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedFruit || 'None' }}</code>
    </p>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAutocompleteDemo {
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
}`;
}
