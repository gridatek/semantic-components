import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IndeterminateNativeCheckboxDemo } from './indeterminate-native-checkbox-demo';

@Component({
  selector: 'app-indeterminate-native-checkbox-demo-container',
  imports: [DemoContainer, IndeterminateNativeCheckboxDemo],
  template: `
    <app-demo-container
      title="Indeterminate State"
      demoUrl="/demos/native-checkbox/indeterminate-native-checkbox-demo"
      [code]="code"
    >
      <app-indeterminate-native-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndeterminateNativeCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScNativeCheckbox } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-indeterminate-native-checkbox-demo',
  imports: [ScNativeCheckbox],
  template: \`
    <div class="flex flex-col gap-4">
      <div class="flex items-center space-x-2">
        <input
          scNativeCheckbox
          type="checkbox"
          [checked]="allSelected()"
          [indeterminate]="someSelected()"
          (change)="toggleAll($event)"
          id="select-all-native"
        />
        <label
          for="select-all-native"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Select all
        </label>
      </div>
      <div class="ml-6 flex flex-col gap-2">
        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [checked]="item1()"
            (change)="item1.set($any($event.target).checked)"
            id="item1-native"
          />
          <label
            for="item1-native"
            class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Item 1
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [checked]="item2()"
            (change)="item2.set($any($event.target).checked)"
            id="item2-native"
          />
          <label
            for="item2-native"
            class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Item 2
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            type="checkbox"
            [checked]="item3()"
            (change)="item3.set($any($event.target).checked)"
            id="item3-native"
          />
          <label
            for="item3-native"
            class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Item 3
          </label>
        </div>
      </div>
    </div>
  \`,
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
}`;
}
