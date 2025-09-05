import { Component } from '@angular/core';

import { CommandItem, CommandTriggerConfig, ScCommandTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-command-trigger-demo',
  imports: [ScCommandTrigger],
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
          <sc-command-trigger [config]="basicConfig" />

          <sc-command-trigger [config]="basicConfig">Custom Search</sc-command-trigger>

          <sc-command-trigger
            [config]="basicConfig"
            triggerClass="bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
          >
            <span slot="icon">🚀</span>
            Launch Commands
            <span slot="shortcut">⌘K</span>
          </sc-command-trigger>
        </div>
      </div>

      <!-- With API Integration -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">With API Integration</h4>
        <div class="flex gap-4">
          <sc-command-trigger [config]="apiConfig" (commandExecuted)="onCommandExecuted($event)">
            <span slot="icon">🌐</span>
            Search API
          </sc-command-trigger>
        </div>
        <div class="text-sm text-gray-600">Type 2+ characters to search JSONPlaceholder API</div>
      </div>

      <!-- Custom Commands -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Custom Commands</h4>
        <div class="flex gap-4">
          <sc-command-trigger
            [config]="customConfig"
            triggerClass="bg-green-50 border-green-300 text-green-800 hover:bg-green-100"
          >
            <span slot="icon">⚡</span>
            Quick Actions
          </sc-command-trigger>
        </div>
      </div>

      <!-- Multiple Sizes -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Different Sizes</h4>
        <div class="flex flex-wrap items-center gap-4">
          <sc-command-trigger [config]="smallConfig" triggerClass="px-2 py-1 text-xs">
            Small
          </sc-command-trigger>

          <sc-command-trigger [config]="basicConfig">Default</sc-command-trigger>

          <sc-command-trigger [config]="largeConfig" triggerClass="px-4 py-3 text-lg">
            Large
          </sc-command-trigger>
        </div>
      </div>

      <!-- Different Keyboard Shortcuts -->
      <div class="space-y-4">
        <h4 class="text-lg font-medium">Different Keyboard Shortcuts</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <sc-command-trigger [config]="basicConfig">
            <span slot="icon">⌘</span>
            Basic Commands
          </sc-command-trigger>

          <sc-command-trigger [config]="apiConfig">
            <span slot="icon">🌐</span>
            API Search
          </sc-command-trigger>

          <sc-command-trigger [config]="customConfig">
            <span slot="icon">⚡</span>
            Quick Actions
          </sc-command-trigger>

          <sc-command-trigger [config]="smallConfig">
            <span slot="icon">🔍</span>
            Quick Search
          </sc-command-trigger>

          <sc-command-trigger [config]="largeConfig">
            <span slot="icon">🚀</span>
            Advanced
          </sc-command-trigger>

          <sc-command-trigger [config]="eventConfig">
            <span slot="icon">📊</span>
            Events
          </sc-command-trigger>
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
          <sc-command-trigger
            [config]="eventConfig"
            (dialogOpened)="onDialogOpened()"
            (dialogClosed)="onDialogClosed($event)"
            (commandExecuted)="onCommandExecuted($event)"
          >
            <span slot="icon">📊</span>
            Events Demo
          </sc-command-trigger>
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
  `,
})
export class CommandTriggerDemo {
  lastEvent = '';

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

  onDialogOpened() {
    this.lastEvent = 'Dialog opened';
    console.log('Command dialog opened');
  }

  onDialogClosed(result: any) {
    this.lastEvent = `Dialog closed with result: ${result}`;
    console.log('Command dialog closed:', result);
  }

  onCommandExecuted(command: CommandItem) {
    this.lastEvent = `Command executed: ${command.label}`;
    console.log('Command executed:', command);
  }

  private showAlert(message: string) {
    // In a real app, you'd show a proper toast/notification
    alert(message);
  }
}
