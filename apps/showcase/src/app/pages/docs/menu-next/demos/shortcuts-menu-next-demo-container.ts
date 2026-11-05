import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ShortcutsMenuNextDemo } from './shortcuts-menu-next-demo';

@Component({
  selector: 'app-shortcuts-menu-next-demo-container',
  imports: [DemoContainer, ShortcutsMenuNextDemo],
  template: `
    <app-demo-container
      title="Shortcuts"
      demoUrl="/demos/menu-next/shortcuts-menu-next-demo"
      [code]="code"
    >
      <app-shortcuts-menu-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ShortcutsMenuNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextContent,
  ScMenuNextGroup,
  ScMenuNextItem,
  ScMenuNextLabel,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextSeparator,
  ScMenuNextShortcut,
  ScMenuNextTrigger,
} from '@semantic-components/ui';

/** A keyboard hint at the end of each item; the text is yours. */
@Component({
  selector: 'app-shortcuts-menu-next-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextContent,
    ScMenuNextGroup,
    ScMenuNextItem,
    ScMenuNextLabel,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextSeparator,
    ScMenuNextShortcut,
    ScMenuNextTrigger,
  ],
  template: \`
    <div scMenuNextProvider>
      <button scButton scMenuNextTrigger variant="outline">Open</button>
      <ng-template scMenuNextPortal>
        <div scMenuNext>
          <ng-template scMenuNextContent>
            <div scMenuNextGroup>
              <div scMenuNextLabel>My Account</div>
              <div scMenuNextItem value="Profile">
                Profile
                <span scMenuNextShortcut>⇧⌘P</span>
              </div>
              <div scMenuNextItem value="Billing">
                Billing
                <span scMenuNextShortcut>⌘B</span>
              </div>
              <div scMenuNextItem value="Settings">
                Settings
                <span scMenuNextShortcut>⌘S</span>
              </div>
            </div>
            <div scMenuNextSeparator></div>
            <div scMenuNextItem value="Log out">
              Log out
              <span scMenuNextShortcut>⇧⌘Q</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ShortcutsMenuNextDemo {}`;
}
