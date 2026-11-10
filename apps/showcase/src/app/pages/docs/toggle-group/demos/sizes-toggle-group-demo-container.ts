import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesToggleGroupDemo } from './sizes-toggle-group-demo';

@Component({
  selector: 'app-sizes-toggle-group-demo-container',
  imports: [DemoContainer, SizesToggleGroupDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/toggle-group/sizes-toggle-group-demo"
      [code]="code"
    >
      <app-sizes-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesToggleGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

/** size: sm, default, lg — for every item. */
@Component({
  selector: 'app-sizes-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: \`
    <div class="flex flex-col gap-4">
      <div
        scToggleGroup
        size="sm"
        variant="outline"
        aria-label="Side, small"
        [(value)]="small"
      >
        <button scToggleGroupItem value="top">Top</button>
        <button scToggleGroupItem value="bottom">Bottom</button>
        <button scToggleGroupItem value="left">Left</button>
        <button scToggleGroupItem value="right">Right</button>
      </div>
      <div
        scToggleGroup
        variant="outline"
        aria-label="Side, default"
        [(value)]="normal"
      >
        <button scToggleGroupItem value="top">Top</button>
        <button scToggleGroupItem value="bottom">Bottom</button>
        <button scToggleGroupItem value="left">Left</button>
        <button scToggleGroupItem value="right">Right</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesToggleGroupDemo {
  protected readonly small = signal(['top']);
  protected readonly normal = signal(['top']);
}`;
}
