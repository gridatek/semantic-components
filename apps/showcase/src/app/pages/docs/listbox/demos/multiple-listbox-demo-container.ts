import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleListboxDemo } from './multiple-listbox-demo';

@Component({
  selector: 'app-multiple-listbox-demo-container',
  imports: [DemoContainer, MultipleListboxDemo],
  template: `
    <app-demo-container
      title="Multiple"
      [code]="code"
      demoUrl="/demos/listbox/multiple-listbox-demo"
    >
      <app-multiple-listbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleListboxDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScListboxItem,
  ScListboxItemIndicator,
  ScListboxMultiple,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** multiple: several options — Space, Enter or a click toggles; Shift + arrows or a Shift-click a range, Ctrl + A all. */
@Component({
  selector: 'app-multiple-listbox-demo',
  imports: [
    ScField,
    ScLabel,
    ScListboxItem,
    ScListboxItemIndicator,
    ScListboxMultiple,
    SiCheckIcon,
  ],
  template: \`
    <div scField class="w-56">
      <div scLabel>Toppings</div>
      <div scListbox multiple [(value)]="toppings">
        @for (item of items; track item.value) {
          <div scListboxItem [value]="item.value">
            {{ item.label }}
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ toppings().join(', ') || 'None' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleListboxDemo {
  private readonly toppings = signal<string[]>(['cheese', 'onion']);
  private readonly items = [
    { value: 'cheese', label: 'Cheese' },
    { value: 'basil', label: 'Basil' },
    { value: 'onion', label: 'Onion' },
    { value: 'mushroom', label: 'Mushroom' },
    { value: 'olive', label: 'Olive' },
  ];
}`;
}
