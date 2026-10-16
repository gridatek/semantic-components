import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledSpeedDialNextDemo } from './controlled-speed-dial-next-demo';

@Component({
  selector: 'app-controlled-speed-dial-next-demo-container',
  imports: [DemoContainer, ControlledSpeedDialNextDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/speed-dial-next/controlled-speed-dial-next-demo"
    >
      <app-controlled-speed-dial-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledSpeedDialNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
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

/** Open is two-way — here opened from outside too (a press outside closes it). A disabled action stays reachable, and does nothing. */
@Component({
  selector: 'app-controlled-speed-dial-next-demo',
  imports: [
    ScSpeedDialNext,
    ScSpeedDialNextTrigger,
    ScSpeedDialNextList,
    ScSpeedDialNextAction,
    ScSpeedDialNextLabel,
    ScButton,
    SiPlusIcon,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
    SiTrash2Icon,
  ],
  template: \`
    <div class="bg-muted/30 relative h-80 w-full rounded-lg border">
      <div scSpeedDialNext [(open)]="open" class="absolute end-4 bottom-4">
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
          <button scSpeedDialNextAction disabled (click)="last.set('Delete')">
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
    <div class="flex items-center gap-3">
      <button scButton variant="outline" (click)="open.set(true)">
        Open
      </button>
      <span class="text-muted-foreground text-sm">Open: {{ open() }}</span>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ last() ? 'Last action: ' + last() : 'No action yet' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledSpeedDialNextDemo {
  readonly last = signal('');
  readonly open = signal(false);
}`;
}
