import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScOrgChartNode } from './org-chart-node';
import type {
  OrgChartDirection,
  OrgChartNode,
  OrgChartNodeClickEvent,
  OrgChartNodeExpandEvent,
} from './org-chart-types';

@Component({
  selector: 'sc-org-chart',
  imports: [ScOrgChartNode],
  template: `
    <div [class]="containerClass()" role="tree" [attr.aria-label]="ariaLabel()">
      @if (data()) {
        <sc-org-chart-node
          [node]="data()!"
          [direction]="direction()"
          [collapsible]="collapsible()"
          [compact]="compact()"
          (nodeClick)="nodeClick.emit($event)"
          (nodeExpand)="nodeExpand.emit($event)"
        />
      } @else {
        <div class="text-muted-foreground text-sm p-4">
          No organization data available
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
export class ScOrgChart {
  readonly data = input<OrgChartNode | null>(null);
  readonly direction = input<OrgChartDirection>('vertical');
  readonly collapsible = input(true);
  readonly compact = input(false);
  readonly ariaLabel = input<string>('Organization chart');
  readonly class = input<string>('');

  readonly nodeClick = output<OrgChartNodeClickEvent>();
  readonly nodeExpand = output<OrgChartNodeExpandEvent>();

  protected readonly containerClass = computed(() =>
    cn(
      'inline-flex overflow-auto p-4',
      this.direction() === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-start',
      this.class(),
    ),
  );
}
