import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
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
  template: `
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
              <label class="text-right text-sm font-medium" for="name">
                Name
              </label>
              <input
                class="border-input bg-background col-span-3 rounded-md border px-3 py-2 text-sm"
                id="name"
                value="Pedro Duarte"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-sm font-medium" for="username">
                Username
              </label>
              <input
                class="border-input bg-background col-span-3 rounded-md border px-3 py-2 text-sm"
                id="username"
                value="@peduarte"
              />
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
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeDialogDemo {
  readonly isOpen = signal(false);
}
