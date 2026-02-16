import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSearchInput } from '@semantic-components/ui-lab';
import type { SearchSuggestion } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-loading-search-input-demo',
  imports: [ScSearchInput],
  template: `
    <sc-search-input
      [suggestions]="asyncSuggestions()"
      [loading]="isLoading()"
      (search)="onAsyncSearch($event)"
      (suggestionSelect)="onSelect($event)"
      class="max-w-md"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSearchInputDemo {
  readonly isLoading = signal(false);
  readonly asyncSuggestions = signal<SearchSuggestion[]>([]);

  private readonly suggestions: SearchSuggestion[] = [
    { id: '1', label: 'Apple', description: 'A red fruit' },
    { id: '2', label: 'Banana', description: 'A yellow fruit' },
    { id: '3', label: 'Cherry', description: 'A small red fruit' },
    { id: '4', label: 'Date', description: 'A sweet dried fruit' },
    { id: '5', label: 'Elderberry', description: 'A dark purple berry' },
  ];

  onAsyncSearch(query: string): void {
    this.isLoading.set(true);
    this.asyncSuggestions.set([]);

    // Simulate API call
    setTimeout(() => {
      this.asyncSuggestions.set(
        this.suggestions.filter((s) =>
          s.label.toLowerCase().includes(query.toLowerCase()),
        ),
      );
      this.isLoading.set(false);
    }, 500);
  }

  onSelect(suggestion: SearchSuggestion): void {
    console.log('Selected:', suggestion);
  }
}
