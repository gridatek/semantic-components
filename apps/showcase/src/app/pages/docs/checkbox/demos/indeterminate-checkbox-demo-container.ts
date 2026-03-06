import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IndeterminateCheckboxDemo } from './indeterminate-checkbox-demo';

@Component({
  selector: 'app-indeterminate-checkbox-demo-container',
  imports: [DemoContainer, IndeterminateCheckboxDemo],
  template: `
    <app-demo-container
      title="Indeterminate State"
      demoUrl="/demos/checkbox/indeterminate-checkbox-demo"
      [code]="code"
    >
      <app-indeterminate-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndeterminateCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-indeterminate-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel],
  template: \`
    <div class="flex flex-col gap-4">
      <div scCheckboxField>
        <input
          type="checkbox"
          scCheckbox
          [checked]="allSelected()"
          [indeterminate]="someSelected()"
          (change)="toggleAll($event)"
        />
        <label scLabel>Select all</label>
      </div>
      <div class="ml-6 flex flex-col gap-2">
        <div scCheckboxField>
          <input type="checkbox" scCheckbox [(checked)]="item1" />
          <label scLabel>Item 1</label>
        </div>
        <div scCheckboxField>
          <input type="checkbox" scCheckbox [(checked)]="item2" />
          <label scLabel>Item 2</label>
        </div>
        <div scCheckboxField>
          <input type="checkbox" scCheckbox [(checked)]="item3" />
          <label scLabel>Item 3</label>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndeterminateCheckboxDemo {
  readonly item1 = signal(true);
  readonly item2 = signal(false);
  readonly item3 = signal(false);

  readonly allSelected = computed(
    () => this.item1() && this.item2() && this.item3(),
  );
  readonly someSelected = computed(() => {
    const selected = [this.item1(), this.item2(), this.item3()].filter(
      Boolean,
    ).length;
    return selected > 0 && selected < 3;
  });

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.item1.set(checked);
    this.item2.set(checked);
    this.item3.set(checked);
  }
}`;
}
