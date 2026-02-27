import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  ],
  template: `
    <div scSheetProvider side="bottom">
      <button
        scSheetTrigger
        class="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Open Bottom Sheet
      </button>
      <ng-template scSheetPortal>
        <div scSheet>
          <button scSheetClose>
            <svg
              class="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span class="sr-only">Close</span>
          </button>
          <div scSheetHeader>
            <h2 scSheetTitle>Cookie Settings</h2>
            <p scSheetDescription>Manage your cookie preferences.</p>
          </div>
          <div scSheetFooter>
            <button
              class="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Decline
            </button>
            <button
              class="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Accept
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetDemo {}
