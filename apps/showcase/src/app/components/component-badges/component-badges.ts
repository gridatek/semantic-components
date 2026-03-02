import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScBadge } from '@semantic-components/ui';
import { ComponentStatusBadge } from '../component-status-badge/component-status-badge';
import { ComponentItem } from '../../data/components';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-component-badges',
  imports: [ComponentStatusBadge, ScBadge],
  template: `
    <app-component-status-badge [status]="componentItem().status" />
    <span scBadge variant="outline">
      {{ componentItem().category }}
    </span>
    <span scBadge variant="secondary">
      {{ componentItem().library }}
    </span>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentBadges {
  private readonly componentsService = inject(ComponentsService);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex flex-wrap items-center gap-2', this.classInput()),
  );

  readonly path = input.required<string>();

  readonly componentItem = computed<ComponentItem>(
    () =>
      this.componentsService.components().find((c) => c.path === this.path())!,
  );
}
