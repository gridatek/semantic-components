import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScCard, ScCardContent, ScCardHeader, ScCardTitle } from '@semantic-components/ui';

import { ShortcutMapping } from './keyboard-shortcuts.service';

@Component({
  selector: 'sc-editor-keyboard-shortcuts-help-dialog',
  imports: [ScCard, ScCardHeader, ScCardTitle, ScCardContent],
  template: `
    <div class="max-w-2xl" sc-card>
      <div sc-card-header>
        <h2 sc-card-title>Keyboard Shortcuts</h2>
      </div>
      <div sc-card-content>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          @for (shortcut of shortcuts; track shortcut.key) {
            <div
              class="flex items-center justify-between rounded-md border border-border bg-background/50 p-3"
            >
              <span class="text-sm font-medium">{{ shortcut.description }}</span>
              <kbd
                class="inline-flex items-center rounded border border-border bg-muted px-2 py-1 text-xs font-mono text-muted-foreground"
              >
                {{ formatShortcut(shortcut) }}
              </kbd>
            </div>
          }
        </div>
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
