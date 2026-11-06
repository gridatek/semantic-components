import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledPopoverDemo } from './controlled-popover-demo';

@Component({
  selector: 'app-controlled-popover-demo-container',
  imports: [DemoContainer, ControlledPopoverDemo],
  template: `
    <app-demo-container
      title="Controlled"
      demoUrl="/demos/popover/controlled-popover-demo"
      [code]="code"
    >
      <app-controlled-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledPopoverDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverClose,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** [(open)]: opened and closed by the page too — a close button inside, yours. */
@Component({
  selector: 'app-controlled-popover-demo',
  imports: [
    ScButton,
    ScPopover,
    ScPopoverClose,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
    SiXIcon,
  ],
  template: \`
    <div class="flex items-center gap-4">
      <div scPopoverProvider [(open)]="open">
        <button scButton scPopoverTrigger variant="outline">Settings</button>
        <ng-template scPopoverPortal>
          <div scPopover>
            <div class="flex items-start justify-between gap-2">
              <div scPopoverHeader>
                <h2 scPopoverTitle>Settings</h2>
                <p scPopoverDescription>
                  Opened from outside, closed from inside.
                </p>
              </div>
              <button scPopoverClose>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledPopoverDemo {
  protected readonly open = signal(false);
}`;
}
