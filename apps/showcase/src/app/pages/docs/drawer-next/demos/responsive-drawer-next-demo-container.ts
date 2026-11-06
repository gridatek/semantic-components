import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ResponsiveDrawerNextDemo } from './responsive-drawer-next-demo';

@Component({
  selector: 'app-responsive-drawer-next-demo-container',
  imports: [DemoContainer, ResponsiveDrawerNextDemo],
  template: `
    <app-demo-container
      title="Responsive"
      demoUrl="/demos/drawer-next/responsive-drawer-next-demo"
      [code]="code"
    >
      <app-responsive-drawer-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveDrawerNextDemoContainer {
  readonly code = `import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
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

/** A dialog on wide screens, a drawer on phones: composed with a media query, both on one open signal. */
@Component({
  selector: 'app-responsive-drawer-next-demo',
  imports: [
    ScButton,
    ScDialog,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
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
  template: \`
    @if (desktop()) {
      <div scDialogProvider [(open)]="open">
        <button scButton scDialogTrigger variant="outline">Edit profile</button>
        <ng-template scDialogPortal>
          <div scDialog class="sm:max-w-[425px]">
            <div scDialogHeader>
              <h2 scDialogTitle>Edit profile</h2>
              <p scDialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </p>
            </div>
            <div scFieldGroup>
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
            <div scDialogFooter>
              <button scButton (click)="open.set(false)">Save changes</button>
            </div>
          </div>
        </ng-template>
      </div>
    } @else {
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
    }
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveDrawerNextDemo {
  protected readonly open = signal(false);
  protected readonly desktop = signal(false);

  constructor() {
    const query =
      inject(DOCUMENT).defaultView?.matchMedia('(min-width: 768px)');
    if (!query) return;
    this.desktop.set(query.matches);
    const change = (event: MediaQueryListEvent) =>
      this.desktop.set(event.matches);
    query.addEventListener('change', change);
    inject(DestroyRef).onDestroy(() =>
      query.removeEventListener('change', change),
    );
  }
}`;
}
