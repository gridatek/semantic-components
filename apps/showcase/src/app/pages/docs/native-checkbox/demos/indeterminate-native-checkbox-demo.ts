import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScNativeCheckbox } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-indeterminate-native-checkbox-demo',
  imports: [ScNativeCheckbox],
  template: `
    <div class="flex flex-col gap-4">
      <label class="flex items-center space-x-2">
        <input
          scNativeCheckbox
          type="checkbox"
          [checked]="allSelected()"
          [indeterminate]="someSelected()"
          (change)="toggleAll($event)"
        />
        <span class="text-sm leading-none font-medium">Select all</span>
      </label>
      <div class="ml-6 flex flex-col gap-2">
        <label class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [checked]="item1()"
            (change)="item1.set($any($event.target).checked)"
          />
          <span class="text-sm leading-none font-medium">Item 1</span>
        </label>
        <label class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [checked]="item2()"
            (change)="item2.set($any($event.target).checked)"
          />
          <span class="text-sm leading-none font-medium">Item 2</span>
        </label>
        <label class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [checked]="item3()"
            (change)="item3.set($any($event.target).checked)"
          />
          <span class="text-sm leading-none font-medium">Item 3</span>
        </label>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndeterminateNativeCheckboxDemo {
  readonly item1 = signal(true);
  readonly item2 = signal(false);
  readonly item3 = signal(false);

  readonly allSelected = () => this.item1() && this.item2() && this.item3();
  readonly someSelected = () => {
    const selected = [this.item1(), this.item2(), this.item3()].filter(
      Boolean,
    ).length;
    return selected > 0 && selected < 3;
  };

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.item1.set(checked);
    this.item2.set(checked);
    this.item3.set(checked);
  }
}
