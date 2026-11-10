import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OutlineToggleGroupDemo } from './outline-toggle-group-demo';

@Component({
  selector: 'app-outline-toggle-group-demo-container',
  imports: [DemoContainer, OutlineToggleGroupDemo],
  template: `
    <app-demo-container
      title="Outline"
      demoUrl="/demos/toggle-group/outline-toggle-group-demo"
      [code]="code"
    >
      <app-outline-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OutlineToggleGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

/** variant="outline": the items joined in a border. */
@Component({
  selector: 'app-outline-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: \`
    <div scToggleGroup variant="outline" aria-label="Calls" [(value)]="calls">
      <button scToggleGroupItem value="all">All</button>
      <button scToggleGroupItem value="missed">Missed</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OutlineToggleGroupDemo {
  protected readonly calls = signal(['all']);
}`;
}
