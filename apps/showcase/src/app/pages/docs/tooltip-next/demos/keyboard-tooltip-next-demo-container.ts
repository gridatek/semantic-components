import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KeyboardTooltipNextDemo } from './keyboard-tooltip-next-demo';

@Component({
  selector: 'app-keyboard-tooltip-next-demo-container',
  imports: [DemoContainer, KeyboardTooltipNextDemo],
  template: `
    <app-demo-container
      title="Keyboard shortcut"
      demoUrl="/demos/tooltip-next/keyboard-tooltip-next-demo"
      [code]="code"
    >
      <app-keyboard-tooltip-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardTooltipNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScKbd,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';
import { SiSaveIcon } from '@semantic-icons/lucide-icons';

/** Content is yours, a kbd too; the button says its shortcut to screen readers with aria-keyshortcuts. */
@Component({
  selector: 'app-keyboard-tooltip-next-demo',
  imports: [
    ScButton,
    ScKbd,
    ScTooltipNext,
    ScTooltipNextArrow,
    ScTooltipNextPortal,
    ScTooltipNextProvider,
    ScTooltipNextTrigger,
    SiSaveIcon,
  ],
  template: \`
    <div scTooltipNextProvider>
      <button
        scButton
        scTooltipNextTrigger
        variant="outline"
        size="icon"
        aria-keyshortcuts="S"
      >
        <svg siSaveIcon></svg>
        <span class="sr-only">Save</span>
      </button>
      <ng-template scTooltipNextPortal>
        <div scTooltipNext>
          Save Changes <kbd scKbd>S</kbd>
          <span scTooltipNextArrow></span>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardTooltipNextDemo {}`;
}
