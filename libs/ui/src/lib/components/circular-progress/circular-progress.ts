import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-circular-progress]',
  imports: [],
  template: `
    <svg
      class="transform -rotate-90"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.viewBox]="'0 0 ' + size() + ' ' + size()"
    >
      <!-- Background circle -->
      <circle
        class="fill-none stroke-muted"
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        [attr.stroke-width]="strokeWidth()"
      />

      <!-- Progress circle -->
      <circle
        class="fill-none stroke-primary transition-all duration-300 ease-in-out"
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        [attr.stroke-width]="strokeWidth()"
        [attr.stroke-dasharray]="circumference()"
        [attr.stroke-dashoffset]="strokeDashOffset()"
        [attr.stroke-linecap]="strokeLinecap()"
      />
    </svg>

    <!-- Center content -->
    <div class="absolute inset-0 flex items-center justify-center">
      <ng-content>
        @if (showValue()) {
          <span class="text-sm font-medium text-foreground">{{ value() }}%</span>
        }
      </ng-content>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCircularProgress {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly size = input<number>(64);
  readonly strokeWidth = input<number>(4);
  readonly strokeLinecap = input<'round' | 'butt' | 'square'>('round');
  readonly showValue = input<boolean>(false);

  protected readonly class = computed(() =>
    cn('relative inline-flex items-center justify-center', this.classInput()),
  );

  protected readonly center = computed(() => this.size() / 2);

  protected readonly radius = computed(() => {
    return (this.size() - this.strokeWidth()) / 2;
  });

  protected readonly circumference = computed(() => {
    return 2 * Math.PI * this.radius();
  });

  protected readonly strokeDashOffset = computed(() => {
    const progress = Math.min(Math.max(this.value(), 0), this.max());
    const percentage = (progress / this.max()) * 100;
    return this.circumference() - (percentage / 100) * this.circumference();
  });
}
