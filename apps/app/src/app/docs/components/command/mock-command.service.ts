import { Injectable } from '@angular/core';

import { Observable, delay, of } from 'rxjs';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  shortcut?: string;
  category: string;
  action: () => void;
  disabled?: boolean;
}

export interface CommandCategory {
  id: string;
  label: string;
  items: CommandItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MockCommandService {
  private commands: CommandItem[] = [
    // File operations
    {
      id: 'new-file',
      label: 'New File',
      description: 'Create a new file',
      icon: '📄',
      shortcut: '⌘N',
      category: 'file',
      action: () => this.showNotification('Creating new file...'),
    },
    {
      id: 'open-file',
      label: 'Open File',
      description: 'Open an existing file',
      icon: '📂',
      shortcut: '⌘O',
      category: 'file',
      action: () => this.showNotification('Opening file...'),
    },
    {
      id: 'save-file',
      label: 'Save File',
      description: 'Save the current file',
      icon: '💾',
      shortcut: '⌘S',
      category: 'file',
      action: () => this.showNotification('File saved!'),
    },
    {
      id: 'save-as',
      label: 'Save As...',
      description: 'Save file with a new name',
      icon: '💾',
      shortcut: '⌘⇧S',
      category: 'file',
      action: () => this.showNotification('Save as dialog opened'),
    },

    // Navigation
    {
      id: 'go-to-line',
      label: 'Go to Line',
      description: 'Jump to a specific line number',
      icon: '🔢',
      shortcut: '⌘G',
      category: 'navigation',
      action: () => this.showNotification('Go to line dialog opened'),
    },
    {
      id: 'find-file',
      label: 'Find File',
      description: 'Search for files by name',
      icon: '🔍',
      shortcut: '⌘P',
      category: 'navigation',
      action: () => this.showNotification('File finder opened'),
    },
    {
      id: 'find-replace',
      label: 'Find and Replace',
      description: 'Search and replace text',
      icon: '🔄',
      shortcut: '⌘F',
      category: 'navigation',
      action: () => this.showNotification('Find and replace opened'),
    },
    {
      id: 'go-back',
      label: 'Go Back',
      description: 'Navigate to previous location',
      icon: '⬅️',
      shortcut: '⌘[',
      category: 'navigation',
      action: () => this.showNotification('Navigated back'),
    },

    // View
    {
      id: 'toggle-sidebar',
      label: 'Toggle Sidebar',
      description: 'Show or hide the sidebar',
      icon: '📋',
      shortcut: '⌘B',
      category: 'view',
      action: () => this.showNotification('Sidebar toggled'),
    },
    {
      id: 'toggle-theme',
      label: 'Toggle Theme',
      description: 'Switch between light and dark theme',
      icon: '🌓',
      shortcut: '⌘⇧T',
      category: 'view',
      action: () => this.showNotification('Theme toggled'),
    },
    {
      id: 'zoom-in',
      label: 'Zoom In',
      description: 'Increase the zoom level',
      icon: '🔍',
      shortcut: '⌘+',
      category: 'view',
      action: () => this.showNotification('Zoomed in'),
    },
    {
      id: 'zoom-out',
      label: 'Zoom Out',
      description: 'Decrease the zoom level',
      icon: '🔍',
      shortcut: '⌘-',
      category: 'view',
      action: () => this.showNotification('Zoomed out'),
    },

    // Settings
    {
      id: 'open-settings',
      label: 'Open Settings',
      description: 'Access application settings',
      icon: '⚙️',
      shortcut: '⌘,',
      category: 'settings',
      action: () => this.showNotification('Settings opened'),
    },
    {
      id: 'keyboard-shortcuts',
      label: 'Keyboard Shortcuts',
      description: 'View all keyboard shortcuts',
      icon: '⌨️',
      shortcut: '⌘K ⌘S',
      category: 'settings',
      action: () => this.showNotification('Keyboard shortcuts opened'),
    },
    {
      id: 'reset-layout',
      label: 'Reset Layout',
      description: 'Reset window layout to default',
      icon: '🔄',
      shortcut: '',
      category: 'settings',
      action: () => this.showNotification('Layout reset to default'),
    },

    // Help
    {
      id: 'show-help',
      label: 'Show Help',
      description: 'Open the help documentation',
      icon: '❓',
      shortcut: 'F1',
      category: 'help',
      action: () => this.showNotification('Help documentation opened'),
    },
    {
      id: 'show-about',
      label: 'About',
      description: 'Show application information',
      icon: 'ℹ️',
      shortcut: '',
      category: 'help',
      action: () => this.showNotification('About dialog opened'),
    },
    {
      id: 'check-updates',
      label: 'Check for Updates',
      description: 'Check for application updates',
      icon: '🔄',
      shortcut: '',
      category: 'help',
      action: () => this.showNotification('Checking for updates...'),
      disabled: false,
    },

    // Development (some disabled for demo)
    {
      id: 'open-devtools',
      label: 'Open Developer Tools',
      description: 'Open browser developer tools',
      icon: '🛠️',
      shortcut: 'F12',
      category: 'development',
      action: () => this.showNotification('Developer tools opened'),
    },
    {
      id: 'reload-app',
      label: 'Reload Application',
      description: 'Reload the entire application',
      icon: '🔄',
      shortcut: '⌘R',
      category: 'development',
      action: () => this.showNotification('Application reloaded'),
    },
    {
      id: 'clear-cache',
      label: 'Clear Cache',
      description: 'Clear application cache',
      icon: '🗑️',
      shortcut: '',
      category: 'development',
      action: () => this.showNotification('Cache cleared'),
      disabled: true,
    },
  ];

  private categoryLabels: Record<string, string> = {
    file: 'File Operations',
    navigation: 'Navigation',
    view: 'View',
    settings: 'Settings',
    help: 'Help & Support',
    development: 'Development',
  };

  /**
   * Get all available commands
   */
  getAllCommands(): Observable<CommandItem[]> {
    return of(this.commands).pipe(delay(100)); // Simulate network delay
  }

  /**
   * Get commands grouped by category
   */
  getCommandsByCategory(): Observable<CommandCategory[]> {
    const categories = new Map<string, CommandItem[]>();

    this.commands.forEach((command) => {
      if (!categories.has(command.category)) {
        categories.set(command.category, []);
      }
      categories.get(command.category)!.push(command);
    });

    const result: CommandCategory[] = Array.from(categories.entries()).map(
      ([categoryId, items]) => ({
        id: categoryId,
        label: this.categoryLabels[categoryId] || categoryId,
        items: items.sort((a, b) => a.label.localeCompare(b.label)),
      }),
    );

    return of(result).pipe(delay(100));
  }

  /**
   * Search commands by query
   */
  searchCommands(query: string): Observable<CommandItem[]> {
    if (!query.trim()) {
      return this.getAllCommands();
    }

    const searchTerm = query.toLowerCase();
    const filtered = this.commands.filter(
      (command) =>
        command.label.toLowerCase().includes(searchTerm) ||
        command.description?.toLowerCase().includes(searchTerm) ||
        command.category.toLowerCase().includes(searchTerm),
    );

    return of(filtered).pipe(delay(150));
  }

  /**
   * Execute a command by ID
   */
  executeCommand(commandId: string): void {
    const command = this.commands.find((cmd) => cmd.id === commandId);
    if (command && !command.disabled) {
      console.log(`Executing command: ${command.label}`);
      command.action();
    } else if (command?.disabled) {
      this.showNotification(`Command "${command.label}" is currently disabled`);
    } else {
      this.showNotification(`Command "${commandId}" not found`);
    }
  }

  /**
   * Get recently used commands (mock data)
   */
  getRecentCommands(): Observable<CommandItem[]> {
    const recent = this.commands
      .filter((cmd) => ['new-file', 'save-file', 'find-file', 'toggle-theme'].includes(cmd.id))
      .slice(0, 4);

    return of(recent).pipe(delay(50));
  }

  /**
   * Get suggested commands based on context (mock data)
   */
  getSuggestedCommands(): Observable<CommandItem[]> {
    const suggested = this.commands
      .filter((cmd) => ['open-settings', 'keyboard-shortcuts', 'show-help'].includes(cmd.id))
      .slice(0, 3);

    return of(suggested).pipe(delay(50));
  }

  /**
   * Custom fuzzy search filter function
   */
  fuzzyFilter = (value: string, search: string): boolean => {
    const searchLower = search.toLowerCase();
    const valueLower = value.toLowerCase();

    // Exact match
    if (valueLower.includes(searchLower)) {
      return true;
    }

    // Fuzzy match - check if all characters in search exist in order
    let searchIndex = 0;
    for (let i = 0; i < valueLower.length && searchIndex < searchLower.length; i++) {
      if (valueLower[i] === searchLower[searchIndex]) {
        searchIndex++;
      }
    }

    return searchIndex === searchLower.length;
  };

  private showNotification(message: string): void {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className =
      'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300';
    toast.textContent = message;

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2700);
  }
}
