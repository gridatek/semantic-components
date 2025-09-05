import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category: string;
  action: () => void;
}

@Component({
  selector: 'app-command-palette',
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[15vh]"
      *ngIf="isOpen()"
      (click)="close()"
    >
      <!-- Command Palette Container -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        (click)="$event.stopPropagation()"
      >
        <!-- Search Input -->
        <div class="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <svg
            class="w-5 h-5 text-gray-400 mr-3"
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
          <input
            class="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
            #searchInput
            [(ngModel)]="searchQuery"
            (keydown)="onKeyDown($event)"
            placeholder="Type a command or search..."
            autocomplete="off"
          />
          <div class="text-xs text-gray-400 ml-2">
            <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">ESC</kbd>
          </div>
        </div>

        <!-- Results -->
        <div class="max-h-96 overflow-y-auto">
          <!-- Loading State -->
          <div class="flex items-center justify-center py-8" *ngIf="apiResource.isLoading()">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span class="ml-2 text-gray-600 dark:text-gray-400">Searching...</span>
          </div>

          <!-- Error State -->
          <div class="p-4 text-center text-red-600 dark:text-red-400" *ngIf="apiResource.error()">
            <p>Failed to load results</p>
            <button
              class="mt-2 px-3 py-1 text-sm bg-red-100 dark:bg-red-900/20 rounded hover:bg-red-200 dark:hover:bg-red-900/40"
              (click)="retrySearch()"
            >
              Retry
            </button>
          </div>

          <!-- No Results -->
          <div
            class="p-8 text-center text-gray-500 dark:text-gray-400"
            *ngIf="
              filteredCommands().length === 0 && !apiResource.isLoading() && !apiResource.error()
            "
          >
            <svg
              class="w-12 h-12 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.657-2.343"
              ></path>
            </svg>
            <p>No commands found</p>
            <p class="text-sm mt-1">Try a different search term</p>
          </div>

          <!-- Command Categories -->
          <div *ngFor="let category of groupedCommands(); let categoryIndex = index">
            <div
              class="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700/50"
            >
              {{ category.name }}
            </div>

            <div
              class="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              *ngFor="let command of category.items; let itemIndex = index"
              [class]="getItemClasses(categoryIndex, itemIndex)"
              (click)="executeCommand(command)"
            >
              <!-- Icon -->
              <div
                class="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3"
              >
                <span class="text-lg">{{ getCommandIcon(command.icon) }}</span>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ command.label }}
                </div>
                <div
                  class="text-xs text-gray-500 dark:text-gray-400 truncate"
                  *ngIf="command.description"
                >
                  {{ command.description }}
                </div>
              </div>

              <!-- Keyboard shortcut hint -->
              <div class="flex-shrink-0 text-xs text-gray-400">
                <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">↵</kbd>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
        >
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-xs mr-1">↑</kbd>
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-xs mr-2">↓</kbd>
                <span>Navigate</span>
              </div>
              <div class="flex items-center">
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-xs mr-2">↵</kbd>
                <span>Select</span>
              </div>
            </div>
            <span>{{ filteredCommands().length }} commands</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }

      :host(.open) {
        pointer-events: all;
      }

      @reference "tailwindcss";

      .selected {
        @apply bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600;
      }

      kbd {
        font-family:
          ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono',
          'Courier New', monospace;
      }
    `,
  ],
})
export class CommandPaletteComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private http = inject(HttpClient);

  // Signals for component state
  isOpen = signal(false);
  searchQuery = signal('');
  selectedIndex = signal(0);

  // Static commands
  private staticCommands: CommandItem[] = [
    {
      id: '1',
      label: 'New File',
      description: 'Create a new file',
      icon: 'file',
      category: 'File',
      action: () => this.handleAction('New File created!'),
    },
    {
      id: '2',
      label: 'New Folder',
      description: 'Create a new folder',
      icon: 'folder',
      category: 'File',
      action: () => this.handleAction('New Folder created!'),
    },
    {
      id: '3',
      label: 'Settings',
      description: 'Open application settings',
      icon: 'settings',
      category: 'System',
      action: () => this.handleAction('Settings opened!'),
    },
    {
      id: '4',
      label: 'Profile',
      description: 'View user profile',
      icon: 'user',
      category: 'User',
      action: () => this.handleAction('Profile opened!'),
    },
  ];

  // HTTP Resource for dynamic commands
  apiResource = httpResource(
    () => {
      const query = this.searchQuery();
      if (!query || query.length < 2) return undefined;

      // This would be your actual API endpoint
      // For demo, we'll simulate with JSONPlaceholder
      return {
        url: `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}`,
        method: 'GET' as const,
      };
    },
    {
      parse: (response) => {
        const data = response as any[]; // assert it is an array
        // Transform API response to CommandItem format
        return data.slice(0, 5).map((post) => ({
          id: `api-${post.id}`,
          label: post.title,
          description: post.body.substring(0, 100) + '...',
          icon: 'document',
          category: 'Search Results',
          action: () => this.handleAction(`Opened post: ${post.title}`),
        }));
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
    // Reset selected index when commands change
    effect(() => {
      this.filteredCommands();
      this.selectedIndex.set(0);
    });

    // Focus input when opened
    effect(() => {
      if (this.isOpen()) {
        setTimeout(() => {
          this.searchInput?.nativeElement?.focus();
        }, 0);
      }
    });

    // Listen for keyboard shortcuts
    this.setupGlobalKeyListener();
  }

  private setupGlobalKeyListener() {
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }
    });
  }

  open() {
    this.isOpen.set(true);
    this.searchQuery.set('');
    this.selectedIndex.set(0);
  }

  close() {
    this.isOpen.set(false);
    this.searchQuery.set('');
  }

  onKeyDown(event: KeyboardEvent) {
    const commands = this.filteredCommands();

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.update((i) => Math.min(i + 1, commands.length - 1));
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.update((i) => Math.max(i - 1, 0));
        break;

      case 'Enter':
        event.preventDefault();
        const selectedCommand = commands[this.selectedIndex()];
        if (selectedCommand) {
          this.executeCommand(selectedCommand);
        }
        break;
    }
  }

  executeCommand(command: CommandItem) {
    command.action();
    this.close();
  }

  retrySearch() {
    // Trigger a retry by clearing and setting the search query
    const currentQuery = this.searchQuery();
    this.searchQuery.set('');
    setTimeout(() => this.searchQuery.set(currentQuery), 0);
  }

  getItemClasses(categoryIndex: number, itemIndex: number): string {
    const globalIndex = this.getGlobalIndex(categoryIndex, itemIndex);
    return globalIndex === this.selectedIndex() ? 'selected' : '';
  }

  private getGlobalIndex(categoryIndex: number, itemIndex: number): number {
    const groups = this.groupedCommands();
    let globalIndex = 0;

    for (let i = 0; i < categoryIndex; i++) {
      globalIndex += groups[i].items.length;
    }

    return globalIndex + itemIndex;
  }

  getCommandIcon(icon?: string): string {
    const iconMap: Record<string, string> = {
      file: '📄',
      folder: '📁',
      settings: '⚙️',
      user: '👤',
      document: '📖',
      search: '🔍',
    };
    return iconMap[icon || 'file'] || '📄';
  }

  private handleAction(message: string) {
    console.log(message);
    // You could show a toast notification here
    alert(message);
  }
}
