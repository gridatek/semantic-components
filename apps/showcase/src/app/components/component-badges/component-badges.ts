import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScBadge } from '@semantic-components/ui';
import { cn } from 'cn';
import { ComponentsService } from '../../services/components-service';
import { ComponentStatusBadge } from '../component-status-badge/component-status-badge';

@Component({
  selector: 'app-component-badges',
  imports: [ComponentStatusBadge, ScBadge],
  template: `
    @if (componentItem(); as item) {
      <span scBadge variant="outline">{{ item.category }}</span>
      <app-component-status-badge [status]="item.status" />
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ComponentBadges {
  private readonly componentsService = inject(ComponentsService);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex flex-wrap items-center gap-2', this.classInput()),
  );

  readonly path = input.required<string>();

  readonly componentItem = computed(() =>
    this.componentsService.components().find((c) => c.path === this.path()),
  );
}
