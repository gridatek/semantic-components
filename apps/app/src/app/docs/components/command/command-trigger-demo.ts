import { HttpClient, httpResource } from '@angular/common/http';
import { Component, TemplateRef, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CommandTriggerConfig,
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandTrigger,
} from '@semantic-components/ui';

export interface CommandItemModel {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category: string;
  action: () => void;
  disabled?: boolean;
}

@Component({
  selector: 'app-command-trigger-demo',
  imports: [
    FormsModule,
    ScCommandTrigger,
    ScCommand,
    ScCommandInput,
    ScCommandList,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandItem,
  ],
  template: `
    <div class="space-y-8">
      <div class="prose prose-sm max-w-none">
        <h3>Command Trigger Component</h3>
        <p class="text-muted-foreground">
          Reusable command trigger component with configurable options, API integration, and custom
          styling.
        </p>
      </div>

      <!-- Basic Usage -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Basic Usage</h4>
        <div class="flex flex-wrap gap-4">
          <button [config]="basicConfig" sc-command-trigger>Default</button>

          <button [config]="basicConfig" sc-command-trigger>Custom Search</button>

          <button
            [config]="basicConfig"
            sc-command-trigger
            triggerClass="bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
          >
            <span slot="icon">🚀</span>
            Launch Commands
            <span slot="shortcut">⌘K</span>
          </button>
        </div>
      </div>

      <!-- With API Integration -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">With API Integration</h4>
        <div class="flex gap-4">
          <button
            [config]="apiConfig"
            (commandExecuted)="onCommandExecuted($event)"
            sc-command-trigger
          >
            <span slot="icon">🌐</span>
            Search API
          </button>
        </div>
        <div class="text-sm text-gray-600">Type 2+ characters to search JSONPlaceholder API</div>
      </div>

      <!-- Custom Commands -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Custom Commands</h4>
        <div class="flex gap-4">
          <button
            [config]="customConfig"
            sc-command-trigger
            triggerClass="bg-green-50 border-green-300 text-green-800 hover:bg-green-100"
          >
            <span slot="icon">⚡</span>
            Quick Actions
          </button>
        </div>
      </div>

      <!-- Multiple Sizes -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Different Sizes</h4>
        <div class="flex flex-wrap items-center gap-4">
          <button [config]="smallConfig" sc-command-trigger triggerClass="px-2 py-1 text-xs">
            Small
          </button>

          <button [config]="basicConfig" sc-command-trigger>Default</button>

          <button [config]="largeConfig" sc-command-trigger triggerClass="px-4 py-3 text-lg">
            Large
          </button>
        </div>
      </div>

      <!-- Different Keyboard Shortcuts -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Different Keyboard Shortcuts</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            [config]="basicConfig"
            [dialogTemplate]="basicTemplate"
            (dialogOpened)="onDialogOpened('Basic')"
            (dialogClosed)="onDialogClosed($event)"
            sc-command-trigger
          >
            <span slot="icon">⌘</span>
            Basic Commands
          </button>

          <button
            [config]="apiConfig"
            [dialogTemplate]="apiTemplate"
            (dialogOpened)="onDialogOpened('API Search')"
            (dialogClosed)="onDialogClosed($event)"
            sc-command-trigger
          >
            <span slot="icon">🌐</span>
            API Search
          </button>

          <button
            [config]="customConfig"
            [dialogTemplate]="customTemplate"
            (dialogOpened)="onDialogOpened('Quick Actions')"
            (dialogClosed)="onDialogClosed($event)"
            sc-command-trigger
          >
            <span slot="icon">⚡</span>
            Quick Actions
          </button>

          <button
            [config]="smallConfig"
            [dialogTemplate]="basicTemplate"
            (dialogOpened)="onDialogOpened('Quick Search')"
            sc-command-trigger
          >
            <span slot="icon">🔍</span>
            Quick Search
          </button>

          <button
            [config]="largeConfig"
            [dialogTemplate]="customTemplate"
            (dialogOpened)="onDialogOpened('Advanced')"
            sc-command-trigger
          >
            <span slot="icon">🚀</span>
            Advanced
          </button>

          <button
            [config]="eventConfig"
            [dialogTemplate]="eventTemplate"
            (dialogOpened)="onDialogOpened('Events')"
            sc-command-trigger
          >
            <span slot="icon">📊</span>
            Events
          </button>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h5 class="font-medium text-amber-800 mb-2">⌨️ Try These Shortcuts:</h5>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-amber-700">
            <div>
              <kbd class="bg-white px-2 py-1 rounded border text-xs">Ctrl+K</kbd>
              Basic
            </div>
            <div>
              <kbd class="bg-white px-2 py-1 rounded border text-xs">Ctrl+P</kbd>
              API Search
            </div>
            <div>
              <kbd class="bg-white px-2 py-1 rounded border text-xs">Ctrl+J</kbd>
              Quick Actions
            </div>
            <div>
              <kbd class="bg-white px-2 py-1 rounded border text-xs">Ctrl+Q</kbd>
              Quick Search
            </div>
            <div>
              <kbd class="bg-white px-2 py-1 rounded border text-xs">Ctrl+Shift+P</kbd>
              Advanced
            </div>
            <div>
              <kbd class="bg-white px-2 py-1 rounded border text-xs">Ctrl+E</kbd>
              Events
            </div>
          </div>
        </div>
      </div>

      <!-- Event Handling Demo -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Event Handling</h4>
        <div class="flex gap-4">
          <button
            [config]="eventConfig"
            (dialogClosed)="onDialogClosed($event)"
            (commandExecuted)="onCommandExecuted($event)"
            sc-command-trigger
          >
            <span slot="icon">📊</span>
            Events Demo
          </button>
        </div>
        @if (lastEvent) {
          <div class="p-3 bg-blue-50 rounded-lg text-sm">
            <strong>Last Event:</strong>
            {{ lastEvent }}
          </div>
        }
      </div>

      <!-- Usage Examples -->
      <div class="bg-gray-50 rounded-lg p-6">
        <h4 class="font-medium mb-4">Usage Examples</h4>
        <div class="space-y-4 text-sm">
          <div>
            <strong>Basic:</strong>
            <pre
              class="bg-white p-2 rounded mt-1 text-xs overflow-x-auto"
            ><code>&lt;sc-command-trigger /&gt;</code></pre>
          </div>

          <div>
            <strong>With API:</strong>
            <pre
              class="bg-white p-2 rounded mt-1 text-xs overflow-x-auto"
            ><code>&lt;sc-command-trigger [config]="&#123; apiUrl: 'https://api.example.com/search' &#125;" /&gt;</code></pre>
          </div>

          <div>
            <strong>Custom Commands:</strong>
            <pre
              class="bg-white p-2 rounded mt-1 text-xs overflow-x-auto"
            ><code>&lt;sc-command-trigger [config]="&#123; staticCommands: myCommands &#125;" /&gt;</code></pre>
          </div>

          <div>
            <strong>Custom Content:</strong>
            <pre
              class="bg-white p-2 rounded mt-1 text-xs overflow-x-auto"
            ><code>&lt;sc-command-trigger&gt;
  &lt;span slot="icon"&gt;🔍&lt;/span&gt;
  Search Everything
&lt;/sc-command-trigger&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog Templates -->

    <!-- Basic Template -->
    <ng-template #basicTemplate>
      <sc-command (commandSelect)="onCommandSelect($event, 'basic')">
        <sc-command-input
          [(ngModel)]="basicSearchQuery"
          (search)="onSearchChange($event, 'basic')"
          placeholder="Search basic commands..."
        />
        <sc-command-list class="max-h-96">
          @if (filteredBasicCommands().length === 0) {
            <sc-command-empty>
              <div class="text-center py-8">
                <div class="text-4xl mb-2">🔍</div>
                <div class="text-sm text-gray-500">No commands found</div>
              </div>
            </sc-command-empty>
          }

          @for (group of groupedBasicCommands(); track group.name) {
            <sc-command-group [heading]="group.name">
              @for (command of group.items; track command.id) {
                <sc-command-item class="cursor-pointer" [value]="command.id">
                  @if (command.icon) {
                    <span class="mr-2">{{ command.icon }}</span>
                  }
                  <div class="flex-1">
                    <div class="font-medium">{{ command.label }}</div>
                    @if (command.description) {
                      <div class="text-xs text-gray-500">{{ command.description }}</div>
                    }
                  </div>
                </sc-command-item>
              }
            </sc-command-group>
          }
        </sc-command-list>
      </sc-command>
    </ng-template>

    <!-- API Template -->
    <ng-template #apiTemplate>
      <sc-command (commandSelect)="onCommandSelect($event, 'api')">
        <sc-command-input
          [(ngModel)]="apiSearchQuery"
          (search)="onSearchChange($event, 'api')"
          placeholder="Search API... (type 2+ chars)"
        />
        <sc-command-list class="max-h-96">
          @if (apiResource.isLoading()) {
            <div class="flex items-center justify-center py-8">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span class="ml-2 text-gray-600">Loading API results...</span>
            </div>
          }

          @if (apiResource.error()) {
            <div class="p-4 text-center text-red-600">
              <p class="mb-2">Failed to load results</p>
              <button
                class="px-3 py-1 text-sm bg-red-100 rounded hover:bg-red-200"
                (click)="retryApiSearch()"
              >
                Retry
              </button>
            </div>
          }

          @if (filteredApiCommands().length === 0 && !apiResource.isLoading()) {
            <sc-command-empty>
              <div class="text-center py-8">
                <div class="text-4xl mb-2">🌐</div>
                <div class="text-sm text-gray-500">
                  @if (apiSearchQuery().length < 2) {
                    Type 2+ characters to search API
                  } @else {
                    No API results found
                  }
                </div>
              </div>
            </sc-command-empty>
          }

          @for (group of groupedApiCommands(); track group.name) {
            <sc-command-group [heading]="group.name">
              @for (command of group.items; track command.id) {
                <sc-command-item class="cursor-pointer" [value]="command.id">
                  @if (command.icon) {
                    <span class="mr-2">{{ command.icon }}</span>
                  }
                  <div class="flex-1">
                    <div class="font-medium">{{ command.label }}</div>
                    @if (command.description) {
                      <div class="text-xs text-gray-500">{{ command.description }}</div>
                    }
                  </div>
                  <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">API</span>
                </sc-command-item>
              }
            </sc-command-group>
          }
        </sc-command-list>
      </sc-command>
    </ng-template>

    <!-- Custom Template -->
    <ng-template #customTemplate>
      <sc-command (commandSelect)="onCommandSelect($event, 'custom')">
        <sc-command-input
          [(ngModel)]="customSearchQuery"
          (search)="onSearchChange($event, 'custom')"
          placeholder="Search quick actions..."
        />
        <sc-command-list class="max-h-96">
          @for (group of groupedCustomCommands(); track group.name) {
            <sc-command-group [heading]="group.name">
              @for (command of group.items; track command.id) {
                <sc-command-item
                  class="cursor-pointer"
                  [value]="command.id"
                  [disabled]="command.disabled"
                  [class.opacity-50]="command.disabled"
                >
                  @if (command.icon) {
                    <span class="mr-2">{{ command.icon }}</span>
                  }
                  <div class="flex-1">
                    <div class="font-medium">{{ command.label }}</div>
                    @if (command.description) {
                      <div class="text-xs text-gray-500">{{ command.description }}</div>
                    }
                  </div>
                  @if (command.disabled) {
                    <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Disabled</span>
                  }
                </sc-command-item>
              }
            </sc-command-group>
          }
        </sc-command-list>
      </sc-command>
    </ng-template>

    <!-- Event Template -->
    <ng-template #eventTemplate>
      <sc-command (commandSelect)="onCommandSelect($event, 'event')">
        <sc-command-input
          [(ngModel)]="eventSearchQuery"
          (search)="onSearchChange($event, 'event')"
          placeholder="Search events..."
        />
        <sc-command-list class="max-h-96">
          @for (group of groupedEventCommands(); track group.name) {
            <sc-command-group [heading]="group.name">
              @for (command of group.items; track command.id) {
                <sc-command-item class="cursor-pointer" [value]="command.id">
                  @if (command.icon) {
                    <span class="mr-2">{{ command.icon }}</span>
                  }
                  <div class="flex-1">
                    <div class="font-medium">{{ command.label }}</div>
                    @if (command.description) {
                      <div class="text-xs text-gray-500">{{ command.description }}</div>
                    }
                  </div>
                </sc-command-item>
              }
            </sc-command-group>
          }
        </sc-command-list>
      </sc-command>
    </ng-template>
  `,
})
export class CommandTriggerDemo {
  readonly basicTemplate = viewChild.required<TemplateRef<any>>('basicTemplate');
  readonly apiTemplate = viewChild.required<TemplateRef<any>>('apiTemplate');
  readonly customTemplate = viewChild.required<TemplateRef<any>>('customTemplate');
  readonly eventTemplate = viewChild.required<TemplateRef<any>>('eventTemplate');

