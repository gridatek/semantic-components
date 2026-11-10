import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SpacingToggleGroupDemo } from './spacing-toggle-group-demo';

@Component({
  selector: 'app-spacing-toggle-group-demo-container',
  imports: [DemoContainer, SpacingToggleGroupDemo],
  template: `
    <app-demo-container
      title="Spacing"
      demoUrl="/demos/toggle-group/spacing-toggle-group-demo"
      [code]="code"
    >
      <app-spacing-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SpacingToggleGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

/** spacing: the gap between the items (2 by default; 0 joins them). */
@Component({
  selector: 'app-spacing-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: \`
    <div class="flex flex-col gap-4">
      <div
        scToggleGroup
        size="sm"
        variant="outline"
        [spacing]="2"
        aria-label="Side, spaced"
        [(value)]="spaced"
      >
        <button scToggleGroupItem value="top">Top</button>
        <button scToggleGroupItem value="bottom">Bottom</button>
        <button scToggleGroupItem value="left">Left</button>
        <button scToggleGroupItem value="right">Right</button>
      </div>
      <div
        scToggleGroup
        size="sm"
        variant="outline"
        [spacing]="0"
        aria-label="Side, joined"
        [(value)]="joined"
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
export class SpacingToggleGroupDemo {
  protected readonly spaced = signal(['top']);
  protected readonly joined = signal(['top']);
}`;
}
