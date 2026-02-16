import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-date-picker-demo',
  imports: [ScDatePicker],
  template: `
    <sc-date-picker [(selected)]="selectedDate" />
    @if (selectedDate()) {
      <p class="text-sm text-muted-foreground mt-4">
        Selected: {{ selectedDate()?.toLocaleDateString() }}
      </p>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDatePickerDemo {
  readonly selectedDate = signal<Date | undefined>(undefined);
}
