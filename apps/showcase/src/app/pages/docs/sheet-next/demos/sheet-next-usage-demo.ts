import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
  ScSheetNext,
  ScSheetNextClose,
  ScSheetNextDescription,
  ScSheetNextFooter,
  ScSheetNextHeader,
  ScSheetNextPortal,
  ScSheetNextProvider,
  ScSheetNextTitle,
  ScSheetNextTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sheet-next-usage-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelectOnFocus,
    ScSheetNext,
    ScSheetNextClose,
    ScSheetNextDescription,
    ScSheetNextFooter,
    ScSheetNextHeader,
    ScSheetNextPortal,
    ScSheetNextProvider,
    ScSheetNextTitle,
    ScSheetNextTrigger,
    SiXIcon,
  ],
  template: `
    <div scSheetNextProvider [(open)]="open">
      <button scButton scSheetNextTrigger variant="outline">Open</button>
      <ng-template scSheetNextPortal>
        <div scSheetNext>
          <div scSheetNextHeader>
            <h2 scSheetNextTitle>Edit profile</h2>
            <p scSheetNextDescription>
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
          <div scSheetNextFooter>
            <button scButton type="submit" (click)="open.set(false)">
              Save changes
            </button>
            <button scSheetNextClose variant="outline" size="default">
              Close
            </button>
          </div>
          <button scSheetNextClose>
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
export class SheetNextUsageDemo {
  protected readonly open = signal(false);
}
