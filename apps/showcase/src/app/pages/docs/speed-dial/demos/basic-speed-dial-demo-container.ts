import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSpeedDialDemo } from './basic-speed-dial-demo';

@Component({
  selector: 'app-basic-speed-dial-demo-container',
  imports: [DemoContainer, BasicSpeedDialDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/speed-dial/basic-speed-dial-demo"
    >
      <app-basic-speed-dial-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSpeedDialDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
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

/** A button in a corner; its actions open upward, each named by the label beside it. From the keyboard: Enter, Space or an arrow opens it on the first action; the arrows move along, Escape closes. */
@Component({
  selector: 'app-basic-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialTrigger,
    ScSpeedDialList,
    ScSpeedDialAction,
    ScSpeedDialLabel,
    SiPlusIcon,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
    SiTrash2Icon,
  ],
  template: \`
    <div class="bg-muted/30 relative h-80 w-full rounded-lg border">
      <div scSpeedDial class="absolute end-4 bottom-4">
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
          <button scSpeedDialAction (click)="last.set('Delete')">
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
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ last() ? 'Last action: ' + last() : 'No action yet' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSpeedDialDemo {
  readonly last = signal('');
}`;
}
