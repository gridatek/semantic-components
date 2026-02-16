import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicDrawerDemo } from './basic-drawer-demo';

@Component({
  selector: 'app-basic-drawer-demo-container',
  imports: [DemoContainer, BasicDrawerDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/drawer/basic-drawer-demo"
      [code]="code"
    >
      <app-basic-drawer-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDrawerDemoContainer {
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
  ScDrawerHandle,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-drawer-demo',
  imports: [
    ScDrawer,
    ScDrawerClose,
    ScDrawerDescription,
    ScDrawerFooter,
    ScDrawerHandle,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: \`
    <div sc-drawer-provider>
      <button
        sc-drawer-trigger
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Open Drawer
      </button>
      <ng-template scDrawerPortal>
        <div sc-drawer>
          <div sc-drawer-handle></div>
          <div sc-drawer-header>
            <h2 sc-drawer-title>Edit Profile</h2>
            <p sc-drawer-description>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div class="p-4 pb-0">
            <div class="flex items-center justify-center space-x-2">
              <button
                class="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
                aria-label="Decrease"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div class="flex-1 text-center">
                <div class="text-7xl font-bold tracking-tighter">320</div>
                <div class="text-muted-foreground text-[0.70rem] uppercase">
                  Calories/day
                </div>
              </div>
              <button
                class="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
                aria-label="Increase"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
            </div>
          </div>
          <div sc-drawer-footer>
            <button
              sc-drawer-close
              class="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Submit
            </button>
            <button
              sc-drawer-close
              class="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDrawerDemo {}`;
}
