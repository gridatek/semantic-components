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
  ScButton,
  ScDrawer,
  ScDrawerDescription,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-left-drawer-demo',
  imports: [
    ScButton,
    ScDrawer,
    ScDrawerDescription,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: \`
    <div scDrawerProvider direction="left">
      <button scButton variant="outline" scDrawerTrigger>Open Left Drawer</button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Navigation</h2>
            <p scDrawerDescription>Browse through different sections.</p>
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
