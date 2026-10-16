import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ArcSpeedDialDemo } from './arc-speed-dial-demo';

@Component({
  selector: 'app-arc-speed-dial-demo-container',
  imports: [DemoContainer, ArcSpeedDialDemo],
  template: `
    <app-demo-container
      title="Arc"
      [code]="code"
      demoUrl="/demos/speed-dial/arc-speed-dial-demo"
    >
      <app-arc-speed-dial-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ArcSpeedDialDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSpeedDial,
  ScSpeedDialAction,
  ScSpeedDialLabel,
  ScSpeedDialList,
  ScSpeedDialTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiShare2Icon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

/** Toward a corner — up-left for a button at the bottom right — the actions fan out on a quarter circle. Their labels are read, not shown. */
@Component({
  selector: 'app-arc-speed-dial-demo',
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
      <div scSpeedDial direction="up-left" class="absolute end-6 bottom-6">
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
export class ArcSpeedDialDemo {
  readonly last = signal('');
}`;
}
