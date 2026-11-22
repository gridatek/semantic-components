import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScListbox,
  ScListboxItem,
  ScListboxItemIndicator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** A long list in a set height: the option under focus — and the chosen one, at first — scrolled into view. */
@Component({
  selector: 'app-scrollable-listbox-demo',
  imports: [ScListbox, ScListboxItem, ScListboxItemIndicator, SiCheckIcon],
  template: `
    <div class="w-56">
      <div scListbox aria-label="Time zone" class="max-h-60" [(value)]="zone">
        @for (item of zones; track item.value) {
          <div scListboxItem [value]="item.value">
            {{ item.label }}
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableListboxDemo {
  private readonly zones = Array.from({ length: 27 }, (_, i) => {
    const offset = i - 12;
    const label =
      offset === 0 ? 'UTC' : `UTC${offset > 0 ? '+' : '−'}${Math.abs(offset)}`;
    return { value: `utc${offset}`, label };
  });
  private readonly zone = signal<string | null>('utc9');
}
