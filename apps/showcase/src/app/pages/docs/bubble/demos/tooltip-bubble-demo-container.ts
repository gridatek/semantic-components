import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TooltipBubbleDemo } from './tooltip-bubble-demo';

@Component({
  selector: 'app-tooltip-bubble-demo-container',
  imports: [DemoContainer, TooltipBubbleDemo],
  template: `
    <app-demo-container
      title="Tooltip"
      demoUrl="/demos/bubble/tooltip-bubble-demo"
      [code]="code"
    >
      <app-tooltip-bubble-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipBubbleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleReactions,
  ScButton,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** A reaction button with a tooltip, for the message’s metadata (when it was read). */
@Component({
  selector: 'app-tooltip-bubble-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScBubbleReactions,
    ScButton,
    ScTooltipTrigger,
    SiCheckIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble variant="secondary">
        <div scBubbleContent>Did you remove the stale route?</div>
      </div>
      <div scBubble align="end">
        <div scBubbleContent>Yes, removed it from the registry.</div>
        <div scBubbleReactions>
          <button
            scButton
            variant="ghost"
            size="icon-xs"
            [scTooltipTrigger]="'Read on Jan 5, 2026 at 4:32 PM'"
          >
            <svg siCheckIcon></svg>
            <span class="sr-only">Read</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipBubbleDemo {}`;
}
