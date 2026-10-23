import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScSpeedDial,
  ScSpeedDialAction,
  ScSpeedDialLabel,
  ScSpeedDialList,
  ScSpeedDialTrigger,
} from '@semantic-components/ui';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiShare2Icon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

/** Open is two-way — here opened from outside too (a press outside closes it). A disabled action stays reachable, and does nothing. */
@Component({
  selector: 'app-controlled-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialTrigger,
    ScSpeedDialList,
    ScSpeedDialAction,
    ScSpeedDialLabel,
    ScButton,
    SiPlusIcon,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
    SiTrash2Icon,
  ],
  template: `
    <div class="bg-muted/30 relative h-80 w-full rounded-lg border">
      <div scSpeedDial [(open)]="open" class="absolute end-4 bottom-4">
        <div scSpeedDialList>
          <button scSpeedDialAction (click)="last.set('Edit')">
            <svg siPencilIcon></svg>
            <span scSpeedDialLabel>Edit</span>
          </button>
          <button scSpeedDialAction (click)="last.set('Copy')">
            <svg siCopyIcon></svg>
            <span scSpeedDialLabel>Copy</span>
          </button>
          <button scSpeedDialAction (click)="last.set('Share')">
            <svg siShare2Icon></svg>
            <span scSpeedDialLabel>Share</span>
          </button>
          <button scSpeedDialAction disabled (click)="last.set('Delete')">
            <svg siTrash2Icon></svg>
            <span scSpeedDialLabel>Delete</span>
          </button>
        </div>
        <button scSpeedDialTrigger>
          <svg
            siPlusIcon
            class="transition-transform in-data-open:rotate-45"
          ></svg>
          <span class="sr-only">Actions</span>
        </button>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <button scButton variant="outline" (click)="open.set(true)">Open</button>
      <span class="text-muted-foreground text-sm">Open: {{ open() }}</span>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ last() ? 'Last action: ' + last() : 'No action yet' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledSpeedDialDemo {
  readonly last = signal('');
  readonly open = signal(false);
}
