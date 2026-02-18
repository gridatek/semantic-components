import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import {
  ScButton,
  ScSheetProvider,
  ScSheetClose,
  ScSheet,
  ScSheetDescription,
  ScSheetFooter,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetTitle,
  ScSheetTrigger,
  ScField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-right-sheet-demo',
  imports: [
    SiXIcon,
    ScButton,
    ScSheetProvider,
    ScSheetClose,
    ScSheet,
    ScSheetDescription,
    ScSheetFooter,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetTitle,
    ScSheetTrigger,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
  ],
  template: `
    <div scSheetProvider>
      <button scButton scSheetTrigger variant="outline">
        Open Right Sheet
      </button>
      <ng-template scSheetPortal>
        <div scSheet>
          <button scSheetClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scSheetHeader>
            <h2 scSheetTitle>Edit profile</h2>
            <p scSheetDescription>
              Make changes to your profile here. Click save when you're done.
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
          <div scSheetFooter>
            <button scButton type="submit">Save changes</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSheetDemo {}
