import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconButtonTooltipDemo } from './icon-button-tooltip-demo';

@Component({
  selector: 'app-icon-button-tooltip-demo-container',
  imports: [DemoContainer, IconButtonTooltipDemo],
  template: `
    <app-demo-container
      title="Icon Button"
      demoUrl="/demos/tooltip/icon-button-tooltip-demo"
      [code]="code"
    >
      <app-icon-button-tooltip-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonTooltipDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-button-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger, SiPlusIcon],
  template: \`
    <button
      sc-button
      variant="outline"
      size="icon"
      scTooltipTrigger="Add item"
    >
      <svg si-plus-icon class="size-4"></svg>
      <span class="sr-only">Add item</span>
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonTooltipDemo {}`;
}
