import { Component } from '@angular/core';

import { CommandPaletteComponent } from '@semantic-components/ui';

@Component({
  selector: 'app-command-demo2',
  imports: [CommandPaletteComponent],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Angular Command Palette Demo
        </h1>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Press
            <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Cmd/Ctrl + K</kbd>
            to open the command palette
          </p>

          <button
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            (click)="commandPalette.open()"
          >
            Open Command Palette
          </button>
        </div>
      </div>
    </div>

    <app-command-palette #commandPalette />
  `,
})
export class CommandDemo2 {}
