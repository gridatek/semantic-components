import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { CommandDialog } from './command-dialog';

export interface CommandItemModel {
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
  width?: string;
  height?: string;
  placeholder?: string;
  apiUrl?: string;
  staticCommands?: CommandItemModel[];
  enableGlobalShortcut?: boolean;
  shortcutKey?: string; // The key for the shortcut (default: 'k')
  requiresShift?: boolean; // Whether Shift key is required (default: false)
}

@Component({
  selector: 'sc-command-trigger',
  imports: [],
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
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandTrigger {
  commandDialogService = inject(CommandDialog);

  // Inputs
  config = input<CommandTriggerConfig>({});
  triggerClass = input<string>('');
  dialogTemplate = input<TemplateRef<any> | null>(null);

  // Outputs
  dialogOpened = output<void>();
  dialogClosed = output<any>();

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
    this.dialogOpened.emit();

    const template = this.dialogTemplate();
    if (!template) {
      console.warn('ScCommandTrigger: No dialog template provided');
      return;
    }

    const dialogRef = this.commandDialogService.openTemplate(template, {
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
}
