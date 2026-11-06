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

/** side: inline-start, inline-end — the reading start and end, which swap in right to left. */
@Component({
  selector: 'app-inline-side-sheet-next-demo',
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
      <div scSheetNextProvider side="inline-start">
        <button scButton scSheetNextTrigger variant="outline">
          inline-start
        </button>
        <ng-template scSheetNextPortal>
          <div scSheetNext>
            <div scSheetNextHeader>
              <h2 scSheetNextTitle>Navigation</h2>
              <p scSheetNextDescription>A sheet at the inline-start.</p>
            </div>
            <button scSheetNextClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetNextProvider side="inline-end">
        <button scButton scSheetNextTrigger variant="outline">
          inline-end
        </button>
        <ng-template scSheetNextPortal>
          <div scSheetNext>
            <div scSheetNextHeader>
              <h2 scSheetNextTitle>Navigation</h2>
              <p scSheetNextDescription>A sheet at the inline-end.</p>
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
export class InlineSideSheetNextDemo {}
