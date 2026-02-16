import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScBadge, ScBadgeVariants } from '@semantic-components/ui';
import { ComponentStatus } from '../../data/components';

const variantMap: Record<ComponentStatus, ScBadgeVariants['variant']> = {
  Experimental: 'destructive',
  'Developer Preview': 'outline',
  Stable: 'secondary',
};

@Component({
  selector: 'app-component-status-badge',
  imports: [ScBadge],
  template: `
    <span scBadge [variant]="variant()">{{ status() }}</span>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentStatusBadge {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly status = input.required<ComponentStatus>();

  protected readonly variant = computed(() => variantMap[this.status()]);
}
