import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BackdropSpeedDialDemo } from './backdrop-speed-dial-demo';

@Component({
  selector: 'app-backdrop-speed-dial-demo-container',
  imports: [DemoContainer, BackdropSpeedDialDemo],
  template: `
    <app-demo-container
      title="Backdrop"
      [code]="code"
      demoUrl="/demos/speed-dial/backdrop-speed-dial-demo"
    >
      <app-backdrop-speed-dial-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BackdropSpeedDialDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSpeedDial,
  ScSpeedDialAction,
  ScSpeedDialBackdrop,
  ScSpeedDialLabel,
  ScSpeedDialList,
  ScSpeedDialTrigger,
} from '@semantic-components/ui';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiShare2Icon,
} from '@semantic-icons/lucide-icons';

/** On a phone: the page dims behind the actions; a tap on it closes them. */
@Component({
  selector: 'app-backdrop-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialTrigger,
    ScSpeedDialList,
    ScSpeedDialAction,
    ScSpeedDialLabel,
    ScSpeedDialBackdrop,
    SiPlusIcon,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
  ],
  template: \`
    <div
      class="bg-background relative h-[28rem] w-72 [transform:translateZ(0)] overflow-hidden rounded-[2rem] border-4"
    >
      <div class="space-y-3 p-5">
        <p class="font-medium">Inbox</p>
        @for (line of lines; track line) {
          <div class="bg-muted h-12 rounded-md"></div>
        }
      </div>
      <div scSpeedDial class="absolute end-4 bottom-4">
        <div scSpeedDialBackdrop></div>
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
        </div>
        <button scSpeedDialTrigger>
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class BackdropSpeedDialDemo {
  readonly last = signal('');
  readonly lines = [1, 2, 3, 4, 5];
}`;
}
