import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScVirtualListNext,
  ScVirtualListNextRow,
} from '@semantic-components/ui/virtual-list';

/** 10,000 rows, a few dozen rendered: those in view and five more each way, each measured as it renders; its place in the whole list is aria-posinset of aria-setsize. */
@Component({
  selector: 'app-virtual-list-next-usage-demo',
  imports: [ScFrame, ScVirtualListNext, ScVirtualListNextRow],
  template: `
    <ul
      scVirtualListNext
      #list="scVirtualListNext"
      [count]="contacts.length"
      [estimate]="56"
      aria-label="Contacts"
      scFrame
      class="h-96 w-full max-w-md overflow-y-auto"
    >
      @for (row of list.rows(); track row.key) {
        <li
          [scVirtualListNextRow]="row"
          tabindex="0"
          class="focus-visible:ring-ring/50 border-b px-4 py-2 outline-none focus-visible:ring-3 focus-visible:ring-inset"
        >
          <p class="text-sm font-medium">{{ contacts[row.index].name }}</p>
          <p class="text-muted-foreground text-xs">
            {{ contacts[row.index].email }}
          </p>
        </li>
      }
    </ul>
    <p class="text-muted-foreground text-sm" data-testid="range">
      @if (list.range(); as range) {
        Rendered: {{ range.first + 1 }}–{{ range.last + 1 }} of
        {{ list.count() }}
      }
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class VirtualListNextUsageDemo {
  private readonly names = [
    'Ada',
    'Grace',
    'Alan',
    'Katherine',
    'Margaret',
    'Hedy',
    'Linus',
    'Barbara',
    'Dennis',
    'Radia',
  ];
  private readonly contacts = Array.from({ length: 10_000 }, (_, i) => {
    const name = this.names[i % 10] + ' ' + (i + 1);
    return {
      name,
      email: name.toLowerCase().replace(' ', '.') + '@example.com',
    };
  });
}
