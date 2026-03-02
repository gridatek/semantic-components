import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { MultiSelectOption, ScMultiSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-multi-select-demo',
  imports: [ScMultiSelect],
  template: `
    <div class="space-y-3">
      <div class="max-w-sm">
        <sc-multi-select
          [(value)]="value"
          [options]="options"
          placeholder="Select fruits..."
        />
      </div>
      <p class="text-muted-foreground text-sm">
        Selected: {{ value().join(', ') || 'None' }}
      </p>
    </div>
  `,
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
}