  private http = inject(HttpClient);

  // Signals for search queries
  basicSearchQuery = signal('');
  apiSearchQuery = signal('');
  customSearchQuery = signal('');
  eventSearchQuery = signal('');

  lastEvent = '';

  // HTTP Resource for API search
  apiResource = httpResource(
    () => {
      const query = this.apiSearchQuery();
      if (!query || query.length < 2) return undefined;

      return {
        url: `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}`,
        method: 'GET' as const,
      };
    },
    {
      parse: (response) => {
        const data = response as any[];
        return data.slice(0, 5).map(
          (post): CommandItemModel => ({
            id: `api-${post.id}`,
            label: post.title.substring(0, 30) + '...',
            description: post.body.substring(0, 60) + '...',
            icon: '🔍',
            category: 'Search Results',
            action: () => this.showAlert(`API: ${post.title}`),
          }),
        );
      },
    },
  );

  // Basic configuration
  basicConfig: CommandTriggerConfig = {
    title: 'Command Palette',
    description: 'Search and execute commands',
  };

  // API configuration
  apiConfig: CommandTriggerConfig = {
    title: 'API Search',
    description: 'Search with real-time API results',
    placeholder: 'Type to search API...',
    apiUrl: 'https://jsonplaceholder.typicode.com/posts',
    width: '800px',
    shortcutKey: 'p', // Ctrl+P for API search
  };

