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
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-top-sheet-demo',
  imports: [
    ScSheetProvider,
    ScSheetClose,
    ScSheet,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetTitle,
    ScSheetTrigger,
    ScButton,
    SiXIcon,
  ],
  template: `
    <div scSheetProvider side="top">
      <button scButton scSheetTrigger variant="outline">Open Top Sheet</button>
      <ng-template scSheetPortal>
        <div scSheet>
          <button scSheetClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scSheetHeader>
            <h2 scSheetTitle>Notifications</h2>
            <p scSheetDescription>You have 3 unread messages.</p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSheetDemo {}
