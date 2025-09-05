import { Component } from '@angular/core';

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

@Component({
  selector: 'app-command-basic-demo',
  imports: [
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
    <div class="space-y-4">
      <div class="prose prose-sm max-w-none">
        <h3>Simple Command Palette</h3>
        <p class="text-muted-foreground">
          A basic command palette implementation showing the core components and their usage.
        </p>
      </div>

      <sc-command
        class="rounded-lg border shadow-md md:min-w-[450px]"
        (commandSelect)="onCommandSelect($event)"
      >
        <sc-command-input placeholder="Type a command or search..." />
        <sc-command-list>
          <sc-command-empty>
            <div class="text-center py-6 text-muted-foreground">
              No results found. Try searching for something else.
            </div>
          </sc-command-empty>

          <sc-command-group heading="Quick Actions">
            <sc-command-item value="new-document">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>New Document</span>
              <span sc-command-shortcut>⌘N</span>
            </sc-command-item>

            <sc-command-item value="open-file">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 1v6m8-6v6"
                />
              </svg>
              <span>Open File</span>
              <span sc-command-shortcut>⌘O</span>
            </sc-command-item>

            <sc-command-item value="save">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              <span>Save</span>
              <span sc-command-shortcut>⌘S</span>
            </sc-command-item>
          </sc-command-group>

          <sc-command-separator />

          <sc-command-group heading="Navigation">
            <sc-command-item value="go-to-line">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              <span>Go to Line</span>
              <span sc-command-shortcut>⌘G</span>
            </sc-command-item>

            <sc-command-item value="find">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Find in Files</span>
              <span sc-command-shortcut>⌘F</span>
            </sc-command-item>
          </sc-command-group>

          <sc-command-separator />

          <sc-command-group heading="Settings">
            <sc-command-item value="preferences">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Preferences</span>
              <span sc-command-shortcut>⌘,</span>
            </sc-command-item>

            <sc-command-item value="theme" disabled>
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                />
              </svg>
              <span>Change Theme (Coming Soon)</span>
            </sc-command-item>
          </sc-command-group>
        </sc-command-list>
      </sc-command>

      <!-- Usage Instructions -->
      <div class="text-sm text-muted-foreground bg-gray-50 rounded-lg p-4">
        <div class="font-medium mb-2">How to Use:</div>
        <ul class="space-y-1 text-xs">
          <li>• Type to search and filter commands</li>
          <li>• Use arrow keys (↑↓) to navigate</li>
          <li>• Press Enter to select a command</li>
          <li>• Press Escape to clear search</li>
          <li>• Click on any command to select it</li>
          <li>• Some commands may be disabled (grayed out)</li>
        </ul>
      </div>
    </div>
  `,
})
export class CommandBasicDemo {
  onCommandSelect(value: string) {
    console.log('Selected command:', value);

    // Simple notification
    const message = `Command "${value}" executed!`;
    console.log(message);

    // Show a simple alert (in a real app, you'd use a toast service)
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div');
      notification.className =
        'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300';
      notification.textContent = message;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }
  }
}
