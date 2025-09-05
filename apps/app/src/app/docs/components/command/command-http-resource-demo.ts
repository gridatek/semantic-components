import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Component, ElementRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
} from '@semantic-components/ui';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category: string;
  action: () => void;
}

@Component({
  selector: 'app-command-http-resource-demo',
  imports: [
    CommonModule,
    FormsModule,
    ScCommand,
    ScCommandInput,
    ScCommandList,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandItem,
    ScCommandSeparator,
  ],
  template: `
    <div class="space-y-6">
      <div class="prose prose-sm max-w-none">
        <h3>Command with HttpResource</h3>
        <p class="text-muted-foreground">
          Demonstrates command component using Angular's httpResource for dynamic search results.
          Type a search query to see API results combined with static commands.
        </p>
      </div>

      <sc-command class="rounded-lg border shadow-md min-w-[450px]">
        <sc-command-input
          #searchInput
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearchChange($event)"
          placeholder="Type to search..."
        />

        <sc-command-list class="max-h-80">
          <!-- Loading State -->
          @if (apiResource.isLoading()) {
            <div class="flex items-center justify-center py-6">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span class="ml-2 text-gray-600 text-sm">Searching...</span>
            </div>
          }

          <!-- Error State -->
          @if (apiResource.error()) {
            <div class="p-4 text-center text-red-600">
              <p class="text-sm">Failed to load results</p>
              <button
                class="mt-2 px-3 py-1 text-xs bg-red-100 rounded hover:bg-red-200"
                (click)="retrySearch()"
              >
                Retry
              </button>
            </div>
          }

          <!-- No Results -->
          @if (groupedCommands().length === 0 && !apiResource.isLoading()) {
            <sc-command-empty>
              <div class="text-center py-6">
                <div class="text-4xl mb-2">🔍</div>
                <div class="text-sm text-gray-500">No commands found</div>
                @if (searchQuery().length > 0) {
                  <div class="text-xs text-gray-400 mt-1">Try searching for something else</div>
                }
              </div>
            </sc-command-empty>
          }

          <!-- Command Groups -->
          @for (group of groupedCommands(); track group.name) {
            <sc-command-group [heading]="group.name">
              @for (command of group.items; track command.id) {
                <sc-command-item
                  class="cursor-pointer"
                  [value]="command.id"
                  (click)="executeCommand(command)"
                >
                  @if (command.icon) {
                    <span class="mr-2">{{ command.icon }}</span>
                  }
                  <div class="flex-1 min-w-0">
                    <div class="font-medium">{{ command.label }}</div>
                    @if (command.description) {
                      <div class="text-xs text-gray-500 mt-0.5">{{ command.description }}</div>
                    }
                  </div>
                </sc-command-item>
              }
            </sc-command-group>
            @if (!$last) {
              <sc-command-separator />
            }
          }
        </sc-command-list>
      </sc-command>

      <!-- Demo Info -->
      <div class="bg-blue-50 rounded-lg p-4">
        <div class="text-sm">
          <div class="font-medium text-blue-900 mb-2">HttpResource Demo</div>
          <ul class="space-y-1 text-blue-800">
            <li>• Static commands are always shown</li>
            <li>• Type 2+ characters to trigger API search</li>
            <li>• API results are combined with static commands</li>
            <li>• Loading and error states are handled automatically</li>
            <li>• Uses JSONPlaceholder API for demonstration</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @reference "tailwindcss";
    `,
  ],
})
export class CommandHttpResourceDemo {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private http = inject(HttpClient);

  // Signals for reactive state
  searchQuery = signal('');

  // Static commands
  private staticCommands: CommandItem[] = [
    {
      id: 'new-file',
      label: 'New File',
      description: 'Create a new file',
      icon: '📄',
      category: 'File',
      action: () => this.showNotification('New File created!'),
    },
    {
      id: 'open-file',
      label: 'Open File',
      description: 'Open an existing file',
      icon: '📂',
      category: 'File',
      action: () => this.showNotification('File opened!'),
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Open application settings',
      icon: '⚙️',
      category: 'System',
      action: () => this.showNotification('Settings opened!'),
    },
  ];

  // HTTP Resource for dynamic commands
  apiResource = httpResource(
    () => {
      const query = this.searchQuery();
      if (!query || query.length < 2) return undefined;

      return {
        url: `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}`,
        method: 'GET' as const,
      };
    },
    {
      parse: (response) => {
        const data = response as any[];
        return data.slice(0, 3).map(
          (post): CommandItem => ({
            id: `api-${post.id}`,
            label: post.title.substring(0, 30) + '...',
            description: post.body.substring(0, 60) + '...',
            icon: '🔍',
            category: 'Search Results',
            action: () => this.showNotification(`Opened: ${post.title}`),
          }),
        );
      },
    },
  );

  // Computed properties
  filteredCommands = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const staticFiltered = this.staticCommands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(query) ||
        cmd.description?.toLowerCase().includes(query) ||
        cmd.category.toLowerCase().includes(query),
    );

    const apiCommands = this.apiResource.hasValue() ? this.apiResource.value() : [];
    return [...staticFiltered, ...apiCommands];
  });

  groupedCommands = computed(() => {
    const commands = this.filteredCommands();
    const groups = commands.reduce(
      (acc, cmd) => {
        if (!acc[cmd.category]) {
          acc[cmd.category] = [];
        }
        acc[cmd.category].push(cmd);
        return acc;
      },
      {} as Record<string, CommandItem[]>,
    );

    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  });

  constructor() {
    // Focus input on component init
    effect(() => {
      setTimeout(() => {
        this.searchInput?.nativeElement?.focus();
      }, 0);
    });
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  executeCommand(command: CommandItem) {
    command.action();
  }

  retrySearch() {
    const currentQuery = this.searchQuery();
    this.searchQuery.set('');
    setTimeout(() => this.searchQuery.set(currentQuery), 0);
  }

  private showNotification(message: string) {
    const toast = document.createElement('div');
    toast.className =
      'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }
}
