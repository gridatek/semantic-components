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

/** side: right (default), left, top, bottom — the edge it slides in from. */
@Component({
  selector: 'app-side-sheet-demo',
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
      <div scSheetProvider side="top">
        <button scButton scSheetTrigger variant="outline" class="capitalize">
          top
        </button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>Edit profile</h2>
              <p scSheetDescription>A sheet from the top.</p>
            </div>
            <button scSheetClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetProvider side="right">
        <button scButton scSheetTrigger variant="outline" class="capitalize">
          right
        </button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>Edit profile</h2>
              <p scSheetDescription>A sheet from the right.</p>
            </div>
            <button scSheetClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetProvider side="bottom">
        <button scButton scSheetTrigger variant="outline" class="capitalize">
          bottom
        </button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>Edit profile</h2>
              <p scSheetDescription>A sheet from the bottom.</p>
            </div>
            <button scSheetClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetProvider side="left">
        <button scButton scSheetTrigger variant="outline" class="capitalize">
          left
        </button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>Edit profile</h2>
              <p scSheetDescription>A sheet from the left.</p>
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
export class SideSheetDemo {}
