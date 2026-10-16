import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSpeedDialNext,
  ScSpeedDialNextAction,
  ScSpeedDialNextLabel,
  ScSpeedDialNextList,
  ScSpeedDialNextTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiShare2Icon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

/** A button in a corner; its actions open upward, each named by the label beside it. From the keyboard: Enter, Space or an arrow opens it on the first action; the arrows move along, Escape closes. */
@Component({
  selector: 'app-basic-speed-dial-next-demo',
  imports: [
    ScSpeedDialNext,
    ScSpeedDialNextTrigger,
    ScSpeedDialNextList,
    ScSpeedDialNextAction,
    ScSpeedDialNextLabel,
    SiPlusIcon,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
    SiTrash2Icon,
  ],
  template: `
    <div class="bg-muted/30 relative h-80 w-full rounded-lg border">
      <div scSpeedDialNext class="absolute end-4 bottom-4">
        <div scSpeedDialNextList>
          <button scSpeedDialNextAction (click)="last.set('Edit')">
            <svg siPencilIcon></svg>
            <span scSpeedDialNextLabel>Edit</span>
          </button>
          <button scSpeedDialNextAction (click)="last.set('Copy')">
            <svg siCopyIcon></svg>
            <span scSpeedDialNextLabel>Copy</span>
          </button>
          <button scSpeedDialNextAction (click)="last.set('Share')">
            <svg siShare2Icon></svg>
            <span scSpeedDialNextLabel>Share</span>
          </button>
          <button scSpeedDialNextAction (click)="last.set('Delete')">
            <svg siTrash2Icon></svg>
            <span scSpeedDialNextLabel>Delete</span>
          </button>
        </div>
        <button scSpeedDialNextTrigger>
          <svg
            siPlusIcon
            class="transition-transform in-data-open:rotate-45"
          ></svg>
          <span class="sr-only">Actions</span>
        </button>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ last() ? 'Last action: ' + last() : 'No action yet' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSpeedDialNextDemo {
  readonly last = signal('');
}
