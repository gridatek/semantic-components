import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HoverPopoverNextDemo } from './hover-popover-next-demo';

@Component({
  selector: 'app-hover-popover-next-demo-container',
  imports: [DemoContainer, HoverPopoverNextDemo],
  template: `
    <app-demo-container
      title="Open on hover"
      demoUrl="/demos/popover-next/hover-popover-next-demo"
      [code]="code"
    >
      <app-hover-popover-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HoverPopoverNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopoverNext,
  ScPopoverNextDescription,
  ScPopoverNextHeader,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTitle,
  ScPopoverNextTrigger,
} from '@semantic-components/ui';
import { SiInfoIcon } from '@semantic-icons/lucide-icons';

/** openOnHover: an infotip — the pointer’s hover opens it after delay, a click still does (touch, the keyboard). Unlike a tooltip, everyone can reach it. */
@Component({
  selector: 'app-hover-popover-next-demo',
  imports: [
    ScButton,
    ScPopoverNext,
    ScPopoverNextDescription,
    ScPopoverNextHeader,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTitle,
    ScPopoverNextTrigger,
    SiInfoIcon,
  ],
  template: \`
    <div class="flex items-center gap-1 text-sm">
      Storage used: 12.4 GB
      <div scPopoverNextProvider side="top">
        <button
          scButton
          scPopoverNextTrigger
          variant="ghost"
          size="icon-xs"
          openOnHover
        >
          <svg siInfoIcon></svg>
          <span class="sr-only">About storage</span>
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-64">
            <div scPopoverNextHeader>
              <h2 scPopoverNextTitle>Storage</h2>
              <p scPopoverNextDescription>
                Files, photos and backups count; shared files count for their
                owner.
              </p>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HoverPopoverNextDemo {}`;
}
