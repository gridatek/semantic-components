import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScDialogDemo } from './dialog-demo';

@Component({
  selector: 'app-dialog-demo-container',
  imports: [DemoContainer, ScDialogDemo],
  template: `
    <app-demo-container
      title="Dialog"
      demoUrl="/demos/dialog/dialog-demo"
      [code]="code"
    >
      <app-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDialogDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScDialogProvider,
  ScDialogClose,
  ScDialog,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogTitle,
  ScDialogTrigger,
} from '@semantic-components/ui';
import {
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dialog-demo',
  imports: [
    ScButton,
    ScDialogProvider,
    ScDialogClose,
    ScDialog,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogTitle,
    ScDialogTrigger,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    SiXIcon,
  ],
  template: \`
    <div scDialogProvider [(open)]="isOpen">
      <button scDialogTrigger scButton variant="outline">Open Dialog</button>
      <ng-template scDialogPortal>
        <form>
          <div scDialog class="sm:max-w-sm">
            <button scDialogClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
            <div scDialogHeader>
              <h2 scDialogTitle>Edit profile</h2>
              <p scDialogDescription>
                Make changes to your profile here. Click save when you're
                done.
              </p>
            </div>
            <div scFieldGroup>
              <div scField orientation="horizontal">
                <label scLabel>Name</label>
                <input cdkFocusInitial scInput value="Pedro Duarte" />
              </div>
              <div scField orientation="horizontal">
                <label scLabel>Username</label>
                <input scInput value="@peduarte" />
              </div>
            </div>
            <div scDialogFooter>
              <button scButton variant="outline" (click)="isOpen.set(false)">
                Cancel
              </button>
              <button scButton type="submit">Save changes</button>
            </div>
          </div>
        </form>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDialogDemo {
  readonly isOpen = signal(false);
}`;
}
