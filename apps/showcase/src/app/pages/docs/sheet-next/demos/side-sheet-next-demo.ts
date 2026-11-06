import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScSheetNext,
  ScSheetNextClose,
  ScSheetNextDescription,
  ScSheetNextHeader,
  ScSheetNextPortal,
  ScSheetNextProvider,
  ScSheetNextTitle,
  ScSheetNextTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** side: right (default), left, top, bottom — the edge it slides in from. */
@Component({
  selector: 'app-side-sheet-next-demo',
  imports: [
    ScButton,
    ScSheetNext,
    ScSheetNextClose,
    ScSheetNextDescription,
    ScSheetNextHeader,
    ScSheetNextPortal,
    ScSheetNextProvider,
    ScSheetNextTitle,
    ScSheetNextTrigger,
    SiXIcon,
  ],
  template: `
    <div class="flex flex-wrap gap-2">
      <div scSheetNextProvider side="top">
        <button
          scButton
          scSheetNextTrigger
          variant="outline"
          class="capitalize"
        >
          top
        </button>
        <ng-template scSheetNextPortal>
          <div scSheetNext>
            <div scSheetNextHeader>
              <h2 scSheetNextTitle>Edit profile</h2>
              <p scSheetNextDescription>A sheet from the top.</p>
            </div>
            <button scSheetNextClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetNextProvider side="right">
        <button
          scButton
          scSheetNextTrigger
          variant="outline"
          class="capitalize"
        >
          right
        </button>
        <ng-template scSheetNextPortal>
          <div scSheetNext>
            <div scSheetNextHeader>
              <h2 scSheetNextTitle>Edit profile</h2>
              <p scSheetNextDescription>A sheet from the right.</p>
            </div>
            <button scSheetNextClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetNextProvider side="bottom">
        <button
          scButton
          scSheetNextTrigger
          variant="outline"
          class="capitalize"
        >
          bottom
        </button>
        <ng-template scSheetNextPortal>
          <div scSheetNext>
            <div scSheetNextHeader>
              <h2 scSheetNextTitle>Edit profile</h2>
              <p scSheetNextDescription>A sheet from the bottom.</p>
            </div>
            <button scSheetNextClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetNextProvider side="left">
        <button
          scButton
          scSheetNextTrigger
          variant="outline"
          class="capitalize"
        >
          left
        </button>
        <ng-template scSheetNextPortal>
          <div scSheetNext>
            <div scSheetNextHeader>
              <h2 scSheetNextTitle>Edit profile</h2>
              <p scSheetNextDescription>A sheet from the left.</p>
            </div>
            <button scSheetNextClose>
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
export class SideSheetNextDemo {}
