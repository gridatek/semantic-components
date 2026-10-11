import { Tree, TreeItemGroup } from '@angular/aria/tree';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  type OnInit,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn, setInput } from '@semantic-components/ui';
import { ScAriaOrgChartItem } from './aria-org-chart-item';
import type {
  ScOrgChartNodeData,
  ScOrgChartNodeDefContext,
} from './org-chart-types';
import { SC_ORG_CHART } from './org-chart-types';

@Component({
  selector: 'sc-org-chart-node',
  imports: [NgTemplateOutlet, TreeItemGroup],
  hostDirectives: [ScAriaOrgChartItem],
  template: `
    <div [class]="containerClass()">
      <!-- Node Card -->
      <div class="relative z-10">
        <ng-container
          [ngTemplateOutlet]="orgChart.nodeDef().templateRef"
          [ngTemplateOutletContext]="templateContext()"
        />
      </div>

      <!-- Connector Lines & Children -->
      @if (hasChildren()) {
        <!-- aria renders the group's content while the node is expanded -->
        <ng-template ngTreeItemGroup [ownedBy]="treeItem">
          <div [class]="childrenContainerClass()">
            <!-- Vertical connector from parent -->
            <div [class]="connectorClass()"></div>

            <!-- Children wrapper -->
            <div role="group" [class]="childrenWrapperClass()">
              @for (
                child of node().children;
                track child.id;
                let isFirst = $first;
                let isLast = $last
              ) {
                <div [class]="childNodeClass()">
                  <!-- Stub from the sibling line down (or across) to the child -->
                  <div [class]="stubClass()"></div>
                  <!-- Sibling line, bridging the gap to the next sibling -->
                  @if (!(isFirst && isLast)) {
                    <div [class]="siblingLineClass(isFirst, isLast)"></div>
                  }

                  <!-- Recursive child node -->
                  <sc-org-chart-node [node]="child" />
                </div>
              }
            </div>
          </div>
        </ng-template>
      }
    </div>
  `,
  host: {
    'data-slot': 'org-chart-node',
    '[attr.aria-label]': 'label()',
    '[class]': 'hostClass()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScOrgChartNode implements OnInit {
  readonly orgChart = inject(SC_ORG_CHART);
  protected readonly treeItem =
    inject<ScAriaOrgChartItem<string>>(ScAriaOrgChartItem);

  readonly node = input.required<ScOrgChartNodeData>();

  readonly classInput = input<string>('', { alias: 'class' });

  /** The treeitem is named after the person, not the text of its whole subtree. */
  protected readonly label = computed(() => {
    const node = this.node();
    return node.title ? `${node.name}, ${node.title}` : node.name;
  });

  protected readonly hostClass = computed(() =>
    cn(
      'block outline-none',
      // Focus ring on this node's own card, not on its descendants' cards.
      '[&:focus-visible>div>div>[data-slot=org-chart-card]]:ring-3 [&:focus-visible>div>div>[data-slot=org-chart-card]]:ring-ring/50',
      this.classInput(),
    ),
  );

  protected readonly hasChildren = computed(() => {
    const children = this.node().children;
    return children !== undefined && children.length > 0;
  });

  protected readonly isExpanded = computed(() => this.treeItem.expanded());

  readonly toggleFn = () => this.onToggle();

  protected readonly templateContext = computed<ScOrgChartNodeDefContext>(
    () => ({
      $implicit: this.node(),
      expanded: this.isExpanded(),
      hasChildren: this.hasChildren(),
      toggle: this.toggleFn,
    }),
  );

  protected readonly containerClass = computed(() =>
    cn(
      'flex',
      this.orgChart.direction() === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-start',
    ),
  );

  protected readonly childrenContainerClass = computed(() =>
    cn(
      'flex',
      this.orgChart.direction() === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-start',
    ),
  );

  /** Line from a person's card to their reports' sibling line. */
  protected readonly connectorClass = computed(() =>
    cn(
      'bg-border shrink-0',
      this.orgChart.direction() === 'vertical'
        ? 'h-4 w-px'
        : 'mt-(--sc-org-chart-anchor) h-px w-4',
    ),
  );

  protected readonly childrenWrapperClass = computed(() =>
    cn(
      'relative flex gap-4',
      this.orgChart.direction() === 'vertical' ? 'flex-row' : 'flex-col',
    ),
  );

  /** One report's cell; its padding makes room for the stub. */
  protected readonly childNodeClass = computed(() =>
    cn(
      'relative flex',
      this.orgChart.direction() === 'vertical'
        ? 'flex-col items-center pt-4'
        : 'flex-row items-start ps-4',
    ),
  );

  protected readonly stubClass = computed(() =>
    cn(
      'bg-border absolute',
      this.orgChart.direction() === 'vertical'
        ? 'start-1/2 top-0 h-4 w-px'
        : 'top-(--sc-org-chart-anchor) start-0 h-px w-4',
    ),
  );

  /**
   * The line joining siblings: from the first report's stub to the last one's.
   * Each cell draws its part, reaching half the gap-4 (0.5rem) into the gap.
   */
  protected siblingLineClass(isFirst: boolean, isLast: boolean): string {
    if (this.orgChart.direction() === 'vertical') {
      return cn(
        'bg-border absolute top-0 h-px',
        isFirst ? 'start-1/2' : '-start-2',
        isLast ? 'end-1/2' : '-end-2',
      );
    }
    return cn(
      'bg-border absolute start-0 w-px',
      isFirst ? 'top-(--sc-org-chart-anchor)' : '-top-2',
      isLast ? 'h-[calc(var(--sc-org-chart-anchor)+0.5rem)]' : '-bottom-2',
    );
  }

  constructor() {
    // Children belong to the enclosing node's group, the root to the tree.
    // (Nested nodes are created inside their parent's group template.)
    const group = inject(TreeItemGroup, { optional: true });
    setInput(this.treeItem.parent, group ?? inject(Tree));

    // Report expand/collapse changes (clicks, keys, toggle()) — not the
    // initial state. A non-collapsible chart re-expands right away.
    let previous: boolean | undefined;
    effect(() => {
      const expanded = this.treeItem.expanded();
      untracked(() => {
        if (previous === undefined || previous === expanded) {
          previous = expanded;
          return;
        }
        previous = expanded;
        if (!this.orgChart.collapsible() && !expanded && this.hasChildren()) {
          this.treeItem.expanded.set(true);
          return;
        }
        this.orgChart.nodeExpand.emit({ node: this.node(), expanded });
      });
    });
  }

  ngOnInit(): void {
    const node = this.node();
    setInput(this.treeItem.value, node.id);
    setInput(this.treeItem.label, node.name);
    this.treeItem.expanded.set(this.hasChildren() && node.expanded !== false);
  }

  /** Toggles the node (the card template's `toggle`). */
  onToggle(): void {
    if (this.orgChart.collapsible() && this.hasChildren()) {
      this.treeItem.expanded.update((v) => !v);
    }
  }
}
