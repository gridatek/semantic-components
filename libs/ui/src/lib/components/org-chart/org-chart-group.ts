import { type TreeItem, TreeItemGroup } from '@angular/aria/tree';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { setInput } from '../../utils/bind-input/bind-input';
import { cn } from '../../utils/cn/cn';
import { ScTreeItemGroupRef } from '../tree/tree-item-group-ref';
import {
  SC_TREE_ITEM_GROUP,
  type ScTreeItemGroupContext,
} from '../tree/tree-tokens';
import { ScOrgChart } from './org-chart';
import { ScOrgChartItem } from './org-chart-item';

/**
 * A person's reports (`role="group"`), in the `li` after their card: a line
 * from the card to the line joining them. Shown while the person is open.
 */
@Component({
  selector: 'ul[scOrgChartGroup]',
  imports: [TreeItemGroup, ScTreeItemGroupRef],
  providers: [{ provide: SC_TREE_ITEM_GROUP, useExisting: ScOrgChartGroup }],
  template: `
    <ng-template ngTreeItemGroup scTreeItemGroupRef [ownedBy]="item.treeItem">
      <ng-content />
    </ng-template>
  `,
  host: {
    role: 'group',
    'data-slot': 'org-chart-group',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScOrgChartGroup implements ScTreeItemGroupContext {
  protected readonly item = inject(forwardRef(() => ScOrgChartItem));
  private readonly chart = inject(ScOrgChart);

  readonly classInput = input<string>('', { alias: 'class' });

  get owner(): TreeItem<unknown> {
    return this.item.treeItem as TreeItem<unknown>;
  }

  private ariaGroup: TreeItemGroup<unknown> | undefined;
  private readonly pending: TreeItem<unknown>[] = [];
  private readonly live = new Set<TreeItem<unknown>>();

  constructor() {
    // Aria sorts the reports by their place in the page as they register —
    // at times (WebKit) before they are in it, and → then went to the wrong
    // first report. Put in place, they are sorted again: one registered anew.
    const observer = new MutationObserver(() => {
      const any = this.live.values().next().value;
      if (any) this.ariaGroup?._register(any);
    });
    observer.observe(inject(ElementRef).nativeElement, { childList: true });
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }

  adopt(item: TreeItem<unknown>): void {
    this.live.add(item);
    if (this.ariaGroup) setInput(item.parent, this.ariaGroup);
    else this.pending.push(item);
  }

  setAriaGroup(group: TreeItemGroup<unknown>): void {
    this.ariaGroup = group;
    for (const item of this.pending.splice(0)) setInput(item.parent, group);
  }

  /** Gone (closed, or removed): no longer re-sorted. */
  forget(item: TreeItem<unknown>): void {
    this.live.delete(item);
  }

  protected readonly class = computed(() =>
    cn(
      'before:bg-border relative flex before:absolute',
      this.chart.direction() === 'down'
        ? 'flex-row pt-4 before:start-1/2 before:top-0 before:h-4 before:w-px'
        : 'flex-col ps-4 before:start-0 before:top-1/2 before:h-px before:w-4',
      !this.item.expanded() && 'hidden',
      this.classInput(),
    ),
  );
}
