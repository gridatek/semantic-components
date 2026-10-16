import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSpeedDialNext,
  ScSpeedDialNextAction,
  ScSpeedDialNextBackdrop,
  ScSpeedDialNextLabel,
  ScSpeedDialNextList,
  ScSpeedDialNextTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiShare2Icon,
} from '@semantic-icons/lucide-icons';

/** On a phone: the page dims behind the actions; a tap on it closes them. */
@Component({
  selector: 'app-backdrop-speed-dial-next-demo',
  imports: [
    ScSpeedDialNext,
    ScSpeedDialNextTrigger,
    ScSpeedDialNextList,
    ScSpeedDialNextAction,
    ScSpeedDialNextLabel,
    ScSpeedDialNextBackdrop,
    SiPlusIcon,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
  ],
  template: `
    <div
      class="bg-background relative h-[28rem] w-72 [transform:translateZ(0)] overflow-hidden rounded-[2rem] border-4"
    >
      <div class="space-y-3 p-5">
        <p class="font-medium">Inbox</p>
        @for (line of lines; track line) {
          <div class="bg-muted h-12 rounded-md"></div>
        }
      </div>
      <div scSpeedDialNext class="absolute end-4 bottom-4">
        <div scSpeedDialNextBackdrop></div>
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
        </div>
        <button scSpeedDialNextTrigger>
          <svg
            siPlusIcon
            class="transition-transform in-data-open:rotate-45"
          ></svg>
          <span class="sr-only">Compose</span>
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
export class BackdropSpeedDialNextDemo {
  readonly last = signal('');
  readonly lines = [1, 2, 3, 4, 5];
}
