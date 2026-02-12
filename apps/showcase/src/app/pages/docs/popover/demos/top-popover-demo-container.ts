import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TopPopoverDemo } from './top-popover-demo';

@Component({
  selector: 'app-top-popover-demo-container',
  imports: [DemoContainer, TopPopoverDemo],
  template: `
    <app-demo-container
      title="Top"
      demoUrl="/demos/popover/top-popover-demo"
      [code]="code"
    >
      <app-top-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPopoverDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPopoverProvider,
  ScPopoverPortal,
  ScPopover,
  ScPopoverTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-top-popover-demo',
  imports: [ScPopoverProvider, ScPopoverPortal, ScPopover, ScPopoverTrigger],
  template: \`
    <div sc-popover-provider side="top">
      <button
        sc-popover-trigger
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Top
      </button>
      <div sc-popover-portal>
        <div sc-popover>
          <p class="text-sm">This popover appears on top.</p>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPopoverDemo {}`;
}
