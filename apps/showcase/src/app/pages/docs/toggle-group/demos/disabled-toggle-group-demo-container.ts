import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledToggleGroupDemo } from './disabled-toggle-group-demo';

@Component({
  selector: 'app-disabled-toggle-group-demo-container',
  imports: [DemoContainer, DisabledToggleGroupDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledToggleGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: \`
    <div class="flex flex-col gap-4">
      <div
        scToggleGroup
        type="single"
        [disabled]="true"
        aria-label="Disabled toggle group"
      >
        <button scToggleGroupItem value="a" aria-label="Option A">A</button>
        <button scToggleGroupItem value="b" aria-label="Option B">B</button>
        <button scToggleGroupItem value="c" aria-label="Option C">C</button>
      </div>
      <div
        scToggleGroup
        type="single"
        aria-label="Toggle group with disabled item"
      >
        <button scToggleGroupItem value="a" aria-label="Option A">A</button>
        <button
          scToggleGroupItem
          value="b"
          [disabled]="true"
          aria-label="Option B (disabled)"
        >
          B
        </button>
        <button scToggleGroupItem value="c" aria-label="Option C">C</button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledToggleGroupDemo {}`;
}
