import {
  computed,
  Directive,
  inject,
  InjectionToken,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import type { DockItem, DockPosition, DockSize } from './dock-types';
import { DEFAULT_DOCK_OPTIONS } from './dock-types';

export const SC_DOCK = new InjectionToken<ScDock>('SC_DOCK');

@Directive({
  selector: '[sc-dock]',
  exportAs: 'scDock',
  providers: [{ provide: SC_DOCK, useExisting: ScDock }],
  host: {
    'data-slot': 'dock',
    role: 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class ScDock {
  readonly position = input<DockPosition>(DEFAULT_DOCK_OPTIONS.position);
  readonly size = input<DockSize>(DEFAULT_DOCK_OPTIONS.size);
  readonly magnification = input(DEFAULT_DOCK_OPTIONS.magnification);
  readonly magnificationScale = input(DEFAULT_DOCK_OPTIONS.magnificationScale);
  readonly ariaLabel = input('Application dock');

  readonly itemClick = output<DockItem>();

  readonly hoveredIndex = signal<number | null>(null);
  private itemCount = signal(0);

  readonly containerClass = computed(() => {
    const pos = this.position();
    return cn(
      'flex items-center justify-center',
      pos === 'bottom' && 'w-full',
      pos === 'left' && 'h-full',
      pos === 'right' && 'h-full',
    );
  });

  readonly dockClass = computed(() => {
    const pos = this.position();
    const size = this.size();

    return cn(
      'flex items-end gap-1 p-2',
      'bg-background/80 backdrop-blur-lg',
      'border rounded-2xl shadow-lg',
      pos === 'bottom' && 'flex-row',
      pos === 'left' && 'flex-col',
      pos === 'right' && 'flex-col',
      size === 'sm' && 'p-1.5 gap-0.5',
      size === 'lg' && 'p-3 gap-2',
    );
  });

  registerItem(): number {
    const index = this.itemCount();
    this.itemCount.update((c) => c + 1);
    return index;
  }

  getItemTransform(index: number): string {
    if (!this.magnification()) return '';

    const hovered = this.hoveredIndex();
    if (hovered === null) return 'scale(1)';

    const distance = Math.abs(index - hovered);
    const maxDistance = 2;

    if (distance > maxDistance) return 'scale(1)';

    const scale = this.magnificationScale();
    const factor = 1 + (scale - 1) * (1 - distance / (maxDistance + 1));

    return `scale(${factor})`;
  }

  onMouseEnter(index: number): void {
    this.hoveredIndex.set(index);
  }

  onMouseLeave(): void {
    this.hoveredIndex.set(null);
  }

  onItemClick(item: DockItem): void {
    if (!item.disabled) {
      this.itemClick.emit(item);
    }
  }
}
