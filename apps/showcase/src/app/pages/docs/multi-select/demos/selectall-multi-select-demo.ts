import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScMultiSelect, MultiSelectOption } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-selectall-multi-select-demo',
  imports: [ScMultiSelect],
  template: `
    <div class="max-w-sm">
      <sc-multi-select
        [(value)]="value"
        [options]="options"
        [showSelectAll]="true"
        placeholder="Select colors..."
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectallMultiSelectDemo {
  readonly value = signal<string[]>([]);

  readonly options: MultiSelectOption[] = [
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'indigo', label: 'Indigo' },
    { value: 'violet', label: 'Violet' },
  ];
}
