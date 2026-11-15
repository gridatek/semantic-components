import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { ScBadge, ScBadgeVariants } from '@semantic-components/ui';
import { cn } from 'cn';
import { ComponentStatus } from '../../data/components';

const variantMap: Record<ComponentStatus, ScBadgeVariants['variant']> = {
  Experimental: 'destructive',
  'Developer Preview': 'outline',
  Stable: 'secondary',
};

@Component({
  selector: 'app-component-status-badge',
  imports: [ScBadge],
  template: ` <span scBadge [variant]="variant()">{{ status() }}</span> `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ComponentStatusBadge {
  readonly classInput = input<string>('', { alias: 'class' });
  // flex, not block: the badge fills it, centred in its row as a sibling
  // badge is — not left on a line's baseline (Sera's text-only badge drops).
  protected readonly class = computed(() => cn('flex', this.classInput()));

  readonly status = input.required<ComponentStatus>();

  protected readonly variant = computed(() => variantMap[this.status()]);
}
