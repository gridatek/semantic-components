import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicMultiSelectDemo } from './basic-multi-select-demo';

@Component({
  selector: 'app-basic-multi-select-demo-container',
  imports: [DemoContainer, BasicMultiSelectDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-multi-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMultiSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScMultiSelect, MultiSelectOption } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-multi-select-demo',
  imports: [ScMultiSelect],
  template: \`
    <div class="space-y-3">
      <div class="max-w-sm">
        <sc-multi-select
          [(value)]="value"
          [options]="options"
          placeholder="Select fruits..."
        />
      </div>
      <p class="text-sm text-muted-foreground">
        Selected: {{ value().join(', ') || 'None' }}
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMultiSelectDemo {
  readonly value = signal<string[]>([]);

  readonly options: MultiSelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
  ];
}`;
}
