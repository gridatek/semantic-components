import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DirectionsSpeedDialDemo } from './directions-speed-dial-demo';

@Component({
  selector: 'app-directions-speed-dial-demo-container',
  imports: [DemoContainer, DirectionsSpeedDialDemo],
  template: `
    <app-demo-container
      title="Directions"
      [code]="code"
      demoUrl="/demos/speed-dial/directions-speed-dial-demo"
    >
      <app-directions-speed-dial-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DirectionsSpeedDialDemoContainer {
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
} from '@semantic-icons/lucide-icons';

/** Up, down, left or right — the arrow keys follow: away from the button is the next action. */
@Component({
  selector: 'app-directions-speed-dial-demo',
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
  ],
  template: \`
    <div class="grid w-full gap-4 sm:grid-cols-2">
      @for (way of ways; track way.direction) {
        <div class="bg-muted/30 relative h-56 rounded-lg border">
          <div scSpeedDial [direction]="way.direction" [class]="way.place">
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
              <span class="sr-only">Actions, {{ way.direction }}</span>
            </button>
          </div>
        </div>
      }
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ last() ? 'Last action: ' + last() : 'No action yet' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DirectionsSpeedDialDemo {
  readonly last = signal('');
  readonly ways = [
    { direction: 'up', place: 'absolute start-1/2 bottom-4 -translate-x-1/2' },
    { direction: 'down', place: 'absolute start-1/2 top-4 -translate-x-1/2' },
    { direction: 'left', place: 'absolute end-4 top-1/2 -translate-y-1/2' },
    { direction: 'right', place: 'absolute start-4 top-1/2 -translate-y-1/2' },
  ] as const;
}`;
}
