import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { OrgChartNode, ScOrgChartNodeDefContext } from './org-chart-types';
import { SC_ORG_CHART } from './org-chart-types';

@Component({
  selector: 'sc-org-chart-node',
  imports: [NgTemplateOutlet],
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
      @if (hasChildren() && isExpanded()) {
        <div [class]="childrenContainerClass()">
          <!-- Vertical connector from parent -->
          <div [class]="connectorClass()"></div>

          <!-- Children wrapper -->
          <div [class]="childrenWrapperClass()">
            @for (
              child of node().children;
              track child.id;
              let isFirst = $first;
              let isLast = $last
            ) {
              <div [class]="childNodeClass(isFirst, isLast)">
                <!-- Horizontal connector to child -->
                <div [class]="horizontalConnectorClass(isFirst, isLast)"></div>

                <!-- Recursive child node -->
                <sc-org-chart-node [node]="child" />
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  host: {
    '[class]': 'hostClass()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScOrgChartNode {
  readonly orgChart = inject(SC_ORG_CHART);

  readonly node = input.required<OrgChartNode>();

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly hostClass = computed(() => cn('block', this.classInput()));

  protected readonly expanded = signal<boolean | null>(null);

  protected readonly hasChildren = computed(() => {
    const children = this.node().children;
    return children !== undefined && children.length > 0;
  });

  protected readonly isExpanded = computed(() => {
    const localExpanded = this.expanded();
    if (localExpanded !== null) return localExpanded;
    return this.node().expanded !== false;
  });

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

  protected readonly connectorClass = computed(() =>
    cn(
      'bg-border',
      this.orgChart.direction() === 'vertical' ? 'w-px h-6' : 'h-px w-6',
    ),
  );

  protected readonly childrenWrapperClass = computed(() =>
    cn(
      'flex relative',
      this.orgChart.direction() === 'vertical'
        ? 'flex-row gap-4'
        : 'flex-col gap-4',
    ),
  );

  protected childNodeClass(isFirst: boolean, isLast: boolean): string {
    return cn(
      'flex relative',
      this.orgChart.direction() === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-start',
    );
  }

  protected horizontalConnectorClass(
    isFirst: boolean,
    isLast: boolean,
  ): string {
    if (this.orgChart.direction() === 'vertical') {
      return cn(
        'absolute top-0 h-6 bg-border',
        'w-px',
        !isFirst &&
          !isLast &&
          'before:absolute before:top-0 before:left-1/2 before:w-full before:h-px before:bg-border before:-translate-x-1/2',
        isFirst &&
          !isLast &&
          'before:absolute before:top-0 before:left-1/2 before:w-[calc(50%+0.5rem)] before:h-px before:bg-border',
        !isFirst &&
          isLast &&
          'before:absolute before:top-0 before:right-1/2 before:w-[calc(50%+0.5rem)] before:h-px before:bg-border',
      );
    } else {
      return cn(
        'absolute left-0 w-6 bg-border',
        'h-px',
        !isFirst &&
          !isLast &&
          'before:absolute before:left-0 before:top-1/2 before:h-full before:w-px before:bg-border before:-translate-y-1/2',
        isFirst &&
          !isLast &&
          'before:absolute before:left-0 before:top-1/2 before:h-[calc(50%+0.5rem)] before:w-px before:bg-border',
        !isFirst &&
          isLast &&
          'before:absolute before:left-0 before:bottom-1/2 before:h-[calc(50%+0.5rem)] before:w-px before:bg-border',
      );
    }
  }

  onToggle(): void {
    if (this.orgChart.collapsible() && this.hasChildren()) {
      const newExpanded = !this.isExpanded();
      this.expanded.set(newExpanded);
      this.orgChart.nodeExpand.emit({
        node: this.node(),
        expanded: newExpanded,
      });
    }
  }
}
