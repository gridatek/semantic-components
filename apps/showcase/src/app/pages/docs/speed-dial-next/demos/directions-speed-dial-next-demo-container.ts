import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DirectionsSpeedDialNextDemo } from './directions-speed-dial-next-demo';

@Component({
  selector: 'app-directions-speed-dial-next-demo-container',
  imports: [DemoContainer, DirectionsSpeedDialNextDemo],
  template: `
    <app-demo-container
      title="Directions"
      [code]="code"
      demoUrl="/demos/speed-dial-next/directions-speed-dial-next-demo"
    >
      <app-directions-speed-dial-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DirectionsSpeedDialNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
} from '@semantic-icons/lucide-icons';

/** Up, down, left or right — the arrow keys follow: away from the button is the next action. */
@Component({
  selector: 'app-directions-speed-dial-next-demo',
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
  ],
  template: \`
    <div class="grid w-full gap-4 sm:grid-cols-2">
      @for (way of ways; track way.direction) {
        <div class="bg-muted/30 relative h-56 rounded-lg border">
          <div
            scSpeedDialNext
            [direction]="way.direction"
            [class]="way.place"
          >
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
export class DirectionsSpeedDialNextDemo {
  readonly last = signal('');
  readonly ways = [
    { direction: 'up', place: 'absolute start-1/2 bottom-4 -translate-x-1/2' },
    { direction: 'down', place: 'absolute start-1/2 top-4 -translate-x-1/2' },
    { direction: 'left', place: 'absolute end-4 top-1/2 -translate-y-1/2' },
    { direction: 'right', place: 'absolute start-4 top-1/2 -translate-y-1/2' },
  ] as const;
}`;
}
