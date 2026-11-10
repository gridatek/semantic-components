import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IndeterminateCheckboxNextDemo } from './indeterminate-checkbox-next-demo';

@Component({
  selector: 'app-indeterminate-checkbox-next-demo-container',
  imports: [DemoContainer, IndeterminateCheckboxNextDemo],
  template: `
    <app-demo-container
      title="Indeterminate"
      demoUrl="/demos/checkbox-next/indeterminate-checkbox-next-demo"
      [code]="code"
    >
      <app-indeterminate-checkbox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IndeterminateCheckboxNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScFieldGroup,
} from '@semantic-components/ui';

/** A "select all" over a few items: a minus when only some are checked. */
@Component({
  selector: 'app-indeterminate-checkbox-next-demo',
  imports: [ScCheckboxNext, ScCheckboxNextField, ScFieldGroup],
  template: \`
    <div scFieldGroup class="w-56 gap-3">
      <label scCheckboxNextField>
        <input
          type="checkbox"
          scCheckboxNext
          [checked]="allSelected()"
          [indeterminate]="someSelected()"
          (checkedChange)="selectAll($event)"
        />
        Select all
      </label>
      <div class="flex flex-col gap-3 ps-6">
        @for (item of items(); track item.name; let i = $index) {
          <label scCheckboxNextField>
            <input
              type="checkbox"
              scCheckboxNext
              [checked]="item.checked"
              (checkedChange)="select(i, $event)"
            />
            {{ item.name }}
          </label>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IndeterminateCheckboxNextDemo {
  protected readonly items = signal([
    { name: 'Item 1', checked: true },
    { name: 'Item 2', checked: false },
    { name: 'Item 3', checked: false },
  ]);
  protected readonly allSelected = computed(() =>
    this.items().every((item) => item.checked),
  );
  protected readonly someSelected = computed(
    () => this.items().some((item) => item.checked) && !this.allSelected(),
  );

  protected selectAll(checked: boolean): void {
    this.items.update((items) => items.map((item) => ({ ...item, checked })));
  }

  protected select(index: number, checked: boolean): void {
    this.items.update((items) =>
      items.map((item, i) => (i === index ? { ...item, checked } : item)),
    );
  }
}`;
}
