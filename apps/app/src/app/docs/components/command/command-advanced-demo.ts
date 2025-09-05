import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandShortcut,
} from '@semantic-components/ui';
import { BehaviorSubject, Observable, debounceTime, map, startWith, switchMap } from 'rxjs';

import { CommandCategory, CommandItem, MockCommandService } from './mock-command.service';

@Component({
  selector: 'app-command-advanced-demo',
  imports: [
    AsyncPipe,
    ScCommand,
    ScCommandInput,
    ScCommandList,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandItem,
    ScCommandSeparator,
    ScCommandShortcut,
  ],
  template: `
    <div class="space-y-6">
      <div class="prose prose-sm max-w-none">
        <h3>Advanced Command Palette with Real Data</h3>
        <p class="text-muted-foreground">
          This demo uses the MockCommandService to provide realistic command palette functionality
          with 25+ commands, categories, search, and interactive features.
        </p>
      </div>

      <!-- Demo Controls -->
      <div class="flex flex-wrap gap-2">
        <button
          class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          (click)="loadRecentCommands()"
        >
          📋 Recent Commands
        </button>
        <button
          class="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
          (click)="loadSuggestedCommands()"
        >
          💡 Suggested Commands
        </button>
        <button
          class="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors"
          (click)="loadAllCommands()"
        >
          📂 All Categories
        </button>
        <button
          class="px-3 py-1 text-xs bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors"
          (click)="loadFileCommands()"
        >
          📄 File Operations Only
        </button>
        <button
          class="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
          (click)="toggleCustomFilter()"
        >
          {{ useCustomFilter ? '🔍 Default Filter' : '✨ Fuzzy Filter' }}
        </button>
      </div>

      <!-- Command Palette -->
      <sc-command
        class="rounded-lg border shadow-md md:min-w-[500px] max-w-2xl"
        [filter]="useCustomFilter ? commandService.fuzzyFilter : undefined"
        (commandSelect)="onCommandSelect($event)"
      >
        <sc-command-input placeholder="Search commands... (try 'file', 'theme', or 'help')" />

        <sc-command-list>
          <sc-command-empty>
            <div class="flex flex-col items-center text-center py-8">
              <div class="text-4xl mb-3">🔍</div>
              <div class="text-lg font-medium mb-1">No commands found</div>
              <div class="text-sm text-muted-foreground mb-3">
                Try searching for "file", "settings", "help", or "theme"
              </div>
              <div class="text-xs text-muted-foreground bg-gray-50 px-3 py-2 rounded-md">
                <strong>Search Tips:</strong>
                Use fuzzy search for partial matches like "newf" → "New File"
              </div>
            </div>
          </sc-command-empty>

          @if (commandCategories$ | async; as categories) {
            @for (category of categories; track category.id) {
              <sc-command-group [heading]="category.label">
                @for (command of category.items; track command.id) {
                  <sc-command-item
                    class="cursor-pointer group"
                    [value]="command.id"
                    [disabled]="command.disabled"
                  >
                    @if (command.icon) {
                      <span class="mr-3 text-lg group-hover:scale-110 transition-transform">
                        {{ command.icon }}
                      </span>
                    }

                    <div class="flex-1 min-w-0">
                      <div class="font-medium truncate">{{ command.label }}</div>
                      @if (command.description) {
                        <div class="text-xs text-muted-foreground truncate">
                          {{ command.description }}
                        </div>
                      }
                    </div>

                    @if (command.shortcut) {
                      <span
                        class="opacity-60 group-hover:opacity-100 transition-opacity"
                        sc-command-shortcut
                      >
                        {{ command.shortcut }}
                      </span>
                    }

                    @if (command.disabled) {
                      <span class="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-2">
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
        </sc-command-list>
      </sc-command>

      <!-- Interactive Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="text-sm bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 class="font-medium text-blue-900 mb-2">🎯 Demo Features</h4>
          <ul class="text-blue-800 space-y-1 text-xs">
            <li>• Real-time search with {{ useCustomFilter ? 'fuzzy' : 'default' }} filtering</li>
            <li>• Keyboard navigation (↑↓ Enter Esc)</li>
            <li>• Mouse hover selection with animations</li>
            <li>• {{ commandCount }} total commands across 6 categories</li>
            <li>• Disabled items ({{ disabledCount }} disabled commands)</li>
            <li>• Toast notifications on command execution</li>
          </ul>
        </div>

        <div class="text-sm bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 class="font-medium text-green-900 mb-2">🧪 Try These Searches</h4>
          <div class="grid grid-cols-2 gap-1 text-xs">
            <button
              class="text-left text-green-800 hover:text-green-600 py-1"
              (click)="searchQuery.next('file')"
            >
              → "file"
            </button>
            <button
              class="text-left text-green-800 hover:text-green-600 py-1"
              (click)="searchQuery.next('settings')"
            >
              → "settings"
            </button>
            <button
              class="text-left text-green-800 hover:text-green-600 py-1"
              (click)="searchQuery.next('theme')"
            >
              → "theme"
            </button>
            <button
              class="text-left text-green-800 hover:text-green-600 py-1"
              (click)="searchQuery.next('help')"
            >
              → "help"
            </button>
            <button
              class="text-left text-green-800 hover:text-green-600 py-1"
              (click)="searchQuery.next('⌘')"
            >
              → "⌘" (shortcuts)
            </button>
            <button
              class="text-left text-green-800 hover:text-green-600 py-1"
              (click)="searchQuery.next('newf')"
            >
              → "newf" (fuzzy)
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CommandAdvancedDemo implements OnInit {
  commandCategories$!: Observable<CommandCategory[]>;
  useCustomFilter = false;
  commandCount = 25;
  disabledCount = 1;

  readonly searchQuery = new BehaviorSubject<string>('');

  constructor(public commandService: MockCommandService) {}

  ngOnInit() {
    this.loadAllCommands();

    // Auto-update search when query changes
    this.searchQuery.pipe(debounceTime(100)).subscribe((query) => {
      // This would typically update the search in a real implementation
      console.log('Search query:', query);
    });
  }

  onCommandSelect(commandId: string) {
    console.log('Command selected:', commandId);
    this.commandService.executeCommand(commandId);
  }

  loadAllCommands() {
    this.commandCategories$ = this.commandService.getCommandsByCategory();
    this.commandCount = 25;
    this.disabledCount = 1;
  }

  loadRecentCommands() {
    this.commandCategories$ = this.commandService.getRecentCommands().pipe(
      map((commands) => [
        {
          id: 'recent',
          label: '📋 Recently Used Commands',
          items: commands,
        },
      ]),
    );
    this.commandCount = 4;
    this.disabledCount = 0;
  }

  loadSuggestedCommands() {
    this.commandCategories$ = this.commandService.getSuggestedCommands().pipe(
      map((commands) => [
        {
          id: 'suggested',
          label: '💡 Suggested Commands',
          items: commands,
        },
      ]),
    );
    this.commandCount = 3;
    this.disabledCount = 0;
  }

  loadFileCommands() {
    this.commandCategories$ = this.commandService
      .getCommandsByCategory()
      .pipe(map((categories) => categories.filter((cat) => cat.id === 'file')));
    this.commandCount = 4;
    this.disabledCount = 0;
  }

  toggleCustomFilter() {
    this.useCustomFilter = !this.useCustomFilter;
  }
}
