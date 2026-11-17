import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScScrollAreaScrollbar } from './scroll-area-scrollbar';
import { ScScrollAreaState } from './scroll-area-state';
import { ScScrollAreaThumb } from './scroll-area-thumb';

/**
 * A native scroll container with custom scrollbars: the root. Its viewport
 * scrolls (wheel, touch, keyboard — the browser's), its scrollbars follow.
 * A vertical scrollbar and its thumb by default; write your own scrollbar(s)
 * (or a corner) and they take its place. It tells what overflows, and where:
 * `data-has-overflow-x` / `-y`, `data-overflow-x-start` / `-end`,
 * `data-overflow-y-start` / `-end`, and `data-scrolling` while it scrolls.
 * As Base UI's ScrollArea.Root.
 */
@Component({
  selector: 'div[scScrollArea]',
  imports: [ScScrollAreaScrollbar, ScScrollAreaThumb],
  providers: [ScScrollAreaState],
  template: `
    <ng-content />
    <ng-content select="[scScrollAreaScrollbar], [scScrollAreaCorner]">
      <div scScrollAreaScrollbar>
        <div scScrollAreaThumb></div>
      </div>
    </ng-content>
  `,
  host: {
    '[attr.data-has-overflow-x]': 'area.hasOverflowX() ? "" : null',
    '[attr.data-has-overflow-y]': 'area.hasOverflowY() ? "" : null',
    '[attr.data-overflow-x-start]': 'area.overflowXStart() > 0 ? "" : null',
    '[attr.data-overflow-x-end]': 'area.overflowXEnd() > 0 ? "" : null',
    '[attr.data-overflow-y-start]': 'area.overflowYStart() > 0 ? "" : null',
    '[attr.data-overflow-y-end]': 'area.overflowYEnd() > 0 ? "" : null',
    '[attr.data-scrolling]': 'area.scrolling() ? "" : null',
    '[style.--sc-scroll-area-corner-size]':
      'area.bothOverflow() ? "0.625rem" : "0px"',
    '[class]': 'class()',
    '(pointerenter)': 'area.hovering.set(true)',
    '(pointerleave)': 'area.hovering.set(false)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScScrollArea {
  /** Its state: what overflows, where it is scrolled. */
  readonly area = inject(ScScrollAreaState);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('relative overflow-hidden', this.classInput()),
  );
}
