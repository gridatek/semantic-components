import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSearchInputDemo } from './basic-search-input-demo';

@Component({
  selector: 'app-basic-search-input-demo-container',
  imports: [DemoContainer, BasicSearchInputDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-search-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSearchInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSearchInput } from '@semantic-components/ui-lab';
import type { SearchSuggestion } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-search-input-demo',
  imports: [ScSearchInput],
  template: \`
    <div class="space-y-4">
      <sc-search-input
        [suggestions]="suggestions"
        (search)="onSearch($event)"
        (suggestionSelect)="onSelect($event)"
        class="max-w-md"
      />
      @if (selectedItem()) {
        <div class="rounded-lg border bg-card p-4 max-w-md">
          <p class="text-sm">
            Selected:
            <span class="font-medium">{{ selectedItem()?.label }}</span>
          </p>
          @if (selectedItem()?.description) {
            <p class="text-xs text-muted-foreground">
              {{ selectedItem()?.description }}
            </p>
          }
        </div>
      }
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSearchInputDemo {
  readonly selectedItem = signal<SearchSuggestion | null>(null);

  readonly suggestions: SearchSuggestion[] = [
    { id: '1', label: 'Apple', description: 'A red fruit' },
    { id: '2', label: 'Banana', description: 'A yellow fruit' },
    { id: '3', label: 'Cherry', description: 'A small red fruit' },
    { id: '4', label: 'Date', description: 'A sweet dried fruit' },
    { id: '5', label: 'Elderberry', description: 'A dark purple berry' },
  ];

  onSearch(query: string): void {
    console.log('Search:', query);
  }

  onSelect(suggestion: SearchSuggestion): void {
    this.selectedItem.set(suggestion);
  }
}`;
}