  // Custom commands configuration
  customConfig: CommandTriggerConfig = {
    title: 'Quick Actions',
    description: 'Predefined quick actions',
    shortcutKey: 'j', // Ctrl+J for quick actions
    staticCommands: [
      {
        id: 'create-project',
        label: 'Create New Project',
        description: 'Start a new project from template',
        icon: '📁',
        category: 'Project',
        action: () => this.showAlert('Creating new project...'),
      },
      {
        id: 'deploy',
        label: 'Deploy to Production',
        description: 'Deploy current branch to production',
        icon: '🚀',
        category: 'Deploy',
        action: () => this.showAlert('Deploying to production...'),
      },
      {
        id: 'run-tests',
        label: 'Run All Tests',
        description: 'Execute the complete test suite',
        icon: '🧪',
        category: 'Testing',
        action: () => this.showAlert('Running tests...'),
      },
      {
        id: 'backup',
        label: 'Create Backup',
        description: 'Create a full system backup',
        icon: '💾',
        category: 'System',
        action: () => this.showAlert('Creating backup...'),
        disabled: true,
      },
    ],
  };

  // Small configuration
  smallConfig: CommandTriggerConfig = {
    title: 'Quick Search',
    height: '400px',
    width: '500px',
    shortcutKey: 'q', // Ctrl+Q for quick search
  };

