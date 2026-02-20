import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScDrawer,
  ScDrawerClose,
  ScDrawerDescription,
  ScDrawerFooter,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-top-drawer-demo',
  imports: [
    ScButton,
    ScDrawer,
    ScDrawerClose,
    ScDrawerDescription,
    ScDrawerFooter,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: `
    <div scDrawerProvider direction="top">
      <button scButton variant="outline" scDrawerTrigger>
        Open Top Drawer
      </button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Notifications</h2>
            <p scDrawerDescription>You have 3 unread notifications.</p>
          </div>
          <div class="p-4">
            <div class="space-y-4">
              <div class="flex items-start gap-4 rounded-md border p-4">
                <div class="flex-1">
                  <p class="text-sm font-medium">
                    Your call has been confirmed.
                  </p>
                  <p class="text-sm text-muted-foreground">5 min ago</p>
                </div>
              </div>
              <div class="flex items-start gap-4 rounded-md border p-4">
                <div class="flex-1">
                  <p class="text-sm font-medium">You have a new message!</p>
                  <p class="text-sm text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
          <div scDrawerFooter>
            <button scButton class="w-full" scDrawerClose>
              Mark all as read
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopDrawerDemo {}
