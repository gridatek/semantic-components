import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrollToVirtualListNextDemo } from './scroll-to-virtual-list-next-demo';

@Component({
  selector: 'app-scroll-to-virtual-list-next-demo-container',
  imports: [DemoContainer, ScrollToVirtualListNextDemo],
  template: `
    <app-demo-container
      title="Scroll to a row"
      [code]="code"
      demoUrl="/demos/virtual-list-next/scroll-to-virtual-list-next-demo"
    >
      <app-scroll-to-virtual-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollToVirtualListNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScFrame } from '@semantic-components/ui';
import {
  ScVirtualListNext,
  ScVirtualListNextRow,
} from '@semantic-components/ui/virtual-list';

/** scrollToIndex(): to any row — even one never rendered — at the start, the centre or the end, at once or smoothly. */
@Component({
  selector: 'app-scroll-to-virtual-list-next-demo',
  imports: [ScButton, ScFrame, ScVirtualListNext, ScVirtualListNextRow],
  template: \`
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
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollToVirtualListNextDemo {
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
}`;
}
