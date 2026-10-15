import { Component, ViewEncapsulation } from '@angular/core';
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
})
export class DisabledToggleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: \`
    <div class="flex items-center gap-2">
      <button scToggle [disabled]="true">
        <svg siBoldIcon></svg>
        <span class="sr-only">Toggle disabled</span>
      </button>
      <button scToggle [pressed]="true" [disabled]="true">
        <svg siBoldIcon></svg>
        <span class="sr-only">Toggle disabled pressed</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledToggleDemo {}`;
}
