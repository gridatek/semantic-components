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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightDrawerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  ScLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

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
    ScLabel,
    ScSwitch,
    ScSwitchField,
    SiXIcon,
  ],
  template: \`
    <div scDrawerProvider direction="right">
      <button scButton variant="outline" scDrawerTrigger>
        Open Right Drawer
      </button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <button
            scButton
            variant="ghost"
            size="icon"
            scDrawerClose
            class="absolute top-4 right-4"
            aria-label="Close"
          >
            <svg siXIcon></svg>
          </button>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Settings</h2>
            <p scDrawerDescription>Configure your preferences.</p>
          </div>
          <div class="space-y-4 p-4">
            <label scSwitchField>
              <input type="checkbox" scSwitch />
              <label scLabel>Dark Mode</label>
            </label>
            <label scSwitchField>
              <input type="checkbox" scSwitch checked />
              <label scLabel>Notifications</label>
            </label>
            <label scSwitchField>
              <input type="checkbox" scSwitch />
              <label scLabel>Compact Mode</label>
            </label>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightDrawerDemo {}`;
}