  // Large configuration
  largeConfig: CommandTriggerConfig = {
    title: 'Advanced Command Center',
    description: 'Full-featured command interface',
    height: '700px',
    width: '900px',
    placeholder: 'Search commands, files, actions...',
    shortcutKey: 'p',
    requiresShift: true, // Ctrl+Shift+P for advanced commands
  };

  // Event handling configuration
  eventConfig: CommandTriggerConfig = {
    title: 'Events Demo',
    description: 'Demonstrates event handling',
    shortcutKey: 'e', // Ctrl+E for events
    staticCommands: [
      {
        id: 'event-1',
        label: 'Trigger Event 1',
        description: 'Test event handling',
        icon: '1️⃣',
        category: 'Events',
        action: () => this.showAlert('Event 1 executed!'),
      },
      {
        id: 'event-2',
        label: 'Trigger Event 2',
        description: 'Another event test',
        icon: '2️⃣',
        category: 'Events',
        action: () => this.showAlert('Event 2 executed!'),
      },
    ],
  };

  // Basic commands data
  basicCommands: CommandItemModel[] = [
    {
      id: 'search',
      label: 'Search',
      description: 'Search for items',
      icon: '🔍',
      category: 'General',
      action: () => this.showAlert('Search opened'),
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Open settings',
      icon: '⚙️',
      category: 'General',
      action: () => this.showAlert('Settings opened'),
    },
    {
      id: 'help',
      label: 'Help',
      description: 'Get help',
      icon: '❓',
      category: 'Support',
      action: () => this.showAlert('Help opened'),
    },
  ];

