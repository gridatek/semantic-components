import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import {
  ScSheetProvider,
  ScSheetClose,
  ScSheet,
  ScSheetDescription,
  ScSheetFooter,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetTitle,
  ScSheetTrigger,
} from '@semantic-components/ui';
import {
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-right-sheet-demo',
  imports: [
    SiXIcon,
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
      <button
        sc-sheet-trigger
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
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
            <button
              type="submit"
              class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Save changes
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSheetDemo {}
