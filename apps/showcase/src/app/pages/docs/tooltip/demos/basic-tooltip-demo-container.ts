import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicTooltipDemo } from './basic-tooltip-demo';

@Component({
  selector: 'app-basic-tooltip-demo-container',
  imports: [DemoContainer, BasicTooltipDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/tooltip/basic-tooltip-demo"
      [code]="code"
    >
      <app-basic-tooltip-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTooltipDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger],
  template: \`
    <button scButton variant="outline" scTooltipTrigger="Add to library">
      Hover me
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTooltipDemo {}`;
}
