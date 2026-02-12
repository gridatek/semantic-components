import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LeftDrawerDemo } from './left-drawer-demo';

@Component({
  selector: 'app-left-drawer-demo-container',
  imports: [DemoContainer, LeftDrawerDemo],
  template: `
    <app-demo-container
      title="Left"
      demoUrl="/demos/drawer/left-drawer-demo"
      [code]="code"
    >
      <app-left-drawer-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftDrawerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScDrawer,
  ScDrawerDescription,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-left-drawer-demo',
  imports: [
    ScDrawer,
    ScDrawerDescription,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: \`
    <div sc-drawer-provider direction="left">
      <button
        sc-drawer-trigger
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Open Left Drawer
      </button>
      <ng-template scDrawerPortal>
        <div sc-drawer>
          <div sc-drawer-header>
            <h2 sc-drawer-title>Navigation</h2>
            <p sc-drawer-description>Browse through different sections.</p>
          </div>
          <nav class="flex flex-col gap-2 p-4">
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Home
            </a>
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Products
            </a>
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              About
            </a>
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Contact
            </a>
          </nav>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftDrawerDemo {}`;
}
