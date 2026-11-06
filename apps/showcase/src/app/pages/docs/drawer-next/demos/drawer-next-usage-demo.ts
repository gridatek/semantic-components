import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDrawerNext,
  ScDrawerNextClose,
  ScDrawerNextDescription,
  ScDrawerNextFooter,
  ScDrawerNextHandle,
  ScDrawerNextHeader,
  ScDrawerNextPortal,
  ScDrawerNextProvider,
  ScDrawerNextTitle,
  ScDrawerNextTrigger,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-drawer-next-usage-demo',
  imports: [
    ScButton,
    ScDrawerNext,
    ScDrawerNextClose,
    ScDrawerNextDescription,
    ScDrawerNextFooter,
    ScDrawerNextHandle,
    ScDrawerNextHeader,
    ScDrawerNextPortal,
    ScDrawerNextProvider,
    ScDrawerNextTitle,
    ScDrawerNextTrigger,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelectOnFocus,
  ],
  template: `
    <div scDrawerNextProvider [(open)]="open">
      <button scButton scDrawerNextTrigger variant="outline">
        Edit profile
      </button>
      <ng-template scDrawerNextPortal>
        <div scDrawerNext>
          <div scDrawerNextHandle></div>
          <div scDrawerNextHeader>
            <h2 scDrawerNextTitle>Edit profile</h2>
            <p scDrawerNextDescription>
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
          <div scDrawerNextFooter>
            <button scButton (click)="open.set(false)">Save changes</button>
            <button scDrawerNextClose>Cancel</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DrawerNextUsageDemo {
  protected readonly open = signal(false);
}
