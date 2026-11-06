import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
  ScSheet,
  ScSheetClose,
  ScSheetDescription,
  ScSheetFooter,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sheet-usage-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelectOnFocus,
    ScSheet,
    ScSheetClose,
    ScSheetDescription,
    ScSheetFooter,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
    SiXIcon,
  ],
  template: `
    <div scSheetProvider [(open)]="open">
      <button scButton scSheetTrigger variant="outline">Open</button>
      <ng-template scSheetPortal>
        <div scSheet>
          <div scSheetHeader>
            <h2 scSheetTitle>Edit profile</h2>
            <p scSheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </p>
          </div>
          <div scFieldGroup class="px-4">
            <div scField>
              <label scLabel>Name</label>
              <input
                cdkFocusInitial
                scSelectOnFocus="program"
                scInput
                value="Pedro Duarte"
              />
            </div>
            <div scField>
              <label scLabel>Username</label>
              <input scInput value="@peduarte" />
            </div>
          </div>
          <div scSheetFooter>
            <button scButton type="submit" (click)="open.set(false)">
              Save changes
            </button>
            <button scSheetClose variant="outline" size="default">Close</button>
          </div>
          <button scSheetClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SheetUsageDemo {
  protected readonly open = signal(false);
}
