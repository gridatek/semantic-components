import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CheckboxesMenuDemo } from './checkboxes-menu-demo';

@Component({
  selector: 'app-checkboxes-menu-demo-container',
  imports: [DemoContainer, CheckboxesMenuDemo],
  template: `
    <app-demo-container
      title="Checkboxes"
      demoUrl="/demos/menu/checkboxes-menu-demo"
      [code]="code"
    >
      <app-checkboxes-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxesMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItemIndicator,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** Items that are on or off, [(checked)]: a click toggles one and the menu stays open. */
@Component({
  selector: 'app-checkboxes-menu-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItemIndicator,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiCheckIcon,
  ],
  template: \`
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">Open</button>
      <ng-template scMenuPortal>
        <div scMenu class="w-40">
          <ng-template scMenuContent>
            <div scMenuGroup>
              <div scMenuLabel>Appearance</div>
              <div scMenuCheckboxItem [(checked)]="statusBar">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Status Bar
              </div>
              <div
                scMenuCheckboxItem
                [(checked)]="activityBar"
                [disabled]="true"
              >
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Activity Bar
              </div>
              <div scMenuCheckboxItem [(checked)]="panel">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Panel
              </div>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxesMenuDemo {
  protected readonly statusBar = signal(true);
  protected readonly activityBar = signal(false);
  protected readonly panel = signal(false);
}`;
}
