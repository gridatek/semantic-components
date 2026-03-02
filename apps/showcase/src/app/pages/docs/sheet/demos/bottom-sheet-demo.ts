import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
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
  selector: 'app-bottom-sheet-demo',
  imports: [
    ScSheetProvider,
    ScSheetClose,
    ScSheet,
    ScSheetDescription,
    ScSheetFooter,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetTitle,
    ScSheetTrigger,
    ScButton,
    SiXIcon,
  ],
  template: `
    <div scSheetProvider side="bottom">
      <button scButton scSheetTrigger variant="outline">
        Open Bottom Sheet
      </button>
      <ng-template scSheetPortal>
        <div scSheet>
          <button scSheetClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scSheetHeader>
            <h2 scSheetTitle>Cookie Settings</h2>
            <p scSheetDescription>Manage your cookie preferences.</p>
          </div>
          <div scSheetFooter>
            <button scButton variant="outline">Decline</button>
            <button scButton>Accept</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetDemo {}
