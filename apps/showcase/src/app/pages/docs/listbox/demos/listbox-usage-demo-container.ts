import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ListboxUsageDemo } from './listbox-usage-demo';

@Component({
  selector: 'app-listbox-usage-demo-container',
  imports: [DemoContainer, ListboxUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/listbox/listbox-usage-demo"
    >
      <app-listbox-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ListboxUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScListbox,
  ScListboxItem,
  ScListboxItemIndicator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** One option, always in view: selection follows focus — the arrows, Home, End and typing choose. Named by its field. */
@Component({
  selector: 'app-listbox-usage-demo',
  imports: [
    ScField,
    ScLabel,
    ScListbox,
    ScListboxItem,
    ScListboxItemIndicator,
    SiCheckIcon,
  ],
  template: \`
    <div scField class="w-56">
      <div scLabel>Topping</div>
      <div scListbox [(value)]="topping">
        @for (item of items; track item.value) {
          <div scListboxItem [value]="item.value">
            {{ item.label }}
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ topping() ?? 'None' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ListboxUsageDemo {
  private readonly topping = signal<string | null>('basil');
  private readonly items = [
    { value: 'cheese', label: 'Cheese' },
    { value: 'basil', label: 'Basil' },
    { value: 'onion', label: 'Onion' },
    { value: 'mushroom', label: 'Mushroom' },
    { value: 'olive', label: 'Olive' },
  ];
}`;
}
