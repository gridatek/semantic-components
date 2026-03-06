import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledToggleDemo } from './disabled-toggle-demo';

@Component({
  selector: 'app-disabled-toggle-demo-container',
  imports: [DemoContainer, DisabledToggleDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/toggle/disabled-toggle-demo"
      [code]="code"
    >
      <app-disabled-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: \`
    <div class="flex items-center gap-2">
      <button scToggle [disabled]="true" aria-label="Toggle disabled">
        <svg siBoldIcon></svg>
      </button>
      <button
        scToggle
        [pressed]="true"
        [disabled]="true"
        aria-label="Toggle disabled pressed"
      >
        <svg siBoldIcon></svg>
      </button>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledToggleDemo {}`;
}
