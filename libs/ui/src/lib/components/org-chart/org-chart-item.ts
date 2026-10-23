import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { setInput } from '../../utils/bind-input/bind-input';
import { cn } from '../../utils/cn/cn';
import { ScAriaTreeItem } from '../tree/aria-tree-item';
import { ScOrgChart } from './org-chart';
import { ScOrgChartCard } from './org-chart-card';
import { ScOrgChartGroup } from './org-chart-group';

/**
 * A person (`role="treeitem"`): their card, then — if they have reports —
 * a group of them. The `li` takes focus; it is named by its card. Open by
 * default; `[(expanded)]` two-way.
 */
@Component({
  selector: 'li[scOrgChartItem]',
  exportAs: 'scOrgChartItem',
  hostDirectives: [
    {
      directive: ScAriaTreeItem,
      inputs: ['value', 'disabled', 'selectable', 'expanded'],
      outputs: ['expandedChange'],
    },
  ],
  template: `<ng-content />`,
  host: {
    'data-slot': 'org-chart-item',
    '[attr.data-state]': 'state()',
    '[attr.aria-labelledby]': 'card()?.id',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScOrgChartItem {
  readonly treeItem = inject(ScAriaTreeItem);
  private readonly chart = inject(ScOrgChart);
  private readonly group = inject(
    forwardRef(() => ScOrgChartGroup),
    {
      optional: true,
    },
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** Typed to jump to this person; their card's text by default. */
  readonly label = input<string>();

  readonly card = contentChild(ScOrgChartCard, { descendants: false });
  private readonly reports = contentChild(ScOrgChartGroup, {
    descendants: false,
  });
  readonly hasReports = computed(() => !!this.reports());
  readonly expanded = computed(() => this.treeItem.expanded());
  protected readonly state = computed(() =>
    this.hasReports() ? (this.expanded() ? 'open' : 'closed') : null,
  );

  private readonly cardText = signal('');

  protected readonly class = computed(() => {
    const down = this.chart.direction() === 'down';
    return cn(
      'relative flex outline-none',
      down ? 'flex-col items-center' : 'flex-row items-center',
      // Focus ring on this person's card only, not on their reports'.
      'focus-visible:*:data-[slot=org-chart-card]:ring-ring/50 focus-visible:*:data-[slot=org-chart-card]:ring-3',
      // A report: a stub from the line joining siblings to the card, and
      // its share of that line (none for an only report).
      this.group &&
        (down
          ? 'px-2 pt-4 before:absolute before:inset-x-0 before:top-0 before:h-px after:absolute after:start-1/2 after:top-0 after:h-4 after:w-px first:before:start-1/2 last:before:end-1/2 only:before:hidden'
          : 'py-1 ps-4 before:absolute before:inset-y-0 before:start-0 before:w-px after:absolute after:start-0 after:top-1/2 after:h-px after:w-4 first:before:top-1/2 last:before:bottom-1/2 only:before:hidden'),
      this.group && 'before:bg-border after:bg-border',
      this.classInput(),
    );
  });

  constructor() {
    // Open by default: a chart shows its people. `[expanded]` overrides.
    this.treeItem.expanded.set(true);
    // Reports belong to the enclosing group, the top to the chart.
    if (this.group) this.group.adopt(this.treeItem);
    else setInput(this.treeItem.parent, this.chart.tree);
    // Typed to jump here: the label, or the card's text — not the subtree's.
    afterNextRender(() => this.cardText.set(this.card()?.text().trim() ?? ''));
    inject(DestroyRef).onDestroy(() => this.group?.forget(this.treeItem));
    effect(() =>
      setInput(this.treeItem.label, this.label() ?? this.cardText()),
    );
  }
}
