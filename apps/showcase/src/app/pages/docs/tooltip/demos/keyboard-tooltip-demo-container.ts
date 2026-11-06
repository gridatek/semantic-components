import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KeyboardTooltipDemo } from './keyboard-tooltip-demo';

@Component({
  selector: 'app-keyboard-tooltip-demo-container',
  imports: [DemoContainer, KeyboardTooltipDemo],
  template: `
    <app-demo-container
      title="Keyboard shortcut"
      demoUrl="/demos/tooltip/keyboard-tooltip-demo"
      [code]="code"
    >
      <app-keyboard-tooltip-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardTooltipDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScKbd,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import { SiSaveIcon } from '@semantic-icons/lucide-icons';

/** Content is yours, a kbd too; the button says its shortcut to screen readers with aria-keyshortcuts. */
@Component({
  selector: 'app-keyboard-tooltip-demo',
  imports: [
    ScButton,
    ScKbd,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    SiSaveIcon,
  ],
  template: \`
    <div scTooltipProvider>
      <button
        scButton
        scTooltipTrigger
        variant="outline"
        size="icon"
        aria-keyshortcuts="S"
      >
        <svg siSaveIcon></svg>
        <span class="sr-only">Save</span>
      </button>
      <ng-template scTooltipPortal>
        <div scTooltip>
          Save Changes <kbd scKbd>S</kbd>
          <span scTooltipArrow></span>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardTooltipDemo {}`;
}
