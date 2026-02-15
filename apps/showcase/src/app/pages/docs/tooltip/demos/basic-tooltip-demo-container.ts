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
import { ScTooltipTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-tooltip-demo',
  imports: [ScTooltipTrigger],
  template: \`
    <button
      scTooltipTrigger="Add to library"
      class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Hover me
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTooltipDemo {}`;
}
