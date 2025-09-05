import { AsyncPipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CommandDialog,
  ScCommand,
  ScCommandGroup,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandShortcut,
} from '@semantic-components/ui';
import { Observable, map } from 'rxjs';

import { CommandCategory, CommandItem, MockCommandService } from './mock-command.service';

@Component({
  selector: 'app-command-interactive-demo',
  imports: [
    AsyncPipe,
    ScCommand,
    ScCommandInput,
    ScCommandList,
    ScCommandGroup,
    ScCommandItem,
    ScCommandSeparator,
    ScCommandShortcut,
    FormsModule,
  ],
  template: `
    <div class="space-y-6">
      <div class="prose prose-sm max-w-none">
        <h3>Interactive Command Dialog</h3>
        <p class="text-muted-foreground">
          Experience a full-featured command palette in a modal dialog with real commands, keyboard
          shortcuts, and interactive features just like VS Code or GitHub.
        </p>
      </div>

      <!-- Main Demo Section -->
      <div class="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
        <div class="text-center space-y-4">
          <div class="text-6xl mb-4">⌘</div>
          <h3 class="text-xl font-semibold text-gray-900">Command Palette</h3>
          <p class="text-gray-600 max-w-md mx-auto">
            Click the button below or press
            <kbd class="bg-white px-2 py-1 rounded text-sm border">⌘K</kbd>
            to open the command palette with 25+ real commands
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
            <span class="font-medium">Open Command Palette</span>
            <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">⌘K</span>
          </button>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          class="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          (click)="openDialogWithFilter('file')"
        >
          <div class="text-2xl mb-2">📄</div>
          <div class="font-medium text-gray-900">File Operations</div>
          <div class="text-sm text-gray-500">New, Open, Save, Save As...</div>
        </button>

        <button
          class="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          (click)="openDialogWithFilter('settings')"
        >
          <div class="text-2xl mb-2">⚙️</div>
          <div class="font-medium text-gray-900">Settings & Config</div>
          <div class="text-sm text-gray-500">Preferences, Layout, Shortcuts</div>
        </button>

        <button
          class="p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
          (click)="openDialogWithFilter('help')"
        >
          <div class="text-2xl mb-2">❓</div>
          <div class="font-medium text-gray-900">Help & Support</div>
          <div class="text-sm text-gray-500">Documentation, About, Updates</div>
        </button>
      </div>

      <!-- Feature Showcase -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="font-medium text-gray-900 mb-3">✨ Dialog Features</h4>
          <ul class="space-y-2 text-sm text-gray-600">
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Modal overlay with backdrop blur
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Full keyboard navigation support
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Real-time search across all commands
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Command categories and grouping
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Keyboard shortcuts display
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Toast notifications on execution
            </li>
          </ul>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h4 class="font-medium text-blue-900 mb-3">⌨️ Keyboard Shortcuts</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Open Command Palette</span>
              <kbd class="bg-white px-2 py-1 rounded text-xs border">⌘K</kbd>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Navigate Commands</span>
              <kbd class="bg-white px-2 py-1 rounded text-xs border">↑ ↓</kbd>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Select Command</span>
              <kbd class="bg-white px-2 py-1 rounded text-xs border">Enter</kbd>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Close Dialog</span>
              <kbd class="bg-white px-2 py-1 rounded text-xs border">Esc</kbd>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-800">Clear Search</span>
              <kbd class="bg-white px-2 py-1 rounded text-xs border">Esc</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Command Dialog Template -->
    <ng-template #commandTemplate>
      <sc-command [filter]="commandService.fuzzyFilter" (commandSelect)="onCommandSelect($event)">
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
          [placeholder]="searchPlaceholder()"
          (search)="onSearchChange($event)"
        />

        <sc-command-list class="max-h-96">
          <!-- Loading State -->
          @if (commandResource.isLoading()) {
            <div class="flex items-center justify-center py-8">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span class="ml-2 text-gray-600">Loading additional results...</span>
            </div>
          }

          <!-- Error State -->
          @if (commandResource.error()) {
            <div class="p-4 text-center text-red-600">
              <p class="mb-2">Failed to load search results</p>
              <button
                class="px-3 py-1 text-sm bg-red-100 rounded hover:bg-red-200 transition-colors"
                (click)="retryApiSearch()"
              >
                Retry
              </button>
            </div>
          }

          @if (commandCategories$ | async; as categories) {
            @if (categories.length === 0 && showEmptyState()) {
              <div class="flex flex-col items-center text-center py-12">
                <div class="text-5xl mb-4">🔍</div>
                <div class="text-lg font-medium text-gray-900 mb-2">No commands found</div>
                <div class="text-sm text-gray-500 mb-4">
                  Try searching for "file", "settings", "help", or "theme"
                </div>
                <div class="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-lg max-w-sm">
                  💡
                  <strong>Tip:</strong>
                  Use fuzzy search for partial matches like "newf" → "New File"
                </div>
              </div>
            } @else {
              @for (category of categories; track category.id) {
                <sc-command-group [heading]="category.label">
                  @for (command of category.items; track command.id) {
                    <sc-command-item
                      class="cursor-pointer group relative"
                      [value]="command.id"
                      [disabled]="command.disabled"
                    >
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

                      @if (command.shortcut) {
                        <span
                          class="opacity-50 group-hover:opacity-100 transition-opacity bg-gray-100 group-hover:bg-blue-100"
                          sc-command-shortcut
                        >
                          {{ command.shortcut }}
                        </span>
                      }

                      @if (command.disabled) {
                        <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded ml-2">
                          Disabled
                        </span>
                      }
                    </sc-command-item>
                  }
                </sc-command-group>

                @if (!$last) {
                  <sc-command-separator />
                }
              }
            }
          }
        </sc-command-list>
      </sc-command>
    </ng-template>
  `,
})
export class CommandInteractiveDemo implements OnInit {
  private http = inject(HttpClient);
  commandDialogService = inject(CommandDialog);
  commandCategories$!: Observable<CommandCategory[]>;

