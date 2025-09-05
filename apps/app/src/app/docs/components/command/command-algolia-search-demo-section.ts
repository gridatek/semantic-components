import { Component } from '@angular/core';

import { ScCodeHighlighter } from '@semantic-components/code-highlighter';

import { CommandAlgoliaSearchDemo } from './command-algolia-search-demo';

@Component({
  selector: 'app-command-algolia-search-demo-section',
  imports: [CommandAlgoliaSearchDemo, ScCodeHighlighter],
  template: `
    <section>
      <h2 class="text-2xl font-semibold mb-4">Real-world Algolia Integration</h2>

      <p class="text-muted-foreground mb-6">
        Production-ready implementation using ScCommandTrigger with Algolia search service. This
        demonstrates the complete integration pattern for external search providers.
      </p>

      <div class="mb-8">
        <app-command-algolia-search-demo />
      </div>

      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-2">Implementation Overview</h3>
          <p class="text-muted-foreground mb-4">
            This implementation shows how to integrate the ScCommandTrigger component with a real
            search service:
          </p>
          <ol class="list-decimal list-inside space-y-1 text-muted-foreground mb-4">
            <li>
              Install Algolia dependencies:
              <code class="bg-muted px-1 py-0.5 rounded text-sm">npm install algoliasearch</code>
            </li>
            <li>Create an Algolia search service with RxJS observables</li>
            <li>Build a search template component that handles the search UI</li>
            <li>Configure ScCommandTrigger with the template and settings</li>
            <li>Handle search events and navigation</li>
          </ol>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">Service Integration</h3>
          <sc-code-highlighter class="rounded-md" [code]="serviceCode" language="angular-ts" />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">Component Usage</h3>
          <sc-code-highlighter class="rounded-md" [code]="componentCode" language="angular-ts" />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">Template Configuration</h3>
          <sc-code-highlighter class="rounded-md" [code]="templateCode" language="angular-ts" />
        </div>
      </div>
    </section>
  `,
})
export class CommandAlgoliaSearchDemoSection {
  protected readonly serviceCode = `\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class AlgoliaSearchService {
  private client: SearchClient | null = null;
  private searchQuery$ = new BehaviorSubject<string>('');

  constructor() {
    this.initializeClient();
  }

  configure(applicationId: string, searchApiKey: string, indexName: string): void {
    this.client = algoliasearch(applicationId, searchApiKey);
    this.index = this.client.searchIndex(indexName);
  }

  getSearchResults(): Observable<SearchResult[]> {
    return this.searchQuery$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.performSearch(query)),
      map(response => response.hits)
    );
  }

  setSearchQuery(query: string): void {
    this.searchQuery$.next(query);
  }
}
\`\`\``;

  protected readonly componentCode = `\`\`\`typescript
@Component({
  template: \`
    <sc-command-trigger 
      [config]="searchConfig"
      [dialogTemplate]="searchTemplate"
      (dialogOpened)="onSearchOpened()"
      (dialogClosed)="onSearchClosed($event)"
    >
      <svg slot="icon" si-search-icon></svg>
      Search Documentation...
    </sc-command-trigger>

    <ng-template #searchTemplate>
      <app-search-command-template />
    </ng-template>
  \`
})
export class MyComponent {
  @ViewChild('searchTemplate') searchTemplate!: TemplateRef<any>;

  searchConfig: CommandTriggerConfig = {
    title: 'Search Documentation',
    description: 'Search components and guides',
    width: '700px',
    height: '500px',
    enableGlobalShortcut: true,
    shortcutKey: 'k'
  };

  onSearchOpened() {
    console.log('Search opened');
  }

  onSearchClosed(result: any) {
    console.log('Search closed:', result);
  }
}
\`\`\``;

  protected readonly templateCode = `\`\`\`typescript
@Component({
  selector: 'app-search-command-template',
  template: \`
    <sc-command (commandSelect)="onResultSelect($event)">
      <sc-command-input
        [value]="searchQuery()"
        (valueChange)="onSearchChange($event)"
        placeholder="Search..."
      />
      
      <sc-command-list>
        <sc-command-empty>No results found.</sc-command-empty>
        
        <ng-container *ngFor="let category of categories">
          <sc-command-group [heading]="category.name">
            <sc-command-item 
              *ngFor="let result of category.results"
              [value]="result.objectID">
              {{ result.title }}
            </sc-command-item>
          </sc-command-group>
        </ng-container>
      </sc-command-list>
    </sc-command>
  \`
})
export class SearchCommandTemplateComponent {
  searchResults = signal<SearchResult[]>([]);
  
  constructor(private algoliaService: AlgoliaSearchService) {}
  
  onSearchChange(query: string) {
    this.algoliaService.setSearchQuery(query);
  }
  
  onResultSelect(resultId: string) {
    // Handle selection
  }
}
\`\`\``;
}
