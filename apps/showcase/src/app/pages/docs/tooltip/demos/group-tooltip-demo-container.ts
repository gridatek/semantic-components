import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupTooltipDemo } from './group-tooltip-demo';

@Component({
  selector: 'app-group-tooltip-demo-container',
  imports: [DemoContainer, GroupTooltipDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/tooltip/group-tooltip-demo"
      [code]="code"
    >
      <app-group-tooltip-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupTooltipDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipGroup,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

/** A toolbar in a scTooltipGroup: once a tooltip has shown, its neighbours open at once. */
@Component({
  selector: 'app-group-tooltip-demo',
  imports: [
    ScButton,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipGroup,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: \`
    <div
      scTooltipGroup
      role="toolbar"
      aria-label="Formatting"
      class="flex gap-1"
    >
      <div scTooltipProvider>
        <button scButton scTooltipTrigger variant="ghost" size="icon">
          <svg siBoldIcon></svg>
          <span class="sr-only">Bold</span>
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Bold
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipProvider>
        <button scButton scTooltipTrigger variant="ghost" size="icon">
          <svg siItalicIcon></svg>
          <span class="sr-only">Italic</span>
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Italic
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipProvider>
        <button scButton scTooltipTrigger variant="ghost" size="icon">
          <svg siUnderlineIcon></svg>
          <span class="sr-only">Underline</span>
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            Underline
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupTooltipDemo {}`;
}
