import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScCommand } from './command';
import { CommandDialog } from './command-dialog';
import { ScCommandEmpty } from './command-empty';
import { ScCommandGroup } from './command-group';
import { ScCommandInput } from './command-input';
import { ScCommandItem } from './command-item';
import { ScCommandList } from './command-list';
import { ScCommandSeparator } from './command-separator';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category: string;
  action: () => void;
  disabled?: boolean;
}

export interface CommandTriggerConfig {
  title?: string;
  description?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  apiUrl?: string;
  staticCommands?: CommandItem[];
  enableGlobalShortcut?: boolean;
  shortcutKey?: string; // The key for the shortcut (default: 'k')
  requiresShift?: boolean; // Whether Shift key is required (default: false)
}

@Component({
  selector: 'sc-command-trigger',
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
    <!-- Trigger Button -->
    <button
      class="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      [class]="triggerClass()"
      (click)="openDialog()"
      type="button"
    >
      <ng-content select="[slot=icon]">
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </ng-content>

      <ng-content>
        <span>Search commands...</span>
      </ng-content>

      <ng-content select="[slot=shortcut]">
        <kbd class="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs font-mono">
          {{ keyboardShortcut() }}
        </kbd>
      </ng-content>
    </button>

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
          [placeholder]="config().placeholder || 'Search commands...'"
          (search)="onSearchChange($event)"
        />

        <sc-command-list class="max-h-96">
          <!-- Loading State -->
          @if (apiResource.isLoading()) {
            <div class="flex items-center justify-center py-8">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span class="ml-2 text-gray-600">Loading results...</span>
            </div>
          }

          <!-- Error State -->
          @if (apiResource.error()) {
            <div class="p-4 text-center text-red-600">
              <p class="mb-2">Failed to load results</p>
              <button
                class="px-3 py-1 text-sm bg-red-100 rounded hover:bg-red-200"
                (click)="retrySearch()"
              >
                Retry
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
                } @else if (searchQuery().length < 2 && config().apiUrl) {
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
                <sc-command-item
                  class="cursor-pointer group relative"
                  [class.opacity-50]="command.disabled"
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

                  @if (command.id.startsWith('api-')) {
                    <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded ml-2">
                      API
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
        </sc-command-list>
      </sc-command>
    </ng-template>
  `,
  styles: [
    `
      @reference "tailwindcss";
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandTrigger {
  @ViewChild('commandTemplate') commandTemplate!: TemplateRef<any>;

  private http = inject(HttpClient);
  commandDialogService = inject(CommandDialog);

  // Inputs
  config = input<CommandTriggerConfig>({});
  triggerClass = input<string>('');

  // Outputs
  commandExecuted = output<CommandItem>();
  dialogOpened = output<void>();
  dialogClosed = output<any>();

  // Signals for reactive state
  searchQuery = signal('');

  // OS detection for keyboard shortcuts
  isMac = computed(() => {
    if (typeof navigator !== 'undefined') {
      return (
        navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
        navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
      );
    }
    return false;
  });

  keyboardShortcut = computed(() => {
    const key = this.config().shortcutKey?.toUpperCase() || 'K';
    const shift = this.config().requiresShift ? '+Shift' : '';
    const base = this.isMac() ? '⌘' : 'Ctrl';
    return `${base}${shift}+${key}`;
  });

  // Default static commands
  private defaultCommands: CommandItem[] = [
    {
      id: 'search',
      label: 'Search',
      description: 'Search for items',
      icon: '🔍',
      category: 'General',
      action: () => this.showNotification('Search opened'),
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Open settings',
      icon: '⚙️',
      category: 'General',
      action: () => this.showNotification('Settings opened'),
    },
  ];

  // HTTP Resource for dynamic commands
  apiResource = httpResource(
    () => {
      const query = this.searchQuery();
      const apiUrl = this.config().apiUrl;

      if (!apiUrl || !query || query.length < 2) return undefined;

      return {
        url: `${apiUrl}?q=${encodeURIComponent(query)}`,
        method: 'GET' as const,
      };
    },
    {
      parse: (response) => {
        const data = response as any[];
        return data.slice(0, 5).map(
          (item, index): CommandItem => ({
            id: `api-${item.id || index}`,
            label: item.title || item.name || item.label || `Result ${index + 1}`,
            description: item.description || item.body?.substring(0, 60) + '...' || '',
            icon: '🔍',
            category: 'Search Results',
            action: () => this.showNotification(`Opened: ${item.title || item.name || 'Item'}`),
          }),
        );
      },
    },
  );

  // Computed properties
  filteredCommands = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const staticCommands = (this.config().staticCommands || this.defaultCommands).filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(query) ||
        cmd.description?.toLowerCase().includes(query) ||
        cmd.category.toLowerCase().includes(query),
    );

    const apiCommands = this.apiResource.hasValue() ? this.apiResource.value() : [];
    return [...staticCommands, ...apiCommands];
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
    // Global keyboard shortcut if enabled
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        const config = this.config();

        if (config.enableGlobalShortcut === false) return;

        const targetKey = config.shortcutKey?.toLowerCase() || 'k';
        const requiresShift = config.requiresShift || false;

        const hasModifier = e.metaKey || e.ctrlKey;
        const hasShift = e.shiftKey;
        const keyMatches = e.key.toLowerCase() === targetKey;

        if (hasModifier && keyMatches && hasShift === requiresShift) {
          e.preventDefault();
          this.openDialog();
        }
      });
    }
  }

  openDialog() {
    this.searchQuery.set('');
    this.dialogOpened.emit();

    const dialogRef = this.commandDialogService.openTemplate(this.commandTemplate, {
      title: this.config().title || 'Command Palette',
      description: this.config().description || 'Search and execute commands',
      width: this.config().width || '700px',
      height: this.config().height || '550px',
      disableClose: false,
      hasBackdrop: true,
      backdropClass: ['backdrop-blur-sm', 'bg-black/20'],
    });

    dialogRef.closed.subscribe((result) => {
      this.dialogClosed.emit(result);
    });
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  onCommandSelect(commandId: string) {
    const allCommands = this.filteredCommands();
    const command = allCommands.find((cmd) => cmd.id === commandId);

    if (command && !command.disabled) {
      command.action();
      this.commandExecuted.emit(command);

      // Auto-close dialog after command execution
      setTimeout(() => {
        this.commandDialogService.closeAll();
      }, 100);
    }
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

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2700);
  }
}
