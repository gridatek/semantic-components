import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlySegmentedControlDemo } from './read-only-segmented-control-demo';

@Component({
  selector: 'app-read-only-segmented-control-demo-container',
  imports: [DemoContainer, ReadOnlySegmentedControlDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/segmented-control/read-only-segmented-control-demo"
    >
      <app-read-only-segmented-control-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlySegmentedControlDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
} from '@semantic-components/ui';

/** readonly: focusable — the arrows move focus — not changed. */
@Component({
  selector: 'app-read-only-segmented-control-demo',
  imports: [
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
  ],
  template: \`
    <div class="grid justify-items-center gap-2">
      <div scSegmentedControl readonly aria-label="Plan" [(value)]="plan">
        <div scSegmentedControlIndicator></div>
        @for (item of plans; track item.value) {
          <button scSegmentedControlItem [value]="item.value">
            {{ item.label }}
          </button>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ plan() ?? 'None' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlySegmentedControlDemo {
  private readonly plan = signal<string | null>('pro');
  private readonly plans = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'team', label: 'Team' },
  ];
}`;
}
