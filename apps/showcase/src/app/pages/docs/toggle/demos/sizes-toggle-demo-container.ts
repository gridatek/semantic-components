import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesToggleDemo } from './sizes-toggle-demo';

@Component({
  selector: 'app-sizes-toggle-demo-container',
  imports: [DemoContainer, SizesToggleDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/toggle/sizes-toggle-demo"
      [code]="code"
    >
      <app-sizes-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: \`
    <div class="flex items-center gap-2">
      <button scToggle size="sm" aria-label="Toggle small">
        <svg siBoldIcon></svg>
      </button>
      <button scToggle size="default" aria-label="Toggle default">
        <svg siBoldIcon></svg>
      </button>
      <button scToggle size="lg" aria-label="Toggle large">
        <svg siBoldIcon></svg>
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesToggleDemo {}`;
}
