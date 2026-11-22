import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledListboxDemo } from './disabled-listbox-demo';

@Component({
  selector: 'app-disabled-listbox-demo-container',
  imports: [DemoContainer, DisabledListboxDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/listbox/disabled-listbox-demo"
    >
      <app-disabled-listbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledListboxDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScListboxItem,
  ScListboxItemIndicator,
  ScListboxMultiple,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** An option disabled (skipped by the arrows, typing and ranges), or the whole list — out of the Tab order. */
@Component({
  selector: 'app-disabled-listbox-demo',
  imports: [
    ScButton,
    ScListboxItem,
    ScListboxItemIndicator,
    ScListboxMultiple,
    SiCheckIcon,
  ],
  template: \`
    <div class="grid w-56 gap-3">
      <div
        scListbox
        multiple
        aria-label="Toppings"
        [disabled]="off()"
        [(value)]="toppings"
      >
        @for (item of items; track item.value) {
          <div
            scListboxItem
            [value]="item.value"
            [disabled]="item.value === 'olive'"
          >
            {{ item.label }}
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
      <button scButton variant="outline" size="sm" (click)="off.set(!off())">
        {{ off() ? 'Enable' : 'Disable' }} the list
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledListboxDemo {
  private readonly off = signal(false);
  private readonly toppings = signal<string[]>(['basil']);
  private readonly items = [
    { value: 'cheese', label: 'Cheese' },
    { value: 'basil', label: 'Basil' },
    { value: 'onion', label: 'Onion' },
    { value: 'mushroom', label: 'Mushroom' },
    { value: 'olive', label: 'Olive' },
  ];
}`;
}
