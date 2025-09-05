import { Component } from '@angular/core';

import { ScCodeHighlighter } from '@semantic-components/code-highlighter';

import { CommandSearchDemo } from './command-search-demo';

@Component({
  selector: 'app-command-search-demo-section',
  imports: [CommandSearchDemo, ScCodeHighlighter],
  template: `
    <section>
      <h2 class="text-2xl font-semibold mb-4">Search Implementation</h2>

      <p class="text-muted-foreground mb-6">
        A search command implementation with categorized results, loading states, and keyboard
        navigation. This example demonstrates how to integrate search functionality with the command
        component.
      </p>

      <div class="flex justify-center mb-6">
        <app-command-search-demo />
      </div>

      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-2">Features</h3>
          <ul class="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Real-time search with debouncing</li>
            <li>Categorized results (Components, Documentation, Guides)</li>
            <li>Loading states and empty states</li>
            <li>Keyboard navigation support</li>
            <li>Responsive design for mobile and desktop</li>
            <li>Integration with routing for navigation</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">Usage with Algolia</h3>
          <p class="text-muted-foreground mb-4">To use this with Algolia search, you'll need to:</p>
          <ol class="list-decimal list-inside space-y-1 text-muted-foreground mb-4">
            <li>
              Install Algolia dependencies:
              <code class="bg-muted px-1 py-0.5 rounded text-sm">npm install algoliasearch</code>
            </li>
            <li>Configure your Algolia credentials in the search service</li>
            <li>Replace mock data with actual Algolia search results</li>
            <li>Implement proper highlighting using Algolia's highlight results</li>
          </ol>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">Code Example</h3>
          <sc-code-highlighter class="rounded-md" [code]="codeExample" language="angular-ts" />
        </div>
      </div>
    </section>
  `,
})
export class CommandSearchDemoSection {
  protected readonly codeExample = `\`\`\`typescript
import { AlgoliaSearchService } from './algolia-search.service';
import { SearchCommandComponent } from './search-command.component';

@Component({
  template: \`
    <button (click)="openSearch()" class="search-trigger">
      Search (⌘K)
    </button>
    
    <app-search-command [open]="searchOpen" />
  \`
})
export class AppComponent {
  searchOpen = signal(false);
  
  constructor(private algoliaService: AlgoliaSearchService) {
    // Configure Algolia
    this.algoliaService.configure(
      'YOUR_APP_ID',
      'YOUR_SEARCH_API_KEY',
      'YOUR_INDEX_NAME'
    );
  }
  
  openSearch() {
    this.searchOpen.set(true);
  }
  
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }
}
\`\`\``;
}
