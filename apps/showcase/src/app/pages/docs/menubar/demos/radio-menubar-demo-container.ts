import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RadioMenubarDemo } from './radio-menubar-demo';

@Component({
  selector: 'app-radio-menubar-demo-container',
  imports: [DemoContainer, RadioMenubarDemo],
  template: `
    <app-demo-container
      title="Radio"
      demoUrl="/demos/menubar/radio-menubar-demo"
      [code]="code"
    >
      <app-radio-menubar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioMenubarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuItemIndicator,
  ScMenuPortal,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuSeparator,
  ScMenubar,
  ScMenubarItem,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** One of a group on, [(value)] on the group. */
@Component({
  selector: 'app-radio-menubar-demo',
  imports: [
    ScMenubar,
    ScMenubarItem,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuSeparator,
    SiCheckIcon,
  ],
  template: \`
    <div scMenubar aria-label="Settings" class="w-72">
      <div scMenubarItem value="Profiles">
        Profiles
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuRadioGroup [(value)]="user">
                <div scMenuRadioItem value="andy">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Andy
                </div>
                <div scMenuRadioItem value="benoit">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Benoit
                </div>
                <div scMenuRadioItem value="luis">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Luis
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Edit..." inset>Edit...</div>
              <div scMenuItem value="Add Profile..." inset>Add Profile...</div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scMenubarItem value="Theme">
        Theme
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuRadioGroup [(value)]="theme">
                <div scMenuRadioItem value="light">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Light
                </div>
                <div scMenuRadioItem value="dark">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Dark
                </div>
                <div scMenuRadioItem value="system">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  System
                </div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioMenubarDemo {
  protected readonly user = signal('benoit');
  protected readonly theme = signal('system');
}`;
}
