import { HttpClient, httpResource } from '@angular/common/http';
import {
  Component,
  ElementRef,
  TemplateRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CommandDialog,
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
} from '@semantic-components/ui';
import { ScPlatformService } from '@semantic-components/utils';

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
        <h3>Command with HttpResource in Dialog</h3>
        <p class="text-muted-foreground">
          Interactive command palette in a dialog using httpResource for dynamic API search results
          combined with static commands. Press Cmd/Ctrl+K or click the button to open.
        </p>
      </div>

      <!-- Demo Trigger Section -->
      <div class="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
        <div class="text-center space-y-4">
          <div class="text-6xl mb-4">⌘</div>
          <h3 class="text-xl font-semibold text-gray-900">HttpResource Command Palette</h3>
          <p class="text-gray-600 max-w-md mx-auto">
            Click the button below or press
            <kbd class="bg-white px-2 py-1 rounded text-sm border">{{ keyboardShortcut() }}</kbd>
            to test httpResource integration with dialog
          </p>

          <button
            class="inline-flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition-colors shadow-sm"
            (click)="openDialog()"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span class="font-medium">Open HttpResource Command</span>
            <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">
              {{ keyboardShortcut() }}
            </span>
          </button>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-green-50 rounded-lg p-6">
          <h4 class="font-medium text-green-900 mb-3">🚀 HttpResource Features</h4>
          <ul class="space-y-2 text-sm text-green-800">
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Real-time API search with debouncing
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Automatic loading and error states
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Combined static + dynamic results
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Signal-based reactive architecture
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Computed properties for filtering
            </li>
          </ul>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h4 class="font-medium text-blue-900 mb-3">⌨️ Testing Instructions</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Open Dialog</span>
              <kbd class="bg-white px-2 py-1 rounded text-xs border">{{ keyboardShortcut() }}</kbd>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Type 2+ chars</span>
              <span class="text-blue-600 text-xs">Triggers API search</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Navigate Commands</span>
              <kbd class="bg-white px-2 py-1 rounded text-xs border">↑ ↓</kbd>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Select Command</span>
              <kbd class="bg-white px-2 py-1 rounded text-xs border">Enter</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Command Dialog Template -->
    <ng-template #commandTemplate>
      <sc-command (commandSelect)="onCommandSelect($event)">
        <!-- Close Button -->
        <button
          class="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors z-10"
          (click)="commandDialogService.closeAll()"
          type="button"
          title="Close (Esc)"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <sc-command-input
          [(ngModel)]="searchQuery"
          (search)="onSearchChange($event)"
          placeholder="Search commands... (type 2+ chars for API results)"
        />

        <sc-command-list class="max-h-96">
          <!-- Loading State -->
          @if (apiResource.isLoading()) {
            <div class="flex items-center justify-center py-8">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span class="ml-2 text-gray-600">Loading API results...</span>
            </div>
          }

          <!-- Error State -->
          @if (apiResource.error()) {
            <div class="p-4 text-center text-red-600">
              <p class="mb-2">Failed to load API results</p>
              <button
                class="px-3 py-1 text-sm bg-red-100 rounded hover:bg-red-200"
                (click)="retrySearch()"
              >
                Retry API Search
              </button>
            </div>
          }

          <!-- No Results -->
          @if (groupedCommands().length === 0 && !apiResource.isLoading()) {
            <sc-command-empty>
              <div class="text-center py-8">
                <div class="text-5xl mb-4">🔍</div>
                <div class="text-lg font-medium text-gray-900 mb-2">No commands found</div>
                @if (searchQuery().length === 0) {
                  <div class="text-sm text-gray-500">Start typing to search...</div>
                } @else if (searchQuery().length < 2) {
                  <div class="text-sm text-gray-500">Type 2+ characters for API search</div>
                } @else {
                  <div class="text-sm text-gray-500">Try a different search term</div>
                }
              </div>
            </sc-command-empty>
          }

          <!-- Command Groups -->
          @for (group of groupedCommands(); track group.name) {
            <sc-command-group [heading]="group.name">
              @for (command of group.items; track command.id) {
                <sc-command-item class="cursor-pointer group relative" [value]="command.id">
                  @if (command.icon) {
                    <span
                      class="mr-3 text-lg group-hover:scale-110 transition-transform duration-200"
                    >
                      {{ command.icon }}
                    </span>
                  }

                  <div class="flex-1 min-w-0">
                    <div
                      class="font-medium text-gray-900 group-hover:text-blue-700 transition-colors"
                    >
                      {{ command.label }}
                    </div>
                    @if (command.description) {
                      <div class="text-xs text-gray-500 mt-0.5">{{ command.description }}</div>
                    }
                  </div>

                  @if (command.id.startsWith('api-')) {
                    <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded ml-2">
                      API
                    </span>
                  }
                </sc-command-item>
              }
            </sc-command-group>
            @if (!$last) {
              <sc-command-separator />
            }
          }
        </sc-command-list>
      </sc-command>
    </ng-template>
  `,
  styles: [``],
})
export class CommandHttpResourceDemo {
  readonly commandTemplate = viewChild.required<TemplateRef<any>>('commandTemplate');

  private http = inject(HttpClient);
  private platformService = inject(ScPlatformService);
  commandDialogService = inject(CommandDialog);

  // Signals for reactive state
  searchQuery = signal('');

  // Keyboard shortcut using platform service
  keyboardShortcut = computed(() => this.platformService.formatShortcut('K'));

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
    // Global keyboard shortcut for dialog
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.openDialog();
        }
      });
    }
  }

  openDialog() {
    this.searchQuery.set('');

    const dialogRef = this.commandDialogService.openTemplate(this.commandTemplate(), {
      title: 'HttpResource Command Palette',
      description: 'Search commands with real-time API integration',
      width: '700px',
      height: '550px',
      disableClose: false,
      hasBackdrop: true,
      backdropClass: ['bg-black/20'],
    });

    dialogRef.closed.subscribe((result) => {
      console.log('HttpResource command dialog closed:', result);
    });
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  onCommandSelect(commandId: string) {
    console.log('Command executed:', commandId);

    // Find and execute the command
    const allCommands = this.filteredCommands();
    const command = allCommands.find((cmd) => cmd.id === commandId);

    if (command) {
      command.action();
    }

    // Auto-close dialog after command execution
    setTimeout(() => {
      this.commandDialogService.closeAll();
    }, 100);
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
      'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300';
    toast.textContent = message;

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2700);
  }
}
