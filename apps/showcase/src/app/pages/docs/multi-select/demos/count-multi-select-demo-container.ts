import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CountMultiSelectDemo } from './count-multi-select-demo';

@Component({
  selector: 'app-count-multi-select-demo-container',
  imports: [DemoContainer, CountMultiSelectDemo],
  template: `
    <app-demo-container title="Count Display" [code]="code">
      <app-count-multi-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountMultiSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScMultiSelect, MultiSelectOption } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-count-multi-select-demo',
  imports: [ScMultiSelect],
  template: \`
    <div class="max-w-sm">
      <sc-multi-select
        [(value)]="value"
        [options]="options"
        [showChips]="false"
        placeholder="Select countries..."
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountMultiSelectDemo {
  readonly value = signal<string[]>([]);

  readonly options: MultiSelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'kr', label: 'South Korea' },
    { value: 'br', label: 'Brazil' },
    { value: 'in', label: 'India' },
  ];
}`;
}
