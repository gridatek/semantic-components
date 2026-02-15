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
import { ScInput } from '@semantic-components/ui-lab';

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
    <div sc-sheet-provider>
      <button sc-button sc-sheet-trigger variant="outline">
        Open Right Sheet
      </button>
      <ng-template scSheetPortal>
        <div sc-sheet>
          <button sc-sheet-close>
            <svg si-x-icon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div sc-sheet-header>
            <h2 sc-sheet-title>Edit profile</h2>
            <p sc-sheet-description>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div sc-field-group>
            <div sc-field orientation="horizontal">
              <label sc-label>Name</label>
              <input cdkFocusInitial sc-input value="Pedro Duarte" />
            </div>
            <div sc-field orientation="horizontal">
              <label sc-label>Username</label>
              <input sc-input value="@peduarte" />
            </div>
          </div>
          <div sc-sheet-footer>
            <button sc-button type="submit">Save changes</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSheetDemo {}
