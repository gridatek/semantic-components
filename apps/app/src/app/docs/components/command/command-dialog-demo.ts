import { Component, signal } from '@angular/core';

import {
  ScButton,
  ScCommandDialog,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandShortcut,
} from '@semantic-components/ui';

@Component({
  selector: 'app-command-dialog-demo',
  imports: [
    ScButton,
    ScCommandDialog,
    ScCommandInput,
    ScCommandList,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandItem,
    ScCommandSeparator,
    ScCommandShortcut,
  ],
  template: `
    <div class="flex items-center justify-center min-h-[200px] p-4">
      <button class="justify-start" (click)="openDialog()" sc-button variant="outline">
        <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search...
        <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘K</span>
      </button>
    </div>

    <!-- Command Dialog -->
    @if (isDialogOpen()) {
      <div class="fixed inset-0 z-50">
        <button class="fixed inset-0 bg-black/50" (click)="closeDialog()">x</button>
        <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
          <sc-command-dialog>
            <sc-command-input placeholder="Type a command or search..." />
            <sc-command-list>
              <sc-command-empty>No results found.</sc-command-empty>
              <sc-command-group heading="Pages">
                <sc-command-item (click)="selectItem('dashboard')">
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
                  <span>Dashboard</span>
                </sc-command-item>
                <sc-command-item (click)="selectItem('analytics')">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span>Analytics</span>
                </sc-command-item>
                <sc-command-item (click)="selectItem('projects')">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14-4H5m14 8H5"
                    />
                  </svg>
                  <span>Projects</span>
                </sc-command-item>
              </sc-command-group>
              <sc-command-separator />
              <sc-command-group heading="Actions">
                <sc-command-item (click)="selectItem('create')">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Create New</span>
                  <sc-command-shortcut>⌘N</sc-command-shortcut>
                </sc-command-item>
                <sc-command-item (click)="selectItem('search')">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Search Files</span>
                  <sc-command-shortcut>⌘F</sc-command-shortcut>
                </sc-command-item>
                <sc-command-item (click)="selectItem('settings')">
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
                  <span>Settings</span>
                  <sc-command-shortcut>⌘,</sc-command-shortcut>
                </sc-command-item>
              </sc-command-group>
            </sc-command-list>
          </sc-command-dialog>
        </div>
      </div>
    }
  `,
})
export class CommandDialogDemo {
  isDialogOpen = signal(false);

  openDialog() {
    this.isDialogOpen.set(true);
  }

  closeDialog() {
    this.isDialogOpen.set(false);
  }

  selectItem(item: string) {
    console.log('Selected:', item);
    this.closeDialog();
  }
}
