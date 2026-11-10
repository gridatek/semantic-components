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

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-toggle-demo',
  imports: [ScToggle],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <button scToggle disabled>Disabled</button>
      <button scToggle variant="outline" disabled>Disabled outline</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledToggleDemo {}`;
}
