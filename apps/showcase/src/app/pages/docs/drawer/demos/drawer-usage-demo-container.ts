import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { DrawerUsageDemo } from './drawer-usage-demo';

@Component({
  selector: 'app-drawer-usage-demo-container',
  imports: [UsageCode, DrawerUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-drawer-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DrawerUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
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
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-drawer-usage-demo',
  imports: [
    ScButton,
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
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelectOnFocus,
  ],
  template: \`
    <div scDrawerProvider [(open)]="open">
      <button scButton scDrawerTrigger variant="outline">Edit profile</button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <div scDrawerHandle></div>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Edit profile</h2>
            <p scDrawerDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </p>
          </div>
          <div scFieldGroup class="p-4">
            <div scField>
              <label scLabel>Email</label>
              <input
                cdkFocusInitial
                scSelectOnFocus="program"
                scInput
                value="shadcn@example.com"
              />
            </div>
            <div scField>
              <label scLabel>Username</label>
              <input scInput value="@shadcn" />
            </div>
          </div>
          <div scDrawerFooter>
            <button scButton (click)="open.set(false)">Save changes</button>
            <button scDrawerClose>Cancel</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DrawerUsageDemo {
  protected readonly open = signal(false);
}`;
}
