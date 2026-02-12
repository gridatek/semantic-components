import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ScBadge, ScBadgeVariants } from '@semantic-components/ui-lab';
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
    <span sc-badge [variant]="variant()">{{ status() }}</span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentStatusBadge {
  readonly status = input.required<ComponentStatus>();

  protected readonly variant = computed(() => variantMap[this.status()]);
}