  // Computed properties for filtering
  filteredBasicCommands = computed(() => {
    const query = this.basicSearchQuery().toLowerCase();
    return this.basicCommands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(query) || cmd.description?.toLowerCase().includes(query),
    );
  });

  filteredApiCommands = computed(() => {
    return this.apiResource.hasValue() ? this.apiResource.value() : [];
  });

  filteredCustomCommands = computed(() => {
    const query = this.customSearchQuery().toLowerCase();
    return (
      this.customConfig.staticCommands?.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query) || cmd.description?.toLowerCase().includes(query),
      ) || []
    );
  });

  filteredEventCommands = computed(() => {
    const query = this.eventSearchQuery().toLowerCase();
    return (
      this.eventConfig.staticCommands?.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query) || cmd.description?.toLowerCase().includes(query),
      ) || []
    );
  });

  // Grouped commands
  groupedBasicCommands = computed(() => {
    const commands = this.filteredBasicCommands();
    const groups = commands.reduce(
      (acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
      },
      {} as Record<string, CommandItemModel[]>,
    );

    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  });

  groupedApiCommands = computed(() => {
    const commands = this.filteredApiCommands();
    const groups = commands.reduce(
      (acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
      },
      {} as Record<string, CommandItemModel[]>,
    );

    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  });

  groupedCustomCommands = computed(() => {
    const commands = this.filteredCustomCommands();
    const groups = commands.reduce(
      (acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
      },
      {} as Record<string, CommandItemModel[]>,
    );

    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  });

  groupedEventCommands = computed(() => {
    const commands = this.filteredEventCommands();
    const groups = commands.reduce(
      (acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
      },
      {} as Record<string, CommandItemModel[]>,
    );

    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  });

  onDialogOpened(type: string) {
    this.lastEvent = `${type} dialog opened`;
    console.log(`${type} dialog opened`);
  }

  onDialogClosed(result: any) {
    this.lastEvent = `Dialog closed with result: ${result}`;
    console.log('Command dialog closed:', result);
  }

  onCommandExecuted(command: any) {
    this.lastEvent = `Command executed: ${command.label}`;
    console.log('Command executed:', command);
  }

  onSearchChange(query: string, type: string) {
    switch (type) {
      case 'basic':
        this.basicSearchQuery.set(query);
        break;
      case 'api':
        this.apiSearchQuery.set(query);
        break;
      case 'custom':
        this.customSearchQuery.set(query);
        break;
      case 'event':
        this.eventSearchQuery.set(query);
        break;
    }
  }

  onCommandSelect(commandId: string, type: string) {
    console.log(`Command selected: ${commandId} from ${type}`);

    // Find and execute command based on type
    let command: CommandItemModel | undefined;

    switch (type) {
      case 'basic':
        command = this.basicCommands.find((cmd) => cmd.id === commandId);
        break;
      case 'api':
        command = this.filteredApiCommands().find((cmd) => cmd.id === commandId);
        break;
      case 'custom':
        command = this.customConfig.staticCommands?.find((cmd) => cmd.id === commandId);
        break;
      case 'event':
        command = this.eventConfig.staticCommands?.find((cmd) => cmd.id === commandId);
        break;
    }

    if (command && !command.disabled) {
      command.action();
      this.onCommandExecuted(command);
    }
  }

  retryApiSearch() {
    const currentQuery = this.apiSearchQuery();
    this.apiSearchQuery.set('');
    setTimeout(() => this.apiSearchQuery.set(currentQuery), 0);
  }

  private showAlert(message: string) {
    // In a real app, you'd show a proper toast/notification
    alert(message);
  }
}
