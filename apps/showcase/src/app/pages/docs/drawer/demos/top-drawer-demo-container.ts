import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TopDrawerDemo } from './top-drawer-demo';

@Component({
  selector: 'app-top-drawer-demo-container',
  imports: [DemoContainer, TopDrawerDemo],
  template: `
    <app-demo-container
      title="Top"
      demoUrl="/demos/drawer/top-drawer-demo"
      [code]="code"
    >
      <app-top-drawer-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopDrawerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScDrawer,
  ScDrawerClose,
  ScDrawerDescription,
  ScDrawerFooter,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-top-drawer-demo',
  imports: [
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
  template: \`
    <div sc-drawer-provider direction="top">
      <button
        sc-drawer-trigger
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Open Top Drawer
      </button>
      <ng-template scDrawerPortal>
        <div sc-drawer>
          <div sc-drawer-header>
            <h2 sc-drawer-title>Notifications</h2>
            <p sc-drawer-description>You have 3 unread notifications.</p>
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
          <div sc-drawer-footer>
            <button
              sc-drawer-close
              class="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Mark all as read
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopDrawerDemo {}`;
}
