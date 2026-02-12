import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSearchInput } from '@semantic-components/ui-lab';
import type { SearchSuggestion } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-categories-search-input-demo',
  imports: [ScSearchInput],
  template: `
    <sc-search-input
      [suggestions]="categorizedSuggestions"
      placeholder="Search products..."
      (suggestionSelect)="onSelect($event)"
      class="max-w-md"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesSearchInputDemo {
  readonly categorizedSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      label: 'MacBook Pro',
      description: 'Laptop',
      category: 'Electronics',
    },
    {
      id: '2',
      label: 'iPhone 15',
      description: 'Smartphone',
      category: 'Electronics',
    },
    {
      id: '3',
      label: 'AirPods Pro',
      description: 'Earbuds',
      category: 'Electronics',
    },
    {
      id: '4',
      label: 'Nike Air Max',
      description: 'Running shoes',
      category: 'Footwear',
    },
    {
      id: '5',
      label: 'Adidas Ultraboost',
      description: 'Running shoes',
      category: 'Footwear',
    },
    {
      id: '6',
      label: "Levi's 501",
      description: 'Jeans',
      category: 'Clothing',
    },
  ];

  onSelect(suggestion: SearchSuggestion): void {
    console.log('Selected:', suggestion);
  }
}
