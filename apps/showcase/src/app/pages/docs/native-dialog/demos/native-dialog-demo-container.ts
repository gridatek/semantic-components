import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NativeDialogDemo } from './native-dialog-demo';

@Component({
  selector: 'app-native-dialog-demo-container',
  imports: [DemoContainer, NativeDialogDemo],
  template: `
    <app-demo-container
      title="Native Dialog"
      demoUrl="/demos/native-dialog/native-dialog-demo"
      [code]="code"
    >
      <app-native-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeDialogDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScButton, ScInput, ScLabel } from '@semantic-components/ui';
import {
  ScNativeDialog,
  ScNativeDialogBody,
  ScNativeDialogClose,
  ScNativeDialogContent,
  ScNativeDialogDescription,
  ScNativeDialogFooter,
  ScNativeDialogHeader,
  ScNativeDialogProvider,
  ScNativeDialogTitle,
  ScNativeDialogTrigger,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-native-dialog-demo',
  imports: [
    ScButton,
    ScInput,
    ScLabel,
    ScNativeDialog,
    ScNativeDialogBody,
    ScNativeDialogClose,
    ScNativeDialogContent,
    ScNativeDialogDescription,
    ScNativeDialogFooter,
    ScNativeDialogHeader,
    ScNativeDialogProvider,
    ScNativeDialogTitle,
    ScNativeDialogTrigger,
    SiXIcon,
  ],
  template: \`
    <div scNativeDialogProvider [(open)]="isOpen">
      <button scNativeDialogTrigger scButton variant="outline">
        Open Dialog
      </button>

      <dialog scNativeDialog class="sm:max-w-sm">
        <ng-template scNativeDialogContent>
          <button scNativeDialogClose>
            <svg siXIcon class="size-4"></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scNativeDialogHeader>
            <h2 scNativeDialogTitle>Edit profile</h2>
            <p scNativeDialogDescription>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div scNativeDialogBody class="grid gap-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <label scLabel class="text-right">Name</label>
              <input scInput class="col-span-3" value="Pedro Duarte" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label scLabel class="text-right">Username</label>
              <input scInput class="col-span-3" value="@peduarte" />
            </div>
          </div>
          <div scNativeDialogFooter>
            <button scButton variant="outline" (click)="isOpen.set(false)">
              Cancel
            </button>
            <button scButton (click)="isOpen.set(false)">Save changes</button>
          </div>
        </ng-template>
      </dialog>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeDialogDemo {
  readonly isOpen = signal(false);
}`;
}
