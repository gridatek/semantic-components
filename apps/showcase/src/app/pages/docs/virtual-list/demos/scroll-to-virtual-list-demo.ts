import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScFrame } from '@semantic-components/ui';
import {
  ScVirtualList,
  ScVirtualListRow,
} from '@semantic-components/ui/virtual-list';

/** scrollToIndex(): to any row — even one never rendered — at the start, the centre or the end, at once or smoothly. */
@Component({
  selector: 'app-scroll-to-virtual-list-demo',
  imports: [ScButton, ScFrame, ScVirtualList, ScVirtualListRow],
  template: `
    <div class="flex flex-wrap justify-center gap-2">
      <button
        scButton
        variant="outline"
        size="sm"
        (click)="list.scrollToIndex(0, { align: 'start' })"
      >
        First
      </button>
      <button
        scButton
        variant="outline"
        size="sm"
        (click)="
          list.scrollToIndex(4999, { align: 'center', behavior: 'smooth' })
        "
      >
        5,000 (centred, smooth)
      </button>
      <button
        scButton
        variant="outline"
        size="sm"
        (click)="list.scrollToIndex(9999, { align: 'end' })"
      >
        Last
      </button>
    </div>
    <ul
      scVirtualList
      #list="scVirtualList"
      [count]="contacts.length"
      [estimate]="56"
      aria-label="Contacts"
      scFrame
      class="h-96 w-full max-w-md overflow-y-auto"
    >
      @for (row of list.rows(); track row.key) {
        <li
          [scVirtualListRow]="row"
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
export class ScrollToVirtualListDemo {
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
