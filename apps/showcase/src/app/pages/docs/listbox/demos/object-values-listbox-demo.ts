import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScListbox,
  ScListboxItem,
  ScListboxItemIndicator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** Values are any type: here the plans themselves — the same objects in the options and in the value. */
@Component({
  selector: 'app-object-values-listbox-demo',
  imports: [ScListbox, ScListboxItem, ScListboxItemIndicator, SiCheckIcon],
  template: `
    <div class="grid w-64 gap-2">
      <div scListbox aria-label="Plan" [(value)]="plan">
        @for (item of plans; track item.id) {
          <div
            scListboxItem
            [value]="item"
            [label]="item.name"
            [disabled]="item.id === 'enterprise'"
          >
            <span class="flex-1">{{ item.name }}</span>
            <span class="text-muted-foreground text-xs">{{ item.price }}</span>
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ plan()?.id ?? 'None' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ObjectValuesListboxDemo {
  private readonly plans = [
    { id: 'free', name: 'Free', price: '$0' },
    { id: 'pro', name: 'Pro', price: '$12' },
    { id: 'team', name: 'Team', price: '$30' },
    { id: 'enterprise', name: 'Enterprise', price: 'Contact us' },
  ];
  private readonly plan = signal<{
    id: string;
    name: string;
    price: string;
  } | null>(this.plans[1]);
}
