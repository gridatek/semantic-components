import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScBadge } from '@semantic-components/ui-lab';
import { ComponentStatusBadge } from '../component-status-badge/component-status-badge';
import {
  ComponentItem,
  ComponentLibrary,
  COMPONENTS,
} from '../../data/components';

const libraryColors: Record<ComponentLibrary, { bg: string; text: string }> = {
  ui: {
    bg: 'color-mix(in oklch, var(--chart-1) 15%, transparent)',
    text: 'var(--chart-1)',
  },
  'ui-lab': {
    bg: 'color-mix(in oklch, var(--chart-2) 15%, transparent)',
    text: 'var(--chart-2)',
  },
  carousel: {
    bg: 'color-mix(in oklch, var(--chart-3) 15%, transparent)',
    text: 'var(--chart-3)',
  },
  code: {
    bg: 'color-mix(in oklch, var(--chart-4) 15%, transparent)',
    text: 'var(--chart-4)',
  },
  editor: {
    bg: 'color-mix(in oklch, var(--chart-5) 15%, transparent)',
    text: 'var(--chart-5)',
  },
};

const categoryColor = {
  bg: 'color-mix(in oklch, var(--primary) 15%, transparent)',
  text: 'var(--primary)',
};

@Component({
  selector: 'app-component-badges',
  imports: [ComponentStatusBadge, ScBadge],
  template: `
    <app-component-status-badge [status]="componentItem().status" />
    <span
      sc-badge
      variant="outline"
      [style.background-color]="categoryColor.bg"
      [style.color]="categoryColor.text"
      [style.border-color]="categoryColor.text"
    >
      {{ componentItem().category }}
    </span>
    <span
      sc-badge
      variant="outline"
      [style.background-color]="libColor().bg"
      [style.color]="libColor().text"
      [style.border-color]="libColor().text"
    >
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
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex flex-wrap items-center gap-2', this.classInput()),
  );

  readonly path = input.required<string>();

  readonly componentItem = computed<ComponentItem>(
    () => COMPONENTS.find((c) => c.path === this.path())!,
  );

  protected readonly categoryColor = categoryColor;

  protected readonly libColor = computed(
    () => libraryColors[this.componentItem().library],
  );
}
