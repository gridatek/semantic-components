import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScVirtualList,
  ScVirtualListRow,
} from '@semantic-components/ui/virtual-list';

/** In a right-to-left page: a strip starts at the right and runs as the text reads. */
@Component({
  selector: 'app-rtl-virtual-list-demo',
  imports: [Dir, ScFrame, ScVirtualList, ScVirtualListRow],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full flex-col items-center gap-3">
      <ul
        scVirtualList
        #list="scVirtualList"
        tabindex="0"
        orientation="horizontal"
        [count]="days.length"
        [estimate]="96"
        [gap]="8"
        aria-label="الأيام"
        scFrame
        class="h-28 w-full max-w-2xl overflow-x-auto"
      >
        @for (row of list.rows(); track row.key) {
          <li [scVirtualListRow]="row" class="py-2">
            <div
              scFrame
              size="sm"
              class="bg-muted grid h-full w-24 place-content-center text-center text-sm"
            >
              <span class="text-muted-foreground text-xs">يوم</span>
              <span class="text-lg font-semibold">{{ days[row.index] }}</span>
            </div>
          </li>
        }
      </ul>
    </div>
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
export class RtlVirtualListDemo {
  private readonly days = Array.from({ length: 365 }, (_, i) => i + 1);
}
