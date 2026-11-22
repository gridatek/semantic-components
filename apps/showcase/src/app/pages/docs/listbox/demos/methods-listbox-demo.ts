import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScListboxItem,
  ScListboxItemIndicator,
  ScListboxMultiple,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** #list="scListbox": selectAll(), clear(), focus(). */
@Component({
  selector: 'app-methods-listbox-demo',
  imports: [
    ScButton,
    ScListboxItem,
    ScListboxItemIndicator,
    ScListboxMultiple,
    SiCheckIcon,
  ],
  template: `
    <div class="grid w-56 gap-3">
      <div
        scListbox
        multiple
        #list="scListbox"
        aria-label="Toppings"
        [(value)]="toppings"
      >
        @for (item of items; track item.value) {
          <div scListboxItem [value]="item.value">
            {{ item.label }}
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
      <div class="flex flex-wrap gap-2">
        <button scButton variant="outline" size="sm" (click)="list.selectAll()">
          Select all
        </button>
        <button scButton variant="outline" size="sm" (click)="list.clear()">
          Clear
        </button>
        <button scButton variant="outline" size="sm" (click)="list.focus()">
          Focus
        </button>
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ toppings().join(', ') || 'None' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MethodsListboxDemo {
  private readonly toppings = signal<string[]>([]);
  private readonly items = [
    { value: 'cheese', label: 'Cheese' },
    { value: 'basil', label: 'Basil' },
    { value: 'onion', label: 'Onion' },
    { value: 'mushroom', label: 'Mushroom' },
    { value: 'olive', label: 'Olive' },
  ];
}
