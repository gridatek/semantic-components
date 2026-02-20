import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RightDrawerDemo } from './right-drawer-demo';

@Component({
  selector: 'app-right-drawer-demo-container',
  imports: [DemoContainer, RightDrawerDemo],
  template: `
    <app-demo-container
      title="Right"
      demoUrl="/demos/drawer/right-drawer-demo"
      [code]="code"
    >
      <app-right-drawer-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightDrawerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import {
  ScButton,
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
    ScButton,
    ScDrawer,
    ScDrawerClose,
    ScDrawerDescription,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
    SiXIcon,
  ],
  template: \`
    <div scDrawerProvider direction="right">
      <button scButton variant="outline" scDrawerTrigger>Open Right Drawer</button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <button
            scButton
            variant="ghost"
            size="icon"
            scDrawerClose
            class="absolute right-4 top-4"
            aria-label="Close"
          >
            <svg siXIcon></svg>
          </button>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Settings</h2>
            <p scDrawerDescription>Configure your preferences.</p>
          </div>
          <div class="space-y-4 p-4">
            <div class="flex items-center justify-between">
              <label for="dark-mode" class="text-sm font-medium">Dark Mode</label>
              <input id="dark-mode" type="checkbox" class="size-4" />
            </div>
            <div class="flex items-center justify-between">
              <label for="notifications" class="text-sm font-medium">Notifications</label>
              <input id="notifications" type="checkbox" class="size-4" checked />
            </div>
            <div class="flex items-center justify-between">
              <label for="compact" class="text-sm font-medium">Compact Mode</label>
              <input id="compact" type="checkbox" class="size-4" />
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightDrawerDemo {}`;
}
