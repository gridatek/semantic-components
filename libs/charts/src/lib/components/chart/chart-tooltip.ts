import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';

@Component({
  selector: '[scChartTooltip]',
  template: `
    @if (visible()) {
      <div
        class="bg-background pointer-events-none absolute z-50 rounded-lg border px-3 py-1.5 text-sm shadow-md"
        [style.left.px]="x()"
        [style.top.px]="y()"
        [style.transform]="'translate(-50%, -100%) translateY(-8px)'"
      >
        <ng-content />
      </div>
    }
  `,
  host: {
    'data-slot': 'chart-tooltip',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScChartTooltip {
  readonly visible = signal(false);
  readonly x = signal(0);
  readonly y = signal(0);

  show(x: number, y: number): void {
    this.x.set(x);
    this.y.set(y);
    this.visible.set(true);
  }

  hide(): void {
    this.visible.set(false);
  }
}
