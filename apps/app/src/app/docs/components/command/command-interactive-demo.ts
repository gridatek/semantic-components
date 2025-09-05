import { AsyncPipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';

import {
  CommandDialog,
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandShortcut,
} from '@semantic-components/ui';
import { Observable, map } from 'rxjs';

import { CommandCategory, MockCommandService } from './mock-command.service';

@Component({
  selector: 'app-command-interactive-demo',
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
        <h3>Interactive Command Dialog</h3>
        <p class="text-muted-foreground">
          Experience a full-featured command palette in a modal dialog with real commands, keyboard
          shortcuts, and interactive features just like VS Code or GitHub.
        </p>
      </div>

      <!-- Main Demo Section -->
      <div
        class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8"
      >
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

        <sc-command-input [placeholder]="searchPlaceholder" />

        <sc-command-list class="max-h-96">
          <sc-command-empty>
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
          </sc-command-empty>

          @if (commandCategories$ | async; as categories) {
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
        </sc-command-list>
      </sc-command>
    </ng-template>
  `,
})
export class CommandInteractiveDemo implements OnInit {
  commandDialogService = inject(CommandDialog);
  commandCategories$!: Observable<CommandCategory[]>;
  searchPlaceholder = 'Search all commands...';

  @ViewChild('commandTemplate') commandTemplate!: TemplateRef<any>;

  constructor(public commandService: MockCommandService) {}

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
    this.searchPlaceholder = 'Search all commands...';
    this.commandCategories$ = this.commandService.getCommandsByCategory();
    this.showDialog();
  }

  openDialogWithFilter(filter: string) {
    switch (filter) {
      case 'file':
        this.searchPlaceholder = 'Search file operations...';
        this.commandCategories$ = this.commandService
          .getCommandsByCategory()
          .pipe(map((categories) => categories.filter((cat) => cat.id === 'file')));
        break;
      case 'settings':
        this.searchPlaceholder = 'Search settings...';
        this.commandCategories$ = this.commandService
          .getCommandsByCategory()
          .pipe(map((categories) => categories.filter((cat) => cat.id === 'settings')));
        break;
      case 'help':
        this.searchPlaceholder = 'Search help & support...';
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
      backdropClass: ['backdrop-blur-sm', 'bg-black/20'],
    });

    dialogRef.closed.subscribe((result) => {
      console.log('Command dialog closed:', result);
    });
  }

  onCommandSelect(commandId: string) {
    console.log('Command executed:', commandId);
    this.commandService.executeCommand(commandId);
    // Auto-close dialog after command execution
    setTimeout(() => {
      this.commandDialogService.closeAll();
    }, 100);
  }
}
