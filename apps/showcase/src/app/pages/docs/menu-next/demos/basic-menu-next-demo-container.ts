import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicMenuNextDemo } from './basic-menu-next-demo';

@Component({
  selector: 'app-basic-menu-next-demo-container',
  imports: [DemoContainer, BasicMenuNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/menu-next/basic-menu-next-demo"
      [code]="code"
    >
      <app-basic-menu-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicMenuNextDemoContainer {
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
  ScMenuNextTrigger,
} from '@semantic-components/ui';

/** A labelled group, a line, and a disabled item (reached by the keyboard, not chosen). */
@Component({
  selector: 'app-basic-menu-next-demo',
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
              <div scMenuNextItem value="Profile">Profile</div>
              <div scMenuNextItem value="Billing">Billing</div>
              <div scMenuNextItem value="Settings">Settings</div>
            </div>
            <div scMenuNextSeparator></div>
            <div scMenuNextItem value="GitHub">GitHub</div>
            <div scMenuNextItem value="Support">Support</div>
            <div scMenuNextItem value="API" [disabled]="true">API</div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicMenuNextDemo {}`;
}
