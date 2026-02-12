import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import type {
  OrgChartDirection,
  OrgChartNode,
  OrgChartNodeClickEvent,
  OrgChartNodeExpandEvent,
} from './org-chart-types';

@Component({
  selector: 'sc-org-chart-node',
  template: `
    <div [class]="containerClass()">
      <!-- Node Card -->
      <div [class]="nodeCardClass()">
        <button
          type="button"
          [class]="cardButtonClass()"
          [attr.aria-expanded]="hasChildren() ? isExpanded() : null"
          [attr.aria-label]="
            node().name + (node().title ? ', ' + node().title : '')
          "
          (click)="onNodeClick($event)"
        >
          <!-- Avatar -->
          @if (node().avatar) {
            <img
              [src]="node().avatar"
              [alt]="node().name"
              class="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
          } @else {
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
            >
              <span class="text-lg font-semibold text-primary">
                {{ getInitials(node().name) }}
              </span>
            </div>
          }

          <!-- Info -->
          <div class="flex-1 min-w-0 text-left">
            <p class="font-semibold text-sm truncate">{{ node().name }}</p>
            @if (node().title) {
              <p class="text-xs text-muted-foreground truncate">
                {{ node().title }}
              </p>
            }
            @if (node().department) {
              <p class="text-xs text-muted-foreground/70 truncate">
                {{ node().department }}
              </p>
            }
          </div>

          <!-- Expand indicator -->
          @if (hasChildren()) {
            <div class="flex-shrink-0 ml-2">
              <span [class]="expandIconClass()" [innerHTML]="expandIcon"></span>
            </div>
          }
        </button>
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
                <sc-org-chart-node
                  [node]="child"
                  [direction]="direction()"
                  [collapsible]="collapsible()"
                  [compact]="compact()"
                  (nodeClick)="nodeClick.emit($event)"
                  (nodeExpand)="nodeExpand.emit($event)"
                />
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScOrgChartNode {
  readonly node = input.required<OrgChartNode>();
  readonly direction = input<OrgChartDirection>('vertical');
  readonly collapsible = input(true);
  readonly compact = input(false);

  readonly nodeClick = output<OrgChartNodeClickEvent>();
  readonly nodeExpand = output<OrgChartNodeExpandEvent>();

  protected readonly expanded = signal<boolean | null>(null);

  readonly expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

  protected readonly hasChildren = computed(() => {
    const children = this.node().children;
    return children && children.length > 0;
  });

  protected readonly isExpanded = computed(() => {
    const localExpanded = this.expanded();
    if (localExpanded !== null) return localExpanded;
    return this.node().expanded !== false;
  });

  protected readonly containerClass = computed(() =>
    cn(
      'flex',
      this.direction() === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-start',
    ),
  );

  protected readonly nodeCardClass = computed(() => cn('relative z-10'));

  protected readonly cardButtonClass = computed(() =>
    cn(
      'flex items-center gap-3 p-3 rounded-lg border bg-card text-card-foreground',
      'shadow-sm hover:shadow-md transition-shadow',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.compact() ? 'min-w-[160px]' : 'min-w-[200px]',
    ),
  );

  protected readonly expandIconClass = computed(() =>
    cn(
      'inline-flex items-center justify-center transition-transform duration-200',
      'text-muted-foreground',
      this.isExpanded() ? 'rotate-180' : 'rotate-0',
      this.direction() === 'horizontal' &&
        (this.isExpanded() ? '-rotate-90' : 'rotate-90'),
    ),
  );

  protected readonly childrenContainerClass = computed(() =>
    cn(
      'flex',
      this.direction() === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-start',
    ),
  );

  protected readonly connectorClass = computed(() =>
    cn('bg-border', this.direction() === 'vertical' ? 'w-px h-6' : 'h-px w-6'),
  );

  protected readonly childrenWrapperClass = computed(() =>
    cn(
      'flex relative',
      this.direction() === 'vertical' ? 'flex-row gap-4' : 'flex-col gap-4',
    ),
  );

  protected childNodeClass(isFirst: boolean, isLast: boolean): string {
    return cn(
      'flex relative',
      this.direction() === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-start',
    );
  }

  protected horizontalConnectorClass(
    isFirst: boolean,
    isLast: boolean,
  ): string {
    if (this.direction() === 'vertical') {
      return cn(
        'absolute top-0 h-6 bg-border',
        'w-px',
        // Horizontal line connecting siblings
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

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  onNodeClick(event: MouseEvent): void {
    this.nodeClick.emit({ node: this.node(), event });

    if (this.collapsible() && this.hasChildren()) {
      const newExpanded = !this.isExpanded();
      this.expanded.set(newExpanded);
      this.nodeExpand.emit({ node: this.node(), expanded: newExpanded });
    }
  }
}
