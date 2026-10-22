import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScVirtualList, type ScVirtualListItem } from './virtual-list';

/**
 * A row — `[scVirtualListRow]="row"`, one of the list's `rows()`:
 * placed at its start, in its lane, and measured as it renders and as it
 * changes. Its place in the whole list is `aria-posinset` of `aria-setsize`.
 */
@Directive({
  selector: '[scVirtualListRow]',
  host: {
    'data-slot': 'virtual-list-row',
    '[attr.data-index]': 'row().index',
    '[attr.aria-posinset]': 'row().index + 1',
    '[attr.aria-setsize]': 'list.count()',
    '[style]': 'place()',
    '[class]': 'class()',
  },
})
export class ScVirtualListRow {
  protected readonly list = inject(ScVirtualList);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly row = input.required<ScVirtualListItem>({
    alias: 'scVirtualListRow',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  /** Where it goes: along the flow at its start, across in its lane. */
  protected readonly place = computed(() => {
    const { start, lane } = this.row();
    const lanes = Math.max(1, this.list.lanes());
    const gap = this.list.gap();
    const share = `((100% - ${(lanes - 1) * gap}px) / ${lanes})`;
    const across =
      lanes === 1
        ? ['0px', '100%']
        : [`calc(${lane} * (${share} + ${gap}px))`, `calc${share}`];
    return this.list.orientation() === 'vertical'
      ? `top:${start}px;inset-inline-start:${across[0]};width:${across[1]}`
      : `inset-inline-start:${start}px;top:${across[0]};height:${across[1]}`;
  });

  protected readonly class = computed(() => cn('absolute', this.classInput()));

  constructor() {
    this.list.ɵobserve(this.element, () => this.row().key);
    inject(DestroyRef).onDestroy(() => this.list.ɵunobserve(this.element));
  }
}
