import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScPopoverNext,
  ScPopoverNextClose,
  ScPopoverNextDescription,
  ScPopoverNextHeader,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTitle,
  ScPopoverNextTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** [(open)]: opened and closed by the page too — a close button inside, yours. */
@Component({
  selector: 'app-controlled-popover-next-demo',
  imports: [
    ScButton,
    ScPopoverNext,
    ScPopoverNextClose,
    ScPopoverNextDescription,
    ScPopoverNextHeader,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTitle,
    ScPopoverNextTrigger,
    SiXIcon,
  ],
  template: `
    <div class="flex items-center gap-4">
      <div scPopoverNextProvider [(open)]="open">
        <button scButton scPopoverNextTrigger variant="outline">
          Settings
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext>
            <div class="flex items-start justify-between gap-2">
              <div scPopoverNextHeader>
                <h2 scPopoverNextTitle>Settings</h2>
                <p scPopoverNextDescription>
                  Opened from outside, closed from inside.
                </p>
              </div>
              <button scPopoverNextClose>
                <svg siXIcon></svg>
                <span class="sr-only">Close</span>
              </button>
            </div>
          </div>
        </ng-template>
      </div>
      <button scButton variant="ghost" (click)="open.set(!open())">
        {{ open() ? 'Close' : 'Open' }} from outside
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledPopoverNextDemo {
  protected readonly open = signal(false);
}
