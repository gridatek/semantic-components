import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ShortcutMapping } from '../services/keyboard-shortcuts.service';

@Component({
  selector: 'sc-editor-keyboard-shortcuts-help-dialog',
  imports: [],
  template: `
    <div class="max-w-2xl p-4">
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Keyboard Shortcuts</h3>
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        @for (shortcut of shortcuts; track shortcut.key) {
          <div class="flex items-center justify-between rounded bg-gray-50 p-2 dark:bg-gray-800">
            <span class="text-sm text-gray-900 dark:text-white">{{ shortcut.description }}</span>
            <kbd
              class="inline-flex items-center rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {{ formatShortcut(shortcut) }}
            </kbd>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorKeyboardShortcutsHelpDialog {
  private readonly data = inject<ShortcutMapping[]>(DIALOG_DATA);

  get shortcuts() {
    return this.data || [];
  }

  formatShortcut(shortcut: any): string {
    const parts: string[] = [];

    if (shortcut.ctrlOrCmd) {
      parts.push(navigator.platform.indexOf('Mac') > -1 ? '⌘' : 'Ctrl');
    }

    if (shortcut.shift) {
      parts.push('Shift');
    }

    if (shortcut.alt) {
      parts.push('Alt');
    }

    parts.push(shortcut.key.toUpperCase());

    return parts.join(' + ');
  }
}
