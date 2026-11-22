import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupsListboxDemo } from './groups-listbox-demo';

@Component({
  selector: 'app-groups-listbox-demo-container',
  imports: [DemoContainer, GroupsListboxDemo],
  template: `
    <app-demo-container
      title="Groups"
      [code]="code"
      demoUrl="/demos/listbox/groups-listbox-demo"
    >
      <app-groups-listbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsListboxDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScListboxGroup,
  ScListboxGroupLabel,
  ScListboxItem,
  ScListboxItemIndicator,
  ScListboxMultiple,
  ScListboxSeparator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** Groups, each named by its label, a separator between them; ranges and Ctrl + A cross them. */
@Component({
  selector: 'app-groups-listbox-demo',
  imports: [
    ScListboxGroup,
    ScListboxGroupLabel,
    ScListboxItem,
    ScListboxItemIndicator,
    ScListboxMultiple,
    ScListboxSeparator,
    SiCheckIcon,
  ],
  template: \`
    <div class="grid w-56 gap-2">
      <div scListbox multiple aria-label="Produce" [(value)]="produce">
        <div scListboxGroup>
          <div scListboxGroupLabel>Fruits</div>
          @for (item of fruits; track item.value) {
            <div scListboxItem [value]="item.value">
              {{ item.label }}
              <span scListboxItemIndicator><svg siCheckIcon></svg></span>
            </div>
          }
        </div>
        <div scListboxSeparator></div>
        <div scListboxGroup>
          <div scListboxGroupLabel>Vegetables</div>
          @for (item of vegetables; track item.value) {
            <div scListboxItem [value]="item.value">
              {{ item.label }}
              <span scListboxItemIndicator><svg siCheckIcon></svg></span>
            </div>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ produce().join(', ') || 'None' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsListboxDemo {
  private readonly produce = signal<string[]>(['banana']);
  private readonly fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
  private readonly vegetables = [
    { value: 'carrot', label: 'Carrot' },
    { value: 'leek', label: 'Leek' },
    { value: 'pea', label: 'Pea' },
  ];
}`;
}
