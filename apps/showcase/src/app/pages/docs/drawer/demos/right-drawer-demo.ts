import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScDrawer,
  ScDrawerClose,
  ScDrawerDescription,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-right-drawer-demo',
  imports: [
    ScDrawer,
    ScDrawerClose,
    ScDrawerDescription,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: `
    <div sc-drawer-provider direction="right">
      <button
        sc-drawer-trigger
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Open Right Drawer
      </button>
      <ng-template scDrawerPortal>
        <div sc-drawer>
          <button
            sc-drawer-close
            class="absolute right-4 top-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <svg
              class="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span class="sr-only">Close</span>
          </button>
          <div sc-drawer-header>
            <h2 sc-drawer-title>Settings</h2>
            <p sc-drawer-description>Configure your preferences.</p>
          </div>
          <div class="space-y-4 p-4">
            <div class="flex items-center justify-between">
              <label for="dark-mode" class="text-sm font-medium">
                Dark Mode
              </label>
              <input id="dark-mode" type="checkbox" class="size-4" />
            </div>
            <div class="flex items-center justify-between">
              <label for="notifications" class="text-sm font-medium">
                Notifications
              </label>
              <input
                id="notifications"
                type="checkbox"
                class="size-4"
                checked
              />
            </div>
            <div class="flex items-center justify-between">
              <label for="compact" class="text-sm font-medium">
                Compact Mode
              </label>
              <input id="compact" type="checkbox" class="size-4" />
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightDrawerDemo {}
