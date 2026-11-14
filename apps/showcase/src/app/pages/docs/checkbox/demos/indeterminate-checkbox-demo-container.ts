import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IndeterminateCheckboxDemo } from './indeterminate-checkbox-demo';

@Component({
  selector: 'app-indeterminate-checkbox-demo-container',
  imports: [DemoContainer, IndeterminateCheckboxDemo],
  template: `
    <app-demo-container
      title="Indeterminate"
      demoUrl="/demos/checkbox/indeterminate-checkbox-demo"
      [code]="code"
    >
      <app-indeterminate-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IndeterminateCheckboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScCheckbox, ScField, ScFieldGroup } from '@semantic-components/ui';

/** A "select all" over a few items: a minus when only some are checked. */
@Component({
  selector: 'app-indeterminate-checkbox-demo',
  imports: [ScCheckbox, ScFieldGroup, ScField],
  template: \`
    <div scFieldGroup class="w-56 gap-3">
      <label scField orientation="horizontal">
        <input
          scCheckbox
          [checked]="allSelected()"
          [indeterminate]="someSelected()"
          (checkedChange)="selectAll($event)"
        />
        Select all
      </label>
      <div class="flex flex-col gap-3 ps-6">
        @for (item of items(); track item.name; let i = $index) {
          <label scField orientation="horizontal">
            <input
              scCheckbox
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
export class IndeterminateCheckboxDemo {
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
