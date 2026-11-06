import { Component, ViewEncapsulation } from '@angular/core';
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

/** side: inline-start, inline-end — the reading start and end, which swap in right to left. */
@Component({
  selector: 'app-inline-side-sheet-demo',
  imports: [
    ScButton,
    ScSheet,
    ScSheetClose,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
    SiXIcon,
  ],
  template: `
    <div class="flex flex-wrap gap-2">
      <div scSheetProvider side="inline-start">
        <button scButton scSheetTrigger variant="outline">inline-start</button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>Navigation</h2>
              <p scSheetDescription>A sheet at the inline-start.</p>
            </div>
            <button scSheetClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetProvider side="inline-end">
        <button scButton scSheetTrigger variant="outline">inline-end</button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>Navigation</h2>
              <p scSheetDescription>A sheet at the inline-end.</p>
            </div>
            <button scSheetClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineSideSheetDemo {}
