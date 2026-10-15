import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicToggleDemo } from './basic-toggle-demo';

@Component({
  selector: 'app-basic-toggle-demo-container',
  imports: [DemoContainer, BasicToggleDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/toggle/basic-toggle-demo"
      [code]="code"
    >
      <app-basic-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicToggleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-toggle-demo',
  imports: [ScToggle, SiBoldIcon],
  template: \`
    <button scToggle [(pressed)]="bold">
      <svg siBoldIcon></svg>
      <span class="sr-only">Toggle bold</span>
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicToggleDemo {
  readonly bold = signal(false);
}`;
}
