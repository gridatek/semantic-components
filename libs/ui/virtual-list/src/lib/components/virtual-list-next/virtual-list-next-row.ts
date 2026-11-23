import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import {
  ScVirtualListNext,
  type ScVirtualListNextItem,
} from './virtual-list-next';

/**
 * A row of a `scVirtualListNext`: your element, given its place (in its lane)
 * and measured as it renders and whenever it changes size — `aria-posinset`
 * and `aria-setsize` say where it is in the whole list.
 */
@Directive({
  selector: '[scVirtualListNextRow]',
  host: {
    'data-slot': 'virtual-list-row',
    '[attr.data-index]': 'row().index',
    '[attr.aria-posinset]': 'row().index + 1',
    '[attr.aria-setsize]': 'list.count()',
    '[style]': 'place()',
    '[class]': 'class()',
  },
})
export class ScVirtualListNextRow {
  private readonly list = inject(ScVirtualListNext);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly row = input.required<ScVirtualListNextItem>({
    alias: 'scVirtualListNextRow',
  });

  /** Its place: along the list, and across it in its lane. */
  private readonly place = computed(() => {
    const row = this.row();
    const lanes = Math.max(1, this.list.lanes());
    const gap = this.list.gap();
    const along = row.start - this.list.margin();
    const share = `(100% - ${gap * (lanes - 1)}px) / ${lanes}`;
    const across =
      lanes > 1 ? `calc(${row.lane} * (${share} + ${gap}px))` : '0px';
    const breadth = lanes > 1 ? `calc(${share})` : '100%';
    return this.list.orientation() === 'vertical'
      ? `position:absolute;top:${along}px;inset-inline-start:${across};width:${breadth}`
      : `position:absolute;inset-inline-start:${along}px;top:${across};height:${breadth}`;
  });

  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    // Measured once the engine watches the page — and kept measured by it.
    afterRenderEffect(() => {
      this.row();
      if (this.list.mounted()) this.list.measure(this.element);
    });
  }
}
