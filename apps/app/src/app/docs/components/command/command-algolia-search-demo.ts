import { Component, TemplateRef, ViewChild } from '@angular/core';

import { CommandTriggerConfig, ScCommandTrigger } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

import { SearchCommandTemplateComponent } from '../../../components/search-command/search-command-template.component';

@Component({
  selector: 'app-command-algolia-search-demo',
  imports: [ScCommandTrigger, SiSearchIcon, SearchCommandTemplateComponent],
  template: `
    <div class="space-y-6">
      <div class="prose prose-sm max-w-none">
        <h3>Algolia Search with Command Trigger</h3>
        <p class="text-muted-foreground">
          Real-world implementation using ScCommandTrigger with Algolia search integration. This
          demonstrates how to integrate external search services with the command component.
        </p>
      </div>

      <div class="flex flex-wrap gap-4">
        <!-- Desktop Style -->
        <button
          [config]="searchConfig"
          [dialogTemplate]="searchTemplate"
          (dialogOpened)="onSearchOpened('Algolia Search')"
          (dialogClosed)="onSearchClosed($event)"
          sc-command-trigger
        >
          <svg class="h-4 w-4 text-muted-foreground" slot="icon" si-search-icon></svg>
          <span class="text-muted-foreground">Search with Algolia...</span>
        </button>

        <!-- Compact Style -->
        <button
          [config]="compactConfig"
          [dialogTemplate]="searchTemplate"
          (dialogOpened)="onSearchOpened('Compact Search')"
          (dialogClosed)="onSearchClosed($event)"
          sc-command-trigger
          triggerClass="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <svg class="h-4 w-4" slot="icon" si-search-icon></svg>
          Quick Search
        </button>

        <!-- Icon Only -->
        <button
          [config]="iconConfig"
          [dialogTemplate]="searchTemplate"
          (dialogOpened)="onSearchOpened('Icon Search')"
          (dialogClosed)="onSearchClosed($event)"
          sc-command-trigger
          triggerClass="h-10 w-10 rounded-full bg-accent hover:bg-accent/80"
        >
          <svg class="h-5 w-5" slot="icon" si-search-icon></svg>
        </button>
      </div>

      <div class="bg-muted/50 rounded-lg p-4">
        <h4 class="font-medium mb-2">⌨️ Keyboard Shortcuts</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
          <div>
            <kbd class="bg-background px-2 py-1 rounded border text-xs">Ctrl+K</kbd>
            Algolia Search
          </div>
          <div>
            <kbd class="bg-background px-2 py-1 rounded border text-xs">Ctrl+J</kbd>
            Compact Search
          </div>
          <div>
            <kbd class="bg-background px-2 py-1 rounded border text-xs">Ctrl+I</kbd>
            Icon Search
          </div>
        </div>
      </div>

      @if (lastEvent) {
        <div class="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-sm">
          <strong>Last Event:</strong>
          {{ lastEvent }}
        </div>
      }

      <!-- Features List -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Integration Features</h4>
        <ul class="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Real-time search with Algolia's search API</li>
          <li>Debounced search queries (300ms delay)</li>
          <li>Categorized search results (Documentation, Components, Other)</li>
          <li>Automatic keyboard shortcut handling</li>
          <li>Responsive dialog sizing</li>
          <li>Loading states and error handling</li>
          <li>Search result highlighting (configurable)</li>
          <li>Router integration for navigation</li>
        </ul>
      </div>
    </div>

    <!-- Search Template -->
    <ng-template #searchTemplate>
      <app-search-command-template />
    </ng-template>
  `,
})
export class CommandAlgoliaSearchDemo {
  @ViewChild('searchTemplate') searchTemplate!: TemplateRef<any>;

  lastEvent = '';

  // Different search configurations
  searchConfig: CommandTriggerConfig = {
    title: 'Search Documentation',
    description: 'Search components, docs, and guides with Algolia',
    width: '700px',
    height: '500px',
    placeholder: 'Search documentation, components, and more...',
    enableGlobalShortcut: true,
    shortcutKey: 'k',
  };

  compactConfig: CommandTriggerConfig = {
    title: 'Quick Search',
    description: 'Fast search interface',
    width: '600px',
    height: '400px',
    placeholder: 'Quick search...',
    enableGlobalShortcut: true,
    shortcutKey: 'j',
  };

  iconConfig: CommandTriggerConfig = {
    title: 'Search',
    description: 'Icon-only search',
    width: '500px',
    height: '350px',
    placeholder: 'Search...',
    enableGlobalShortcut: true,
    shortcutKey: 'i',
  };

  onSearchOpened(type: string) {
    this.lastEvent = `${type} opened`;
    console.log(`${type} search dialog opened`);
  }

  onSearchClosed(result: any) {
    this.lastEvent = `Search closed: ${result || 'No selection'}`;
    console.log('Search dialog closed:', result);
  }
}
