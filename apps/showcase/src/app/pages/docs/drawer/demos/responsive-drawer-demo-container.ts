import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ResponsiveDrawerDemo } from './responsive-drawer-demo';

@Component({
  selector: 'app-responsive-drawer-demo-container',
  imports: [DemoContainer, ResponsiveDrawerDemo],
  template: `
    <app-demo-container
      title="Responsive"
      demoUrl="/demos/drawer/responsive-drawer-demo"
      [code]="code"
    >
      <app-responsive-drawer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveDrawerDemoContainer {
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

/** A dialog on wide screens, a drawer on phones: composed with a media query, both on one open signal. */
@Component({
  selector: 'app-responsive-drawer-demo',
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
    }
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveDrawerDemo {
  protected readonly open = signal(false);
  protected readonly desktop = signal(false);

  constructor() {
    // No matchMedia on the server (its window has none): the phone's drawer there.
    const query =
      inject(DOCUMENT).defaultView?.matchMedia?.('(min-width: 768px)');
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
