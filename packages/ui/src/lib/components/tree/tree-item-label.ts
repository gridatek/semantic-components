import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTreeItem } from './tree-item';

/**
 * An item's row: its indicator, checkbox, icon and text, in a line — what is
 * pressed and styled. On an `a`, a link (a docs sidebar): Enter on the item
 * follows it; the item keeps the focus. Its state as `data-*` attributes
 * for your styles: `data-selected`, `data-expanded`, `data-branch`,
 * `data-current`, `data-disabled`, `data-loading`, `data-failed`.
 */
@Directive({
  selector: 'div[scTreeItemLabel], a[scTreeItemLabel]',
  host: {
    '[attr.tabindex]': 'link ? -1 : null',
    '[attr.data-selected]': 'item.selected() ? "" : null',
    '[attr.data-expanded]': 'item.expanded() ? "" : null',
    '[attr.data-branch]': 'item.branch() ? "" : null',
    '[attr.data-current]': 'item.current() ? "" : null',
    '[attr.data-disabled]': 'item.isDisabled() ? "" : null',
    '[attr.data-loading]': 'item.loading() ? "" : null',
    '[attr.data-failed]': 'item.failed() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScTreeItemLabel {
  private readonly item = inject(ScTreeItem);
  private readonly styles = injectStyle().tree;
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly link =
    this.element instanceof HTMLAnchorElement ? this.element : null;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      "flex w-full cursor-default items-center outline-none select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      this.styles.label,
      this.item.selected() || this.item.current()
        ? 'bg-accent font-medium text-accent-foreground'
        : 'hover:bg-accent/50 hover:text-accent-foreground',
      this.item.focusVisible() && 'ring-3 ring-ring/50',
      this.item.isDisabled() && 'opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    this.item.link = this.link;
    this.item.labelElement.set(this.element);
  }
}