  // Signals for component state
  searchQuery = signal('');
  selectedCategory = signal<string | null>(null);
  searchPlaceholder = signal('Search all commands...');
  showEmptyState = signal(false);

  @ViewChild('commandTemplate') commandTemplate!: TemplateRef<any>;

  // HTTP Resource for dynamic command search
  commandResource = httpResource(
    () => {
      const query = this.searchQuery();
      const category = this.selectedCategory();

      // Only make API call if we have a search query longer than 2 characters
      if (!query || query.length < 2) return undefined;

      // For demo purposes, using JSONPlaceholder API
      // In real implementation, this would be your command search API
      return {
        url: `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}`,
        method: 'GET' as const,
      };
    },
    {
      parse: (response) => {
        const data = response as any[];
        // Transform API response to CommandItem format
        return data.slice(0, 3).map(
          (post): CommandItem => ({
            id: `api-${post.id}`,
            label: `Search: ${post.title.substring(0, 30)}...`,
            description: post.body.substring(0, 80) + '...',
            icon: '🔍',
            category: 'search',
            shortcut: '',
            action: () => this.handleApiAction(`Opened: ${post.title}`),
          }),
        );
      },
    },
  );

  // Computed properties for reactive data
  staticCommands = computed(() => {
    const category = this.selectedCategory();
    // Get static commands from service, filtered by category if needed
    // For now, using the existing service pattern
    return [];
  });

  filteredCommands = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const staticCommands = this.staticCommands();
    const apiCommands = this.commandResource.hasValue() ? this.commandResource.value() : [];

    // Combine static and API commands
    return [...staticCommands, ...apiCommands];
  });

  // Computed command categories
  computedCategories = computed(() => {
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

    return Object.entries(groups).map(
      ([id, items]): CommandCategory => ({
        id,
        label: this.getCategoryLabel(id),
        items,
      }),
    );
  });

  constructor(public commandService: MockCommandService) {
    // Effects for side effects
    effect(() => {
      // Update empty state based on search results
      const hasResults = this.filteredCommands().length > 0;
      const isLoading = this.commandResource.isLoading();
      const hasQuery = this.searchQuery().length > 0;

      this.showEmptyState.set(hasQuery && !hasResults && !isLoading);
    });
  }

  ngOnInit() {
    this.commandCategories$ = this.commandService.getCommandsByCategory();

    // Global keyboard shortcut simulation (in a real app, you'd use a global service)
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
    this.searchPlaceholder.set('Search all commands...');
    this.selectedCategory.set(null);
    this.searchQuery.set('');
    this.commandCategories$ = this.commandService.getCommandsByCategory();
    this.showDialog();
  }

  openDialogWithFilter(filter: string) {
    this.selectedCategory.set(filter);
    this.searchQuery.set('');

    switch (filter) {
      case 'file':
        this.searchPlaceholder.set('Search file operations...');
        this.commandCategories$ = this.commandService
          .getCommandsByCategory()
          .pipe(map((categories) => categories.filter((cat) => cat.id === 'file')));
        break;
      case 'settings':
        this.searchPlaceholder.set('Search settings...');
        this.commandCategories$ = this.commandService
          .getCommandsByCategory()
          .pipe(map((categories) => categories.filter((cat) => cat.id === 'settings')));
        break;
      case 'help':
        this.searchPlaceholder.set('Search help & support...');
        this.commandCategories$ = this.commandService
          .getCommandsByCategory()
          .pipe(map((categories) => categories.filter((cat) => cat.id === 'help')));
        break;
    }
    this.showDialog();
  }

  private showDialog() {
    const dialogRef = this.commandDialogService.openTemplate(this.commandTemplate, {
      title: 'Command Palette',
      description: 'Search and execute commands',
      width: '700px',
      height: '550px',
      disableClose: false,
      hasBackdrop: true,
      backdropClass: ['bg-black/20'],
    });

    dialogRef.closed.subscribe((result) => {
      console.log('Command dialog closed:', result);
    });
  }

  onCommandSelect(commandId: string) {
    console.log('Command executed:', commandId);

    // Handle API commands vs static commands
    if (commandId.startsWith('api-')) {
      const apiCommands = this.commandResource.hasValue() ? this.commandResource.value() : [];
      const command = apiCommands.find((cmd) => cmd.id === commandId);
      if (command) {
        command.action();
      }
    } else {
      this.commandService.executeCommand(commandId);
    }

    // Auto-close dialog after command execution
    setTimeout(() => {
      this.commandDialogService.closeAll();
    }, 100);
  }

  // Helper methods
  private getCategoryLabel(categoryId: string): string {
    const labels: Record<string, string> = {
      file: 'File Operations',
      navigation: 'Navigation',
      view: 'View',
      settings: 'Settings',
      help: 'Help & Support',
      development: 'Development',
      search: 'Search Results',
    };
    return labels[categoryId] || categoryId;
  }

  private handleApiAction(message: string): void {
    console.log('API Command:', message);
    // Create a simple toast notification
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

  // Method to update search query (can be used from template)
  updateSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  // Method to retry API search
  retryApiSearch() {
    const currentQuery = this.searchQuery();
    this.searchQuery.set('');
    setTimeout(() => this.searchQuery.set(currentQuery), 0);
  }

  // Handle search input changes
  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }
}
